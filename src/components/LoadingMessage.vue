<template>
    <ContentLoader
        viewBox="0 0 175 100"
        :speed="1"
        :animate="true"
        :secondaryColor="secondaryColor"
        :primaryColor="primaryColor"
        v-if="isLoading"
    >
        <rect x="0" y="0" width="175" height="6" />
        <rect x="0" y="10" width="175" height="6" />
        <rect x="0" y="20" width="175" height="6" />
        <rect x="0" y="30" width="175" height="6" />
        <rect x="0" y="40" width="175" height="6" />
        <rect x="0" y="50" width="175" height="6" />
        <rect x="0" y="60" width="175" height="6" />
        <rect x="0" y="70" width="175" height="6" />
    </ContentLoader>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
    name: 'LoadingMessage',
    components: { ContentLoader },

    props: {
        isLoading: {
            type: Boolean,
            default: true,
        },
        primaryColor: {
            type: String,
            default: '#ddebeb88',
        },
        secondaryColor: {
            type: String,
            default: '#dddddd',
        },
    },
}
</script>
