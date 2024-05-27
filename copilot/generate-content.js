const { performance } = require('perf_hooks')
const { sanitizeId } = require('./utility')
const {
    saveArticle,
    saveArticles,
    getArticlesByCollection,
} = require('./firestore')
const { generateGraphics } = require('./openai-images')
const { generateText } = require('./openai-completions')
const fs = require('fs')

//const generateJson = require('./generate-json')
const { dyes } = require('./data/dyes')
const { fstat } = require('fs')

// const dyes = JSON.parse(dyesJson);

function getAGrade() {
    const grades = [
        "Write in the voice of a rural person who has never seen a compter and doesn't trust or understand science. But do NOT include misspellings, steretyoes and especially not scientifically inaccurate information.",
        'Use flowery language, poetry, illiteration, pretentious foreign-language phrases, and a penchant for the absurd.',
        'Write at a post-doctoral reading level.',
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
    finalWordCount += Math.floor(Math.random() * 50) - 20
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
        //topics.length = 10

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
                    'brazilwood',
                    'grapes',
                    'mulberries',
                    'dandelion',
                    'beets',
                    'avocado pits',
                    'alkanet',
                    'avocado pits',
                    'blueberries',
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
z            const image = await generateGraphics(
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

// if a field exists in newArticles, update the old article with the new value

async function updateArticles(newArticles, oldArticles) {
    console.log('newArticles', newArticles.length)
    console.log('oldArticles', oldArticles.length)
    const articles = await Promise.all(
        newArticles.map(async (newArticle) => {
            const oldArticle = oldArticles.find(
                (oldArticle) => newArticle.topic === oldArticle.topic
            )
            if (!oldArticle) {
                console.log('no old article for', newArticle.topic)
                return newArticle
            }

            const keys = Object.keys(oldArticle)

            keys.forEach((key) => {
                if (!newArticle[key] && oldArticle[key]) {
                    console.log('no key, adding', oldArticle[key])
                    newArticle[key] = oldArticle[key]
                }
            })

            if (!newArticle.image) {
                console.log('no image for', newArticle.topic)

                try {
                    newArticle.image = await generateGraphics(
                        newArticle.topic,
                        `${newArticle.input.colorTheme.colors.join(',')} and ${
                            newArticle.color
                        }`,
                        newArticle.id
                    )
                    console.log('generated image for', newArticle.image)
                } catch (error) {
                    console.error(
                        `Failed to generate graphics for article ${newArticle.id}:`,
                        error
                    )
                }
            }

            newArticle.lastUpdated = new Date().toISOString()

            console.log(newArticle.topic, 'updated', newArticle.image?.original)

            return newArticle
        })
    )

    return combineArticles(articles, oldArticles)
}

async function addMissingImages(newArticles) {
    const toUpdate = newArticles.filter((newArticle) => {
        return !newArticle.image
    })
    const articles = await Promise.all(
        toUpdate.map(async (newArticle) => {
            if (!newArticle.image) {
                console.log('no image for', newArticle.shortTitle)
                const colorTheme = newArticle.input.colorTheme
                const colorThemeDescription =
                    colorTheme.colors.length > 1
                        ? `${colorTheme.colors[0]} and ${colorTheme.colors[1]}`
                        : colorTheme.colors[0]
                try {
                    newArticle.image = await generateGraphics(
                        newArticle.shortTitle,
                        colorThemeDescription,
                        newArticle.id
                    )
                    newArticle.lastUpdated = new Date().toISOString()
                    console.log('generated image for', newArticle.image)
                } catch (error) {
                    console.error(
                        `Failed to generate graphics for article ${newArticle.id}:`,
                        error
                    )
                }
            }

            console.log(newArticle.topic, 'updated', newArticle.image?.original)

            return newArticle
        })
    )

    // but we only want to update the image and last updated fields

    return articles
}

async function completeDevArticles() {
    try {
        const devArticles = await getArticlesByCollection('dyes-dev')
        const oldArticles = await getArticlesByCollection('dyes')
        const articles = await updateArticles(devArticles, oldArticles)
        console.log('articles', articles.length)
        await saveArticles('dyes-staging', articles)
        console.log('articles', articles.length)
        fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2))
        return articles
    } catch (error) {
        console.log('error', error)
    }
}

function combineArticles(newArticles, oldArticles) {
    const toMove = oldArticles.filter((oldArticle) => {
        return !newArticles.find(
            (newArticle) => newArticle.topic === oldArticle.topic
        )
    })
    const articles = [...newArticles, ...toMove].sort((a, b) => {
        if (!a.topic) {
            return -1
        }
        if (!b.topic) {
            return 1
        }
        return a.topic.localeCompare(b.topic)
    })
    return articles
}

module.exports = { generateArticles, completeDevArticles }
