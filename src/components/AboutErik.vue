<template>
    <article class="wrapper">
        <div>
          <header class="headline">            
            <p><h2>About</h2> the Developer</p>
            </header>
            <div class="image-container">
                <img
                    src="https://storage.googleapis.com/nightly-images/assets/Erik.jpg"
                    alt="Erik Mattheis"
                    @loaded="isLoading = false"
                />
            </div>
        </div>
        <div class="content">
            
            <p><h3>Hey there!</h3> I'm Erik Mattheis, a Full Stack Developer based
                in Saint Paul, MN. Here is <a href="https://mattheis.org/">my portfolio</a>. With expertise in Javascript, Vue.js,
                NodeJS, MongoDB, and more, I've collaborated with big names
                like BMW, Coca-Cola, and NASA.</p>
                
            <p>I have Agile experience as a scrum master and developer. Co-led 
              a Meetup for entrepreneurs interested in Lean startup methods that involved role-playing exercises.
              Independent contractor since 2012, crafting solutions for Articl.net, Grocery Shopping
                Network, Authentic A Tees and more.</p>
                
                <p><h3>Let's Talk</h3> I'm open to turning your ideas into digital wonders—especially if it
                involves a vexing puzzle. Reach out at <a href="mailto:erik@mattheis.org">erik@mattheis.org</a> or
                (M) <a href="tel:612-377-2272">612-377-2272</a>. If you're willing to pay for brilliance (and
                maybe a dad joke or two), I'm your developer!</p>


        </div>
    </article>
</template>

<script>
import LoadingMessage from './LoadingMessage.vue'
import { contrastingColor } from '../services/colors.js'

export default {
    name: 'AboutErik',
    components: { LoadingMessage },
    data() {
        return {
            isLoading: false,
            darken: false,
        }
    },
    methods: {
    },
}
</script>