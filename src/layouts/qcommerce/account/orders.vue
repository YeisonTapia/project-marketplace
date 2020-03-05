<template>
   <q-page class="qcommerce-account-orders page-orders">
      <div v-if="success" class="qredeems-content">

         <div class="q-inline-block q-mb-lg">
            <h4 class="title text-secondary font-family-secondary q-mt-none">
               <div class="line-secondary q-mb-sm"></div>
               Mis Compras
               <div class="line-secondary q-mt-sm"></div>
            </h4>
         </div>

         <div class="row q-col-gutter-md">
            <div class="col-12">

               <q-card class="rounded-md q-mb-xl full-width">
                  <div class="q-pl-md">
                     <h3 class="title-label-puntos text-center bg-tertiary">
                        <div>Ordenes</div>
                     </h3>
                  </div>
                  <q-card-section class="q-py-xl" v-if="success">
                     <q-table class="no-shadow my-sticky-header-table"
                              :data="tableOrders"
                              :columns="tableColumns"
                              row-key="id"
                     >
                        <template v-slot:body="props">
                           <q-tr :props="props">
                              <q-td key="id" :props="props">
                                 {{ props.row.id }}
                              </q-td>
                              <q-td key="storeName" :props="props">
                                {{ props.row.storeName }}
                              </q-td>
                              <q-td key="total" :props="props">
                                 {{ props.row.total }}
                              </q-td>
                              <q-td key="statusName" :props="props">
                                 {{ props.row.statusName }}
                              </q-td>
                              <q-td key="createdAt" :props="props">
                                 {{ $trd(props.row.createdAt) }}
                              </q-td>
                              <q-td key="actions" :props="props">
                                 <q-btn :to="{name:'qcommerce.account.order',params:{id:props.row.id}}" icon="fas fa-eye" color="primary"/>
                              </q-td>
                           </q-tr>
                        </template>
                     </q-table>

                  </q-card-section>
               </q-card>

            </div>
         </div>

      </div>
      <!--Inner loading-->
      <inner-loading :visible="loading"/>
   </q-page>


</template>
<script>

   import {date} from 'quasar'

   export default {
      props: {},
      components: {},
      watch: {},
      validations() {
         return {}
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            loading: false,
            success: false,
            userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
            tableOrders: [],
            tableColumns: [
               {
                  name: 'id',
                  field: 'id',
                  label: 'ID',
                  align: 'left',
                  sortable: true
               },
               {
                  name: 'storeName',
                  label: 'Tienda',
                  field: 'storeName',
                  align: 'left',
               },
               {
                  name: 'total',
                  field: 'total',
                  label: 'TOTAL',
                  align: 'left',
                  sortable: true
               },
               {
                  name: 'statusName',
                  field: 'statusName',
                  label: 'ESTADO',
                  align: 'left',
               },

               {
                  name: 'createdAt',
                  field: 'createdAt',
                  label: 'FECHA',
                  align: 'left',
                  sortable: true,
               },
               {
                  name: 'actions',
                  label: 'Acciones',
                  align: 'left',
               }
            ],
         }
      },
      methods: {
         //init
         async init() {

            this.loading = true

            // Orders
            await this.getOrders().catch(error => {
            })

            this.loading = false
            this.success = true

         },
         // Get redeems ITEMS ID for a User
         getOrders() {
            return new Promise((resolve, reject) => {

               this.tableOrders = []
               //Params
               let params = {
                  refresh: true,
                  params: {
                     filter: {user: this.userId},
                     include:"store"
                  }
               }
               this.$crud.index("apiRoutes.qcommerce.orders", params).then(response => {
                  this.tableOrders = response.data
                  resolve(true)//Resolve
               }).catch(error => {
                  console.error("ERROR - GET ORDERS")
                  //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  reject(false)//Resolve
               })

            })
         },
         // Format date table
         fDate(val) {
            let formattedString = date.formatDate(val, 'DD-MM-YYYY')
            return formattedString
         },
         // Validate Points value 0
         fPoints(val) {
            if (val == undefined)
               return 0
            else
               return val
         },
      }
   }
</script>
<style lang="stylus">
   .page-orders
      .title-label-puntos
         -webkit-transform skew(10deg)
         transform skew(10deg)
         border-radius 10px
         padding 0px 30px
         display inline-block
         min-width 40%
         margin -58px 0 10px 0
         color #FFFFFF
         font-size 20px
         position relative
         font-family $font-secondary

         &:before
            content ''
            background-image url('/statics/img/arrow-down-blue.png')
            position absolute
            right -25px
            width 100%
            height 50px
            background-repeat no-repeat
            background-size contain
            top 27px
            background-position right
         @media screen and (max-width: $breakpoint-md)
            min-width 60%
            font-size 20px
            padding 0 15px
            &:before
               display none !important
         @media screen and (max-width: $breakpoint-sm)
            min-width 60%
            font-size 15px
            padding 0 10px

         & > div
            -webkit-transform skew(-10deg)
            transform skew(-10deg)

      .q-mx-puntos
         padding-left 80px
         padding-right 80px
         @media screen and (max-width: $breakpoint-md)
            padding-left 30px
            padding-right 30px
         @media screen and (max-width: $breakpoint-sm)
            padding-left 10px
            padding-right 10px

      .text-h6
         line-height 1.5rem
         color $secondary
         @media screen and (max-width: $breakpoint-sm)
            line-height 1rem
            font-sie 1rem
            margin-top 10px
            margin-bottom 20px

      .my-sticky-header-table
         .q-table__top
         thead tr:first-child th
            background-color var(--q-color-light)

         thead tr th
            position sticky
            z-index 1

         thead tr:first-child th
            top 0

         &.q-table--loading thead tr:last-child th
            top 48px


</style>

