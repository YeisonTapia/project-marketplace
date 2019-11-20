<template>
  <div style="width: 100%;">
    <q-carousel
            arrows
            animated
            v-model="slide"
            infinite
            autoplay
            height="600px"
    >
      <q-carousel-slide v-for="slide in position.slides"  v-bind:key="slide.id" :name="slide.id"  :img-src="slide.imageUrl">
        <div v-if="slide.title || slide.caption" class="absolute-bottom custom-caption">
          <div v-if="slide.title" class="text-h2">{{slide.title}}</div>
          <div v-if="slide.caption" class="text-subtitle1">{{slide.caption}}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
    export default {
        props:{
            systemName:{
                type: String,
                default: null
            },
        },
        data() {
            return {
                loading: false,
                position: {},
                slide: 0
            }
        },
        created() {
            this.getBanner()
        },
        methods:{
            getBanner(){
                let params = {
                    params: {
                        filter:{
                            field: 'system_name'
                        }
                    }
                }
                this.loading = true
                this.$crud.show('apiRoutes.qslider.sliders', this.systemName, params).then( response => {
                    this.position = response.data
                    console.log( this.position)

                    this.loading = false
                }).catch( error => {
                    this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
                    this.loading = false
                })
            },
        }
    }
</script>
<style lang="stylus">
</style>

