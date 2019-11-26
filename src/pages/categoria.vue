<template>
  <q-page class="bg-fondo">
    <q-card class="shadow-no banner-category">
        <q-img
          src="/statics/img/comida.jpg"
          :ratio="21/9"
        />
        <div class="absolute-center q-mt-xl">
          <h1 class="title-label q-my-none bg-secondary text-white text-center text-uppercase">
            <div>{{category.name}}</div>
          </h1>
        </div>
    </q-card>

    <div>
      <div class="row gutter-xl">
        <div class="col-12">
          <h2 class="text-primary text-center font-family-secondary q-mb-sm q-mx-lg">
            {{category.subcategory}}
          </h2>
          <p class="text-center text-h6 q-mx-lg">{{category.description_subcategory}}</p>
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
      category: {
        name: 'Comida',
        subcategory: 'Restaurantes',
        description_subcategory: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta sequi suscipit.'
      },
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
            pts: 3
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
        },
        {
            name: 'BELLE TIENDA 7',
            logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
            mainImage: { path: '/statics/img/banner.png' },
            slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
            pts: 9
        },
        {
            name: 'BELLE TIENDA 8',
            logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
            mainImage: { path: '/statics/img/banner.png' },
            slogan: 'Belle Tienda tiene para todos ustedes Venta de productos de belleza como: Tratamientos...',
            pts: 9
        }
      ]
    }
  }
}
</script>
