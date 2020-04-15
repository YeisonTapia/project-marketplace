<template>
   <q-page class="bg-fondo-q store-page layout-padding">
      <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Escritorio</div>
      <div class="q-container-fuild"
           v-if="success && ($auth.hasAccess('ianalytics.reports.manage') || $auth.hasAccess('marketplace.stores.mystore') )">
         <div class="row">
            <q-card class="rounded-md q-ma-sm" style="width: 100%">
               <div class="bg-light">
                  <div class="row justify-end items-center q-col-gutter-md q-pb-md q-px-md">
                     <div class="col-xs-12 col-sm-12 col-md-auto text-center">
                        <q-icon name="event" size="sm" class="q-mr-sm"/>
                        <q-btn flat color="secondary" :label="$trd(month2,{type:'month'})"
                               @click="getDates(month2,month2End)"/>
                        /
                        <q-btn flat color="secondary" :label="$trd(month1,{type:'month'})"
                               @click="getDates(month1,month1End)"/>
                        /
                        <q-btn flat color="secondary" label="hoy" @click="getDates(today)"/>
                     </div>
                     <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-mt-sm">
                        <q-input filled dense v-model="startDate" mask="date" :rules="['date']" label="fecha inicial">
                           <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                 <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="startDate" @input="() => $refs.qDateProxy.hide()" today-btn/>
                                 </q-popup-proxy>
                              </q-icon>
                           </template>
                        </q-input>
                        <!--<q-select filled v-model="model" color="primary" bg-color="white" :options="options" dense>
                           <template v-slot:prepend>
                              <q-icon name="event"/>
                           </template>
                        </q-select>-->
                     </div>
                     <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-mt-sm">
                        <q-input filled dense v-model="endDate" mask="date" :rules="['date']" label="Fecha final">
                           <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                 <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="endDate" @input="() => $refs.qDateProxy.hide()" today-btn/>
                                 </q-popup-proxy>
                              </q-icon>
                           </template>
                        </q-input>
                     </div>
                  </div>
               </div>
            </q-card>
         </div>
         <div class="row" v-if="$auth.hasAccess('ianalytics.reports.manage') ">
            <div class="col-xs-12 col-sm-6">
               <views-and-pages :startDate="startDate" :endDate="endDate"/>
            </div>
            <div class="col-xs-6 col-sm-6">
               <browser-sessions :startDate="startDate" :endDate="endDate"/>
            </div>
            <div class="col-xs-6 col-sm-6">
               <most-visited-pages :startDate="startDate" :endDate="endDate"/>
            </div>
            <div class="col-xs-6 col-sm-4">
               <device-sessions :startDate="startDate" :endDate="endDate"/>
            </div>
         </div>
         <div class="row q-col-gutter-md q-my-md" v-if="$auth.hasAccess('marketplace.stores.mystore')">
            <div class="col-xs-12 col-sm-6 col-md-3">

               <div class="row items-center bg-teal full-height">
                  <div class="col-5 bg-teal-8 full-height">
                     <div class="row full-height justify-center items-center text-white text-h5">
                        {{soldProducts.length}}
                     </div>
                  </div>
                  <div class="col-7">
                     <div class="q-pl-md text-white q-py-md">Productos <br>Vendidos</div>
                  </div>
               </div>

            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
               <div class="row items-center bg-red full-height">
                  <div class="col-5 bg-red-8 full-height">
                     <div class="row full-height justify-center items-center text-white text-h5">
                        {{totalFollowers}}
                     </div>
                  </div>
                  <div class="col-7">
                     <div class="q-pl-md text-white q-py-md">Total de <br>seguidores</div>
                  </div>
               </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
               <div class="row items-center bg-blue full-height">
                  <div class="col-5 bg-blue-8 full-height">
                     <div class="row full-height justify-center items-center text-white text-h5">
                        {{totalPolls}}
                     </div>
                  </div>
                  <div class="col-7">
                     <div class="q-pl-md text-white q-py-md">Encuentas</div>
                  </div>
               </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
               <div class="row items-center bg-amber full-height">
                  <div class="col-5 bg-amber-8 full-height">
                     <div class="row full-height justify-center items-center text-white text-h5">
                        {{totalSolds}}
                     </div>
                  </div>
                  <div class="col-7">
                     <div class="q-pl-md text-white q-py-md">Total de <br>ventas</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="q-container-fuild" v-else>
         <div class="row  items-center q-col-gutter-md q-pb-md q-px-md">
            <div class="col-xs-12 col-sm-12 col-md-auto text-center">
               <q-card class="my-card">
                  <q-card-section>
                     <h4>Bienvenido a el panel adminsitrativo de Dones esta esa vaina</h4>
                  </q-card-section>
               </q-card>
            </div>
         </div>
      </div>

      <inner-loading :visible="loading"/>
   </q-page>
</template>

<style lang="stylus">

</style>

<script>
   import viewsAndPages from '@imagina/qanalytics/_components/admin/google-analytics/viewsAndPages'
   import deviceSessions from '@imagina/qanalytics/_components/admin/google-analytics/deviceSessions'
   import browserSessions from '@imagina/qanalytics/_components/admin/google-analytics/browserSessions'
   import mostVisitedPages from '@imagina/qanalytics/_components/admin/google-analytics/mostVisitedPages'

   export default {
      name: 'admin-pages',
      components: {
         viewsAndPages,
         deviceSessions,
         browserSessions,
         mostVisitedPages
      },
      computed: {
         storeId() {
            if (this.$route.params.id) {
               return this.$route.params.id
            }
            return this.$store.state.qmarketplaceStores.storeSelected
         }
      },
      watch: {
         startDate() {
            this.marketplaceReport()
         },
         endDate() {
            this.marketplaceReport()
         },
         storeId() {
            this.init()
         }
      },
      data() {
         return {
            success: false,
            month1: null,
            month1End: null,
            month2: null,
            month2End: null,
            soldProducts: [],
            totalFollowers: null,
            totalPolls: null,
            totalSolds: null,
            startDate: this.$moment().format('YYYY-MM-DD'),
            endDate: this.$moment().format('YYYY-MM-DD'),
            today: this.$moment().format('YYYY-MM-DD'),
            loading: false
         }
      },
      mounted() {
         this.$nextTick(function () {
           this.init()
         })
      },
      methods: {
         async init() {
            this.month1 = this.$moment().subtract(1, 'month').startOf('month').format('YYYY-MM-') + "01"
            this.month1End = this.$clone(this.$moment(this.month1).add(1, 'month').format('YYYY-MM-DD HH:mm'))
            this.month2 = this.$moment().subtract(2, 'month').startOf('month').format('YYYY-MM-') + "01"
            this.month2End = this.$clone(this.$moment(this.month2).add(1, 'month').format('YYYY-MM-DD HH:mm'))
            this.success = true
            this.marketplaceReport()

         },
         getDates(initDate, endDate = this.$moment().format('YYYY-MM-DD')) {
            this.startDate = initDate;
            this.endDate = endDate;
         },
         marketplaceReport() {
            this.loading = true
              let params = {
               params: {
                  filter: {
                     storeId: this.storeId,
                     startDate: this.startDate,
                     endDate: this.endDate,
                     totalFollowers: true,
                     followers: true,
                     soldProducts: true,
                     totalPolls: true,
                     totalSold: true
                  }
               }
            };//params
            this.$crud.index("apiRoutes.qanalytics.marketplace", params).then(response => {
               this.totalFollowers = response.data.totalFollowers;
               this.followers = response.data.followers;
               this.soldProducts = response.data.soldProducts;
               this.totalPolls = response.data.totalPolls;
               this.totalSolds = 0;
               let totalSold = this.$clone(response.data.totalSold)
               for (var i = 0; i < totalSold.sold.length; i++) {
                  this.totalSolds += totalSold.sold[i];
               }
               this.loading = false
            });
         },
      }
   }
</script>
