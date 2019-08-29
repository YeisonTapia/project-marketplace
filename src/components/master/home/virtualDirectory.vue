<template>
    <div class="q-my-lg">
        <div class="virtual-directory text-center ">
            <h3 class="title-label-blue-1 text-center text-white">
                <div>Directorio Virtual</div>
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
        name: 'virtualDirectoryComponent',
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
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 2',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                                {
                    name: 'BELLE TIENDA 3',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 4',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                                {
                    name: 'BELLE TIENDA 5',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 6',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 7',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 8',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/assets/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                }
                ]
            }
        }
    }
</script>
<style lang="stylus">
@import "~variables";
.virtual-directory   
    background-color #F96353
.title-label-blue-1
    -webkit-transform skew(10deg)
    transform skew(10deg)
    border-radius 10px
    padding 10px 20px
    display inline-block
    min-width 40%
    margin -58px 0 10px 0
    background-color #282D46
    font-size 30px
    position relative
    @media screen and (max-width: $breakpoint-md)
        min-width 60%   
    & > div
        -webkit-transform  skew(-10deg)
        transform skew(-10deg)
</style>
