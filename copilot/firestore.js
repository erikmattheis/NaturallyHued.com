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
        const sav = await docRef.set({ ...doc, timestamp })

        const result = await docRef.get()
        return result.data()
    } catch (error) {
        return `Error adding document: ${error}`
    }
}

async function updateArticle(collection, doc, id = null) {
    console.log('Updating Firestore...')
    try {
        // Add a new document with a generated id to the 'messages' collection
        let docId
        if (id) {
            docId = dod.id
        } else {
            docId = sanitizeId(`${doc.batch}-${doc.input.topic}`)
        }

        const docRef = db.collection(collection).doc(docId)
        const timestamp = admin.firestore.Timestamp.now()
        const sav = await docRef.update({ ...doc, timestamp })

        const result = await docRef.get()
        console.log('result', result.data())
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
            console.log('data', data)
            return {
                title: data.title,
                shortTitle: data.shortTitle,
                description: data.description,
                content: data.content,
                image: data.image,
                topic: data.topic.replace(/ /g, '+'),
                color: data.color,
            }
        })
    console.log('articles found ', articles.length)
    return articles
}

async function handler(request) {
    console.log('Upserting article...', request.body.docId)
    const result = await updateArticle('dyes', request.body, request.body.docId)

    return {
        statusCode: 200,
        body: result,
    }
}

module.exports = {
    handler,
    saveArticle,
    getArticlesByCollection,
    getArticlesByCollectionAndBatch,
}
