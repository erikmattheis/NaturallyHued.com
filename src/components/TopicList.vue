<template>
    <div class="drawer-container" @touchmove.prevent>
        <ul class="drawer" :class="{ expanded: expanded }">
            <li>
                <router-link to="/" class="link">Home</router-link>
                <div
                    class="box"
                    :style="{
                        'background-color': '#ffffff',
                    }"
                ></div>
            </li>
            <li class="link special-link">
                <router-link to="/about" class="link"> About </router-link>
            </li>
            <li
                v-for="article in topics"
                :key="article.shortTitle"
                :style="{
                    'background-color': `${article.color.background}`,
                }"
            >
                <router-link
                    @touchend="closeDrawerTouch()"
                    class="link"
                    :to="`/dyes/${article.shortTitle}`"
                >
                    {{ article.shortTitle }}
                    <div
                        class="box"
                        :style="{
                            'background-color': article.color.background,
                        }"
                    ></div>
                </router-link>
            </li>
        </ul>
        <div class="floating-button">
            <button @touchstart.passive="toggleDrawer()" class="top-control">
                <svg
                    aria-hidden="true"
                    viewBox="165.943 60.0498 135.385 125.1675"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M 200.565 85.991 C 199.365 84.736 197.361 84.736 196.161 85.991 C 194.942 87.367 165.943 119.906 165.943 137.109 C 167.712 180.107 229.015 180.107 230.823 137.109 C 230.784 119.906 201.784 87.367 200.565 85.991 Z"
                        style="fill: rgb(255, 111, 8)"
                    />
                    <path
                        d="M 249.207 137.968 C 249.207 136.915 249.769 135.941 250.681 135.414 C 252.647 134.279 255.105 135.698 255.105 137.968 C 255.105 144.026 259.019 149.169 264.456 151.008 C 266.1 147.16 267.122 142.726 267.333 137.706 C 267.293 120.502 238.294 87.964 237.075 86.587 C 235.875 85.333 233.871 85.333 232.671 86.587 C 231.452 87.964 202.452 120.502 202.452 137.706 C 203.913 173.222 245.992 179.402 261.611 156.247 C 254.344 153.359 249.207 146.264 249.207 137.968 Z"
                        style="fill: rgb(89, 33, 33)"
                    />
                    <path
                        d="M 301.328 137.968 C 299.519 180.967 238.216 180.967 236.447 137.968 C 236.447 120.765 265.447 88.226 266.666 86.85 C 267.866 85.596 269.87 85.596 271.07 86.85 C 272.289 88.226 301.288 120.765 301.328 137.968 Z M 268.868 151.731 C 261.267 151.731 255.105 145.569 255.105 137.968 C 255.105 135.698 252.647 134.279 250.681 135.414 C 249.769 135.941 249.207 136.915 249.207 137.968 C 249.207 148.827 258.009 157.629 268.868 157.629 C 271.138 157.629 272.557 155.172 271.422 153.206 C 270.895 152.293 269.921 151.731 268.868 151.731 Z"
                        style="fill: rgb(0, 121, 191)"
                    />
                </svg>
                <span class="sr-only">Menu</span>
            </button>
        </div>
    </div>
</template>

<script>
/*      @touchend.passive="closeDrawerTouch()"
                    @touchend.passive="closeAndNavigate(article.shortTitle)"
                    @touchend.passive="closeDrawerTouch()" */
import dyes from '../data/dyes.json'
import { contrastingColor } from '../services/colors.js'

export default {
    name: 'TopicList',
    data() {
        return {
            topics: dyes,
            expanded: false,
        }
    },
    mounted() {
        this.topics = this.topics.map((topic) => ({
            ...topic,
            color: {
                background: topic.color,
                color: contrastingColor(topic.color),
            },
        }))

        window.addEventListener('mousemove', this.handleMouseMove, {
            passive: true,
        })
    },
    beforeUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove)
    },
    methods: {
        closeAndNavigate(shortTitle) {
            this.expanded = true
            this.$router.push({
                name: 'DynamicContent',
                params: { topic: shortTitle },
            })
            closeDrawerTouch()
        },
        mouseOver(event) {
            event.target.style.color = event.target.style.backgroundColor
            this.isHovered = true
        },
        handleMouseMove(event) {
            if (event.clientX < 100 && !this.expanded) {
                this.expanded = true
            } else if (event.clientX > 240 && this.expanded) {
                this.expanded = false
            }
        },
        toggleDrawer() {
            this.expanded = !this.expanded
        },
        closeDrawerTouch() {
            console.log('closeDrawerTouch', this.expanded)
            this.expanded = false
        },
    },
}
</script>

<style scoped>
a {
    color: inherit;
    text-decoration: none;
}
.drawer-container {
    ::-webkit-scrollbar {
        display: none;
    }

    scrollbar-width: none;

    -ms-overflow-style: none;
    border: 1px solid red !important;
}

.floating-button {
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: var(--button-width);
    height: ar(--button-width);
    border-radius: 100rem;
    background-color: var(--text-background-color);
    color: var(--text-color);
}

button {
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
}
.drawer {
    position: fixed;
    top: 0;
    left: var(--negative-total-width);
    transition: all 0.3s ease;
    height: 100%;
    overflow: scroll-y;
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
    width: calc(var(--nav-width) - 1rem);
    line-height: 1.5;
    transition: all 0.3s ease;
    text-decoration: none;
    padding: 0 0.5rem;
    background-color: '#ffffff44' !important;
}

.link:hover {
    background-color: #ffffff99;
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
    color: var(--text-background-color);
    background-color: var(--text-color);
}
.box {
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 100%;
}
</style>
