<template>
   <q-page class="bg-fondo-q store-page layout-padding">
      <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Escritorio</div>
      <div class="q-container-fuild" v-if="success">
         <div class="row">
            <q-card class="rounded-md q-ma-sm" style="width: 100%">
               <div class="bg-light">
                  <div class="row justify-end items-center q-col-gutter-md q-pb-md q-px-md" >
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
         <div class="row">
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
      </div>
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
      data() {
         return {
            success:false,
            month1: null,
            month1End: null,
            month2: null,
            month2End: null,
            startDate: this.$moment().format('YYYY-MM-DD'),
            endDate: this.$moment().format('YYYY-MM-DD'),
            today: this.$moment().format('YYYY-MM-DD'),
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
            this.success=true
            console.warn(this.month2, this.month1)
         },
         getDates(initDate, endDate = this.$moment().format('YYYY-MM-DD')) {
            this.startDate = initDate;
            this.endDate = endDate;
         }
      }
   }
</script>
