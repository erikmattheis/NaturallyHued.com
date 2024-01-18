<template>
    <article class="wrapper">
        <div v-if="article">
            <header
                :style="{
                    'background-color': article.color.background,
                    color: article.color.color,
                }"
            >
                <div
                    :style="{
                        'background-image': `url(${article.image.compressed})`,
                    }"
                    class="title-background"
                >
                    <h2><span v-text="article.shortTitle"></span></h2>
                    <p><span v-text="article.title"></span></p>
                </div>
            </header>
            <section class="content">
                <div v-html="formattedContent"></div>
            </section>
        </div>
    </article>
</template>

<script>
import axios from 'axios'
import DOMPurify from 'dompurify'
import dyes from '../data/dyes.json'
import LoadingMessage from './LoadingMessage.vue'

import { contrastingColor } from '../services/colors.js'

export default {
    name: 'DynamicContent',
    components: { LoadingMessage },
    props: {
        topic: {
            type: String,
            required: true,
        },
    },
    emits: ['changeBackground'],
    data() {
        return {
            editMode: true,
            articles: dyes,
            article: {
                color: {
                    background: '#000000',
                    color: '#FFFFFF',
                },
            },
            originalArticle: {},
            isLoading: false,
        }
    },
    created() {
        this.setArticle(this.topic)
    },
    computed: {
        formattedContent() {
            const img = `<img src="${this.article.image.compressed}" alt="${this.article.shortTitle}" class="article-image" />`

            const paragraphs = this.article.content.split('</h2>')
            paragraphs.splice(1, 0, img)

            return paragraphs.join('</h2>')
        },
    },

    watch: {
        '$route.params.topic': {
            immediate: true,
            handler(topic) {
                this.setArticle(topic)
            },
        },
    },
    methods: {
        notRandomNumberBetween2And7(str) {
            if (str.length < 4) {
                return Math.max(str.length, 2)
            }
            const len = str.charCodeAt(2) + str.charCodeAt(3)
            return (len % 6) + 2
        },
        formatContent() {
            const img = `<img src="${this.article.image.compressed}" alt="${this.article.shortTitle}" class="article-image" />`

            const paragraphs = this.article.content.split('</h2>')
            paragraphs.splice(1, 0, img)

            return paragraphs.join('</h2>')
        },
        getChunks(title) {
            const words = title.split(' ')
            const chunks = []
            let i = 0

            const h = this.notRandomNumberBetween2And3(words[0])

            while (i < words.length) {
                const chunkSize = Math.min(2 + (i % 4), words.length - i)
                const chunk = words
                    .slice(i, i + chunkSize)
                    .join(' ')
                    .trim()
                const result =
                    i === h ? `<h2>${chunk}</h2>` : `<h3>${chunk}</h3>`
                chunks.push(chunk)
                i += chunkSize
            }

            return chunks
        },
        addTagsToChunks(chunks) {
            let result = ''

            while (chunks.length) {
                const chunk = chunks.shift()
                const h2 = this.notRandomNumberBetween2And7(chunk)
                const tag = h2 ? 'h2' : 'h3'
                result += `<${tag} class="title"><span> ${chunk} </span></${tag}>`
            }

            // pick four differ
            /*
            const h2Indexes = [
                this.notRandomNumberBetween2And3(chunks[0]),
                this.notRandomNumberBetween2And3(chunks[chunks.length - 1]),
            ].sort()
            if (h2Indexes[0] === h2Indexes[1]) {
                h2Indexes[1]++
            }

            return chunks.map((chunk, index) => {
                if (index === h2Indexes[0] || index === h2Indexes[1]) {
                    return `<h2 class="title"><span> ${chunk} </span></h2>`
                } else {
                    return `<h3 class="title"><span> ${chunk} </span></h3>`
                }
            })
            */
        },
        notRandomNumberBetween2And3(input) {
            const sum = [...input].reduce(
                (acc, char) => acc + char.charCodeAt(0),
                0
            )
            return Math.floor((sum % input.length) / 2)
        },
        setArticle(topic) {
            this.article = this.articles.find((article) => {
                return article.topic === topic
            })
            console.log('found', this.article.title)
            this.article.title = DOMPurify.sanitize(this.article.title)
            this.article.content = DOMPurify.sanitize(this.article.content)
            this.article = this.addColorObject(this.article)
            this.originalArticle = JSON.parse(JSON.stringify(this.article))
            this.$emit('changeBackground', {
                url: this.article.image.compressed,
                background: this.article.color.background,
                color: this.article.color.color,
            })
            document.title = `${this.article.shortTitle} as a natural dye`

            let metaType = document.querySelector('meta[property="og:type"]')

            if (metaType) {
                metaType.setAttribute('content', 'article')
            } else {
                metaType = document.createElement('meta')
                metaType.property = 'og:type'
                metaType.content = 'article'
                document.getElementsByTagName('head')[0].appendChild(metaType)
            }

            let meta = document.querySelector('meta[name="description"]')

            if (meta) {
                meta.setAttribute('content', this.article.description)
            } else {
                meta = document.createElement('meta')
                meta.name = 'description'
                meta.content = this.article.description
                document.getElementsByTagName('head')[0].appendChild(meta)
            }

            let ogMeta = document.querySelector(
                'meta[property="og:description"]'
            )

            if (ogMeta) {
                ogMeta.setAttribute('content', this.article.description)
            } else {
                ogMeta = document.createElement('meta')
                ogMeta.property = 'og:description'
                ogMeta.content = this.article.description
                document.getElementsByTagName('head')[0].appendChild(meta)
            }

            let ogImage = document.querySelector('meta[property="og:image"]')

            if (ogImage) {
                ogImage.setAttribute('content', this.article.image.compressed)
            } else {
                ogImage = document.createElement('meta')
                ogImage.property = 'og:image'
                ogImage.content = this.article.image.compressed
                ogImage.getElementsByTagName('head')[0].appendChild(meta)
            }
        },
        addColorObject(article) {
            return {
                ...article,
                color: {
                    background: article.color,
                    color: contrastingColor(article.color),
                },
            }
        },
        async saveArticle(article) {
            await axios.post('/functions/firestore', {
                title: DOMPurify.sanitize(article.title),
                shortTitle: DOMPurify.sanitize(article.shortTitle),
                description: DOMPurify.sanitize(article.description),
                content: DOMPurify.sanitize(article.content),
                docId: article.docId,
            })
        },

        async submitForm() {
            try {
                await this.saveArticle()
                this.setArticle(this.article.topic)
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>
