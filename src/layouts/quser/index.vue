<template>
  <q-page class="quser-account-index page-user-index">

    <div class="quser-content">

      <div class="q-inline-block q-mb-lg">
        <h4 class="title text-secondary font-family-secondary q-mt-none">
          <div class="line-secondary q-mb-sm"></div>
            Inicio
          <div class="line-secondary q-mt-sm"></div>
        </h4>
      </div>

    
     

      


    </div>  

    <!--Inner loading-->
    <inner-loading :visible="loading"/>
  </q-page>


</template>
<script>

  import http from "axios"
  import { date } from 'quasar'

  export default {
    props: {},
    components: {},
    watch: {},
    validations() {
      return {}
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {

      }
    },
    methods: {
      //init
      async init() {
       

      }
     
    }
  }
</script>
<style lang="stylus">
.page-user-index
  .q-slider
    color $primary
    &__track-container
      height 4px
      background $secondary
    .q-slider__pin-value-marker:before
      content ''
      position absolute
      bottom 30px
      background-image url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26.66 42.66'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:%23fd2d5e;}%3C/style%3E%3C/defs%3E%3Ctitle%3Epuntos%3C/title%3E%3Cg id='Capa_2' data-name='Capa 2'%3E%3Cg id='home'%3E%3Cpath class='cls-1' d='M17.33,8a4,4,0,1,0-4-4A4,4,0,0,0,17.33,8ZM25.2,20.42l-1.94-1L22.45,17a9.08,9.08,0,0,0-8.51-6.33c-3,0-4.66.85-7.78,2.1A8,8,0,0,0,2,16.61l-.56,1.14a2.67,2.67,0,0,0,1.19,3.57,2.63,2.63,0,0,0,3.54-1.19L6.75,19a2.61,2.61,0,0,1,1.37-1.29l2.23-.9L9.09,21.87a5.33,5.33,0,0,0,1.24,4.9l5,5.45a5.42,5.42,0,0,1,1.24,2.31l1.53,6.1a2.66,2.66,0,1,0,5.17-1.29l-1.85-7.41a5.36,5.36,0,0,0-1.24-2.31l-3.79-4.14,1.43-5.73.46,1.38a5.29,5.29,0,0,0,2.64,3.08l1.94,1A2.62,2.62,0,0,0,26.39,24a2.69,2.69,0,0,0-1.19-3.58ZM6.13,32.14A5.17,5.17,0,0,1,5,33.93L.78,38.11a2.67,2.67,0,1,0,3.77,3.77l5-5a5.58,5.58,0,0,0,1.18-1.79l1.12-2.81c-4.6-5-3.22-3.49-4-4.48Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      height 40px
      width 100%
      background-repeat no-repeat
      background-size contain  
      background-position center
  .avatar-main
    img
      border 4px solid $secondary 

  .title-label-puntos
    -webkit-transform skew(10deg)
    transform skew(10deg)
    border-radius 10px
    padding 0px 30px
    display inline-block
    min-width 40%
    margin -58px 0 10px 0
    color #FFFFFF
    font-size 20px
    position relative
    font-family $font-secondary
    &:before
      content ''
      background-image url('/statics/img/arrow-down-blue.png')
      position absolute
      right -25px
      width 100%
      height 50px
      background-repeat no-repeat
      background-size contain
      top 27px
      background-position right
    @media screen and (max-width: $breakpoint-md)
      min-width 60%
      font-size 20px
      padding 0 15px
      &:before
          display none !important   
    @media screen and (max-width: $breakpoint-sm)
      min-width 60%
      font-size 15px
      padding 0 10px         
    & > div
      -webkit-transform  skew(-10deg)
      transform skew(-10deg)      
  .q-mx-puntos   
    padding-left 80px
    padding-right 80px  
    @media screen and (max-width: $breakpoint-md)
      padding-left 30px
      padding-right 30px  
    @media screen and (max-width: $breakpoint-sm)
      padding-left 10px
      padding-right 10px  
  .text-h6 
    line-height 1.5rem
    color $secondary
    @media screen and (max-width: $breakpoint-sm)
      line-height 1rem
      font-sie 1rem
      margin-top 10px
      margin-bottom 20px  
  .my-sticky-header-table
    .q-table__top
    thead tr:first-child th
      background-color var(--q-color-light)

    thead tr th
      position sticky
      z-index 1
    thead tr:first-child th
      top 0
    &.q-table--loading thead tr:last-child th
      top 48px

  @media screen and (max-width: $breakpoint-xs)
    .title
      font-size 20px
    .q-card__section
      padding-top 15px
      .q-avatar
        font-size 60px !important
      #copa
        max-height 60px
    .canjear
      padding-left 30px
      padding-top 0
      .btn
        font-size 15px  !important
</style>
