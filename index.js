const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const { run } = require('./copilot/generate-json')
const {
    generateArticles,
    completeDevArticles,
} = require('./copilot/generate-content')
const {
    getLatestArticles,
    copyArticlesToBackup,
    deleteOldArticles,
    deleteArticlesByCollectionAndBatch,
    renameIds,
} = require('./copilot/firestore')

async function make() {
    //const result = await generateArticles()

    // const moved = await copyArticlesToBackup('dyes-dev')
    //console.log('moved', moved.length)

    //const latest = await getLatestArticles('dyes')
    //const latest = await deleteOldArticles('dyes')
    //console.log('latest', latest.length)

    await run()

    // await renameIds('dyes', 'w1')
    //const theArticles = await completeDevArticles()
    //console.log('theArticles', theArticles.length)
    process.exit(0)
}

make()
