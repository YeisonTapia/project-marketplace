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

      <div class="col-12">
        <q-table
          title="Ordenes"
          :data="tableOrders"
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
            name: 'email',
            label: 'E-MAIL',
            field: 'email',
            align: 'left',
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

        // Orders
        await this.getOrders()

        this.loading = false
        this.success = true

      },
      // Get redeems ITEMS ID for a User
      getOrders(){
        return new Promise((resolve, reject) => {
          
          this.tableOrders = []
          //Params
          let params = {
            refresh: true,
            params: {
              filter: {userId:this.userId}
            }
          }
          this.$crud.index("apiRoutes.qcommerce.orders",params).then(response => {
            this.tableOrders = response.data
            resolve(true)//Resolve
          }).catch(error => {
            console.error("ERROR - GET ORDERS")
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            reject(false)//Resolve
          })

        })
      },
      // Format date table
      fDate(val){
        let formattedString = date.formatDate(val, 'DD-MM-YYYY')
        return formattedString
      },
      // Validate Points value 0
      fPoints(val){
        if(val==undefined)
          return 0
        else
          return val
      },
    }
  }
</script>
<style lang="stylus">

</style>
