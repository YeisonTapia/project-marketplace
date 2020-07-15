<template>
  <q-page class="qredeems-account-points page-puntos">
    <div v-if="success" class="qredeems-content">

      <div class="q-inline-block q-mb-lg">
        <h4 class="title text-secondary font-family-secondary q-mt-none">
          <div class="line-secondary q-mb-sm"></div>
            Mis Puntos
          <div class="line-secondary q-mt-sm"></div>
        </h4>
      </div>

      <div class="row items-center">

        <!-- Meta Mensual -->
        <q-card class="rounded-md q-mb-xl full-width">
          <div class="q-pl-md">
            <h3 class="title-label-puntos text-center bg-primary" >
              <div>Meta del mes</div>
            </h3>
          </div>
          <q-card-section class="q-pt-xl">

            <q-list dense class="q-mt-xl q-mt-xs-xs">
              <q-item>

                <q-item-section>
                  <q-slider
                    v-model="userPointsAvailables"
                    markers
                    snap
                    label
                    label-always
                    :min="min"
                    :max="meta"
                    :step="step"
                    readonly
                    :label-value="userPointsAvailables + ' puntos' "

                  />
                </q-item-section>

                <q-item-section avatar>

                  <div class="text-center text-primary">
                    <q-avatar size="100px" class="q-mb-sm avatar-main">
                      <img src="/statics/img/comida.jpg">
                    </q-avatar>
                    <div>
                      <img src="/statics/img/copa-puntos.png" alt="Copa" id="copa">
                    </div>
                    <div class="text-h5 font-family-secondary">{{meta}}</div>
                    Puntos
                  </div>

                </q-item-section>
              </q-item>
            </q-list>

          </q-card-section>
        </q-card>

        <div class="q-my-md full-width"></div>

        <!-- Puntos por Canjear -->
        <q-card class="rounded-md q-mb-xl full-width q-mt-xs-xs">
          <div class="q-pl-md">
            <h3 class="title-label-puntos text-center bg-tertiary">
              <div>Items por canjear (Puntos disponibles: {{userPointsAvailables}})</div>
            </h3>
          </div>
          <q-card-section class="q-mx-puntos q-my-lg ">

            <q-list v-if="itemsRedeems.length>0" separator bordered style="border-left: 0; border-right: 0;">

              <q-item v-for="(item, index) in itemsRedeems" :key="index">
                <q-item-section>

                  <div class="row justify-center text-center q-my-lg">
                    <div class="col-xs-12 col-sm-10 col-md-9 col-lg-8">

                      <div class="row q-col-gutter-md justify-center items-center">
                        <div class=" col-sm">
                          <q-avatar size="6rem" class="q-mb-sm">
                            <img :src="item.mainImage.path">
                          </q-avatar>
                          <div class="text-h6">{{item.name}}</div>
                        </div>
                        <div class=" col-sm text-center">
                          <div class="font-family-secondary text-secondary" style="font-size: 2rem;">=</div>
                        </div>
                        <div class=" col-sm">
                          <q-avatar class="font-family-secondary" font-size="2rem" color="primary" size="6rem" text-color="white">{{item.value}}</q-avatar>
                          <div class="text-h6">Puntos</div>
                        </div>
                        <div class=" col-sm canjear">

                          <q-btn v-if="userPointsAvailables>=item.value" label="Canjear" no-caps size="lg" color="tertiary" @click="redeemItem(item)"/>

                            <q-btn v-else label="Canjear" no-caps size="lg" color="tertiary" disabled class="cursor-not-allowed"/>

                          </div>
                      </div>

                    </div>

                  </div>

                </q-item-section>
              </q-item>

            </q-list>

            <div v-if="itemsRedeems.length==0 && loading==false">

                No existen items disponibles para cambiar

            </div>

          </q-card-section>
        </q-card>

        <div class="q-my-md full-width"></div>

        <!-- Todos los puntos acumulados -->
        <q-card class="rounded-md q-mb-xl full-width q-mt-xs-xs">
          <div class="q-pl-md">
            <h3 class="title-label-puntos text-center bg-primary" >
              <div>¿Cómo has obtenido TODOS tus puntos?</div>
            </h3>
          </div>
          <q-card-section class="q-py-xl">

              <div class="row q-col-gutter-md justify-center  text-center">
                <div class="col-xs-4 col-sm-4 col-md self-start">
                  <q-avatar class="font-family-secondary" font-size="2rem" color="primary" size="6rem" text-color="white">{{acumulados}}</q-avatar>
                  <div class="text-h6">Puntos <br> Históricos</div>
                </div>

                <div class="col-xs-4 col-md-auto text-center self-center">
                  <div class="font-family-secondary text-secondary" style="font-size: 2rem;">=</div>
                </div>

                <div class="col-xs-4 col-md self-start" v-for="(group, index) in pointsGroup" :key="index">
                  <q-avatar class="font-family-secondary" font-size="2rem" color="tertiary" size="6rem" text-color="white">{{group.total}}</q-avatar>
                  <div class="text-h6">{{group.description}}</div>
                </div>

              </div>

          </q-card-section>
          <q-card-section class="q-py-xl q-px-xl text-caption">
            Puntos Históricos: Son todos los puntos que has ganado desde que comenzaste a utilizar nuestro sitio web (sin descontar los canjeados), y puedes visualizar con mas detalle haciendo click en "Historial de puntos"
          </q-card-section>

        </q-card>
      </div>

      <div class="text-right">
        <div class="q-inline-block">
          <h5 class="title text-secondary cursor-pointer font-family-secondary q-mt-none" @click="drawerPoint = !drawerPoint">
              Historial de puntos
            <div class="line-secondary q-mt-sm"></div>
          </h5>
        </div>
      </div>

      <!-- Historial Ptos-->
      <div class="row q-col-gutter-md" v-if="drawerPoint">

        <!-- Puntos Obtenidos -->
        <div class="col-12">
          <q-card class="rounded-md q-mb-xl full-width">
            <div class="q-pl-md">
              <h3 class="title-label-puntos text-center bg-tertiary">
                <div>Historial</div>
              </h3>
            </div>
            <q-card-section class="q-py-xl">
              <q-table class="no-shadow my-sticky-header-table"
                :data="tableUserAllPoints"
                :columns="tableColumnsAllPoints"
                row-key="id"
              />
            </q-card-section>
          </q-card>
        </div>

        <!-- Puntos Canjeados -->
        <!--
        <div class="col-6">
            <q-table
              title="Puntos Canjeados"
              :data="tableUserItemsRedeems"
              :columns="tableColumns"
              row-key="id"
            />
        </div>
        -->

      </div>
	
	
	    <q-dialog v-model="showConfirm">
		    <q-card>
			    <q-card-section class="row items-center q-pb-none">
				    <div class="text-h6">Item Canjeado !!</div>
				    <q-space />
				    <q-btn icon="close" flat round dense v-close-popup />
			    </q-card-section>
			    <q-card-section>
				    Felicidades as redimino {{this.itemRedemed}},
				    para hacer valida tu redencion puede <span v-if="phoneStore[0]">cominucarce con nosotros al numero {{phoneStore[0]}} o</span>
				    escribirnos al chat.
			    </q-card-section>
		    </q-card>
	    </q-dialog>
	    

    </div>
    <!--Inner loading-->
    <inner-loading :visible="loading"/>
  </q-page>


</template>
<script>

  import http from "axios"
  import { date } from 'quasar'

  export default {
    props: {
      pointsAvailables:{default: 0},
      changePoints: {type: Boolean, default: false},
    },
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
        showConfirm: false,
        itemRedemed: '',
	      phoneStore: this.$store.getters['qsiteSettings/getSettingValueByName']('isite::phones'),
        loading: false,
        success: false,
        drawerPoint: false,
        meta: parseInt(this.$store.getters['qsiteSettings/getSettingValueByName']('iredeems::points-month')),
        min: 0,
        step: 40,
        pointsGroup: [],
        acumulados: 0,
        itemsRedeems: [],
        userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
        userPointsAvailables: 0,
        userItemsRedeems: [],
        tableColumns: [
          /*
          {
            name: 'id',
            field: 'id',
            label: 'ID',
            align: 'left',
            sortable: true
          },
          */
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
        tableData: [],
        tableUserItemsRedeems: [],
        tableUserAllPoints:[],
        tableColumnsAllPoints: [
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
            sortable: true,
            format: val => this.fPoints(val),
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

        // Points Availables to User
        await this.getPointsUser().catch(error => {})

        // Items User redeems
        await this.getRedeemsItemsUser().catch(error => {})

         // Items to Redeem
        await this.getItems().catch(error => {})

        // Historic group
        await this.getHistoryPoints().catch(error => {})

        // All points User
        await this.getAllPointsByUser().catch(error => {})

        this.loading = false
        this.success = true

      },
      // Get Points History Group
      getHistoryPoints(){
        return new Promise((resolve, reject) => {
          //Params
          let params = {
            params: {
              filter: {
                userId: this.$store.state.quserAuth.userId,
                type: 'groupTotalPointsUser'
              }
            }
          }

          http.get(config('apiRoutes.qredeems.calculates'),params)
            .then(response => {

              this.pointsGroup = response.data.data
              for (let i=0;i<this.pointsGroup.length;i++) {
                this.acumulados += parseInt(this.pointsGroup[i].total)
              }
              resolve(true);

            })
            .catch(error => {
              reject(error);
            });
        })
      },
      // Get Items Random
      getItems(){
        return new Promise((resolve, reject) => {

          this.itemsRedeems = []

          //Params
          let params = {
           // refresh: true,
            params: {
              filter: {exclude:this.userItemsRedeems,random:true},
              take: 2
            }
          }

          this.$crud.index("apiRoutes.qredeems.items",params).then(response => {
            this.itemsRedeems = response.data
            this.loading = false
            resolve(true)//Resolve
          }).catch(error => {
           // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            reject(false)//Resolve
          })

        })
      },
      // Get Points Available User
      getPointsUser(){
        return new Promise((resolve, reject) => {

          this.userPointsAvailables = 0

          //Params
          let params = {
            params: {
              filter: {
                userId: this.userId,
                type: 'availablePointsUser'
              }
            }
          }

          http.get(config('apiRoutes.qredeems.calculates'),params)
            .then(response => {

              if(response.data.data.points>0)
                this.userPointsAvailables = response.data.data.points

              //console.warn("*** GET POINTS USER - Puntos Disponibles:"+this.userPointsAvailables )
              resolve(true);

            })
            .catch(error => {
              reject(error);
            });
        })
      },
      // Redeem Item
      redeemItem(item){

        this.loading = true

        let data = {
          'user_id': this.userId,
          'item_id': item.id,
          'description': item.name,
          'points' : item.value
        }


        this.$crud.create('apiRoutes.qredeems.redeems', data).then(response => {

          //console.warn('*** CREATE REDEEMS REDEEMS')

          // Points Availables to User (Account - Menu - Lateral)
          //this.emitChangePoints()

          this.getPointsUser()

          // Items User redeems
          this.userItemsRedeems.push(item.id)
          this.getRedeemsItemsUser()

          // Items to Redeem
          this.getItems()

          // Notify MSG
	        this.itemRedemed = item.name
	        this.showConfirm = true
          /*this.$q.notify({
            color:'green',
            message: 'Item Canjeado!!',
            position: 'bottom-right'
          })*/

        }).catch(error => {
          //console.error('[CREATE REDEEMS REDEEMS] ', error)
          this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
          this.loading = false
        })


      },
      // Get redeems ITEMS ID for a User
      getRedeemsItemsUser(){
        return new Promise((resolve, reject) => {

          this.tableUserItemsRedeems = []

          //Params
          let params = {
           // refresh: true,
            params: {
              filter: {userId:this.userId}
            }
          }

          this.$crud.index("apiRoutes.qredeems.redeems",params).then(response => {

            this.tableUserItemsRedeems = response.data

            response.data.forEach((redeems, index) => {
              this.userItemsRedeems.push(redeems.itemId)
            });

            //console.warn("*** GET REDEEMS ITEMS ")

            resolve(true)//Resolve
          }).catch(error => {
           // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            reject(false)//Resolve
          })

        })
      },
      // CHange Points Availables
      emitChangePoints(){
        this.$emit('changePoints',true);
      },
      // Get ALL Points that User has Won
      getAllPointsByUser(){
        return new Promise((resolve, reject) => {
          //Params
          let params = {
            params: {
              filter: {
                userId: this.$store.state.quserAuth.userId,
              }
            }
          }

          this.$crud.index('apiRoutes.qredeems.points',params)
            .then(response => {

              this.tableUserAllPoints = response.data
              //console.warn("*** GET ALL POINTS BY USER ")
              resolve(true);

            })
            .catch(error => {
              //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              console.error("*** GET ALL POINTS BY USER - ERROR")
              reject(error);
            });
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
.page-puntos
  .q-slider
    color $primary
    &__track-container
      height 4px
      background $secondary
    .q-slider__pin-value-marker:before
      content ''
      position absolute
      bottom 30px
      background-image url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26.66 42.66'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:%23fd2d5e;}%3C/style%3E%3C/defs%3E%3Ctitle%3Epuntos%3C/title%3E%3Cg id='Capa_2' data-name='Capa 2'%3E%3Cg id='home'%3E%3Cpath class='cls-1' d='M17.33,8a4,4,0,1,0-4-4A4,4,0,0,0,17.33,8ZM25.2,20.42l-1.94-1L22.45,17a9.08,9.08,0,0,0-8.51-6.33c-3,0-4.66.85-7.78,2.1A8,8,0,0,0,2,16.61l-.56,1.14a2.67,2.67,0,0,0,1.19,3.57,2.63,2.63,0,0,0,3.54-1.19L6.75,19a2.61,2.61,0,0,1,1.37-1.29l2.23-.9L9.09,21.87a5.33,5.33,0,0,0,1.24,4.9l5,5.45a5.42,5.42,0,0,1,1.24,2.31l1.53,6.1a2.66,2.66,0,1,0,5.17-1.29l-1.85-7.41a5.36,5.36,0,0,0-1.24-2.31l-3.79-4.14,1.43-5.73.46,1.38a5.29,5.29,0,0,0,2.64,3.08l1.94,1A2.62,2.62,0,0,0,26.39,24a2.69,2.69,0,0,0-1.19-3.58ZM6.13,32.14A5.17,5.17,0,0,1,5,33.93L.78,38.11a2.67,2.67,0,1,0,3.77,3.77l5-5a5.58,5.58,0,0,0,1.18-1.79l1.12-2.81c-4.6-5-3.22-3.49-4-4.48Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      height 40px
      width 100%
      background-repeat no-repeat
      background-size contain
      background-position center
  .avatar-main
    img
      border 4px solid $secondary

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
      line-height 2.125rem
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

  @media screen and (max-width: $breakpoint-xs)
    .title
      font-size 20px
    .q-card__section
      padding-top 15px
      .q-avatar
        font-size 60px !important
      #copa
        max-height 60px
    .canjear
      padding-left 30px
      padding-top 0
      .btn
        font-size 15px  !important
</style>
