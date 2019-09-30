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
    background-color $warning
</style>
