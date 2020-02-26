<template>
   <div id="userReport">

      <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Nivel de Usuario</div>
      <q-card class="rounded-md bg-white full-width q-my-sm" v-if="user.level">
         <div class="q-pa-lg">
            <div class="row q-col-gutter-md q-pt-lg">
               <div class="col-xs-12 col-sm-12">
                  <div class="q-pa-md">
                     <div class="text-h5 text-primary q-mb-lg">
                        Nivel - {{user.level.name}}
                     </div>
                     <div class=" q-mb-lg" v-html="user.level.description">
                     </div>
                     <div v-if="user.benefits.length">
                        <q-list padding>
                           <q-item-label header class="text-h6 text-primary">Beneficios Activos</q-item-label>
                           <q-item tag="label" v-ripple v-for="(item, i) in user.benefits" :key="i">
                              <q-item-section>
                                 <q-item-label>{{item.name}}</q-item-label>
                              </q-item-section>
                              <q-item-section side>
                                 <q-toggle color="primary" v-model="benefitValue" disable></q-toggle>
                              </q-item-section>
                           </q-item>
                        </q-list>
                     </div>
                     <hr/>
                     <div v-if="success">
                        <pre>{{level}}</pre>
                        <div class="text-h6 q-mb-lg">
                           Siguiente nivel
                        </div>
                        <div class="text-h6 text-primary q-mb-lg">
                           Nivel - {{level.name}}
                        </div>
                       <div v-if="level.options.criteria">
                           <div v-for="(item,i) in level.options.criterias" :key="i">
                              <div class=" q-mb-lg" v-html="item.description"></div>
                              <q-card-section class="q-py-xs">
                                 <div class="q-mt-xs">
                                    <q-chip color="tertiary" text-color="white">{{item.label}}: {{item.value}}</q-chip>
                                 </div>
                              </q-card-section>
                           </div>
                        </div>

                       <!-- <div v-if="level.benefits.length">
                           <q-list padding>
                              <q-item-label header class="text-h6 text-primary">Beneficios Activos</q-item-label>
                              <q-item tag="label" v-ripple v-for="(item, i) in level.benefits">
                                 <q-item-section>
                                    <q-item-label>{{item.name}}</q-item-label>
                                 </q-item-section>
                                 <q-item-section side>
                                    <q-toggle color="primary" v-model="!benefitValue" disable></q-toggle>
                                 </q-item-section>
                              </q-item>
                           </q-list>
                        </div>-->
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </q-card>
      <q-card class="rounded-md bg-white full-width q-my-sm" v-else>
         <div class="q-pa-lg">
            <div class="row q-col-gutter-md q-pt-lg">
               <div class="col-xs-12 col-sm-12">
                  <div class="q-pa-md">
                     <div class="text-h5 text-primary q-mb-lg">
                        Nivel inicial
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </q-card>
   </div>
</template>
<script>
   import {Chart} from 'highcharts-vue'
   import cardUser from '@imagina/qmarketplace/_components/info/cardUser'
   import store from "../../../store";

   export default {
      props: {},
      components: {
         Chart,
         cardUser

      },
      watch: {},
      data() {
         return {
            loading: true,
            level: false,
            success: false,
            user: null,
            benefitValue: true
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         });
      },
      methods: {
         async init() {
            this.user = this.$clone(this.$store.state.quserAuth.userData);
            console.warn(this.user.level.level_type_id, this.user.level.order)
            await this.levelUser()
         },
         levelUser() {
            return new Promise((resolve, reject) => {
               //Params
               let criteria = this.user.level.order;
               let params = {
               //   refresh: true,
                  params: {
                     include: 'benefits',
                     filter: {
                        field: 'order',
                        levelType: this.user.level.level_type_id,
                     }
                  }
               }
               //Request
               this.$crud.show('apiRoutes.qmarketplace.level', parseInt(criteria) + 1, params).then(response => {
                  this.level = response.data
                  this.success = true
                  resolve(true)//Resolve
               }).catch(error => {
                  //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  console.warn(error)
                  reject(false)//Resolve
               })
            })
         },
      }
   }
</script>
<style lang="stylus">
   #userReport
      .btn-more
         border-top 1px solid #eee

      .highcharts-legend
         display none !important

      .avatar-user
         .q-avatar__content
            border-radius 50%
            border 2px solid #eee

      .q-list
         .items-product
            border-bottom 1px solid #eee
            padding 10px

         .items-product:last-child
            border-bottom 0
      @media screen and (max-width: $breakpoint-xs)
         .icon-sm
            display none !important

         .text-h6
            text-align center
</style>
