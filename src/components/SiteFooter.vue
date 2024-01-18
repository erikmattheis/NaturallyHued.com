<template>
    <footer
        :style="{ 'background-color': color.background, color: color.color }"
    >
        <p>
            <em
                >This site demonstrates human-enhanced machine creativity and
                contains generated content.</em
            >
        </p>

        <p>
            <a class="special-link" href="mailto:erik@mattheis.org?subject=OMG!"
                >erik@mattheis.org</a
            ><br />
            <a class="special-link" href="https://mattheis.org">mattheis.org</a>
        </p>
    </footer>
</template>

<script>
export default {
    name: 'SiteFooter',
    props: {
        color: {
            type: Object,
            required: true,
            default: () => ({
                color: '#FFFFFF',
                background: '#000000',
            }),
        },
    },
}
</script>
