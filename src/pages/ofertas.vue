<template>
  <q-page class="bg-fondo">
    <div>
      <div class="row gutter-xl">
        <div class="col-12">
          <h2 class="text-primary text-center font-family-secondary q-mb-sm q-mx-lg">
            Tiendas en Ofertas
          </h2>
          <p class="text-center text-h6 q-mx-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta sequi suscipit</p>
        </div>
      </div>
      <div class="row q-pa-lg">
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="store in stores">
          <store :store="store"></store>
        </div>
      </div>
    </div>

    <div class="q-container banner q-py-xl text-center">
      <img class="full-width" src="/statics/img/publicidad2-100.jpg" alt="banner">
    </div>

  </q-page>
</template>
<script>
import store from 'src/components/themes/store'
export default {
  name: 'PageCategoria',
  components: {
    store
  },
  data() {
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
            pts: 1
        },
        {
            name: 'BELLE TIENDA 6',
            avatar: 'https://cdn.quasar.dev/img/avatar.png',
            image: '/statics/img/banner.png',
            summary: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
            pts: 1
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
