// const path = require('path');
const admin = require('firebase-admin')
const { sanitizeId } = require('./utility')
const dotenv = require('dotenv')

dotenv.config()

// Load your service account credentials from an environment variable or secret manager
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

// Initialize the Firebase application with the service account credentials
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

// Get a Firestore database reference
const db = admin.firestore()

async function saveArticle(collection, doc, id = null) {
    console.log('Saving to Firestore...', collection)
    try {
        // Add a new document with a generated id to the 'messages' collection
        let docId
        if (id) {
            docId = id
        } else {
            docId = sanitizeId(`${doc.batch}-${doc.input.topic}`)
        }

        doc.id = docId

        const docRef = db.collection(collection).doc(docId)
        const timestamp = admin.firestore.Timestamp.now()
        await docRef.set({ ...doc, timestamp })

        const result = await docRef.get()
        return result.data()
    } catch (error) {
        return `Error adding document: ${error}`
    }
}

async function saveArticles(collection, docs) {
    console.log('Saving to Firestore...', collection)
    try {
        const docRefs = docs.map((doc) => {
            const docId = sanitizeId(`${doc.batch}-${doc.input.topic}`)
            doc.id = docId
            return db.collection(collection).doc(docId).set(doc)
        })

        await Promise.all(docRefs)

        return 'Documents added successfully'
    } catch (error) {
        return `Error adding documents: ${error}`
    }
}

async function updateArticle(collection, doc, id = null) {
    console.log('Updating Firestore...')
    try {
        // Add a new document with a generated id to the 'messages' collection
        let docId
        if (id) {
            docId = doc.id
        } else {
            docId = sanitizeId(`${doc.batch}-${doc.input.topic}`)
        }

        const docRef = db.collection(collection).doc(docId)
        const timestamp = admin.firestore.Timestamp.now()
        await docRef.update({ ...doc, timestamp })

        const result = await docRef.get()

        return result.data()
    } catch (error) {
        return `Error updating document: ${error}`
    }
}

async function getArticlesByCollection(name) {
    const articlesRef = db.collection(name) // .orderBy('topic', 'asc');
    const snapshot = await articlesRef.get()
    const articles = snapshot.docs.map((doc) => doc.data())
    /*
  const articles = snapshot.docs.map((doc) => ({
    title: doc.data().title,
    description: doc.data().description,
    content: doc.data().content,
  }));
*/
    return articles
}

async function getArticlesByCollectionAndBatch(collection, batches) {
    const articlesRef = db.collection(collection) // .orderBy('topic', 'asc');
    const snapshot = await articlesRef.get()
    const articles = snapshot.docs
        .filter((doc) => batches.includes(doc.data().batch))
        .map((doc) => {
            const data = doc.data()
            return {
                title: data.title,
                shortTitle: data.shortTitle,
                description: data.description,
                content: data.content,
                image: data.image,
                topic: data.topic?.replace(/ /g, '+'),
                color: data.color,
                grade: data.grade,
                batch: data.batch,
            }
        })

    console.log('articles found ', articles.length)
    return articles
}

async function deleteArticlesByCollectionAndBatch(collection, batch) {
    const articlesRef = db.collection(collection)
    const snapshot = await articlesRef.get()

    const articlesToDelete = snapshot.docs.filter(
        (doc) => doc.data().batch === batch
    )

    console.log('Articles to delete:', articlesToDelete.length)
    const deletePromises = articlesToDelete.map((doc) => doc.ref.delete())
    return Promise.all(deletePromises)
}

// select all but the document with the most recent timestamp for each topic
async function getLatestArticles(collection) {
    const articlesRef = db.collection(collection)
    const snapshot = await articlesRef.get()
    const articles = snapshot.docs.map((doc) => doc.data())
    const latestArticles = articles.reduce((acc, article) => {
        const existing = acc.find((a) => a.topic === article.topic)
        if (!existing) {
            acc.push(article)
        } else if (article.timestamp > existing.timestamp) {
            acc.splice(acc.indexOf(existing), 1, article)
        }
        return acc
    }, [])
    return latestArticles
}

// delete articles not in getLatestArticles

async function deleteOldArticles(collection) {
    const articlesRef = db.collection(collection)
    const snapshot = await articlesRef.get()

    const latestArticles = await getLatestArticles(collection)

    const articlesToDelete = snapshot.docs.filter(
        (doc) => !latestArticles.find((a) => a.topic === doc.data().topic)
    )

    console.log('Articles to delete:', articlesToDelete.length)
    const deletePromises = articlesToDelete.map((doc) => doc.ref.delete())
    return Promise.all(deletePromises)
}

async function copyArticlesToBackup(collection) {
    console.log('Copying all docs to backup...')
    const docRef = db.collection(collection)
    const snapshot = await docRef.get()
    const backupRef = db.collection('backup')
    let backupData = []
    // should use same id
    snapshot.forEach((doc) => {
        const data = doc.data()
        backupData.push(backupRef.doc(doc.id).set(data))
    })
    return Promise.all(backupData)
}

async function handler(request) {
    console.log('Upserting article...', request.body.docId)
    const result = await updateArticle('dyes', request.body, request.body.docId)

    return {
        statusCode: 200,
        body: result,
    }
}

// update article images

async function updateArticleImages(newArticles, images) {
    const articlesRef = db.collection('articles')
    const snapshot = await articlesRef.get()
    const articles = snapshot.docs.map((doc) => doc.data())

    // only update image and lastUpdated fields
    const updatedArticles = articles.map((article) => {
        const image = images.find((image) => image.topic === article.topic)
        if (image) {
            article.image = image
            article.lastUpdated = admin.firestore.Timestamp.now()
        }
        return article
    })

    // update articles
    const updatePromises = updatedArticles.map((article) => {
        const docId = sanitizeId(`${article.batch}-${article.topic}`)
        const docRef = db.collection('articles').doc(docId)
        return docRef.update(article)
    })

    return Promise.all(updatePromises)
}

module.exports = {
    updateArticleImages,

    handler,
    saveArticle,
    saveArticles,
    getArticlesByCollection,
    getArticlesByCollectionAndBatch,
    copyArticlesToBackup,
    deleteOldArticles,
    getLatestArticles,
}
