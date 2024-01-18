<!-- src/App.vue -->
<template>
    <div class="dynamic" :style="{ 'background-image': backgroundImage }">
        <div class="headline" v-if="!showHeadline">
            <h1>NATURALLY HUED</h1>
        </div>
        <div class="spa">
            <RouterView @changeBackground="setBg"></RouterView>
            <EndMark :color="color" />
        </div>
        <TopicList class="nav" />
        <SiteFooter :color="color" />
    </div>
</template>

<script>
import TopicList from './components/TopicList.vue'
import EndMark from './components/EndMark.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
    name: 'App',
    components: { TopicList, EndMark, SiteFooter },
    data() {
        return {
            isLoading: true,
            color: {
                color: '#FFFFFF',
                background: '#000000',
            },
            showHeadline: false,
            transparentGif:
                'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            backgroundImage: this.transparentGif,
        }
    },
    created() {
        this.showHeadline = this.$route.name !== 'HomePage'
    },
    mounted() {
        this.isLoading = false
    },
    methods: {
        setBg(obj) {
            this.setWrapperBackgroundImage(obj.url)
            this.setFooterBackgroundColor(obj)
        },
        setWrapperBackgroundImage(url) {
            if (url) {
                this.backgroundImage = `url(${url})`
            } else {
                this.backgroundImage = this.transparentGif
            }
        },
        setFooterBackgroundColor(color) {
            this.color = color
        },
    },
}
</script>
