<template>
    <div class="q-my-lg full-width">
        <div class="feature-stores text-center ">
            <h3 class="title-label-secondary text-center">
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
    import store from 'src/components/themes/store'
    export default {
        name: 'FeaturedStoreComponent',
        components: {
            store
        },
        mounted() {
          this.$nextTick(function () {
             this.getStores()
          })
        },
        data () {
            return {
                stores: [],
                storesaa:  [
                {
                    name: 'BELLE TIENDA 1',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                {
                    name: 'BELLE TIENDA 2',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    image: '/statics/img/banner.png',
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                                {
                    name: 'BELLE TIENDA 3',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    image: '/statics/img/banner.png',
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 3
                },
                {
                    name: 'BELLE TIENDA 4',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    image: '/statics/img/banner.png',
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                                {
                    name: 'BELLE TIENDA 5',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    image: '/statics/img/banner.png',
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 1
                },
                {
                    name: 'BELLE TIENDA 6',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    image: '/statics/img/banner.png',
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 1
                },
                {
                    name: 'BELLE TIENDA 7',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    image: '/statics/img/banner.png',
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                },
                {
                    name: 'BELLE TIENDA 8',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    image: '/statics/img/banner.png',
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    pts: 9
                }
                ]
            }
        },
        methods: {
            getStores() {
                this.$crud.index("apiRoutes.qmarketplace.store", {
                    params:{
                        filter:{
                            categories:[3]
                        }
                    }
                }).then(response => {
                    this.stores=response.data;
                });
            }
        }
    }
</script>
<style lang="stylus">
.feature-stores   
    background-color $warning
</style>
