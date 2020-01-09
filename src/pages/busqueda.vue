<template>
  <q-page class="bg-fondo advanced_search form-general relative-position" v-if="success">

    <!-- Busqueda Avanzada -->
    <div class="q-pa-md bg-white shadow-2">
      <div class="q-container q-pt-lg">

        <!-- Titulo -->
        <div class="row q-mb-lg">
          <div class="col-12 flex self-center title-page">
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
              <q-select dense clearable  v-model="advancedSearch.category" :options="categoryOptions"/>
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
              <q-select dense  v-model="advancedSearch.city" :options="cityOptions"/>
            </div>
            <div class="q-mb-lg">
              <p class="caption q-mb-xs">Barrio</p>
              <q-select dense clearable v-model="advancedSearch.neighborhood" :options="neighborhoodOptions"/>
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
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center" v-for="store in stores">
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
      <inner-loading :visible="loading"/>
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
      loading: true,
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
      this.$q.loading.hide()
      this.success = true
    },
    // Basic Search Stores
    searchStores() {
      this.loading = true
      if(this.paramsF.text=="Todas las tiendas"){
        this.paramsF.text="";
      }
      let params = {
        remember: false,
        params: {
          filter:{
            cities: this.paramsF.cityId,
            // neighborhoods: this.paramsF.neighborhoodId ? this.paramsF.neighborhoodId : null,
            search: this.paramsF.text
          }
        }
      };
      var neighborhood=this.paramsF.neighborhoodId ? this.paramsF.neighborhoodId : null;
      if(neighborhood){
        params.params.filter.neighborhoods=neighborhood;
      }
      this.$crud.index("apiRoutes.qmarketplace.store", params).then(response => {
        this.stores = response.data
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.error('[ERROR - GET STORES SEARCH] ', error)
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
      })

    },
    // Get Categories Store
    getCategoriesStore(){
      this.loading = true
      this.$crud.index("apiRoutes.qmarketplace.category").then(response => {

        this.categoryOptions = this.$array.tree(response.data);

        this.advancedSearch.category = {label:"Selecciona la categoria de la tienda",value:0,id:0}
        this.loading = false
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        console.error("ERROR - GET CATEGORIES STORE")
        this.loading = false
      })

    },
    // Get Cities
    getCities(){
      this.loading = true
      this.advancedSearch.city = {label:"RIOHACHA",value:640,id:640}
      this.getNeighborhoods()
      this.loading = false
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
      this.loading = true
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
            this.loading = false
          }).catch(error => {
            this.loading = false
            console.error('[ERROR - GET Neighborhoods] ', error)
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          })

        }

    },
    // Get types of Companies
    getCompanies(){
      this.loading = true
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
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.error('[ERROR - GET TYPE COMPANIES] ', error)
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
      })

    },
    // Advanced Search
    searchAdvanced(){
      this.loading = true
      this.loadingBtn = true

      let categoryId = this.advancedSearch.category.id?parseInt(this.advancedSearch.category.id):null
      let cityId = this.advancedSearch.city.id?parseInt(this.advancedSearch.city.id):null
      let neighborhoodId = this.advancedSearch.neighborhood.id?parseInt(this.advancedSearch.neighborhood.id):null
      let product = this.advancedSearch.product?this.advancedSearch.product:''
      let storesOffer = this.advancedSearch.offer?this.advancedSearch.offer:null
      //let companies = this.advancedSearch.company
      //let levelId = parseInt(this.advancedSearch.level.id)


      let params = {
        remember: false,
        params: {
          filter:{
            categories: categoryId,
            cities: cityId,
            neighborhoods: neighborhoodId,
            search: product
          }
        }
      };

      this.$crud.index("apiRoutes.qmarketplace.store", params).then(response => {
        this.stores = response.data
        if(this.stores.length==0){
          this.$alert.error({message:'SIN RESULTADOS', pos: 'bottom'})
        }else{
          this.drawerPoint = false
        }
        this.loading = false
      }).catch(error => {
        console.error('[ERROR - GET STORES ADVANCE SEARCH] ', error)
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        this.loading = false
      })

      this.loadingBtn = false

    },
    async getInforAdvanced(){
      this.loading = true
      this.$q.loading.show()
      await this.getCategoriesStore()
      await this.getCities()

      //await this.getCompanies()

      this.$q.loading.hide()
      this.loading = false
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
    @media screen and (max-width: $breakpoint-xs)
      .title-page
        .text-h4
            font-size 20px
</style>
