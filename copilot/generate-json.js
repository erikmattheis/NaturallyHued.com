// functions/generatecontent-background.js

const { performance } = require('perf_hooks')
const fs = require('fs')
const path = require('path')
const { getArticlesByCollectionAndBatch } = require('./firestore')

const batches = ['23.12.22', '23.12.26', '23.12.27']

function executionTimeToSeconds(executionTime) {
    return Math.round((executionTime / 1000) * 100) / 100
}

function replaceWhiteSpaceWithDash(name) {
    return name.replace(/\s+/g, '-')
}

// eslint-disable-next-line func-names
async function run() {
    console.log('Generating JSON...')
    const t0 = performance.now()
    // const topic = body.topic || 'Synthetic fabrics used in sports';
    const subjects = ['dyes']

    // eslint-disable-next-line no-restricted-syntax
    for (const subject of subjects) {
        const collection = subject
        // eslint-disable-next-line no-await-in-loop
        // const topics = await getArticlesByBatch(subject);
        // eslint-disable-next-line no-await-in-loop

        const topics = await getArticlesByCollectionAndBatch(
            'dyes',
            batches
            // eslint-disable-next-line no-await-in-loop
        )

        const fileName = replaceWhiteSpaceWithDash(collection)

        fs.writeFileSync(
            path.join(__dirname, `../src/data/${fileName}.json`),
            JSON.stringify(topics, null, 2)
        )
    }

    const t1 = performance.now()
    const executionTime = executionTimeToSeconds(t1 - t0)
    console.log(`Done in ${executionTime} seconds.`)
    return {
        statusCode: 200,
        body: 'Done.',
    }
}

exports.run = run
