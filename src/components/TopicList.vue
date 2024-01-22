<template>
    <div class="drawer-container">
        <ul
            class="drawer"
            :class="{ expanded: expanded }"
            style="max-height: 100vh; overflow: scroll"
        >
            <li class="special-link">
                <router-link
                    @touchend.passive="closeDrawerTouch()"
                    to="/"
                    class="link"
                    >Home</router-link
                >
            </li>
            <li class="special-link">
                <router-link
                    @touchend.passive="closeDrawerTouch()"
                    to="/about"
                    class="link"
                >
                    About
                </router-link>
            </li>
            <li
                v-for="article in topics"
                :key="article.shortTitle"
                :style="{
                    'background-color': `${article.color.background}`,
                }"
            >
                <a
                    class="link"
                    :style="{
                        cursor: article.isHovered ? 'pointer' : 'default',
                        'background-color': article.isHovered
                            ? '#ffffff66'
                            : '#ffffffdd',
                    }"
                    @touchend.passive="closeAndNavigate(article.topic)"
                    @mouseover="article.isHovered = true"
                    @mouseout="article.isHovered = false"
                >
                    {{ article.shortTitle }}
                    <div
                        class="box"
                        :style="{
                            'background-color': article.color.background,
                        }"
                    ></div>
                </a>
            </li>
        </ul>
        <div class="floating-button">
            <button
                @touchstart.passive="toggleDrawer()"
                class="top-control"
                style="padding: 0.4rem"
            >
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
        closeAndNavigate(topic) {
            this.$router.push({
                name: 'DynamicContent',
                params: { topic: topic },
            })
            this.closeDrawerTouch()
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
}

.floating-button {
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: var(--button-width);
    height: var(--button-width);
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
    width: calc(var(--nav-width) - 2rem);
    line-height: 1.5;
    transition: all 0.3s ease;
    text-decoration: none;
    padding: 0.5rem 0.5rem;
}

.link .text-content {
    flex-grow: 1 1 auto;
    width: calc(var(--nav-width)-var(--button-width));
    height: var(--button-width);
}
.box {
    position: absolute;
    width: 1rem;
    height: var(--button-width);
    right: 0;
    top: 0;
    z-index: 100000;
}

.link:hover {
    cursor: pointer;
}

.special-link,
.special-link a,
.special-link a:link {
    text-align: right;
    margin-right: -1.5rem;
    padding-right: 1.5rem;
    background-color: var(--text-background-color);
    color: var(--text-color);
}

.special-link:hover {
    color: var(--text-background-color);
    background-color: var(--text-color);
}

.special-link a:hover {
    color: var(--text-background-color);
    background-color: var(--text-color);
}
</style>
