<template>
  <q-page class="bg-fondo advanced_search form-general relative-position" v-if="success">

    <!-- Busqueda Avanzada -->
    <div class="q-pa-xl bg-white shadow-2">
      <div class="q-container q-pt-xl">

        <!-- Titulo -->
        <div class="row q-mb-lg">
          <div class="col-12 flex self-center">
            <div class="text-h4 text-primary font-family-secondary">
              Busqueda Avanzada
            </div>
            <q-btn
              class="glossy q-ml-md"
              round
              color="primary"
              :icon="iconShow"
              size="md"
              @click="drawerPoint = !drawerPoint"/>
          </div>
        </div>

        <transition name="fade">
        <div v-if="drawerPoint">


        <div class="row q-col-gutter-lg">



          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">

            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Categorias</p>
              <q-select dense v-model="advancedSearch.category" :options="categoryOptions"/>
            </div>

            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Ingrese el texto</p>
              <q-input dense v-model="advancedSearch.product" placeholder="Busca tu vaina aquí" />
            </div>

            <!--
            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Filtro por tipo de empresa</p>
              <q-select dense v-model="advancedSearch.company" multiple use-chips :options="companyOptions"/>
            </div>
            -->

          </div>

          <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-6">

            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Ciudad</p>
              <q-select dense v-model="advancedSearch.city" :options="cityOptions"/>
            </div>
            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Barrio</p>
              <q-select dense v-model="advancedSearch.neighborhood" :options="neighborhoodOptions"/>
            </div>
            <!--
            <div class="q-mb-xl">
              <p class="caption q-mb-xs">Filtro por nivel</p>
              <q-select dense v-model="advancedSearch.level" :options="levelOptions"/>
            </div>
            -->

            <q-toggle dense v-model="advancedSearch.offer" color="primary" label="Tienda en Oferta" />

          </div>



        </div>

        <div class="col-12 text-right">
            <div class="q-my-lg">
              <q-btn :loading="loadingBtn" class="bg-primary text-white btn-arrow-send-pink" @click="searchAdvanced()">Buscar
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                </template>
              </q-btn>
            </div>
        </div>

        </div>
        </transition>

      </div>
    </div>

    <!-- Results Stores -->
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
      advancedSearch: {
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
      companyOptions: [],
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
      loadingBtn: false,
      firstAdvanced: false,
      iconShow:'add'

    }
  },
  mounted(){
    this.init();
  },
  methods: {
    // init Method
    async init(){

      this.loading = true
      this.$q.loading.show()

      if(this.typeSearch==1)
        await this.searchStores()

      this.loading = false
      this.$q.loading.hide()
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
    // Get Categories Store
    getCategoriesStore(){

      this.$crud.index("apiRoutes.qmarketplace.category").then(response => {

        this.categoryOptions = this.$array.tree(response.data);

        this.advancedSearch.category = {label:"Selecciona la categoria de la tienda",value:0,id:0}

      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        console.error("ERROR - GET CATEGORIES STORE")

      })

    },
    // Get Cities
    getCities(){

      this.advancedSearch.city = {label:"RIOHACHA",value:640,id:640}
      this.getNeighborhoods()

        /* Funcional - No eliminar - Comentado por ahora
        let params = {
            remember: false,
            params: {
              include: '',
              filter:{
                allTranslations: true,
                province_id: this.provinceId
              }
            }
        };//params

        this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
            this.cityOptions=[];
            this.cityOptions.push({label:"Seleccione",value:0,id:0});
            for(var i=0;i<response.data.length;i++){
              this.cityOptions.push({
                label:response.data[i].name,
                value:response.data[i].id,
                id:response.data[i].id});
            }

            this.search.city = {label:"Seleccione",value:0,id:0}
        }).catch(error => {
          console.error('[ERROR - GET CITIES] ', error)
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
        */

    },
    // Get Neighborhoods
    getNeighborhoods(){

        if(this.advancedSearch.city.id){

          //params
          let params = {
            remember: false,
            params: {
              include: 'city',
              filter:{
                allTranslations: true,
                city:this.advancedSearch.city.id
              }
            }
          };

          this.$crud.index("apiRoutes.ilocations.neighborhoods",params).then(response => {

            this.neighborhoodOptions=[];
            this.neighborhoodOptions.push({label:"Barrio",value:0,id:0});

            for(var i=0;i<response.data.length;i++){
              this.neighborhoodOptions.push({
                label:response.data[i].name,
                value:response.data[i].id,
                id:response.data[i].id
              });
            }

            this.advancedSearch.neighborhood = {label:"Barrio",value:0,id:0}

          }).catch(error => {
            console.error('[ERROR - GET Neighborhoods] ', error)
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          })

        }

    },
    // Get types of Companies
    getCompanies(){

      let params={
        params:{
          filter:{
            status:1,
            allTranslations: true
          }
        }
      }

      this.$crud.index("apiRoutes.qsubscription.products",params).then(response => {

        this.companyOptions=[]

        for(var i=0;i<response.data.length;i++){
              this.companyOptions.push({
                label:response.data[i].name,
                value:response.data[i].id,
                id:response.data[i].id
              });
        }

      }).catch(error => {
        console.error('[ERROR - GET TYPE COMPANIES] ', error)
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
      })

    },
    // Advanced Search
    searchAdvanced(){

      this.loadingBtn = true

      let categoryId = parseInt(this.advancedSearch.category.id)
      let cityId = parseInt(this.advancedSearch.city.id)
      let neighborhoodId = parseInt(this.advancedSearch.neighborhood.id)
      let product = this.advancedSearch.product
      let storesOffer = this.advancedSearch.offer
      //let companies = this.advancedSearch.company
      //let levelId = parseInt(this.advancedSearch.level.id)


      let params = {
        remember: false,
        params: {
          filter:{
            categories: categoryId ? categoryId : null,
            cities: cityId ? cityId : null,
            neighborhoods: neighborhoodId ? neighborhoodId: null,
            search: product ? product : null // Text
          }
        }
      };

      this.$crud.index("apiRoutes.qmarketplace.store", params).then(response => {
        //console.warn('[GET STORES ADVANCE SEARCH] ')
        this.stores = response.data

        if(this.stores.length==0){
          this.$alert.error({message:'SIN RESULTADOS', pos: 'bottom'})
        }else{
          this.drawerPoint = false
        }

      }).catch(error => {
        console.error('[ERROR - GET STORES ADVANCE SEARCH] ', error)
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
      })

      this.loadingBtn = false

    },
    async getInforAdvanced(){
      this.$q.loading.show()
      await this.getCategoriesStore()
      await this.getCities()

      //await this.getCompanies()

      this.$q.loading.hide()
    }

  },
  watch:{
    drawerPoint(val){
      if(this.firstAdvanced==false){
        this.firstAdvanced = true
        this.getInforAdvanced()
      }
      if(val==true)
        this.iconShow = 'remove'
      else
        this.iconShow = 'add'
    }
  }
}
</script>
<style lang="stylus">

.advanced_search

  .fade-enter-active,
  .fade-leave-active
    transition opacity .5s

  .fade-enter,
  .fade-leave-to
    opacity 0;

</style>
