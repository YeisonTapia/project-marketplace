<template>
    <div class="q-my-lg full-width">
        <div class="virtual-directory text-center ">
            <h3 class="title-label-secondary-none text-center text-white">
                <div>Directorio Virtual</div>
            </h3>
          <div class="row q-pa-lg">
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
        name: 'virtualDirectoryComponent',
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
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 2',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                                {
                    name: 'BELLE TIENDA 3',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 4',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                                {
                    name: 'BELLE TIENDA 5',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 6',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 7',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                },
                {
                    name: 'BELLE TIENDA 8',
                    logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                    mainImage: { path: '/statics/img/banner.png' },
                    slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...'
                }
                ]
            }
        }
    }
</script>
<style lang="stylus">
.virtual-directory   
    background-color $tertiary
</style>
