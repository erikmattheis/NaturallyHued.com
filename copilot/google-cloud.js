const { Storage } = require('@google-cloud/storage')

// Load your service account credentials from an environment variable or secret manager

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)

function sanitizeId(id) {
    return encodeURIComponent(id.toLowerCase().replace(/\s/g, '-'))
}

const storage = new Storage({
    projectId: serviceAccount.project_id,
    credentials: serviceAccount,
})

async function saveImage(buffer, name) {
    console.log('Saving image to Google Cloud...')
    try {
        // Upload the image data to Google Cloud Storage
        const bucketName = 'nightly-images'
        const fileGroupName = 'article-images'
        const fileName = sanitizeId(name)

        const bucket = storage.bucket(bucketName)
        const file = bucket.file(`${fileGroupName}/${fileName}`)
        await file
            .save(buffer)
            .then(() => {
                console.log(`File ${file} saved to ${bucketName}.`)
            })
            .catch((err) => {
                console.error('Error saving file:', err)
            })
        /*
        //console.log('file', file)
        const stream = file.createWriteStream({
            metadata: {
                contentType: 'image/jpeg',
            },
            gzip: true,
        })

        stream.write(buffer)
        stream.end()
*/
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileGroupName}/${fileName}`
        console.log('publicUrl', publicUrl)
        return publicUrl
    } catch (error) {
        console.error('Error saving image to Google Cloud:', error)
        return `Error saving image to Google Cloud: ${error}`
    }
}

module.exports = { saveImage }
