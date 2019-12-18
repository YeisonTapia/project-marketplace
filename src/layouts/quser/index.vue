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
                      50
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="q-pl-md text-white q-py-md">Total de <br>puntos</div>
                  </div>
                </div>

              </div>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="row items-center bg-red full-height">
                  <div class="col-5 bg-red-8 full-height">
                    <div class="row full-height justify-center items-center text-white text-h5">
                      150
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
                      250
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
                <q-icon name="fas fa-store" class="q-mr-md" /> Mis Tiendas destacadas
              </div>

              <div class="row q-col-gutter-md justify-center">
                <div class="col-xs-6 col-sm-4 col-md-3" v-for="store in stores">
                  <q-card class="card-store text-center">
                    <q-card-section>
                      <div class="row card-seguidor">
                        <div class="col-12">
                          <q-avatar size="90px">
                            <img :src="store.logo.path">
                          </q-avatar>
                        </div>
                        <div class="col-12">
                          <div class="text-subtitle1 q-mt-sm">{{store.name}}</div>
                          <q-rating size="20px" v-model="store.averageRating" :max="5" v-if="store.averageRating"/>
                        </div>
                      </div>
                    </q-card-section>
                    <q-separator inset />

                    <q-card-actions vertical align="center">
                      <q-btn flat color="primary" no-caps class="text-bold" label="Ver Perfil" />
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
        stores:  [
          {
              name: 'Tienda 1',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          },
          {
              name: 'Tienda 2',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          },
                          {
              name: 'Tienda 3',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          },
          {
              name: 'Tienda 4',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          },
          {
              name: 'Tienda 5',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          },
          {
              name: 'Tienda 6',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          },
          {
              name: 'Tienda 7',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          },
          {
              name: 'Tienda 8',
              logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
              averageRating: 3
          }
          ]
      }
    },
    methods: {
      //init
      async init() {
       

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
