<template>
  <div>
    <carousel
      :per-page="1"
      :navigationEnabled="true"
      :paginationEnabled="false">
      <slide>
        <a :href="slide.url" :target="slide.target">
          <iframe
            v-if="~slide.imageUrl.indexOf('youtube.com')"
            width="100%"
            :height="height"
            :src="slide.imageUrl"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
          <video
            width="100%"
            :height="height"
            v-else-if="~slide.imageUrl.indexOf('.mp4')"
            class='img-responsive center-block'
            loop
            controls='false'>
            <source :src="slide.imageUrl" type='video/mp4'>
            asd
          </video>
          <q-img
            :src="slide.imageUrl"
            v-else :style="`height: ${height}px`" >
          </q-img>
        </a>
      </slide>
    </carousel>
  </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  
  export default {
    components:{
      Carousel,
      Slide,
    },
    props:{
      slide: {default:()=>{return {}}},
      height:{
        type: String,
        default: '500'
      }
    },
    data() {
      return {
        banner:this.slide
      }
    },
  }
</script>
