<template>
  <q-page class="bg-fondo">
    <q-card class="shadow-no banner-category">
      <q-card-media>
        <div class="ratio-21-9">
          <img  src="/assets/img/comida.jpg">
        </div>
        <div class="absolute-center q-mt-xl">
          <h1 class="title-label q-my-none bg-secondary text-white text-center text-uppercase">
            <div>{{category.name}}</div>
          </h1>
        </div>
      </q-card-media>
    </q-card>

    <div>
      <div class="row gutter-xl">
        <div class="col-12">
          <h2 class="text-primary text-center q-mb-sm q-mx-lg">
            {{category.subcategory}}
          </h2>
          <p class="text-center q-headline q-mx-lg">{{category.description_subcategory}}</p>
        </div>
      </div>
      <div class="row q-pa-lg">
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="store in stores">
          <store :store="store"></store>
        </div>
      </div>
    </div>

    <div class="q-container banner q-py-xl text-center">
      <img class="w-100" src="/assets/img/publicidad2-100.jpg" alt="banner">
    </div>

  </q-page>
</template>
<script>
import store from 'src/components/master/home/store'
export default {
  name: 'PageCategoria',
  components: {
    store
  },
  data() {
    return {
      lang: this.$q.i18n.lang,
      category: {
        name: 'Comida',
        subcategory: 'Restaurantes',
        description_subcategory: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta sequi suscipit.'
      },
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
