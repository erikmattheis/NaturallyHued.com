<!-- src/views/HomePage.vue -->
<template>
    <div>
        <button @click="createInitialData()">Create Initial Data</button>
        <button @click="saveContent()">Save Content</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'GenerateContent',
    data() {
        return {
            topic: '',
            grade: 8,
            len: 0,
            title: '',
            description: '',
            content: '',
        }
    },
    created() {
        this.newParams()
    },
    methods: {
        async createInitialData() {
            await axios.post(
                '/.netlify/functions/generate-content-background',
                {}
            )
        },

        async saveContent() {
            await axios.post('/functions/generate-json', {
                topic: this.topic,
                grade: this.grade,
                len: this.len,
            })
        },

        getAGrade() {
            const grades = [7, 8, 9, 10, 11, 12, 'college']
            return grades[Math.floor(Math.random() * grades.length)]
        },
        normalRandom(mean, stdDev) {
            let u = 0
            let v = 0
            while (u === 0) u = Math.random()
            while (v === 0) v = Math.random()
            let num =
                Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
            num = num * stdDev + mean // Translate to desired mean and standard deviation

            num = Math.max(num, 0) // In case of negative values
            return num
        },
        getALength(assignedWords) {
            let finalWordCount
            do {
                const revisionFactor = this.normalRandom(1.1, 0.07)
                finalWordCount = assignedWords * revisionFactor

                finalWordCount = Math.round(finalWordCount)
            } while (
                finalWordCount < assignedWords * 0.7 ||
                finalWordCount > assignedWords * 1.5
            )
            return finalWordCount
        },
        newParams() {
            this.grade = this.getAGrade()
            this.len = this.getALength(100)
        },
    },
}
</script>
