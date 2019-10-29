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

      <div class="row gutter-md">

        <!--Column Left-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">
          
          <!--Firstname-->
          <q-field class="q-mb-lg" :error="$v.form.firstName.$error" :error-label="$tr('ui.message.fieldRequired')">
              <p class="caption q-mb-xs"><span class="text-primary">*</span> {{$trp('ui.form.firstName')}}</p>
              <q-input v-model="form.firstName" :placeholder="`${$trp('ui.form.firstName')} `" />
          </q-field>

          <!--Username-->
          <q-field class="q-mb-lg">
              <p class="caption q-mb-xs">Nombre de Usuario</p>
              <q-input v-model="form.fields.userName.value" placeholder="Nombre de Usuario" />
          </q-field>

          <!--Birthday-->
          <q-field class="q-mb-lg" :error="$v.form.fields.birthday.value.$error" :error-label="$tr('ui.message.fieldRequired')">
              <p class="caption q-mb-xs"><span class="text-primary">*</span> Fecha de nacimiento</p>
              <q-datetime class="no-shadow"
                          v-model="form.fields.birthday.value"
                          placeholder="00/00/0000"
                          format="DD MMMM YYYY">
              </q-datetime>
          </q-field>  

          <!--Civil State-->
          <q-field class="q-mb-xl">
              <p class="caption q-mb-xs">Estado Civil</p>
              <q-select 
                v-model="form.fields.civilState.value" 
                :options="civilStateOptions"/>
          </q-field>

          <!--Academic Leven-->
          <q-field>
              <p class="caption q-mb-xs">Nivel Académico</p>
              <q-select 
                v-model="form.fields.academicLevel.value" 
                :options="academicLevelOptions"/>
          </q-field>

        </div>

        <!--Column Right-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">
        
          <!--Lastname-->
          <q-field class="q-mb-lg" :error="$v.form.lastName.$error" :error-label="$tr('ui.message.fieldRequired')">
              <p class="caption q-mb-xs"><span class="text-primary">*</span> {{$trp('ui.form.lastName')}}</p>
              <q-input v-model="form.lastName" :placeholder="`${$trp('ui.form.lastName')}`" />
          </q-field>

          <!--Nickname-->
          <q-field :error="$v.form.fields.nickName.value.$error" :error-label="$tr('ui.message.fieldRequired')">
              <p class="caption q-mb-xs"><span class="text-primary">*</span> ¿Algùn apodo?</p>
              <q-input v-model="form.fields.nickName.value" placeholder="¿Algùn apodo?" />
          </q-field>

          <!--Country and City-->
          <div class="row q-mb-lg gutter-md">
            <!-- Country -->
            <div class="col-12 col-sm-6">
                <q-field :error="$v.form.fields.country.value.$error" :error-label="$tr('ui.message.fieldRequired')">
                  <p class="caption q-mb-xs"><span class="text-primary">*</span> País</p>
                  <q-select 
                    v-model="form.fields.country.value" 
                    :options="countryOptions"
                    @input="getCities(form.fields.country.value,'CiO')"/>
                    
                </q-field>
            </div>
            <!-- City -->
            <div class="col-12 col-sm-6">
                <q-field :error="$v.form.fields.city.value.$error" :error-label="$tr('ui.message.fieldRequired')">
                  <p class="caption q-mb-xs"><span class="text-primary">*</span> Ciudad</p>
                  <q-select 
                    v-model="form.fields.city.value" 
                    :options="cityOptions"/>
                </q-field>  
            </div>
          </div>

          <!--Sex-->
          <q-field class="q-mb-xl">
              <p class="caption q-mb-xs"><span class="text-primary">*</span> Sexo</p>
              <div class="text-center">
                <q-radio v-model="form.fields.sex.value" 
                val="hombre" left-label label="Hombre" class="q-ml-md"/>
                <q-radio v-model="form.fields.sex.value" 
                val="mujer" left-label label="Mujer" class="q-ml-md"/>
              </div>
          </q-field>

          <!--Sons-->
          <q-field>
              <p class="caption q-mb-xs">Hijos</p>
              <div class="text-center">
                <q-radio v-model="form.fields.sons.value" 
                val="si" left-label label="Si" class="q-ml-xl"/>
                <q-radio v-model="form.fields.sons.value" 
                val="no" left-label label="No" class="q-ml-xl" />
              </div>
          </q-field>

        </div>

        <!-- Infor Required -->
        <div class="col-12">
          <small class="infor-required text-primary text-weight-medium">* Campo Obligatorio</small>
        </div>

      </div>
    </div>

    <!--Form Contacto-->
    <div class="form-contact bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">
      <h3 class="title-label-orange text-center">
        <div>Información de Contacto</div>
      </h3>

      <div class="row gutter-md">

        <!--Column Left-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">

          <!-- Phone-->
          <q-field :error="$v.form.fields.cellularPhone.value.$error"
                   :error-label="$tr('ui.message.fieldMinLeng', {num : 10})">
            <p class="caption q-mb-xs"><span class="text-primary">*</span> {{`${$tr('ui.form.phone')}`}}</p>
            <q-input type="text" v-model="form.fields.cellularPhone.value" pattern="[0-9]*"
                     @input="maskPhone" :maxlength="14" inputmode="numeric"
                     :placeholder="`${$tr('ui.form.phone')}`"/>
          </q-field>

          <!-- Country of residence ADDRESS -->
          <q-field :error="$v.address.countryId.$error" :error-label="$tr('ui.message.fieldRequired')">
                  <p class="caption q-mb-xs"><span class="text-primary">*</span> País de Residencia</p>
                  <q-select 
                    v-model="address.countryId" 
                    :options="countryResidenceOptions"
                    @input="getCities(address.countryId,'CiRO')"
                    />
          </q-field>

          <!-- Neighborhood -->
          <q-field :error="$v.address.neighborhoodId.$error" :error-label="$tr('ui.message.fieldRequired')">
                  <p class="caption q-mb-xs"><span class="text-primary">*</span> Barrio</p>
                  <q-select 
                    v-model="address.neighborhoodId" 
                    :options="neighborhoodOptions"/>
          </q-field>

        </div>

        <!--Column Right-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">

          <!--Email-->
          <q-field :error="$v.form.email.$error" :error-label="$tr('ui.message.fieldEmail')">
             <p class="caption q-mb-xs"><span class="text-primary">*</span> {{$trp('ui.form.email')}}</p>
            <q-input v-model="form.email" :placeholder="`${$trp('ui.form.email')}`"/>
          </q-field>

          <!-- City ​​of residence ADDRESS STATE -->
          <q-field :error="$v.address.stateId.$error" :error-label="$tr('ui.message.fieldRequired')">
                  <p class="caption q-mb-xs"><span class="text-primary">*</span> Ciudad de Residencia</p>
                  <q-select 
                    v-model="address.stateId" 
                    :options="cityResidenceOptions"/>
          </q-field>  
         
          <!--Address NEW ADDRESS-->
          <q-field class="q-mb-lg" :error="$v.address.address1.$error" :error-label="$tr('ui.message.fieldRequired')">
              <p class="caption q-mb-xs"><span class="text-primary">*</span> Dirección </p>
              <q-input v-model="address.address1" placeholder="Direccion" />
          </q-field>
        
        </div>

        <div class="col-12 q-py-sm">

          <!--Social-->
          <div class="row gutter-md social">

            <div class="col-12">
              <p class="caption q-mb-xs">Como apareces en tus redes sociales</p>
            </div>
            
            <!--Facebook-->
            <div class="col-12 col-sm-4">
              <q-field class="q-mb-lg">
                  <p class="caption q-mb-xs">
                    <q-icon name="fab fa-twitter" size="18px" class="q-mr-sm"></q-icon>Twitter
                  </p>
                  <q-input v-model="form.fields.twitter.value" placeholder="@username" />
              </q-field>
            </div>

            <!--Twitter-->
            <div class="col-12 col-sm-4">
              <q-field class="q-mb-lg">
                  <p class="caption q-mb-xs">
                    <q-icon name="fab fa-facebook" size="18px" class="q-mr-sm"></q-icon>Facebook
                  </p>
                  <q-input v-model="form.fields.facebook.value" placeholder="@username" />
              </q-field>
            </div>

            <!--Instagram-->
            <div class="col-12 col-sm-4">
              <q-field class="q-mb-lg">
                  <p class="caption q-mb-xs">
                    <q-icon name="fab fa-instagram" size="18px" class="q-mr-sm"></q-icon>Instagram
                  </p>
                  <q-input v-model="form.fields.instagram.value" placeholder="@username" />
              </q-field>
            </div>

          </div>

        </div>
        

        <!-- Infor Required -->
        <div class="col-12">
          <small class="infor-required text-primary">* Campo Obligatorio</small>
        </div>

      </div>
    </div>

    <!--Form Gustos-->
    <div class="form-pleasures bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">

      <h3 class="title-label-orange text-center">
        <div>Tus Gustos</div>
      </h3>

      <div class="row gutter-md">

        <!--Column Left-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">

          <!-- Leisure -->
          <q-field :error="$v.form.fields.leisures.value.$error" :error-label="$tr('ui.message.fieldRequired')">
                  <p class="caption q-mb-xs"><span class="text-primary">*</span> Ocio
                  (Gustos)</p>
                  <q-select 
                    multiple
                    v-model="form.fields.leisures.value" 
                    :options="leisureOptions"/>
          </q-field>

          <!-- Favorite Serie -->
          <q-field class="q-mb-lg">
              <p class="caption q-mb-xs">Serie Favorita</p>
              <q-input v-model="form.fields.favoriteSerie.value" placeholder="Serie Favorita" />
          </q-field>

          <!-- Promotions -->
          <q-field :error="$v.form.fields.promotions.value.$error" :error-label="$tr('ui.message.fieldRequired')">
                  <p class="caption q-mb-xs"><span class="text-primary">*</span> ¿De que te gustaria recibir la promoción?</p>
                  <q-select 
                    multiple
                    v-model="form.fields.promotions.value" 
                    :options="promotionOptions"/>
          </q-field>

        </div>

        <!--Column Right-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">

          <!-- Favorite Movie -->
          <q-field class="q-mb-lg">
              <p class="caption q-mb-xs">Pelicula Favorita</p>
              <q-input v-model="form.fields.favoriteMovie.value" placeholder="Pelicula Favorita" />
          </q-field>

          <!-- Favorite Team -->
          <q-field class="q-mb-lg">
              <p class="caption q-mb-xs">Equipo Favorito</p>
              <q-input v-model="form.fields.favoriteTeam.value" placeholder="Equipo Favorita" />
          </q-field>

        </div>

        <!--Importants Dates-->
        <div class="col-12 q-py-sm">

          <div class="col-12">
            <p class="caption q-mb-md">Fechas importantes para ti</p>
          </div>

          <div class="row gutter-md social">

            <!--Important Date 1-->
            <div class="col-12 col-sm-3">
              <q-field class="q-mb-lg">
                <p class="caption q-mb-xs">&nbsp</p>
                <q-datetime class="no-shadow"
                            v-model="form.fields.importantDate1.value"
                            placeholder="00/00/0000"
                            format="DD MMMM YYYY">
                </q-datetime>
              </q-field>  
            </div>

            <!--Important Date Why 1-->
            <div class="col-12 col-sm-3">
              <q-field class="q-mb-lg">
                  <p class="caption q-mb-xs">¿Por que?</p>
                  <q-input v-model="form.fields.importantDate1Why.value" />
              </q-field>
            </div>

            <!--Important Date 2-->
            <div class="col-12 col-sm-3">
              <q-field class="q-mb-lg">
                <p class="caption q-mb-xs">&nbsp</p>
                <q-datetime class="no-shadow"
                            v-model="form.fields.importantDate2.value"
                            placeholder="00/00/0000"
                            format="DD MMMM YYYY">
                </q-datetime>
              </q-field>  
            </div>

            <!--Important Date Why 2-->
            <div class="col-12 col-sm-3">
              <q-field class="q-mb-lg">
                  <p class="caption q-mb-xs">¿Por que?</p>
                  <q-input v-model="form.fields.importantDate2Why.value" />
              </q-field>
            </div>

          </div>

        </div>

        <!-- Infor Required -->
        <div class="col-12">
          <small class="infor-required text-primary">* Campo Obligatorio</small>
        </div>

      </div>

    </div>

    <!--Form Como conociste-->
    <div class="form-meet bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">

      <h3 class="title-label-orange text-center">
        <div>Como conociste la Página</div>
      </h3>

      <div class="row gutter-md">
        <!--Column Left-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">

          <!--Radio -->
          <div class="col-12 q-mb-md">
            <q-radio v-model="form.fields.meetUs.value" 
                  val="radio" left-label label="Radio"/>
          </div>

          <!--Un amigo -->
          <div class="col-12">
            <q-radio v-model="form.fields.meetUs.value" 
                  val="amigo" left-label label="Un amigo"/>
          </div>

          <!-- Friend Name -->
          <div class="col-12">
            <q-field class="q-mb-lg">
                <q-input v-model="form.fields.friendUserName.value" placeholder="Escribe el nombre de usuario de tu amigo" />
            </q-field>
          </div>
          

        </div>

        <!--Column Right-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">

          <!--Redes Sociales -->
          <div class="col-12 q-mb-md">
            <q-radio v-model="form.fields.meetUs.value" 
                  val="redes sociales" left-label label="Redes Sociales"/>
          </div>

          <!--Otros -->
          <div class="col-12">
            <q-radio v-model="form.fields.meetUs.value" 
                  val="otros" left-label label="Otros"/>
          </div>

          <!-- Other medio -->
          <div class="col-12">
            <q-field class="q-mb-lg">
                <q-input v-model="form.fields.otherMedio.value" placeholder="Cuentanos ¿cuál fue?" />
            </q-field>
          </div>

        </div>
      </div>

    </div>

    <!--Form Seguridad-->
    <div class="form-security bg-white rounded-md shadow-3 relative-position q-px-xl q-py-lg q-my-xl">

      <h3 class="title-label-orange text-center">
        <div>Seguridad (cambiar contraseña)</div>
      </h3>

      <div class="row gutter-md">

        <!--Column Left-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">
        
          <!-- NEW PASS -->
          <q-field
            :error="$v.form.newPassword.$error"
            :error-label="$tr('ui.message.fieldMinLeng', {num : 8})"
            :count="8"
            :class="[classError]"
          >
            <p class="caption q-mb-xs">Nueva contraseña</p>
            <q-input v-model="form.newPassword"
                     type="password"
                     autocomplete="off"
                     name="password"
            />
          </q-field>

        </div>

        <!--Column Right-->
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mt-lg">

          <!-- CONFIRM NEW PASS -->
          <q-field
            :error="$v.form.confirmNewPassword.$error"
            :error-label="$tr('ui.message.fieldCheckPassword')"
            :count="8"
            :class="[classError]"
          >
            <p class="caption q-mb-xs">Confirmar contraseña</p>
            <q-input v-model="form.confirmNewPassword"
                     type="password"
                     name="password"
                     autocomplete="off"   
            />
          </q-field>

        </div>

      </div>

    </div>

    <!--Form Final policies and button update-->
    <div class="form-final bg-white rounded-md shadow-3 q-px-lg q-py-xl">
      <div class="row">

          <div class="col-12 col-sm-9 ">
              <!--Policies-->
              <q-radio 
              v-model="form.fields.policies.value" 
              val="policies"
              label="Declaro conocer las políticas de Términos y Condiciones y autorizo el
                      tratamiento de mis datos personales en la pagina web <span class='text-primary'>Donde Esta Esa Vaina</span>" />

          </div>
          <div class="col-12 col-sm-3">
              <!--Update button-->
              <div class="text-right q-mt-sm">
                  <q-btn color="primary" :loading="loading" 
                    class="font-family-secondary btn-update text-white no-border" 
                    @click="updateData"
                  label="Actualizar"/>
              </div>
          </div>
      </div>
    </div>

    </div>

    <!--Inner loading-->
    <inner-loading :visible="loading"/>
   
  </div>
</template>

<script>

  //Plugins
  import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
  import NotResult from "src/components/notResults";
  import alert from '@imagina/qhelper/_plugins/alert'

  import config from 'src/config/index'
  import http from "axios"

  //Services
  import profileServices from '@imagina/quser/_services/users'

  export default {
    props: {},
    components: {NotResult},
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
        if(this.form.fields.country.value!="" && this.form.fields.country.value!=null)
          await this.getCities(this.form.fields.country.value,'CiO')

        if(this.address.countryId!="" && this.address.countryId!=null)
          await this.getCities(this.address.countryId,'CiRO')
        this.success = true//Success page
        this.loading = false//Loading
        
      },
      //Set user data
      async setUserData() {
        let sessionData = await this.$storage.get.item('sessionData')//Get data from storage
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
        let sessionData = await this.$storage.get.item('sessionData')//Get session data
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

            //let apiUrl = '/provinces'
            let params = {
              params: {
                filter: {country: countryModel}
              }
            }

            if(cityOptions == 'CiO')
              this.cityOptions = []
            if(cityOptions == 'CiRO')
              this.cityResidenceOptions = []
          
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
        
      }


    }
  }

</script> 

<style lang="stylus">
  @import "~variables";
  
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
      background-image url('/assets/img/arrow-send-pink.png')
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