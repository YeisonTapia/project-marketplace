<template>
  <div class="quser-profile">

    <div v-if="success" class="quser-content">

    <div class="title-principal q-mb-xl">
      <h3 class="font-family-secondary q-mt-none q-mb-md">Completa el formulario y <span class="text-tertiary">obten 10 puntos</span> para obtener <span class="text-tertiary">Premios y Descuentos.</span></h3>
      <small class="q-mb-xl">Los datos de este formulario seran usados para adaptar las promociones y busquedas de tiendas a sus necesidades</small>
    </div>
    
    <!--Form Personal-->
    <div class="form-personal bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">
      
      <h3 class="title-label-orange text-center">
        <div>Informacion Personal</div>
      </h3>

      <!--Firstname--> <!--Lastname-->
      <div class="row q-col-gutter-lg">

        <div class="col">
          <!--Firstname-->
          <q-input v-model="form.firstName" stack-label :label="`* ${$trp('ui.form.firstName')}`"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
        </div>

        <div class="col">
          <!--Lastname-->
          <q-input v-model="form.lastName" stack-label :label="`* ${$trp('ui.form.lastName')}`"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
        </div>

      </div>

      <!--Username-->  <!--Nickname-->
      <div class="row q-col-gutter-lg">
        <div class="col">
          <!--Username-->
          <q-input v-model="form.fields.userName.value" stack-label :label="`Nombre de Usuario`"/>
        </div>
        <div class="col">
          <!--Nickname-->
          <q-input v-model="form.fields.nickName.value" stack-label :label="`* ¿Algùn apodo?`"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
        </div>
      </div>

       <!--Birthday-->  <!--Country and City-->
      <div class="row q-col-gutter-lg">
        <div class="col">
          <!--Birthday-->
          <q-input v-model="form.fields.birthday.value" mask="date" placeholder="YYYY/MM/DD" label="* Fecha de Nacimiento" :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.fields.birthday.value" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col">
          <!--Country and City-->
          <div class="row q-mb-lg q-col-gutter-md">
            <!-- Country -->
            <div class="col-12 col-sm-6">
              <q-select 
                    label="* País"
                    stack-label
                    emit-value
                    map-options
                    v-model="form.fields.country.value" 
                    :options="countryOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                    @input="getCities(form.fields.country.value,'CiO')"/>
            </div>
            <!-- City -->
            <div class="col-12 col-sm-6">
                <q-select 
                    label="* Ciudad"
                    stack-label
                    emit-value
                    map-options
                    v-model="form.fields.city.value" 
                    :options="cityOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
            </div>
          </div>

        </div>

      </div>

      <!--Civil State--> <!--Sex-->
      <div class="row q-col-gutter-lg">
        <div class="col">
           <!--Civil State-->
          <q-select label="Estado Civil" stack-label
                    v-model="form.fields.civilState.value" 
                    :options="civilStateOptions"/>
        </div>
        <div class="col">
          <!--Sex-->
          <!--
          <q-field borderless label="* Sexo" stack-label 
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:control>
                <q-option-group inline left-label v-model="form.fields.sex.value" 
                :options="sexOptions" 
                color="primary"/>
            </template>
          </q-field>
          -->
          <!--Sex-->
          <q-field borderless label="* Sexo" stack-label>
            <template v-slot:control>
                <q-option-group inline left-label v-model="form.fields.sex.value" 
                :options="sexOptions" 
                color="primary"/>
            </template>
          </q-field>
        </div>
      </div>

      <!--Academic Leven--> <!--Sons-->
      <div class="row q-col-gutter-lg">
        <div class="col">
          <!--Academic Leven-->
          <q-select label="Nivel Académico" stack-label
                    v-model="form.fields.academicLevel.value" 
                    :options="academicLevelOptions"/>
        </div>
        <div class="col">
          <!--Sons-->
          <q-field  borderless label="Hijos" stack-label>
            <template v-slot:control>
               <q-option-group inline left-label v-model="form.fields.sons.value" 
                :options="sonsOptions" 
                color="primary"/>
            </template>
          </q-field>
        </div>
      </div>


      <!-- Infor Required -->
      <div class="row q-mt-md">
          <small class="infor-required text-primary text-weight-medium">* Campo Obligatorio</small>
      </div>

    </div>

    <!--Form Contacto-->
    <div class="form-contact bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">
      
      <h3 class="title-label-orange text-center">
        <div>Información de Contacto</div>
      </h3>

      <!-- Phone--> <!--Email-->
      <div class="row q-col-gutter-lg">
        <div class="col">
          <!-- Phone-->
          <q-input v-model="form.fields.cellularPhone.value" unmasked-value
                   inputmode="numeric" mask="(###) ### - ####" :label="`* ${$tr('ui.form.phone')} *`"
                   :rules="[
                    val => !!val || $tr('ui.message.fieldRequired'),
                    val => !val || val.length == 10 || $tr('ui.message.fieldMinLeng',{num : 10})
                   ]"
                   />

        </div>
        <div class="col">
          <!--Email-->
          <q-input v-model="form.email" :label="`* ${$trp('ui.form.email')}`"
                   :rules="[
                     val => !!val || $tr('ui.message.fieldRequired'),
                     val => $helper.validateEmail(val) || $tr('ui.message.fieldEmail')
                   ]"/>
        </div>
      </div>

      <!-- Country of residence ADDRESS --> <!-- City ​​of residence ADDRESS STATE -->
      <div class="row q-col-gutter-lg">
        <div class="col">
          <!-- Country of residence ADDRESS -->
          <q-select 
                    label="* País de residencia"
                    stack-label
                    emit-value
                    map-options
                    v-model="address.countryId" 
                    :options="countryResidenceOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                    @input="getCities(address.countryId,'CiRO')"/>
          
        </div>
        <div class="col">
          <!-- City ​​of residence ADDRESS STATE -->
          <q-select 
                    label="* Ciudad de residencia"
                    stack-label
                    emit-value
                    map-options
                    v-model="address.stateId" 
                    :options="cityResidenceOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
          
        </div>
      </div>

      <!-- Neighborhood --> <!--Address NEW ADDRESS-->
      <div class="row q-col-gutter-lg">
        <div class="col">
          <!-- Neighborhood -->
          <q-select label="Barrio" stack-label
                    emit-value
                    map-options
                    v-model="address.neighborhoodId" 
                    :options="neighborhoodOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
        </div>
        <div class="col">
          <!--Address NEW ADDRESS-->
          <q-input v-model="address.address1" stack-label :label="`* Dirección`"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
        </div>
      </div>

      <!-- Social -->
      <div class="row q-col-gutter-lg social">
        
        <div class="col-12">
          <p class="caption q-mb-xs">Como apareces en tus redes sociales</p>
        </div>
        
        <!--Twitter-->
        <div class="col">
          <q-input v-model="form.fields.twitter.value" stack-label :label="`Twitter`">
            <template v-slot:prepend>
              <q-icon name="fab fa-twitter" />
            </template>
          </q-input>
        </div>

        <!--Facebook-->
        <div class="col">
          <q-input v-model="form.fields.facebook.value" stack-label :label="`Facebook`">
            <template v-slot:prepend>
              <q-icon name="fab fa-facebook" />
            </template>
          </q-input>
        </div>

        <!--Instagram-->
        <div class="col">
          <q-input v-model="form.fields.instagram.value" stack-label :label="`Instagram`">
            <template v-slot:prepend>
              <q-icon name="fab fa-instagram" />
            </template>
          </q-input>
        </div>

      </div>

      <!-- Infor Required -->
      <div class="row q-mt-lg">
          <small class="infor-required text-primary text-weight-medium">* Campo Obligatorio</small>
      </div>

    </div>

    <!--Form Gustos-->
    <div class="form-pleasures bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">

      <h3 class="title-label-orange text-center">
        <div>Tus Gustos</div>
      </h3>

      <!-- Leisure -->  <!-- Favorite Movie -->
      <div class="row q-col-gutter-lg">
        
        <div class="col">
          <!-- Leisure -->
          <q-select label="* Ocio (Gustos)" stack-label
                    multiple
                    v-model="form.fields.leisures.value" 
                    :options="leisureOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
        </div>

        <div class="col">
          <!--Favorite Movie-->
          <q-input v-model="form.fields.favoriteMovie.value" stack-label :label="`Pelicula Favorita`"/>
        </div>

      </div>

      <!-- Favorite Serie --> <!-- Favorite Team -->
      <div class="row q-col-gutter-lg">
        
        <div class="col">
          <!-- Favorite Serie -->
          <q-input v-model="form.fields.favoriteSerie.value" stack-label :label="`Serie Favorita`"/>
        </div>

        <div class="col">
          <!-- Favorite Team -->
           <q-input v-model="form.fields.favoriteTeam.value" stack-label :label="`Equipo Favorito`"/>
        </div>

      </div>

      <!-- Promotions -->
      <div class="row q-col-gutter-lg q-mt-sm">
        <div class="col">
          <!-- Promotions -->
          <q-select label="* ¿De que te gustaria recibir la promoción?" stack-label
                    multiple
                    v-model="form.fields.promotions.value" 
                    :options="promotionOptions"
                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>

        </div>
        <div class="col">
          
        </div>
      </div>


      <!--Importants Dates-->
      <div class="row q-col-gutter-lg">

        <div class="col-12">
          <p class="caption q-mb-none">Fechas importantes para ti</p>
        </div>

        <!--Important Date 1-->
        <div class="col">
          <q-input v-model="form.fields.importantDate1.value" mask="date" placeholder="YYYY/MM/DD">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.fields.importantDate1.value" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <!--Important Date Why 1-->
        <div class="col">
          <q-input v-model="form.fields.importantDate1Why.value" stack-label :label="`¿Por que?`"/>
        </div>

        <!--Important Date 2-->
        <div class="col">
          <q-input v-model="form.fields.importantDate2.value" mask="date" placeholder="YYYY/MM/DD" >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.fields.importantDate2.value" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <!--Important Date Why 2-->
        <div class="col">
          <q-input v-model="form.fields.importantDate2Why.value" stack-label :label="`¿Por que?`"/>
        </div>

      </div>

      <!-- Infor Required -->
      <div class="row q-mt-md">
          <small class="infor-required text-primary text-weight-medium">* Campo Obligatorio</small>
      </div>

    </div>

    <!--Form Como conociste-->
    <div class="form-meet bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">

      <h3 class="title-label-orange text-center">
        <div>Como conociste la Página</div>
      </h3>

      <!--Radio --> <!--Redes Sociales -->
      <div class="row q-col-gutter-lg">

        <div class="col">
          <!--Radio -->
          <div class="col-12 q-mb-md">
            <q-radio v-model="form.fields.meetUs.value" 
                  val="radio" left-label label="Radio"/>
          </div>

        </div>

        <div class="col">

          <!--Redes Sociales -->
          <div class="col-12 q-mb-md">
            <q-radio v-model="form.fields.meetUs.value" 
                  val="redes sociales" left-label label="Redes Sociales"/>
          </div>

        </div>
        
      </div>

      <!--Un amigo -->  <!--Otros -->
      <div class="row q-col-gutter-lg">
        
        <div class="col">
           <!--Un amigo -->
          <q-radio v-model="form.fields.meetUs.value" 
                  val="amigo" left-label label="Un amigo"/>
          <!-- Friend Name -->
          <q-input v-model="form.fields.friendUserName.value" placeholder="Escribe el nombre de usuario de tu amigo" />

        </div>

        <div class="col">
          <!--Otros -->
          <q-radio v-model="form.fields.meetUs.value" 
                  val="otros" left-label label="Otros"/>
          <!-- Other medio -->
          <q-input v-model="form.fields.otherMedio.value" placeholder="Cuentanos ¿cuál fue?" />
        </div>

      </div>

    </div>

    <!--Form Seguridad-->
    <div class="form-security bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">

      <h3 class="title-label-orange text-center">
        <div>Seguridad (cambiar contraseña)</div>
      </h3>

      <!-- NEW PASS --> <!-- CONFIRM NEW PASS -->
      <div class="row q-col-gutter-lg">
        
        <!-- NEW PASS -->
        <div class="col">
          <q-input stack-label :label="`Nueva Contraseña`" v-model="form.newPassword"
                     :type="isPwd ? 'password' : 'text'"
                     autocomplete="off"
                     name="password">

              <template v-slot:append>
               <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
          </q-input>
        </div>

        <!-- CONFIRM NEW PASS -->
        <div class="col">
          <q-input stack-label :label="`Confirmar Contraseña`" v-model="form.confirmNewPassword"
                     :type="isPwd ? 'password' : 'text'"
                     name="password"
                     autocomplete="off"
                     :rules="[ val => val == form.newPassword || $tr('ui.message.fieldCheckPassword')]">
            <template v-slot:append>
               <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
            </template>
          </q-input>
        </div>

      </div>

    </div>

    <!--Form Final policies and button update-->
    <div class="form-final bg-white rounded-md shadow-3 q-px-lg q-py-xl">
      <div class="row">

          <!--Policies-->
          <div class="col-12 col-sm-9 ">
              <q-list>
                <q-item tag="label">
                  <q-item-section avatar top>
                    <q-radio v-model="form.fields.policies.value" val="policies" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      Declaro conocer las políticas de Términos y Condiciones y autorizo el tratamiento de mis datos personales en la pagina web <span class='text-primary'>Donde Esta Esa Vaina</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
          </div>

          <!--Update button-->
          <div class="col-12 col-sm-3">
            <div class="text-right q-mt-sm">
                  <q-btn color="primary" :loading="loading" 
                    class="font-family-secondary btn-update text-white no-border" 
                    @click="updateData"
                  label="Actualizar"/>
            </div>
          </div>

      </div>
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
            address1:{required},
            neighborhoodId:{required},
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
        promotionOptions: [
          {
            label: 'Promo 1',
            value: 'promo1'
          },
           {
            label: 'Promo 2',
            value: 'promo2'
          },
           {
            label: 'Promo 3',
            value: 'promo3'
          },
        ],
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
        await this.setUserData()//Set user data
        await this.getCountries()// Get countries

        //console.warn("Field - country INIT: "+this.form.fields.country.value)

        if(this.form.fields.country.value!="" && this.form.fields.country.value!=null)
          await this.getCities(this.form.fields.country.value,'CiO')

        //console.warn("Field - address country INIT: "+this.form.fields.country.value)

        if(this.address.countryId!="" && this.address.countryId!=null)
          await this.getCities(this.address.countryId,'CiRO')
        this.success = true//Success page
        this.loading = false//Loading

      },
      //Set user data
      async setUserData() {
        let sessionData = await this.$cache.get.item('sessionData')//Get data from storage
        let userData = this.$clone(sessionData.userData)//Get user data
        //Convert fields
        userData.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields);

        this.form.id = this.$clone(userData.id)
        this.form.activated = this.$clone(userData.activated)
        this.form.firstName = this.$clone(userData.firstName)
        this.form.lastName = this.$clone(userData.lastName)
        this.form.email = this.$clone(userData.email)
        this.form.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields)

        //Add address infor
        if(userData.addresses.length>0){
          for (let i=0;i<userData.addresses.length;i++) {
            // Get just Address Contact
            if(userData.addresses[i].type=="contact"){

              this.address.id = userData.addresses[i].id
              this.address.firstName = userData.addresses[i].firstName
              this.address.lastName = userData.addresses[i].lastName
              this.address.type = userData.addresses[i].type
              this.address.address1 = userData.addresses[i].address1
              this.address.country = userData.addresses[i].country
              this.address.countryId = parseInt(userData.addresses[i].country_id)
              this.address.state = userData.addresses[i].state
              this.address.stateId = parseInt(userData.addresses[i].state_id)
              this.address.neighborhood = userData.addresses[i].neighborhood
              this.address.neighborhoodId = parseInt(userData.addresses[i].neighborhood_id)
              break
            }
          }
        }else{
          this.address.firstName = this.form.firstName
          this.address.lastName = this.form.lastName
        }

        //console.warn(this.address)

      },
      //update data
      updateData() {
        this.$v.$touch()//Validate form
        //Check validation
        if (!this.$v.$error) {
          
          //this.loading = true//Loading
          let data = this.$clone(this.form)//Fet form data
          data.fields = this.$helper.convertToBackField(data.fields)//Convert fields

          // Add new password
          if(data.newPassword!="" && this.checkNewPassword())
            data.password = data.newPassword

          // Add adress infor
          data.addresses.push(this.address)

          //Request
          this.$crud.update('apiRoutes.quser.users', data.id, data).then(response => {
            this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
            this.loading = false//Login
            this.checkPointsProccess() // Check points to register
            this.updateUserData()//update local userData
          }).catch(error => {
            console.error('[UPDATE PROFILE] ', error)
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
          })
         

        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Update user local data
      async updateUserData() {
        let userData = this.$clone(this.form)//Get form data
        let sessionData = await this.$cache.get.item('sessionData')//Get session data
        userData.fields = this.$helper.convertToBackField(userData.fields)//Convert fields
        sessionData.userData = this.$clone(Object.assign({}, sessionData.userData, userData))//Merge with current data
        await this.$store.dispatch('quserAuth/AUTH_UPDATE')//Update session data
      },
      //Mask phone
      maskPhone() {
        this.$nextTick(() => {
          let phone = this.$clone(this.form.fields.cellularPhone.value)
          let maskedPhone = this.$helper.maskPhone(phone)
          this.form.fields.cellularPhone.value = this.$clone(maskedPhone)
        })
      },
      //Check if new password is same with confirmation
      checkNewPassword() {
        if (this.form.newPassword != this.form.confirmNewPassword) {
          this.classError = "errorInput"
          return false
        }

        this.classError = ""
        return true
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
      // Get Cities from ilocations
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
      // Check Points Proccess
      async checkPointsProccess(){

        let checkPointRegister = this.$store.getters['qsiteSettings/getSettingValueByName']('iredeems::points-per-register-user-completed-checkbox')

        // Check active register user points
        if(checkPointRegister) {
          let pointPerRegister = this.$store.getters['qsiteSettings/getSettingValueByName']('iredeems::points-per-register-user-completed')
          if(pointPerRegister>0){

            await this.getPointsRegister()
            // User hasn't points for register
            if(this.checkPU.length==0){
              this.savePointsRegister(pointPerRegister)
            }
            
          }
        } 
         
      },
      // Get if the user has points per register
      getPointsRegister(){
        return new Promise((resolve, reject) => {

          //Params
          let params = {
            params: {
              filter: {
                userId: this.form.id,
                type: 'user-register-completed'
              }
            }
          }

          this.$crud.index("apiRoutes.qredeems.points",params).then(response => {
               
            this.checkPU = response.data
            resolve(true)//Resolve

          }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                
            reject(false)//Resolve
          })
        })
      },
      // Save Points
      savePointsRegister(pointPerRegister){

        let data = {
          user_id: this.form.id,
          pointable_id: this.form.id,
          pointable_type: 'Modules\\User\\Entities\\Sentinel\\User',
          type: 'user-register-completed',
          points: pointPerRegister,
          description: 'Puntos por completar registro'
        }

        this.$crud.create('apiRoutes.qredeems.points', data).then(response => {
          //console.warn("SAVE IREDEEMS - POINTS PER REGISTER")
        }).catch(error => {
          console.error('[CREATE IREDEEMS - POINTS PER REGISTER COMPLETED] ', error)
          this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
        })

      } 


    }
  }

</script> 

<style lang="stylus">
  
  #profilePage
    .form-title
      color $primary
  .q-select, .q-datetime-input
    & .q-icon  
     color $primary
     
  .form-personal, .form-pleasures, .form-security
    .title-label-orange
      background-color $primary
      
  .form-personal, .form-contact, .form-pleasures, .form-meet, .form-security
    margin-bottom 80px !important
    .title-label-orange
      font-size 20px
      padding 3px 20px
      position absolute
      left 10px
      &:before
        right -40px
        
  .btn-update
    &:after
      content ''
      background-image url('/statics/img/arrow-send-pink.png')
      background-repeat no-repeat
      background-size contain
      width 74px
      height 100px
      top -4px
      left -50px
      position absolute
      
  .title-principal
    margin-bottom 65px
    h3
      font-size 25px
      line-height 30px
      color #4D4D4D
    small
      font-size 15px
      font-family 'Trebuchet MS'

  .social
    .fa-twitter
      color #00ACEE
    .fa-facebook
      color #3B5998
    .fa-instagram
      color $primary
      
  .infor-required, .form-final .q-option-label
    font-family 'Trebuchet MS'
    
  .form-final
    .q-btn
      border-radius 0px
      .q-btn-inner
        text-transform none
      
  .errorInput
    .q-if
      &:before
        border-bottom 2px solid $primary
</style>