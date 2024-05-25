<template>
    <div class="dynamic" :style="{ 'background-image': backgroundImage }">
        <div class="floating-button">
            <button @touchstart.passive="toggleDrawer" class="top-control">
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
                <span class="sr-only">Menu</span>is:{{ isOpen }}
            </button>
        </div>
        <TopicList v-if="isOpen" />
        <div class="headline" v-if="!showHeadline">
            <h1>NATURALLY HUED</h1>
        </div>
        <div class="spa">
            <RouterView @changeBackground="setBg"></RouterView>
            <EndMark :color="color" />
        </div>
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
            isOpen: false,
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
        toggleDrawer() {
            this.isOpen = !this.isOpen
        },
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
