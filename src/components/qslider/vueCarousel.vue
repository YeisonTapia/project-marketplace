<template>
   <div style="width: 100%; margin-bottom: -25px;">
      <carousel autoplay
                :autoplayTimeout="4000"
                :loop="true"
                :centerMode="true"
                :perPageCustom="[[480, 1], [768, 3]]"
                navigationNextLabel="<i class='fas fa-angle-right'></i>"
                navigationPrevLabel="<i class='fas fa-angle-left'></i>">
         <!--POSTS-->
         <slide v-for="(slide, index) in position.slides" :key="index">
            <img :src="slide.imageUrl" alt="" width="100%">
         </slide>
      </carousel>
   </div>
</template>

<script>


   export default {
      components: {},
      props: {
         systemName: {
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
      methods: {
         getBanner() {
            let params = {
               params: {
                  filter: {
                     field: 'system_name'
                  }
               }
            }
            this.loading = true
            this.$crud.show('apiRoutes.qslider.sliders', this.systemName, params).then(response => {
               this.position = response.data
               this.loading = false
            }).catch(error => {
               console.error('[GET SLIDER] ', error);
               //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         },
      }
   }
</script>
<style lang="stylus">

   .custom-caption
      text-align: center
      padding: 12px
      color: white
      background-color: rgba(0, 0, 0, .3)

   .VueCarousel
      margin-bottom 17px

      .VueCarousel-slide
         padding 0 15px

         a
            text-decoration none

         .title
            position relative
            padding-top 10px
            text-align left

            .q-icon
               position absolute
               left 10px
               top 20px

            .q-btn
               text-align left
               padding-left 40px

               .q-focus-helper
                  display none
         @media screen and (max-width: $breakpoint-md)
            padding 0 60px !important

      .VueCarousel-navigation
         padding 20px auto

         .VueCarousel-navigation-button
            font-size 31px
            color $secondary
</style>

