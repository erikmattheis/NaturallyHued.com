const fs = require('fs')
const path = require('path')
const OpenAI = require('openai')
const sharp = require('sharp')

const { saveImage } = require('./google-cloud')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function generateImage(prompt, model, n, size) {
    console.log('prompt', prompt)
    try {
        const response = await openai.images.generate({
            prompt,
            model,
            n,
            size,
            response_format: 'b64_json',
        })
        return response.data[0]
    } catch (error) {
        console.log('Error generating image:', error)
        return `Error generating image: ${error}`
    }
}

async function saveImageBufferToFile(imageBuffer, imagePath) {
    fs.writeFileSync(path.join(__dirname, imagePath), imageBuffer)
}

function replaceWhiteSpaceWithDash(imageName) {
    return imageName.replace(/\s+/g, '-')
}

async function handler(
    prompt,
    imageStr,
    model = 'dall-e-2',
    n = 1,
    size = '512x512'
) {
    const image = await generateImage(prompt, model, n, size)

    const buffer = Buffer.from(image.b64_json, 'base64')

    const name = `${imageStr}.jpg`

    const original = await saveImage(buffer, name)

    const quality = 80
    const compressedBuffer = await sharp(buffer).jpeg({ quality }).toBuffer()

    const compressedFilename = name.replace('.jpg', `-q${quality}.jpg`)

    const compressed = await saveImage(compressedBuffer, compressedFilename)

    //await saveImageBufferToFile(buffer, imagePath)

    const images = {
        original,
        compressed,
    }
    /*
  const compressed = [60, 80, 90].map(async (quality) => {
    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality })
      .toBuffer();

    const compressedFilename = name.replace('.jpg', `-q${quality}.jpg`);

    const compressedUrl = await saveImage(compressedBuffer, compressedFilename);

    return {`a${quality}`: compressedUrl
  }

console.log('images', JSON.stringify(images, null, 2));
/*
const imageNameWithDash = replaceWhiteSpaceWithDash(imageName);
*/
    // const url = 'l'; // `../../../public/images/${imageNameWithDash}`;

    // await saveImageBufferToFile(buffer, imagePath);

    return images
}

exports.handler = handler

exports.generateGraphics = async function generateGraphics(
    topic = '',
    colorThemeDescription = '',
    id = 'n2.jpg'
) {
    const prompt = `Closeup realistic oil still life of ${topic.name} as a natural dye. ${colorThemeDescription} background colors.`

    const model = 'dall-e-2'
    const size = '512x512'
    //const size = '1024x1024'
    // eslint-disable-next-line no-await-in-loop
    const images = await handler(prompt, id, model, 1, size)

    const image = {
        ...images,
        prompt,
        colorThemeDescription,
        model,
        size,
    }

    return image
}

// generateGraphics('Madder', 'Indochine and complimentary', 'a1');
