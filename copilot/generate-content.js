const { performance } = require('perf_hooks')
const { sanitizeId } = require('./utility')
const { saveArticle } = require('./firestore')
const { generateGraphics } = require('./openai-images')
const { generateText } = require('./openai-completions')

//const generateJson = require('./generate-json')
const { dyes } = require('./data/dyes')

// const dyes = JSON.parse(dyesJson);

function getAGrade() {
    const grades = [
        "Write in the voice of a rural person who has never seen a compter and doesn't trust or understand science. But do NOT include misspellings, steretyoes and especially not scientifically inaccurate information.",
        'Use flowery lavoicnguage, poetry, illiteration, pretentious foreign-language phrases, and a penchant for the absurd.',
        'Write at tioa post-doct orate reading level.',
        'Make it nutty professor reading level.',
    ]
    return grades[Math.floor(Math.random() * grades.length)]
}

function normalRandom(mean, stdDev) {
    // warning: can return unusable negative numbers
    let u = 0
    let v = 0
    while (u === 0) u = Math.random()
    while (v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    num = num * stdDev + mean // Translate to desired mean and standard deviation

    return num
}

function getALength(assignedWords) {
    let finalWordCount
    do {
        const revisionFactor = normalRandom(1.1, 0.08)
        finalWordCount = assignedWords * revisionFactor

        finalWordCount = Math.round(finalWordCount)
    } while (
        finalWordCount < assignedWords * 0.7 ||
        finalWordCount > assignedWords * 1.5
    )
    // add plus or minus 20
    finalWordCount += Math.floor(Math.random() * 40) - 20
    return finalWordCount
}

function executionTimeToSeconds(executionTime) {
    return Math.round((executionTime / 1000) * 100) / 100
}

function addDateSuffix(str) {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${str}-${year}-${month}-${day}-${hours}-${minutes}-${seconds}`
}

// eslint-disable-next-line func-names
async function generateArticles() {
    try {
        const batch = '24.05.24'

        const topics = dyes

        // only use first few topics for now
        topics.length = 10

        const colorThemes = [
            {
                name: 'Indochine and complimentary',
                colors: ['#CF6B00', '#4F3C28'],
            },
            { name: 'Indochine', colors: ['#CF6B00'] },
            {
                name: 'Razzmatazz and complementary',
                colors: ['#D10067', '#52293D'],
            },
            { name: 'Razzmatazz', colors: ['#D10067'] },
            {
                name: 'Ultramarine and complementary',
                colors: ['#3F00FF', '#FFC700'],
            },
        ]

        for (const topic of topics) {
            if (
                [
                    'guava',
                    'cherries',
                    'paprika',
                    'logwood',
                    'mullein',
                    'myrobalan',
                    'coffee',
                    'brazil',
                    'grsape',
                    'mullberry',
                    'dandilion',
                    'beet',
                    'avocado',
                    'alkanet',
                    'avocadp',
                    'blueberr',
                ].includes(topic.name.toLowerCase())
            ) {
                console.log(`Skipping ${topic.name}...`)
                continue
            }
            const start = performance.now()

            const name = topic.name.toLowerCase()

            const id = sanitizeId(`${batch}-${name}`)

            const colorTheme =
                colorThemes[Math.floor(Math.random() * colorThemes.length)]

            console.log(`Generating article for ${topic.name}...`)

            const colorThemeDescription =
                colorTheme.colors.length > 1
                    ? `${colorTheme.colors[0]} and ${colorTheme.colors[1]}`
                    : colorTheme.colors[0] // eslint-disable-line max-len

            // eslint-disable-next-line no-await-in-loop
            /*
            const image = await generateGraphics(
                topic,
                colorThemeDescription,
                id
            )
*/
            const temperature = Math.random() + 0.3

            const grade = getAGrade()
            const len = getALength(500)

            // eslint-disable-next-line no-await-in-loop
            const response = await generateText(
                topic.name,
                grade,
                len,
                topic.color,
                colorTheme,
                temperature
            )
            const end = performance.now()
            const t = end - start
            const executionTime = `${executionTimeToSeconds(t)} seconds`

            console.log(`Execution time: ${executionTime}`)
            // const image = 'none';
            // JSON.stringify({ ...response, executionTime, topic: topic.name }, null, 2);
            const doc = {
                ...response,
                executionTime,
                topic: topic.name,
                batch,
            }

            // eslint-disable-next-line no-await-in-loop
            await saveArticle('dyes-dev', doc, id)
        }
    } catch (error) {
        console.log('error', error)
    }

    //await generateJson.handler()

    console.log('Done.')

    return {
        statusCode: 200,
        body: 'Done.',
    }
}

module.exports = { generateArticles }
