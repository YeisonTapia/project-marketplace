<template>
  <q-page class="qredeems-account-myprizes page-prizes">
    <div v-if="success" class="qredeems-content">

      <div class="q-inline-block q-mb-lg">
        <h4 class="title text-secondary font-family-secondary q-mt-none">
          <div class="line-secondary q-mb-sm"></div>
            Mis Premios
          <div class="line-secondary q-mt-sm"></div>
        </h4>
      </div>

      <!-- Puntos Canjeados -->
        
      <div class="col-12">
            
            <q-table
              title="Puntos Canjeados"
              :data="tableUserItemsRedeems"
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

  import http from "axios"
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
        tableUserItemsRedeems: [],
        tableColumns: [
          {
            name: 'id',
            field: 'id', 
            label: 'ID',
            align: 'left',
            sortable: true
          },
          {
            name: 'description',
            field: 'description', 
            label: 'DESCRIPCION',
            align: 'left',
          },
          {
            name: 'points',
            field: 'points', 
            label: 'PUNTOS',
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

        // Items User redeems
        await this.getRedeemsItemsUser()

        this.loading = false
        this.success = true

      },
      // Get redeems ITEMS ID for a User
      getRedeemsItemsUser(){
        return new Promise((resolve, reject) => {
          
          this.tableUserItemsRedeems = []

          //Params
          let params = {
            refresh: true,
            params: {
              filter: {userId:this.userId}
            }
          }

          this.$crud.index("apiRoutes.qredeems.redeems",params).then(response => {
            
            this.tableUserItemsRedeems = response.data
          
            resolve(true)//Resolve
          }).catch(error => {
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
