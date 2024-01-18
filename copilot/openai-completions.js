const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
const model = 'gpt-3.5-turbo'

const jsdom = require('jsdom')
const { JSDOM } = jsdom

const window = new JSDOM('').window
const createDOMPurify = require('dompurify')
const DOMPurify = createDOMPurify(window)

function getMessage(response) {
    return response.choices[0].message.content.trim()
}

function makeContentMessages(topic, grade, len) {
    const messages = [
        {
            role: 'system',
            content:
                "You are a non-fiction 1970s gonzo journalist, you include many alliterations and puns but don't say any of that. Provide an article without commentary. You write for a website.",
        },
        {
            role: 'user',
            content: `${len}-word humor article on natural dye ${topic}, ${grade} reading level. One of many articles on dyes. Format only with HTML tags: p, em, aside, blockquote, strong, and h2. No attributes or css. Use blockquote or aside once or twice evey 400 words."`,
        },
    ]
    return messages
}

async function generateContent(messages, temperature) {
    const response = await openai.chat.completions.create({
        messages,
        temperature,
        model,
    })

    return response
}

function stripHtml(str) {
    // if it's a meta description, return the value, accounting for single or double quotes
    // remove whitespace first

    const match = str.match(/content\s*=\s*(["'])(.*?)\1/)
    const result = match ? match[2] : null

    if (str.replace(/\s/g, '').includes('content=')) {
        return result
    }

    return str.replace(/<[^>]*>?/gm, '')
}

function makeDescriptionMessages(str, topic) {
    const shorter = stripHtml(str).split(' ').slice(0, 40).join(' ')
    const messages = [
        {
            role: 'user',
            content: `HTML meta-description for page about ${topic} and starts "${shorter}"`,
        },
    ]

    return messages
}

function makeTitleMessages(str) {
    const messages = [
        {
            role: 'user',
            content: `Title 40-80 characters long for article with meta description ${str}`,
        },
    ]

    return messages
}

async function generateCompletion(messages) {
    const response = await openai.chat.completions.create({
        messages,
        model,
    })

    return response
}

function getRidOfAllButBodyContent(str) {
    if (!str.includes('<body>') || !str.includes('</body>')) return str
    const body = str.split('<body>')[1].split('</body>')[0]
    return body
}

async function generateText(topic, grade, len, color, colorTheme, temperature) {
    console.log('Generating text...')
    const contentMessages = makeContentMessages(topic, grade, len)

    const contentResponse = await generateContent(contentMessages, temperature)

    // eslint-disable-next-line max-len
    // const cleanedContentResponse = JSON.parse(JSON.stringify(contentResponse).replace(/\\n/g, ' '));

    const preliminaryContent = getMessage(contentResponse)

    const sanitizedContent = DOMPurify.sanitize(preliminaryContent)

    const content = getRidOfAllButBodyContent(sanitizedContent)

    const descriptionMessages = makeDescriptionMessages(content, topic)

    const descriptionResponse = await generateCompletion(descriptionMessages)

    const description = getMessage(descriptionResponse)

    const titleMessages = makeTitleMessages(description)

    const titleResponse = await generateCompletion(titleMessages)

    const title = getMessage(titleResponse)

    return {
        title,
        shortTitle: topic,
        color,
        content,
        description,
        input: {
            topic,
            grade,
            color,
            colorTheme,
            temperature,
            len,
            model,
            messages: {
                content: contentMessages,
                description: descriptionMessages,
                title: titleMessages,
            },
        },
    }
}

module.exports = {
    generateText,
}
