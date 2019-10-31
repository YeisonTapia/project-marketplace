<template>
    <div class="q-my-lg">
        <div class="bg-white text-center ">
            <h3 class="title-label-pink text-center">
                <div>Independientes Destacados</div>
            </h3>
            <div class="line-pink"></div>
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
        name: 'IndependentsStoresComponent',
        components: {
            store
        },
        data () {
            return {
                stores:  [
                {
                    name: 'BELLE TIENDA 1',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                {
                    name: 'BELLE TIENDA 2',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                                {
                    name: 'BELLE TIENDA 3',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 3
                },
                {
                    name: 'BELLE TIENDA 4',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                                {
                    name: 'BELLE TIENDA 5',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 0
                },
                {
                    name: 'BELLE TIENDA 6',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 0
                },
                {
                    name: 'BELLE TIENDA 7',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
                    summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                {
                    name: 'BELLE TIENDA 8',
                    avatar: 'https://cdn.quasar.dev/img/avatar.png',
                    image: '/statics/img/banner.png',
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
.line-pink
  width 100%
  height 4px
  top 27px
  background-color $primary
  margin-top -45px
  margin-bottom 45px
</style>
