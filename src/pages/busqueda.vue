<template>
  <q-page class="bg-fondo advanced_search form-general" v-if="success">

    <!-- Busqueda Avanzada -->
    <div class="q-pa-xl bg-white shadow-2">
      <div class="q-container q-pt-xl">
        <div class="row q-col-gutter-lg">
          <div class="col-12">
            <div class="text-h4 text-primary font-family-secondary cursor-pointer"  @click="drawerPoint = !drawerPoint">Busqueda Avanzada</div>
          </div>

          <div v-if="drawerPoint" class="col-xs-12 col-sm-12 col-md-12 col-lg-6">

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
          <div v-if="drawerPoint" class="col-xs-12 col-sm-12 col-md-12 col-lg-6">

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
        <div v-if="drawerPoint" class="col-12 text-right">
            <div class="q-my-lg">
              <q-btn class="bg-primary text-white btn-arrow-send-pink">Buscar</q-btn>
            </div>
        </div>


      </div>
    </div>
    

    <div>
      <div v-if="stores.length>0" class="row q-pa-lg">
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="store in stores">
          <store :store="store"></store>
        </div>
      </div>
      <div v-else>

          <div class="row q-pa-lg">
            <div class="col-12">

             <q-banner inline-actions class="q-mt-xl text-white bg-red">
                <template v-slot:avatar>
                  <q-icon name="warning" color="white" />
                </template>
                No existen resultados disponibles
              </q-banner>

            </div>
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
      categoryOptions: [],
      cityOptions: [],
      neighborhoodOptions: [],
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
      stores: [],
      loading: false,
      success: false,
      typeSearch: 1, // 1 = Front Header, 2 = Advance Search
      paramsF:{
        cityId : parseInt(this.$route.params.cityId),
        neighborhoodId : parseInt(this.$route.params.neighborhoodId),
        text: this.$route.params.text
      },
      drawerPoint: false,

    }
  },
  mounted(){
    this.init();
  },
  methods: {
    // init Method
    async init(){

      this.loading = true
    
      if(this.typeSearch==1)
        await this.searchStores();

      this.loading = false
      this.success = true

      console.warn("INICIA PAGE")

    },
    // Basic Search Stores
    searchStores() {

      let params = {
        remember: false,
        params: {
          filter:{
            cities: this.paramsF.cityId,
            neighborhoods: this.paramsF.neighborhoodId ? this.paramsF.neighborhoodId : null,
            search: this.paramsF.text
          }
        }
      };

      this.$crud.index("apiRoutes.qmarketplace.store", params).then(response => {
        this.stores = response.data
      }).catch(error => {
        console.error('[ERROR - GET STORES SEARCH] ', error)
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
      })

    },

  }
}
</script>
<style lang="stylus">
</style>
