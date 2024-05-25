const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

//const { run } = require('./copilot/generate-json')
const { generateArticles } = require('./copilot/generate-content')
const {
    getLatestArticles,
    moveArticlesToBackup,
    deleteOldArticles,
} = require('./copilot/firestore')

async function make() {
    const result = await generateArticles()

    //const moved = await moveArticlesToBackup('dyes')
    //console.log('moved', moved.length)

    //const latest = await getLatestArticles('dyes')
    //const latest = await deleteOldArticles('dyes')
    //console.log('latest', latest.length)

    // await run()

    process.exit(0)
}

make()
