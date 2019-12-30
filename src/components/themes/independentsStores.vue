<template>
    <div class="independents-stores full-width q-my-lg">
        <div class="bg-white text-center q-pb-xl">
            <h3 class="title-label-primary text-center">
                <div>Independientes Destacados</div>
            </h3>
            <div class="line-primary"></div>
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="store in stores">
                    <store :store="store"></store>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from 'src/components/themes/store'
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
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 9
                },
                {
                    name: 'BELLE TIENDA 2',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 9
                },
                                {
                    name: 'BELLE TIENDA 3',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 3
                },
                {
                    name: 'BELLE TIENDA 4',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 9
                },
                                {
                    name: 'BELLE TIENDA 5',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 0
                },
                {
                    name: 'BELLE TIENDA 6',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 0
                },
                {
                    name: 'BELLE TIENDA 7',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 9
                },
                {
                    name: 'BELLE TIENDA 8',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                    averageRating: 9
                }
                ]
            }
        }
    }
</script>
<style lang="stylus">
.independents-stores
    .line-primary
        width 100%
        height 4px
        top 27px
        background-color $primary
        margin-top -45px
        margin-bottom 45px
</style>
