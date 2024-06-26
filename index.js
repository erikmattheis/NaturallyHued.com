const dotenv = require('dotenv')
const fs = require('fs')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const { run } = require('./copilot/generate-json')
const {
    generateArticles,
    completeDevArticles,
    updateArticles,
} = require('./copilot/generate-content')
const {
    getLatest,
    copyArticlesToBackup,
    deleteOldArticles,
    deleteArticlesByCollectionAndBatch,
    renameIds,
    compare,
} = require('./copilot/firestore')

async function make() {
    //await updateArticles('dyes')
    //const result = await compare('dyes', 'dyes-staging')
    //const result = await generateArticles()

    // const moved = await copyArticlesToBackup('dyes-dev')
    //console.log('moved', moved.length)

    //const latest = await getLatestArticles('dyes')
    //const latest = await deleteOldArticles('dyes')
    //console.log('latest', latest.length)

    //await run()

    // await renameIds('dyes', 'w1')
    //const theArticles = await completeDevArticles()

    //fs.writeFileSync('./articles.json', JSON.stringify(theArticles, null, 2))
    //console.log('theArticles', theArticles.length)
    process.exit(0)
}

make()
