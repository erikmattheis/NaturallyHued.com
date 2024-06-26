<template>
    <div class="drawer-container">
        <ul class="drawerZ">
            <li class="white-link">
                <router-link to="/" class="link right" @click="linkClicked"
                    >Home
                    <div class="black box"></div>
                </router-link>
            </li>
            <li class="white-link">
                <router-link to="/about" class="link right" @click="linkClicked"
                    >About
                    <div class="black box"></div>
                </router-link>
            </li>
            <li
                v-for="article in topics"
                :key="article.shortTitle"
                :style="{
                    'background-color': `${article.color}`,
                }"
            >
                <router-link
                    class="link"
                    :to="`/dyes/${article.shortTitle}`"
                    @click="linkClicked"
                    :style="{
                        color: getContrastColor(article.color),
                    }"
                >
                    {{ article.shortTitle }}
                    <div
                        class="box"
                        :style="{
                            'background-color': article.color,
                        }"
                    ></div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import dyes from '../data/dyes.json'

export default {
    data() {
        return {
            isOpen: false,
            topics: dyes,
        }
    },
    props: {
        color: Object,
    },
    methods: {
        linkClicked() {
            this.$emit('linkClicked')
        },
        toggleDrawer() {
            this.isOpen = !this.isOpen
        },

        closeDrawerTouch() {
            this.isOpen = false
        },
        getContrastColor(bgColor) {
            if (!bgColor) return '#000000' // Default to black if no color provided

            // Convert hex color to RGB
            let color =
                bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
            let r = parseInt(color.substring(0, 2), 16) // Red
            let g = parseInt(color.substring(2, 4), 16) // Green
            let b = parseInt(color.substring(4, 6), 16) // Blue

            // Calculate the brightness of the color
            let brightness = (r * 299 + g * 587 + b * 114) / 1000

            // Return white for dark colors, black for light colors
            return brightness > 155 ? '#000000' : '#FFFFFF'
        },
    },
}
</script>

<style scoped>
.drawerZ {
    width: 100%;
    height: 100%;
    background: #333;
    color: white;
    padding: 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
}

.drawerZ ul {
    list-style: none;
    padding: 0;
    width: 250px;
}

.drawerZ li {
    margin: 0.2em 0;
}

.drawer-container {
    max-height: 100vh;
    width: min-content;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    -ms-overflow-style: auto;
}

.drawer-container::-webkit-scrollbar {
    display: initial;
}

.drawer.expanded {
    position: fixed;
    top: 0;
    left: 0;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.link {
    position: relative;
    display: block;
    width: calc(100% - 1rem);
    text-decoration: none;
    padding: 0 0.5rem;
    background-color: #ffffff44;
    color: #000;
    transition: all 0.3s ease;
}

.link.right {
    text-align: right;
    width: calc(var(--nav-width) - 2.5rem);
    padding-right: 2rem;
}

.link:hover {
    background-color: #ffffff99;
    color: #ddd;
}

.white-link {
    background-color: var(--text-background-color);
    color: #000000;
    text-align: right;
}

.special-link {
    text-align: right;
}

.special-link a,
.special-link a:link {
    background-color: var(--text-background-color);
    color: var(--text-color);
}

.special-link a:hover {
    background-color: var(--text-color);
    color: var(--text-background-color);
}

.box {
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 100%;
}

.box.black {
    background-color: #000;
}
</style>
