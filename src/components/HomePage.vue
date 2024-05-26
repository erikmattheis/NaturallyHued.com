<template>
    <article class="wrapper">
        <div>
            <header
                style="
                    background-color: rgb(227, 0, 34);
                    color: rgb(255, 255, 255);
                "
            >
                <div
                    class="title-background"
                    style="
                        background-image: url('https://storage.googleapis.com/nightly-images/article-images/23.12.26-madder-2023-11-2-5-23-29-q80.jpg');
                    "
                >
                    <h2><span>Naturally Hued</span></h2>
                    <p><span>Journey into Tradition</span></p>
                </div>
            </header>
        </div>

        <section class="content">
            <div class="wrapper">
                <div class="text">
                    <blockquote class="muted-announcement">
                        <em
                            >As part of a self-directed initiative, I've
                            developed this project to learn the capabilities of
                            OpenAI's GPT-3.5 and DALL-E 2 while exploring the
                            world of natural dyes.<br /><br />
                            - Erik Mattheis (<a href="mailto:erik@mattheis.org"
                                >erik@mattheis.org)</a
                            ><br />
                            <img
                                style="
                                    width: 0.8rem;
                                    height: 0.8rem;
                                    vertical-align: middle;
                                    margin-right: 0.3rem;
                                "
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEX////4+Pi3ubtvcnZNUVU+Q0cpLjLr6+x3en0sMTYkKS59gIORk5aUl5n8/Pzw8PFTV1tbX2Pc3d5DSEzn5+g3PECLjpFKTlKFh4qxs7XCxMUwNTq/wcLh4uPV1tZzd3o/Q0jOz9CmqKpjZ2qfoaSrd37mAAABPUlEQVR4AW3TBZKEMBAF0B8GCHzcnbW5/xm30qEyknklcU/DgQpuYRTHUXgLFHw6SemkmcYrlcd8kRYlnlQ1PU0Fp434Qde75Qd+1FUQKiRZjyGfTGNjKhWMmSQXYO3Ibao3MlqBnSRzADhk/ycAdcqclSSHnEUD+KLt8KalMQMqpl3izU5jKxHQGCq8Ud80fq4VfuFZaIyQO4wVPEre5g+RrIAPJrkQSL8OPjv3htQmH8guU5uwgseeP7ITMYBnpdFgvlJPcx0zoLjjzS/FDrVRvH6xsqDYlLx29huRUaFx6YuI1mhKMbddf9trEzca7rmRk/FxpiRXiJO8FDBURyb4yfO7glC8TOpacmAc4ElMEWlc2oGckjwvYVFEB5wjouE6uLBwquypQym/scKrM4njElYaJy182q15aDj/oQMZkS8JH3IAAAAASUVORK5CYII="
                            />
                            <a
                                class="text-link margin-top-1"
                                href="https://github.com/erikmattheis/NaturallyHued.com"
                                >GitHub Repository
                            </a>
                        </em>
                    </blockquote>
                </div>
                <div class="text">
                    <p>
                        Step into the enchanting world of natural dyes, a
                        heritage passed down through generations. From the
                        ancient Indus Valley civilization to the modern-day
                        fashion runways, natural dyes have been a part of our
                        lives for centuries. Imagine Cleopatra herself donning
                        garments dyed with precious colors sourced from plants
                        and minerals! Explore the cultural significance and
                        historical roots of traditional colorants sourced from
                        nature and crafted using time-honored techniques.
                        Uncover the secrets of craftsmanship that have stood the
                        test of time, creating fabrics that resonate with
                        cultural stories and vibrant histories.
                    </p>
                    <p>
                        <strong>Cultural Diversity in Hues:</strong> Discover
                        the kaleidoscope of colors that different cultures have
                        embraced throughout history. From the rich indigos of
                        Asia to the vibrant cochineals of South America, delve
                        into the unique palettes that reflect the diverse
                        traditions and practices of societies across the globe.
                        Ever wondered how a particular shade of red could tell a
                        story of an entire civilization? Well, prepare to be
                        amazed!
                    </p>
                    <p>
                        <strong
                            >Human Creativity Merged With Artificial
                            Intelligence:</strong
                        >
                        Experience the fusion of human and artificial
                        intelligence as we bring you cutting-edge insights,
                        trends, and narratives in the realm of sustainable
                        fabrics, dyes, and clothing. Our project isn't just
                        about colors and fabrics; it's a testament to the
                        limitless possibilities when creativity collaborates
                        with technology. Picture this: a symphony of tradition
                        and innovation, where age-old dyeing techniques meet the
                        future of fashion, creating a masterpiece that’s both
                        timeless and revolutionary.
                    </p>
                    <p>
                        Join us on this vibrant journey through time, where each
                        hue tells a story, and each fabric piece is a canvas of
                        cultural expression. It’s not just a look back at
                        history; it’s an exciting glimpse into the future of
                        sustainable fashion.
                    </p>

                    <h3>Start Your Exploration</h3>
                    <p>
                        Begin your exploration into the traditions and cultures
                        woven into natural dyes and fabrics. Choose a topic from
                        the drawer on there left to dive into the world of
                        natural hues. Or start with
                        <a href @click.prevent="randomRoute">our suggestion</a>.
                    </p>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import dyes from '../data/dyes.json'
export default {
    name: 'HomePage',
    data() {
        return {
            isLoading: true,
        }
    },
    mounted() {
        this.isLoading = false

        document.title = 'Naturally Hued'

        const siteDescription =
            'Step into the enchanting world of natural dyes, a heritage passed down through generations. Explore the cultural significance and historical roots of traditional colorants sourced from plants, minerals, and time-honored techniques.'

        let meta = document.querySelector('meta[name="description"]')
        meta.setAttribute('content', siteDescription)

        let ogType = document.querySelector('meta[property="og:type"]')

        if (ogType) {
            ogType.setAttribute('content', 'website')
        } else {
            ogType = document.createElement('meta')
            ogType.property = 'og:type'
            ogType.content = 'website'
            document.getElementsByTagName('head')[0].appendChild(ogType)
        }

        let ogDescription = document.querySelector(
            'meta[property="og:description"]'
        )

        if (ogDescription) {
            ogDescription.setAttribute(
                'content',
                siteDescription || 'Naturally Hued'
            )
        } else {
            ogDescription = document.createElement('meta')
            ogDescription.property = 'og:description'
            ogDescription.content =
                'Step into the enchanting world of natural dyes, a heritage passed down through generations. Explore the cultural significance and historical roots of traditional colorants sourced from plants, minerals, and time-honored techniques.'
            document.getElementsByTagName('head')[0].appendChild(meta)
        }

        let ogImage = document.querySelector('meta[property="og:image"]')

        if (ogImage) {
            ogImage.setAttribute(
                'content',
                'https://storage.googleapis.com/nightly-images/article-images/23.12.22-cherries-2023-11-5-3-59-3-q80.jpg'
            )
        } else {
            ogImage = document.createElement('meta')
            ogImage.property = 'og:image'
            ogImage.content =
                'https://storage.googleapis.com/nightly-images/article-images/23.12.22-cherries-2023-11-5-3-59-3-q80.jpg'
            ogImage.getElementsByTagName('head')[0].appendChild(meta)
        }
    },
    methods: {
        randomRoute() {
            // get list of all routes, filter out all that aren't in /dyes/
            const routes = this.$router.options.routes.filter((route) =>
                route.path.includes('/dyes/')
            )
            console.log(routes)
            // get a random dye from the list
            const randomDye = dyes[Math.floor(Math.random() * dyes.length)]

            // find the route that matches the random dye
            const randomRoute = routes.find(
                (route) => route.path === `/dyes/${randomDye.shortTitle}`
            )

            // check if randomRoute is defined before trying to access its path property
            if (randomRoute) {
                console.log(randomRoute.path)

                // navigate to the random route
                this.$router.push(randomRoute.path)
            } else {
                console.log(`No route found for dye: ${randomDye.shortTitle}`)
            }
        },
    },
}
</script>
