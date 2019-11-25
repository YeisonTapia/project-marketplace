<template>
  <div class="interest-stores q-my-lg full-width">
    <div class="bg-fondo text-center ">
      <h3 class="title-label-tertiary text-center">
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
    import store from 'src/components/themes/store'
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
                  logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                  mainImage: { path: '/statics/img/banner.png' },  
                  slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
              {
                  name: 'BELLE TIENDA 2',
                  logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                  mainImage: { path: '/statics/img/banner.png' },  
                  slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
                              {
                  name: 'BELLE TIENDA 3',
                  logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                  mainImage: { path: '/statics/img/banner.png' },  
                  slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
              {
                  name: 'BELLE TIENDA 4',
                  logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                  mainImage: { path: '/statics/img/banner.png' },  
                  slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 9
              },
                              {
                  name: 'BELLE TIENDA 5',
                  logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                  mainImage: { path: '/statics/img/banner.png' },  
                  slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 1
              },
              {
                  name: 'BELLE TIENDA 6',
                  logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
                  mainImage: { path: '/statics/img/banner.png' },  
                  slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
                  pts: 1
              }
              ]
          }
      }
    }
</script>
<style lang="stylus">
</style>
