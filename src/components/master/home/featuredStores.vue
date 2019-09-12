<template>
    <div class="q-my-lg">
        <div class="feature-stores text-center ">
            <h3 class="title-label-blue text-center">
                <div>Tiendas Destacadas</div>
            </h3>
          <div class="row q-pa-lg">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="store in stores">
              <store :store="store"></store>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    import store from 'src/components/master/home/store'
    export default {
        name: 'FeaturedStoreComponent',
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
                    pts: 3
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
                },
                {
                    name: 'BELLE TIENDA 7',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                {
                    name: 'BELLE TIENDA 8',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                }
                ]
            }
        }
    }
</script>
<style lang="stylus">
@import "~variables"
.feature-stores   
    background-color #F7C837
.title-label-blue
    -webkit-transform skew(10deg)
    transform skew(10deg)
    border-radius 10px
    padding 10px 20px
    display inline-block
    min-width 40%
    margin -58px 0 10px 0
    background-color #282D46
    color #FFFFFF
    font-size 30px
    position relative
    &:before
        content ''
        background-image url('/assets/img/arrow-down.png')
        position absolute
        right 15px
        width 38px
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
