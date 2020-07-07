<template>
   <q-page class="bg-fondo advanced_search form-general relative-position" v-if="success">
      <!-- Busqueda Avanzada -->
      <div class="q-pa-md bg-white shadow-2 advanced-search-block">
	      
         <div class="q-container q-pt-lg">
            <!-- Titulo -->
            <div class="row q-mb-lg">
               <div class="col-12 flex self-center title-page">
                  <div class="text-h4 text-primary font-family-secondary q-pt-sm">
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
                     <div class="col-xs-12 col-sm-6 ">

                        <div class="q-mb-lg">
                           <p class="caption q-mb-xs">Categorias</p>
                           <q-select dense
                                     clearable
                                     emit-value
                                     map-options
                                     option-label="label"
                                     v-model="advancedSearch.category"
                                     :options="categoryOptions"
                                     label="categoria de la tienda"
                           />
                        </div>
                     </div>
	                  
                     <div class="col-xs-12 col-sm-6 ">
                        <div class="q-mb-lg">
                           <p class="caption q-mb-xs">Ingrese el texto</p>
                           <q-input dense v-model="advancedSearch.product" placeholder="Busca tu vaina aquí"  @keydown.enter="searchAdvanced()"/>
                        </div>

                        <!--
                        <div class="q-mb-lg">
                          <p class="caption q-mb-xs">Filtro por tipo de empresa</p>
                          <q-select dense v-model="advancedSearch.company" multiple use-chips :options="companyOptions"/>
                        </div>
                        -->

                     </div>

                     <div class="col-xs-12 col-sm-6">

                        <div class="q-mb-lg">
                           <p class="caption q-mb-xs">Ciudad</p>
                           <q-select
                                   dense
                                   clearable
                                   map-options
                                   emit-value
                                   option-label="label"
                                   v-model="advancedSearch.city"
                                   :options="cityOptions"
                                   label="Selecione Ciudad"/>
                        </div>
                     </div>
	                  
                     <div class="col-xs-12 col-sm-6">
                        <div class="q-mb-lg">
                           <p class="caption q-mb-xs">Barrio</p>
                           <q-select
                                   dense
                                   clearable
                                   map-options
                                   emit-value
                                   option-label="label"
                                   v-model="advancedSearch.neighborhood"
                                   :options="neighborhoodOptions"
                                   label="Selecione barrio"/>
                        </div>
                        <!--
                        <div class="q-mb-xl">
                          <p class="caption q-mb-xs">Filtro por nivel</p>
                          <q-select dense v-model="advancedSearch.level" :options="levelOptions"/>
                        </div>
                        -->

                        <q-toggle dense v-model="advancedSearch.offer" color="primary" label="Tienda en Oferta"/>

                     </div>
	                  
                  </div>

                  <div class="col-12 text-right">
                     <div class="q-my-lg">
                        <q-btn :loading="loadingBtn" class="bg-primary text-white btn-arrow-send-pink"
                               @click="searchAdvanced()">Buscar
                           <template v-slot:loading>
                              <q-spinner-hourglass class="on-left"/>
                           </template>
                        </q-btn>
                     </div>
                  </div>

               </div>
            </transition>

         </div>
      </div>

      <!-- Results Stores -->
      <div v-if="success">
         <div v-if="stores.length>0">
            <div  class="row q-pa-lg">
               <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center" v-for="store in stores">
                  <store :store="store"></store>
               </div>
            </div>
	         
            <div class="q-container">
               <div
                       class="row"
                       v-if="paginate.maxPages > 1">
                  <div class="col-md-12 flex justify-center q-pt-xl">
	                  
	                  
	                  <q-btn outline color="primary" @click="getMore" v-if="!(paginate.page >= paginate.maxPages)">
		                  Cargar mas
	                  </q-btn>
	                  
                  </div>
               </div>
            </div>

         </div>

         <div v-else="success">

            <div class="row q-pa-lg">
               <div class="col-12">

                  <q-banner inline-actions class="q-mt-xl text-white bg-red">
                     <template v-slot:avatar>
                        <q-icon name="warning" color="white"/>
                     </template>
                     No existen resultados disponibles
                  </q-banner>

               </div>
            </div>

         </div>
         <inner-loading :visible="loading"/>
      </div>

      <div class="q-container banner q-py-xl text-center">
         <qbanner systemName="search" height="auto"/>
      </div>

   </q-page>
</template>
<script>
   import store from 'src/components/themes/store'
   import qbanner from '@imagina/qbanner/_components/frontend/qbanner'

   export default {
      name: 'PageBusqueda',
      components: {
         store,
         qbanner
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
            paginate: {
               page: 1,
               take: 12,
               minPages: 1,
               maxPages: 0
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
            drawerPoint: false,
            loadingBtn: false,
            firstAdvanced: false,
            iconShow: 'add'

         }
      },
      watch: {
         '$route.params.search': {
            handler: function (search) {
               this.init();
            },
            deep: true,
            immediate: true
         },
         drawerPoint(val) {
            if (this.firstAdvanced == false) {
               this.firstAdvanced = true
               this.getInforAdvanced()
            }
            if (val == true)
               this.iconShow = 'remove'
            else
               this.iconShow = 'add'
         }
      },
      mounted() {
         this.init();
      },
      methods: {
         // init Method
         async init() {
            this.loading = true
            this.success=false
            await this.getCities()
            await this.getNeighborhoods()
            await this.searchStores()
            this.success = true
            this.loading = false
         },
         // Basic Search Stores
         searchStores() {
            return new Promise((resolve, reject) => {
               this.loading = true
               let city = this.$clone(this.cityOptions.find(city => city.label == this.$route.params.city))
               let neighborhood = this.$clone(this.neighborhoodOptions.find(neighborhood => neighborhood.label == this.$route.params.neighborhood))
               if (city) city = city.id
               if (neighborhood) neighborhood = neighborhood.id
               if(this.$route.params.search ==="all"){
                  this.$route.params.search=null
               }
               let params = {
                  params: {
                     filter: {
                        cities: city,
                        neighborhoods: neighborhood,
                        search: this.$route.params.search
                     },
                     take: this.paginate.take,
                     page: this.paginate.page,
                  }
               };
               this.$crud.index("apiRoutes.qmarketplace.store", params).then(response => {
                  this.stores.push(...response.data)
                  this.loading = false
                  resolve(true);
                  this.paginate.maxPages = response.meta.page.lastPage
               }).catch(error => {
                  this.loading = false
                  console.error('[ERROR - GET STORES SEARCH] ', error)
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  reject(error)//Resolve
               })
            })
         },
		      getMore(){
            this.paginate.page ++
            this.searchStores()
		      },
         // Get Categories Store
         getCategoriesStore() {
            this.loading = true
            this.$crud.index("apiRoutes.qmarketplace.category").then(response => {
               this.categoryOptions = this.$array.select(response.data, {label: 'title', id: 'id'});
               this.loading = false
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               console.error("ERROR - GET CATEGORIES STORE")
               this.loading = false
            })

         },
         // Get Cities
         getCities() {
            return new Promise((resolve, reject) => {
               this.loading = true
               this.cityOptions = [{label: "RIOHACHA", value: 640, id: 640}]
               this.advancedSearch.city = 640
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
               resolve(true);
            })
         },
         // Get Neighborhoods
         getNeighborhoods() {
            return new Promise((resolve, reject) => {
               this.loading = true
               if (this.advancedSearch.city) {

                  //params
                  let params = {

                     params: {
                        include: 'city',
                        filter: {
                           allTranslations: true,
                           city: this.advancedSearch.city
                        }
                     }
                  };

                  this.$crud.index("apiRoutes.ilocations.neighborhoods", params).then(response => {
                     this.neighborhoodOptions = this.$array.select(response.data, {label: 'name', id: 'id'});
                     this.loading = false
                     resolve(true);
                  }).catch(error => {
                     this.loading = false
                     console.error('[ERROR - GET Neighborhoods] ', error)
                     this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                     reject(error)//Resolve
                  })

               }
            });
         },
         // Get types of Companies
         getCompanies() {
            this.loading = true
            let params = {
               params: {
                  filter: {
                     status: 1,
                     allTranslations: true
                  }
               }
            }

            this.$crud.index("apiRoutes.qsubscription.products", params).then(response => {
               this.companyOptions = this.$array.select(response.data)
               this.loading = false
            }).catch(error => {
               this.loading = false
               console.error('[ERROR - GET TYPE COMPANIES] ', error)
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            })

         },
         // Advanced Search
         searchAdvanced() {
            this.loading = true
            this.loadingBtn = true


            let categoryId =null
            if( this.advancedSearch.category)categoryId=this.advancedSearch.category
            let cityId = null
            if(this.advancedSearch.city)
            cityId = this.advancedSearch.city

            let neighborhoodId = null
            if(this.advancedSearch.neighborhood)
            neighborhoodId = this.advancedSearch.neighborhood
            let product = null
            if(this.advancedSearch.product)
            product = this.advancedSearch.product
            let storesOffer = null
            if(this.advancedSearch.offer)
            storesOffer = this.advancedSearch.offer
            //let companies = this.advancedSearch.company
            //let levelId = parseInt(this.advancedSearch.level.id)
            let params = {

               params: {
                  filter: {
                     categories: categoryId,
                     cities: cityId,
                     neighborhoods: neighborhoodId,
                     search: product
                  }
               }
            };

            this.$crud.index("apiRoutes.qmarketplace.store", params).then(response => {
               this.stores = response.data
               if (this.stores.length == 0) {
                  this.$alert.error({message: 'SIN RESULTADOS', pos: 'bottom'})
               } else {
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
         async getInforAdvanced() {
            this.loading = true
            await this.getCategoriesStore()
            await this.getCities()
            //await this.getCompanies()
            this.loading = false
         }

      },

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

   .advanced-search-block
      @media screen and (max-width: $breakpoint-xs)
         .q-container
            padding-top 5px

            .row
               margin-bottom 0

               .title-page
                  .text-h4
                     font-size 23px !important

</style>
