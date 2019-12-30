<template>
   <q-page class="quser-account-index page-user-index">

      <div class="quser-content">

         <div class="q-inline-block q-mb-lg">
            <h4 class="title text-secondary font-family-secondary q-mt-none">
               <div class="line-secondary q-mb-sm"></div>
               Inicio
               <div class="line-secondary q-mt-sm"></div>
            </h4>
         </div>

         <div class="row items-center form-general">
            <!-- Dashboard -->
            <q-card class="rounded-md q-mb-xl full-width">
               <q-card-section class="q-pa-lg">

                  <div class="row q-col-gutter-md ">
                     <div class="col-xs-12 col-sm-6 col-md-3">

                        <div class="row items-center bg-teal full-height">
                           <div class="col-5 bg-teal-8 full-height">
                              <div class="row full-height justify-center items-center text-white text-h5">
                                 {{userPointsAvailables}}
                              </div>
                           </div>
                           <div class="col-7">
                              <div class="q-pl-md text-white q-py-md">Total puntos <br>disponibles</div>
                           </div>
                        </div>

                     </div>
                     <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="row items-center bg-red full-height">
                           <div class="col-5 bg-red-8 full-height">
                              <div class="row full-height justify-center items-center text-white text-h5">
                                 {{userPointsMonth}}
                              </div>
                           </div>
                           <div class="col-7">
                              <div class="q-pl-md text-white q-py-md">Puntos <br>del mes</div>
                           </div>
                        </div>
                     </div>
                     <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="row items-center bg-blue full-height">
                           <div class="col-5 bg-blue-8 full-height">
                              <div class="row full-height justify-center items-center text-white text-h5">
                                 {{stores.length}}
                              </div>
                           </div>
                           <div class="col-7">
                              <div class="q-pl-md text-white q-py-md">Tiendas <br>seguidas</div>
                           </div>
                        </div>
                     </div>
                     <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="row items-center bg-amber full-height">
                           <div class="col-5 bg-amber-8 full-height">
                              <div class="row full-height justify-center items-center text-white text-h5">
                                 300
                              </div>
                           </div>
                           <div class="col-7">
                              <div class="q-pl-md text-white q-py-md">Notificaciones <br>sin leer</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </q-card-section>
               <div class="q-pt-xs"></div>
               <q-card-section class="q-pa-lg">
                  <div class="line-grey q-pa-lg">

                     <div class="row items-center text-h6 text-secondary q-mb-md">
                        <q-icon name="fas fa-store" class="q-mr-md"/>
                        Mis Tiendas Favoritas
                     </div>

                     <div class="row q-col-gutter-md justify-center" v-if="stores.length">
                        <div class="col-xs-6 col-sm-4 col-md-3" v-for="item in stores">
                           <q-card class="card-store text-center">
                              <q-card-section>
                                 <div class="row card-seguidor">
                                    <div class="col-12">
                                       <q-avatar size="90px">
                                          <img :src="item.store.logo.path">
                                       </q-avatar>
                                    </div>
                                    <div class="col-12">
                                       <div class="text-subtitle1 q-mt-sm">{{item.store.name}}</div>
                                       <q-rating size="20px" v-model="item.store.averageRating" :max="5.0"
                                                 v-if="item.store.averageRating"/>
                                    </div>
                                 </div>
                              </q-card-section>
                              <q-separator inset/>

                              <q-card-actions vertical align="center">
                                 <q-btn :to="{name: 'stores.show',params: {slug: item.store.slug}}" flat color="primary" no-caps class="text-bold" label="Ir a Tienda"/>
                              </q-card-actions>

                           </q-card>
                        </div>
                     </div>

                  </div>

               </q-card-section>
            </q-card>

         </div>


      </div>

      <!--Inner loading-->
      <inner-loading :visible="loading"/>
   </q-page>


</template>
<script>

   import http from "axios"
   import {date} from 'quasar'

   export default {
      props: {},
      components: {},
      watch: {},
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
            userPointsAvailables: 0,
            userPointsMonth: 0,
            dateStart: null,
            dateEnd: null,
            stores: [],
            loading:false,
         }
      },
      methods: {
         //init
         async init() {

            // Get Dates
            let dateTarget = new Date()

            let min = date.startOfDate(dateTarget,'month')
            this.dateStart = date.formatDate(min, 'YYYY-MM-DD')

            let max = date.endOfDate(dateTarget,'month')
            this.dateEnd = date.formatDate(max, 'YYYY-MM-DD')

            
            await this.getPointsUser()
            await this.getFavoriteStores()

            // Filtrado por mes
            await this.getPointsUser(true)

            
         },
         // Total Puntos Disponibles (Los que puede cambiar)
         // Get Points Available User
         getPointsUser(filterDate = false){
           return new Promise((resolve, reject) => {
             this.loading = true

             let fDates = null

             // Filtro para fechas
             if(filterDate==true){
               fDates = {
                  field: "created_at",
                  from: this.dateStart,
                  to: this.dateEnd
               }
             }

             //Params
             let params = {
               params: {
                 filter: {
                   userId: this.userId,
                   type: 'availablePointsUser',
                   date: fDates
                 }
               }
             }

             http.get(config('apiRoutes.qredeems.calculates'),params)
               .then(response => {

                 if(response.data.data.points>0){
                     if(filterDate!=true)
                        this.userPointsAvailables = response.data.data.points
                     else
                        this.userPointsMonth = response.data.data.points
                 }
                   
                 //console.warn("*** GET POINTS USER - Puntos Disponibles:"+this.userPointsAvailables )
                this.loading = false
                 resolve(true);

               })
               .catch(error => {
                 this.loading = false
                 reject(error);
               });
           })
         },
         getFavoriteStores() {
            return new Promise((resolve, reject) => {
               this.loading = true
               //Params
               let params = {
                  refresh: true,
                  params: {
                     include: 'store',
                     filter: {userId:this.$store.state.quserAuth.userId}
                  }
               }
               //console.warn("BUSCAR TIENDAS FAVORITAS POR USUARIO")
               this.$crud.index("apiRoutes.qmarketplace.favoriteStore", params).then(response => {
                  console.log(response)

                  this.stores = response.data
                  this.loading = false
                  resolve(true)//Resolve
               }).catch(error => {
                  this.loading = false
                  console.error("ERROR - GET FAVORITE STORES")
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  reject(false)//Resolve
               })


            })
         }
      }
   }
</script>
<style lang="stylus">
   .page-user-index
      .card-store
       box-shadow none

         & img
            border 2px solid #E1E1E1
</style>
