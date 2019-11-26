<template>
  <q-page class="qcommerce-account-favoriteStores page-favoriteStores">
    <div v-if="success" class="qmarketplace-content">

      <div class="q-inline-block q-mb-lg">
        <h4 class="title text-secondary font-family-secondary q-mt-none">
          <div class="line-secondary q-mb-sm"></div>
            Mis Tiendas Favoritas
          <div class="line-secondary q-mt-sm"></div>
        </h4>
      </div>

      <div class="col-12">
        <q-table
          title="Favoritas"
          :data="tableFavoriteStores"
          :columns="tableColumns"
          row-key="id"
        />
      </div>
      
    </div>  
    <!--Inner loading-->
    <inner-loading :visible="loading"/>
  </q-page>


</template>
<script>

  import { date } from 'quasar'

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
        tableFavoriteStores: [],
        tableColumns: [
          {
            name: 'id',
            field: 'id', 
            label: 'ID',
            align: 'left',
            sortable: true
          },
          {
            name: 'name',
            field: 'name', 
            label: 'Nombre',
            align: 'left',
            sortable: true
          },
          {
            name: 'slogan',
            field: 'slogan', 
            label: 'Slogan',
            align: 'left',
            sortable: true
          },
          {
            name: 'createdAt',
            field: 'createdAt', 
            label: 'FECHA',
            align: 'left',
            sortable: true,
            format: val => this.fDate(val),
          }
        ],
      }
    },
    methods: {
      //init
      async init() {

        this.loading = true

        // Favorite Stores
        //await this.getFavoriteStores()

        this.loading = false
        this.success = true

      },
      // Get redeems ITEMS ID for a User
      getFavoriteStores(){
        return new Promise((resolve, reject) => {
          
          this.tableFavoriteStores = []
          //Params
          let params = {
            refresh: true,
            params: {
              filter: {userId:this.userId}
            }
          }
          console.warn("BUSCAR TIENDAS FAVORITAS POR USUARIO")

          /*
          this.$crud.index("apiRoutes.qmarketplace.stores",params).then(response => {
            this.tableOrders = response.data
            resolve(true)//Resolve
          }).catch(error => {
            console.error("ERROR - GET ORDERS")
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            reject(false)//Resolve
          })
          */

        })
      },
      // Format date table
      fDate(val){
        let formattedString = date.formatDate(val, 'DD-MM-YYYY')
        return formattedString
      }
    }
  }
</script>
<style lang="stylus">

</style>
