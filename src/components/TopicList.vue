<template>
    <div>
        <transition name="drawer">
            <div class="drawer-container" v-if="isOpen">
                <div class="drawer">
                    <button @click="close">Close</button>
                    <ul>
                        <li class="white-link">
                            <router-link
                                to="/"
                                class="link right"
                                @touchend="closeDrawerTouch"
                                >Home
                                <div class="black box"></div>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/about"
                                class="link right"
                                @touchend="closeDrawerTouch"
                                >About
                                <div class="black box"></div>
                            </router-link>
                        </li>
                        <li
                            v-for="article in topics"
                            :key="article.shortTitle"
                            :style="{
                                'background-color': `${article.color.background}`,
                            }"
                        >
                            <router-link
                                class="link"
                                :to="`/dyes/${article.shortTitle}`"
                                @touchend="closeDrawerTouch"
                            >
                                {{ article.shortTitle }}
                                <div
                                    class="box"
                                    :style="{
                                        'background-color':
                                            article.color.background,
                                    }"
                                ></div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
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
        toggleDrawer() {
            console.log('toggleDrawer')
            this.isOpen = !this.isOpen
        },
        close() {
            this.isOpen = false
        },
        closeDrawerTouch() {
            this.isOpen = false
        },
    },
}
</script>

<style scoped>
.drawer {
    width: 250px;
    height: 100%;
    background: #333;
    color: white;
    padding: 1em;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
}

.drawer ul {
    list-style: none;
    padding: 0;
}

.drawer li {
    margin: 1em 0;
}

.drawer a {
    color: white;
    text-decoration: none;
}

.drawer a:hover {
    text-decoration: underline;
}

.drawer-enter-active,
.drawer-leave-active {
    transition: transform 0.3s ease;
}

.drawer-enter {
    transform: translateX(-100%);
}

.drawer-leave-to {
    transform: translateX(-100%);
}

a {
    color: inherit;
    text-decoration: none;
}

.drawer-container {
    max-height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: thin;
    -ms-overflow-style: auto;
}

.drawer-container::-webkit-scrollbar {
    display: initial;
}

.floating-button {
    position: fixed;
    top: 0.5rem;
    left: 1rem;
    width: var(--button-width);
    height: var(--button-width);
    padding: 0.31rem;
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
    color: #fff;
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
