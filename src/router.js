import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import AboutErik from './components/AboutErik.vue'
import GenerateContent from './components/GenerateContent.vue'
import DynamicContent from './components/DynamicContent.vue'

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
            meta: { saveScrollPosition: false },
        },
        {
            path: '/about',
            name: 'AboutErik',
            component: AboutErik,
            meta: { saveScrollPosition: false },
        },

        {
            path: '/generate',
            name: 'GenerateContent',
            component: GenerateContent,
            meta: { saveScrollPosition: false },
        },

        {
            path: '/dyes/:topic',
            name: 'DynamicContent',
            component: DynamicContent,
            props: true,
            meta: { saveScrollPosition: false },
        },
    ],

    scrollBehavior(to, from, savedPosition) {
        if (to.meta.saveScrollPosition) {
            return savedPosition
        }
        return { top: 0 }
    },
})

export default router
