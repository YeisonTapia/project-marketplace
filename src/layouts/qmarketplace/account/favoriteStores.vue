<template>
  <q-page class="qcommerce-account-favoriteStores page-favorite-stores">
    <div v-if="success" class="qmarketplace-content">

      <div class="q-inline-block q-mb-lg">
        <h4 class="title text-secondary font-family-secondary q-mt-none">
          <div class="line-secondary q-mb-sm"></div>
            Mis Tiendas Favoritas
          <div class="line-secondary q-mt-sm"></div>
        </h4>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12">

            <q-card class="rounded-md q-mb-xl full-width">
              <div class="q-pl-md">
                <h3 class="title-label-puntos text-center bg-tertiary">
                  <div>Favoritas</div>
                </h3>
              </div>
              <q-card-section class="q-py-xl">


                <div v-if="tableFavoriteStores.length>0" class="row q-pa-lg">
                  <div class="col-xs-6 col-sm-4" v-for="favStore in tableFavoriteStores">

                    <store
                      :store="favStore.store"
                      :favStoreId="favStore.id"
                      :chargeFavorite="chargeFavorite"
                      @chargeFavorite ="chargeFavorite = $event"></store>

                  </div>
                </div>

                <div  v-if="tableFavoriteStores.length==0 && !loading">
                  <q-banner  class="bg-red q-mx-sm q-mt-xl q-mb-xl">
                    <template v-slot:avatar>
                      <q-icon name="error" color="white" />
                    </template>

                    <div class="text-center text-white">
                      NO EXISTEN RESULTADOS DISPONIBLES
                    </div>
                  </q-banner>
                </div>


                <!--
                <q-table class="no-shadow my-sticky-header-table"
                  :data="tableFavoriteStores"
                  :columns="tableColumns"
                  row-key="id"
                >

                  <q-td slot="body-cell-actions" slot-scope="props" :props="props">
                      <q-btn @click="deleteFavoriteStore(props.row)" color="negative" icon="fas fa-trash-alt" size="sm" class="q-ml-xs">
                        <q-tooltip :delay="300">Dejar de Seguir</q-tooltip>
                      </q-btn>
                  </q-td>

                </q-table>
                -->

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

  import { date } from 'quasar'
  import store from 'src/components/themes/store'

  export default {
    props: {},
    components: {
      store
    },
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
        tableFavoriteStores: [],
        tableColumns: [
          {
            name: 'name',
            field: row => row.store.name,
            label: 'NOMBRE',
            align: 'left',
            sortable: true
          },
          {
            name: 'slogan',
            field: row => row.store.slogan,
            label: 'SLOGAN',
            align: 'left'
          },
          /*
          {
            name: 'address',
            field:  row => row.store.address,
            label: 'DIRECCION',
            align: 'left'
          },
          */
          {
            name: 'createdAt',
            field: 'createdAt',
            label: 'AGREGADA EL',
            align: 'left',
            sortable: true,
            format: val => this.fDate(val),
          },
          {
            name: 'actions',
            field: 'actions',
            label: 'ACCIONES',
            align: 'left'
          }
        ],
        stores: [],
        chargeFavorite: false,
      }
    },
    methods: {
      //init
      async init() {

        this.loading = true

        // Favorite Stores
        await this.getFavoriteStores().catch(error => {})

        this.loading = false
        this.success = true

      },
      // Get redeems ITEMS ID for a User
      getFavoriteStores(){
        return new Promise((resolve, reject) => {

          this.loading = true

          this.tableFavoriteStores = []
          //Params
          let params = {
            //refresh: true,
            params: {
              include: 'store',
              filter: {userId:this.userId,allTranslations:true}
            }
          }
          //console.warn("BUSCAR TIENDAS FAVORITAS POR USUARIO")
          this.$crud.index("apiRoutes.qmarketplace.favoriteStore",params).then(response => {

            this.tableFavoriteStores = response.data
            this.loading = false
            resolve(true)//Resolve
          }).catch(error => {
            this.loading = false
            console.error("ERROR - GET FAVORITE STORES")
           // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            reject(false)//Resolve
          })


        })
      },
      // Format date table
      fDate(val){
        let formattedString = date.formatDate(val, 'DD-MM-YYYY')
        return formattedString
      },
      // Delete Favorite Store
      deleteFavoriteStore(id){

        this.loading = true

        //let criteria = row.id
        let criteria = id

        this.$crud.delete("apiRoutes.qmarketplace.favoriteStore",criteria).then(response => {

            this.getFavoriteStores()

            // Notify MSG
            this.$q.notify({
              color:'green',
              message: 'Proceso realizado exitosamente!!',
              position: 'bottom-right'
            })

            this.loading = false

          }).catch(error => {
            console.error("ERROR - DELETED FAVORITE STORES")
            //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

            this.loading = false
        })

      }

    },
    watch: {
      chargeFavorite(val,oldval) {
        if(val==true){
          this.getFavoriteStores()
          this.chargeFavorite = false
        }
      }
    },
  }
</script>
<style lang="stylus">
.page-favorite-stores
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
      -webkit-transform  skew(-10deg)
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


.qcommerce-account-favoriteStores
  .q-avatar
    @media screen and (max-width: $breakpoint-xs)
      display none
  .absolute-bottom-right
    .text-subtitle1
      @media screen and (max-width: $breakpoint-xs)
        display none
  .summary
    @media screen and (max-width: $breakpoint-xs)
      display none
  .leaveFollow
    @media screen and (max-width: $breakpoint-xs)
      text-align center

</style>
