<template>
  <div class="quser-profile ">

    <div v-if="success" class="quser-content">

      <div class="row items-center form-general">
        <!-- Informacion Personal -->
        <q-card class="rounded-md q-mb-xl full-width">
          <div class="q-pl-md">
            <h3 class="title-label-profile bg-primary">
              <div>Informacion personal</div>
            </h3>
          </div>
          <q-card-section class="q-pa-xl">

            <div class="row q-col-gutter-lg">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!--Firstname-->
                <q-input disable class="requeried" v-model="form.firstName" stack-label :label="`${$trp('ui.form.firstName')}`"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!--Lastname-->
                <q-input disable class="requeried" v-model="form.lastName" stack-label :label="`${$trp('ui.form.lastName')}`"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
              </div>


              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!--Nickname-->
                <q-input disable class="requeried" v-model="form.fields.nickName.value" stack-label :label="`¿Algùn apodo?`"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!--Birthday-->
                <q-input disable class="requeried" v-model="form.fields.birthday.value" mask="date" placeholder="YYYY/MM/DD" label="Fecha de Nacimiento" :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
                  <template v-slot:append>
                    <q-icon name="event" color="primary" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.fields.birthday.value" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!--Civil State-->
                <q-select disable label="Estado Civil" stack-label
                    v-model="form.fields.civilState.value"
                    :options="civilStateOptions"/>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!-- country -->
                <q-select
                    disable
                    label="País"
                    class="requeried"
                    stack-label
                    emit-value
                    map-options
                    v-model="form.fields.country.value"
                    :options="countryOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                    @input="getCities(form.fields.country.value,'CiO')"/>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!--State - Province-->
                <q-select
                    disable
                    label="Departamento"
                    class="requeried"
                    stack-label
                    emit-value
                    map-options
                    v-model="form.fields.city.value"
                    :options="cityOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                <!--Academic Leven-->
                <q-select disable label="Nivel Académico" stack-label
                    v-model="form.fields.academicLevel.value"
                    :options="academicLevelOptions"/>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <!-- Sexo -->
                <p class="caption q-mb-sm"><span class="text-primary">*</span> Sexo</p>
                <div class="text-center">
                  <q-option-group disable inline left-label keep-color v-model="form.fields.sex.value"
                :options="sexOptions"
                color="primary"/>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <!--Sons-->
                <p class="caption q-mb-sm"> Hijos</p>
                <div class="text-center">
                  <q-option-group disable inline left-label keep-color v-model="form.fields.sons.value"
                  :options="sonsOptions"
                  color="primary"/>
                </div>
              </div>

            </div>

          </q-card-section>
        </q-card>

        <div class="q-my-md full-width"></div>

      </div>

    </div><!--End if success-->

    <!--Inner loading-->
    <inner-loading :visible="loading"/>

  </div>
</template>

<script>

  import http from "axios"

  //Plugins
  import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
  import alert from '@imagina/qhelper/_plugins/alert'

  export default {
    props: {},
    components: {},
    watch: {},
    validations() {
      return {
        form: {
          firstName: {required},
          lastName: {required},
          email: {required, email},
          newPassword: {minLength: minLength(8)},
          confirmNewPassword: {minLength: minLength(8),sameAsPassword: sameAs('newPassword')},
          fields: {
            nickName: {
              value: {required}
            },
            birthday: {
              value: {required}
            },
            country: {
              value: {required}
            },
            city: {
              value: {required}
            },
            cellularPhone: {
              value: {required, minLength: minLength(10)}
            },
            /*
            countryResidence: {
              value: {required}
            },
            cityResidence: {
              value: {required}
            },
            address: {
              value: {required}
            },
            */
            leisures: {
              value: {required}
            },
            promotions: {
              value: {required}
            },
          }
        },
        address:{
            countryId:{required},
            stateId:{required},
            cityId:{required},
            address1:{required},
            neighborhood:{required}
            //neighborhoodId:{required},
        }
      }
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
        classError: 'nada',
        form: {
          firstName: null,
          lastName: null,
          email: null,
          password: '',
          newPassword: '',
          confirmNewPassword: '',
          fields: {},
          addresses:[]
        },
        address: {
            id: null,
            firstName: null,
            lastName: null,
            type: 'contact',
            address1: null,
            country: null,
            countryId: null,
            state: null,
            stateId: null,
            city: null,
            cityId: null,
            neighborhood: null,
            neighborhoodId: null
        },
        civilStateOptions: [
          {
            label: 'Soltero',
            value: 'soltero'
          },
          {
            label: 'Casado',
            value: 'casado'
          },
          {
            label: 'Viudo',
            value: 'viudo'
          }
        ],
        academicLevelOptions: [
          {
            label: 'Bachiller',
            value: 'bachiller'
          },
          {
            label: 'Profesional',
            value: 'profesional'
          },
        ],
        countryOptions: [],
        cityOptions: [],
        countryResidenceOptions: [],
        cityResidenceOptions: [],
        city2ResidenceOptions: [],
        neighborhoodOptions: [
          {
            label: 'Barrio 1',
            value: 1
          },
          {
            label: 'Barrio 2',
            value: 2
          },
          {
            label: 'Barrio 3',
            value: 3
          }
        ],
        leisureOptions: [
          {
            label: 'Gusto 1',
            value: 'gusto1'
          },
           {
            label: 'Gusto 2',
            value: 'gusto2'
          },
           {
            label: 'Gusto 3',
            value: 'gusto3'
          },
        ],
        promotionOptions: [],
        checkPU: null,
        sexOptions: [
          {
            label: 'Hombre',
            value: 'hombre'
          },
          {
            label: 'Mujer',
            value: 'mujer'
          },
        ],
        sonsOptions: [
          {
            label: 'Si',
            value: 'si'
          },
          {
            label: 'No',
            value: 'no'
          },
        ],
        isPwd: true,
        userId: this.$route.params.userId,
        userGetData: [],
      }
    },
    computed: {
      defaultFields() {
        return [
          {name: 'mainImage', value: {}},
          {name: 'userName', value: null},
          {name: 'birthday', value: null},
          {name: 'civilState', value: null},
          {name: 'academicLevel', value: null},
          {name: 'policies', value: true},
          {name: 'nickName', value: null},
          {name: 'city', value: null},
          {name: 'country', value: null},
          {name: 'sex', value: null},
          {name: 'sons', value: null},
          {name: 'cellularPhone', value: null},
          //{name: 'countryResidence', value: null},
          //{name: 'cityResidence', value: null},
          //{name: 'address', value: null},
          {name: 'twitter', value: null},
          {name: 'facebook', value: null},
          {name: 'instagram', value: null},
          {name: 'leisures', value: []},
          {name: 'favoriteSerie', value: null},
          {name: 'favoriteMovie', value: null},
          {name: 'favoriteTeam', value: null},
          {name: 'promotions', value: []},
          {name: 'importantDate1', value: null},
          {name: 'importantDate1Why', value: null},
          {name: 'importantDate2', value: null},
          {name: 'importantDate2Why', value: null},
          {name: 'meetUs', value: null},
          {name: 'friendUserName', value: null},
          {name: 'otherMedio', value: null},
        ]
      }
    },
    methods: {
      //init
      async init() {
        this.loading = true//Loading

        this.form.fields = this.$clone(this.defaultFields)//Set default fields
        await this.getInforUser()

        await this.getCountries()// Get countries

        // Get Provinces
        if(this.form.fields.country.value!="" && this.form.fields.country.value!=null)
          await this.getCities(this.form.fields.country.value,'CiO')

        // Get Provinces
        if(this.address.countryId!="" && this.address.countryId!=null)
          await this.getCities(this.address.countryId,'CiRO')

        // Get Cities
        if(this.address.stateId!="" && this.address.stateId!=null)
          await this.getCities2(this.address.stateId,'CiRO')

        // Get Promotions
        //await this.getCategoriesStore()

        this.success = true//Success page
        this.loading = false//Loading

      },
      //Set user data
      setUserData() {

        let userData = this.$clone(this.userGetData)//Get user data

        //Convert fields
        userData.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields);

        this.form.id = this.$clone(userData.id)
        this.form.activated = this.$clone(userData.activated)
        this.form.firstName = this.$clone(userData.firstName)
        this.form.lastName = this.$clone(userData.lastName)
        this.form.email = this.$clone(userData.email)
        this.form.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields)



        //console.warn(this.address)

      },
      // Get Countries from ilocations
      getCountries(){
        return new Promise((resolve, reject) => {

            //let apiUrl = '/countries'

            http.get(config('apiRoutes.ilocations.countries'))
            .then(response => {
              response.data.data.forEach(data => {
                this.countryOptions.push({
                  label:data.name,
                  value:data.id
                })

                this.countryResidenceOptions = this.countryOptions

              })
              resolve(true);
            })
            .catch(error => {
              reject(error);
            });


        })
      },
      // Get Cities (Provinces- State) from ilocations
      getCities(countryModel,cityOptions){
        return new Promise((resolve, reject) => {

            if(countryModel.value!=undefined)
              countryModel = countryModel.value

            //console.warn("get Cities - CountryID : "+countryModel)
            //console.warn("get Cities - CityOptions : "+cityOptions)

            //let apiUrl = '/provinces'
            let params = {
              params: {
                filter: {country: countryModel}
              }
            }

            if(cityOptions == 'CiO'){
              this.cityOptions = []
              // Second time
              if(this.success==true)
                this.form.fields.city.value= null

            }

            if(cityOptions == 'CiRO'){
              this.cityResidenceOptions = []
              // Second time
              if(this.success==true)
                this.address.stateId = null

              // Clean Cities Select
              this.city2ResidenceOptions = []

            }



            http.get(config('apiRoutes.ilocations.provinces'), params)
            .then(response => {
              response.data.data.forEach(data => {

                if(cityOptions == 'CiO'){
                  this.cityOptions.push({
                    label:data.name,
                    value:data.id
                  })
                }
                if(cityOptions == 'CiRO'){
                  this.cityResidenceOptions.push({
                    label:data.name,
                    value:data.id
                  })
                }

              })
              resolve(true);
            })
            .catch(error => {
              reject(error);
            });
        })

      },
      // Get Cities from Ilocations
      getCities2(cityModel){

        //console.warn(cityModel)

        this.city2ResidenceOptions = []

        if(cityModel.value!=undefined)
          cityModel = cityModel.value


        let params = {
          params: {
            filter: {province_id: cityModel}
          }
        }

        this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
            //console.warn(response)
            response.data.forEach(data => {
              this.city2ResidenceOptions.push({
                label:data.name,
                value:data.id
              })
            })
        });

      },

      // Get Infor User
      getInforUser(){

        let criteria = this.userId
        let params = {
          //refresh: true,
          params: {
            include: 'fields',
          }
        }

        this.$crud.show('apiRoutes.quser.users',criteria,params).then(response => {
            this.userGetData = response.data
            this.setUserData() // Set Data


        }).catch(error => {
            console.error('[GET USER DATA] ', error)
        })

      }

    }
  }

</script>

<style lang="stylus">
.quser-profile
  .title-principal
    margin-bottom 65px
    h3
      font-size 25px
      line-height 30px
      color #4D4D4D
    small
      font-size 15px
      font-family 'Trebuchet MS'
  .title-label-profile
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
  .text-h6
    line-height 1.5rem
    color $secondary
    @media screen and (max-width: $breakpoint-sm)
      line-height 1rem
      font-sie 1rem
      margin-top 10px
      margin-bottom 20px

  .q-field__label
    color #444
    font-size 23px
    padding-bottom 60px
  .requeried
    .q-field__label:before
      color $primary
      content '* '
  .label-mini
    .q-field__label
      font-size 16px
      padding-bottom 20px
      color #888
  .btn-arrow-send-pink:after
    right 90px
</style>
