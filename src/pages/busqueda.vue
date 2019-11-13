<template>
  <q-page class="bg-fondo advanced_search form-general">
    <div class="q-pa-xl bg-white shadow-2">
      <div class="q-container q-pt-xl">
        <div class="row q-col-gutter-lg">
          <div class="col-12">
            <div class="text-h4 text-primary font-family-secondary">Busqueda Avanzada</div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">

            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Categorias</p>
              <q-select dense v-model="advanced_search.category" :options="categoryOptions"/>
            </div>

            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Busca tu producto</p>
              <q-input dense v-model="advanced_search.product" placeholder="Busca tu vaina aquí" />
            </div>

            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Filtro por tipo de empresa</p>
              <q-select dense v-model="advanced_search.company" multiple use-chips :options="companyOptions"/>
            </div>
           
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">

            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Ciudad</p>
              <q-select dense v-model="advanced_search.city" :options="cityOptions"/>
            </div>
            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Barrio</p>
              <q-select dense v-model="advanced_search.neighborhood" :options="neighborhoodOptions"/>
            </div>
            <div class="q-mb-xl">
              <p class="caption q-mb-xs">Filtro por nivel</p>
              <q-select dense v-model="advanced_search.level" :options="levelOptions"/>
            </div>


            <q-toggle dense v-model="advanced_search.offer" color="primary" label="Tienda en Oferta" />

            

          </div>

        </div>
        <div class="col-12 text-right">
            <div class="q-my-lg">
              <q-btn class="bg-primary text-white btn-arrow-send-pink" @click="search">Buscar</q-btn>
            </div>
        </div>


      </div>
    </div>

    <div>
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
  name: 'PageBusqueda',
  components: {
    store
  },
  data() {
    return {
      advanced_search: {
          category: '',
          city: '',
          product: '',
          neighborhood: '',
          company: [],
          level: '',
          offer: false
      },
      categoryOptions: [
        {
          label: 'Comida',
          value: '1'
        },
        {
          label: 'Hotel',
          value: '2'
        }
      ],
      cityOptions: [
        {
          label: 'Ciudad',
          value: '1'
        },
        {
          label: 'Hotel',
          value: '2'
        }
      ],
      neighborhoodOptions: [
        {
          label: 'Barrio',
          value: '1'
        },
        {
          label: 'Hotel',
          value: '2'
        }
      ],
      companyOptions: [
        {
          label: 'Tiendas',
          value: '1'
        },
        {
          label: 'Directorio virtual',
          value: '2'
        },
        {
          label: 'Independiente',
          value: '3'
        }
      ],
      levelOptions: [
        {
          label: 'Tipo profesional 1',
          value: '1'
        },
        {
          label: 'Tipo profesional 2',
          value: '2'
        },
        {
          label: 'Tipo profesional 3',
          value: '3'
        }
      ],
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
  },
  methods: {
    search() {
      console.log(this.advanced_search);
    }
  }
}
</script>
<style lang="stylus">
.form-general
  .q-chip
    background-color $primary
    color #fff
    font-size 18px
    .q-chip__content
      padding 10px 10px
    .q-chip__icon
      color #ffffff!important
      opacity 1
</style>