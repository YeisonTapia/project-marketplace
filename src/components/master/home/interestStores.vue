<template>
  <div class="q-my-lg w-100">
    <div class="bg-fondo text-center ">
      <h3 class="title-label-orange text-center">
        <div>Tiendas de tu interes</div>
      </h3>
      <div class="q-container">
        <div class="row q-pa-lg">
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4" v-for="store in stores">
            <store :store="store"></store>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import store from 'src/components/master/home/store'
    export default {
      name: 'InterestStoresComponent',
      components: {
          store
      },
      data () {
          return {
              stores:  [
              {
                  name: 'BELLE TIENDA 1',
                  avatar: 'https://cdn.quasar.dev/img/avatar.png',
                  image: '/assets/img/banner.png',
                  summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
              {
                  name: 'BELLE TIENDA 2',
                  avatar: 'https://cdn.quasar.dev/img/avatar.png',
                  image: '/assets/img/banner.png',
                  summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
                              {
                  name: 'BELLE TIENDA 3',
                  avatar: 'https://cdn.quasar.dev/img/avatar.png',
                  image: '/assets/img/banner.png',
                  summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
              {
                  name: 'BELLE TIENDA 4',
                  avatar: 'https://cdn.quasar.dev/img/avatar.png',
                  image: '/assets/img/banner.png',
                  summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
                              {
                  name: 'BELLE TIENDA 5',
                  avatar: 'https://cdn.quasar.dev/img/avatar.png',
                  image: '/assets/img/banner.png',
                  summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 1
              },
              {
                  name: 'BELLE TIENDA 6',
                  avatar: 'https://cdn.quasar.dev/img/avatar.png',
                  image: '/assets/img/banner.png',
                  summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 1
              }
              ]
          }
      }
    }
</script>
<style lang="stylus">
@import "~variables"
.title-label-orange
  -webkit-transform skew(10deg)
  transform skew(10deg)
  border-radius 10px
  padding 10px 20px
  display inline-block
  min-width 40%
  margin -58px 0 10px 0
  background-color #F96353
  color #FFFFFF
  font-size 30px
  position relative
  &:before
    content ''
    background-image url('/assets/img/arrow-down-blue.png')
    position absolute
    right -5px
    width 55px
    height 70px
    background-repeat no-repeat
    top 27px
  @media screen and (max-width: $breakpoint-md)
    min-width 60%
    font-size 20px
    padding 0 15px
    &:before
        display none !important      
  & > div
    -webkit-transform  skew(-10deg)
    transform skew(-10deg)


</style>
