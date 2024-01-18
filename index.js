const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

//const { generateArticles } = require('/functions/generate-content')
const { run } = require('./copilot/generate-json')

async function make() {
    //const result = await generateArticles()

    const result2 = await run()

    process.exit(0)
}

make()
