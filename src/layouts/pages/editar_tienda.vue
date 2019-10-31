<template>
  <q-page class="bg-fondo-q store-page layout-padding">

      <div class="q-container" style="padding-top: 40px;">
        <div class="row gutter-md">
          <div class="col-12" v-if="(selectedStore>=0 || selectedStore==-2) && myStore">

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-actions  align="end" no-caps class="q-pa-lg">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions>

              <q-card-main class="q-px-xl q-pb-xl form-general">

                <div class="q-headline text-primary q-mb-xs capitalize">{{company.name}}</div>
                <div class="q-subheading text-secondary">
                  Completa la configuración de tu tienda, ¡es muy fácil!
                </div>
                <div class="q-my-lg line-grey w-100"></div>


                <div class="row gutter-lg">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">

                    <q-field class="q-mb-lg">
                      <p class="caption q-mb-md">Agregar Logo
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question" >
                          <q-tooltip>
                            Agrega una imagen como logo de la tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <upload-media
                      v-model="company.mediasSingle"
                      entity="Modules\Marketplace\Entities\Store"
                      :entity-id="storeId ? storeId : null"
                      zone='mainimage'
                      />
                    </q-field>

                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                     <q-field class="q-mb-lg">
                        <p class="caption q-mb-md">Agregar imágenes para slider
                          <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Agrega imágenes promociones de tu tienda
                          </q-tooltip>
                        </q-btn>
                        </p>

                        <upload-media
                          multiple
                          v-model="company.mediasMulti"
                          entity="Modules\Marketplace\Entities\Store"
                          :entity-id="storeId ? storeId : null"
                          zone='slider'
                        />

                      </q-field>
                  </div>
                </div>

                <div class="q-mt-lg q-mb-xl line-grey w-100"></div>

                <div class="row gutter-lg">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Nombre de tu empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa el nombre de tu tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="company.name" placeholder="WAFFEE" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Slogan
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Agrega un slogan para tu tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="company.slogan" placeholder="Lorem Ipsum" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Descripción de la empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa una breve descripción de tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-editor v-model="company.description" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Dirección de la empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa la dirección de tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.address" placeholder="Lorem Ipsum"
                        :before="[{ icon: 'fas fa-map-marker-alt'}]" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Url mapa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa la dirección de tu empresa vía google maps
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.options.map" placeholder="google maps"  />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Horario de atención
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Aquí puedes ingresar tu horario de atención al público
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.schedules[0]" placeholder="Lunes - Sabado 7am - 6pm"
                        :before="[{ icon: 'far fa-clock'}]" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Enlace de youtube
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Aquí puedes ingresar el link de un video promocional
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.options.youtube" placeholder="youtube.com"  />
                    </q-field>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-xs">Categoría
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona las categorías a las que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>

                      <q-select multiple v-model="company.categories" :options="categoryOptions" />
                    </q-field>

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Barrio
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona el barrio al que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="company.neighborhood" placeholder="Lorem Ipsum" />
                    </q-field>

                    <!-- <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Barrio
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-select v-model="company.neighborhood" :options="sectorOptions" />
                    </q-field> -->
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Provincia
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona la provincia a la que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-select @input="val => { getCities() }" v-model="company.province_id" :options="provincesOptions" />
                    </q-field>

                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Cuidad
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona la ciudad a la que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-select v-model="company.city_id" :options="cityOptions" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Correo electrónico
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa un correo electrónico para el contacto cliente - tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="company.options.email" placeholder="info@lorem.com"
                        :before="[{ icon: 'fas fa-envelope'}]" />
                    </q-field>
                    <q-field class="q-mb-lg" v-if="company.gallery.length>0">
                        <p class="caption q-mb-md">Galeria de la empresa
                          <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa múltiples imágenes promocionales de tu empresa
                          </q-tooltip>
                        </q-btn>
                        </p>

                        <upload-media
                          multiple
                          v-model="company.mediasMulti"
                          entity="Modules\Marketplace\Entities\Store"
                          :entity-id="storeId ? storeId : null"
                          zone='gallery'
                        />

                      </q-field>

                  </div>
                </div>


              </q-card-main>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-main class="q-px-xl form-general">

                <q-field class="q-my-lg">
                  <p class="caption q-mb-lg">Redes sociales de tu tienda
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar las redes sociales disponibles de tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                      <div v-for="(item,index) in company.social" :key="index">
                        <div class="row items-center q-mb-md">
                          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                            <q-checkbox v-model="item.active">
                              <q-icon class="q-mx-md" :color="item.color" :name="item.icon" />  {{item.name}}:
                            </q-checkbox>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                            <q-input v-model="item.url" placeholder="@lorem_ipsom" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </q-field>
              </q-card-main>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-xl">
              <q-card-main class="q-px-xl form-general">

                <q-field class="q-my-lg">

                  <p class="caption q-mb-lg">¿Que metodos de pago aceptas?
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar los métodos de pago disponibles en tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div v-for="(item,index) in company.options.payment_methods" :key="index">
                    <div class="row items-center q-py-md border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="item.active">
                          <span class="q-px-sm">{{item.name}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="faded" name="fas fa-edit" size="md" />
                      </div>
                    </div>
                  </div>

                </q-field>
              </q-card-main>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-lg">
              <q-card-main class="q-px-xl form-general">

                <q-field class="q-my-lg">

                  <p class="caption q-mb-lg">¿Cuales son los medotos de envío?
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar los métodos de envío disponibles en tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div v-for="(item,index) in company.options.shipping_methods" :key="index">
                    <div class="row items-center q-py-md border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="item.active">
                          <span class="q-px-sm">{{item.name}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="faded" name="fas fa-edit" size="md" />
                      </div>
                    </div>
                  </div>

                </q-field>
              </q-card-main>
            </q-card>

          </div>

          <!-- DISENO -->
          <div class="col-12" v-if="!myStore && configTheme">
            <h3 class="text-center q-my-xl">Diseño</h3>
          </div>

          <div class="col-12" v-if="!myStore && configTheme">

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-actions  align="end" no-caps class="q-pa-lg">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions>

              <q-card-main class="q-px-xl q-pb-xl form-general">
                <div class="q-headline text-primary q-mb-xs">Eligue tu tema</div>
                <div class="q-subheading text-secondary">
                  Elige el tema que más se adapte a tu empresa y personalizalo
                </div>
                <div class="q-my-lg line-grey w-100"></div>

                <div class="row gutter-md justify-center">
                  <div @click="theme.id=t.id;" class="col-xs-12 col-sm-12 col-md-6 col-lg-5 q-mb-md cursor-pointer" v-for="(t,index) in themes_option" :key="index">
                    <div class="ratio-1 line-grey">
                      <img :src="t.mainImage.path">
                    </div>
                    <div class="q-pa-md" :class="[theme.id == t.id ? 'bg-secondary text-light' : 'bg-light text-secondary']">
                       Diseño #{{index+1}} - {{t.name}}
                    </div>
                  </div>
                </div>

                <div class="q-my-lg line-grey w-100"></div>

                <div class="q-headline text-primary q-mb-xs">Personaliza tu sitio web</div>
                <div class="q-subheading text-secondary q-mb-lg">
                  Elige los colores de acuerdo a la imagen corporativa de tu empresa
                </div>

                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Primario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <q-color class="q-pa-md line-grey text-center" v-model="theme.primary" :style="{ 'background-color': theme.primary }" />
                  </div>
                </div>
                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Secondario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <q-color class="q-pa-md line-grey text-center" v-model="theme.secondary" :style="{ 'background-color': theme.secondary }" />
                  </div>
                </div>
                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Fondo</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <q-color class="q-pa-md line-grey text-center" v-model="theme.background" :style="{ 'background-color': theme.background }" />
                  </div>
                </div>

              </q-card-main>
            </q-card>

          </div>
          <!-- DISENO -->

          <div class="col-12 text-right">
              <q-field class="q-mb-xl">
                <q-btn class="bg-primary text-white btn-arrow-send-pink" @click="updateStore()" v-if="parseInt(selectedStore)>=0">Actualizar</q-btn>
                <q-btn class="bg-primary text-white btn-arrow-send-pink" @click="createStore()" v-else-if="parseInt(selectedStore)==-2">Crear</q-btn>
              </q-field>
          </div>

        </div>
      </div>

      <q-layout-drawer behavior="desktop"  v-model="drawer">

        <!-- SELECT STORE -->
        <div class="q-pa-md selectStore bg-light">
          <q-select color="light" class="no-shadow" inverted
          v-model="selectedStore"
          :options="storesOptions"
          @input="val => { onChangeStore() }"
          />
        </div>

        <!-- CONFIG THEME OF STORE -->
        <q-list no-border link inset-delimiter class="q-pa-none" v-if="stores.length>0 && selectedStore>=0">

          <q-list-header class="q-px-lg q-pt-lg q-pb-none">
            <div class="label-primary text-center text-white">
              <div class="title q-pb-md font-family-secondary">
                <span>NIVEL</span>
              </div>
              <div class="subtitle q-pt-md " >
                TIENDA PROFESIONAL
              </div>   
            </div>
          </q-list-header>

          <!-- === LOGO === -->
          <q-list-header class="logo-tienda text-center">
                <img :src="stores[selectedStore].logo.path" alt="stores[selectedStore].name" >
          </q-list-header>

          <q-list separator link no-border id="listMenuAdmin" class="q-pa-none">
            <!--Single Item-->
            <q-item :class="[myStore ? 'selected-item' : ' ']" @click="changeMenu('myStore')">
              <q-item-side icon="fas fa-store"/>
              <q-item-main>Mi Tienda</q-item-main>
            </q-item>
            <q-item :class="[configTheme ? 'selected-item' : ' ']" @click="changeMenu('configTheme')">
              <q-item-side icon="fas fa-palette"/>
              <q-item-main>Diseño</q-item-main>
            </q-item>
          </q-list>

        </q-list>
        <div class="bg-light text-center q-py-lg border-top-contact">
          <div class="q-headline text-primary text-weight-bold">¿NECESITAS AYUDA </div>
          <div class="q-subheading text-primary  text-weight-bold q-mb-md">PARA EDITAR TU TIENDA?</div>
          <q-btn rounded to="/contacto" color="primary" label="Contáctanos aquí"/>
        </div>
 
      </q-layout-drawer>

      <q-page-sticky class="q-ma-md" expand position="bottom-right">
        <q-btn
          @click="drawer = !drawer"
          round
          dense
          color="primary"
          icon="menu"
        />
      </q-page-sticky>

  </q-page>
</template>
<script>
import uploadMedia from 'src/components/qmedia/form'


export default {
  name: 'PageTienda',
  components: {
    uploadMedia,
  },
  data() {
    return {
      stores:[],
      storesOptions:[],
      storeId:false,
      //Vars to active tab of menu
      myStore:false,
      configTheme:false,
      productsStore:false,
      //Vars to active tab of menu
      selectedStore:-1,
      lang: this.$q.i18n.lang,
      drawer: true,
      userId: this.$store.state.quserAuth.userId,
      company: {
        name:'Nombre de tienda',
        slogan: '',
        description: '',
        user_id: this.$store.state.quserAuth.userId,
        address: '',
        schedules: [
          ""
        ],
        city: '',
        city_id: null,
        province_id: null,
        neighborhood: '',
        categories:[],
        logo: {
          path:'/statics/img/fondo.jpg',
          mimeType:''
        },
        category: '',
        mediasSingle: {},
        mediasMulti: {},
        slider: [
          {
            path:'/statics/img/fondo.jpg',
            mimeType:''
          },{
            path:'/statics/img/fondo.jpg',
            mimeType:''
          }
        ],
        gallery: [
          {
            path:'/statics/img/fondo.jpg',
            mimeType:''
          },{
            path:'/statics/img/fondo.jpg',
            mimeType:''
          }
        ],
        options:{
          youtube: '',
          email: '',
          map: '',
          theme_config:{
            color_primary:"#4CAF50",
            color_secondary:"#E91E63",
            background:"#FFFFFF",
          },
          payment_methods: [
            {
              name: 'Contraentrega',
              active: false
            },
            {
              name: 'Paypal',
              active: false
            },
            {
              name: 'Entrega de Tienda',
              active: false
            },
            {
              name: 'PayU',
              active: false
            }
          ],
          shipping_methods: [
            {
              name: 'Recoger en Tienda',
              active: false
            },
            {
              name: 'Servicio a Domicilio',
              active: false
            },
            {
              name: 'A convenir',
              active: false
            }
          ]
        },
        social: [
          {
            icon: 'fab fa-twitter',
            name: 'Twitter',
            color: 'blue-4',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-facebook',
            name: 'Facebook',
            color: 'indigo',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-instagram',
            name: 'Instagram',
            color: 'primary',
            url: '',
            active: false
          }
        ]
      },
      showingPrimary: false,
      showingSecondary: false,
      showingBackground: false,
      searchModel: '',
      sectorOptions: [
        // {
        //   label: 'Barrios',
        //   value: '1'
        // },
        // {
        //   label: 'Barrioswert',
        //   value: '2'
        // }
      ],
      cityOptions: [],
      provincesOptions: [],
      categoryOptions: [
        {
          label: 'Comida',
          value: '1',
          children: [
            { label: 'Restaurantes', value: '2' },
            { label: 'Comidas rápidas', value: '2' },
            { label: 'Panaderías', value: '3' }
          ]
        },
        {
          label: 'Good service (disabled node)',
          value: '2',
          children: [
            { label: 'Prompt attention', value: '2' },
            { label: 'Professional waiter', value: '3' }
          ]
        },
        {
          label: 'Pleasant surroundings',
          value: '2',
          children: [
            { label: 'Happy atmosphere', value: '2' },
            { label: 'Good table presentation', value: '3' },
            { label: 'Pleasing decor', value: '3' }
          ]
        }
      ],
      statusOptions: [
        {
          label: 'Habilitado',
          value: '1'
        },
        {
          label: 'Inhabilitado',
          value: '2'
        }
      ],
      theme: {
        id: null,
        image: '/statics/img/product.jpg',
        primary: '#4CAF50',
        secondary: '#E91E63',
        background: '#FFFFFF'
      },
      themes_option: [
        {
          id: 1,
          name: 'Tienda personal',
          mainImage:{
            path:'/statics/img/product.jpg',
            mimeType:'jpg'
          }
        },
        {
          id: 2,
          name: 'Tienda corporativa',
          mainImage:{
            path:'/statics/img/pregunta.jpg',
            mimeType:'jpg'
          }
        }
      ],
      product: {
        name: '',
        summary: '',
        description: '',
        image: '/statics/img/fondo.jpg',
        gallery: [
          {image:'/statics/img/fondo.jpg'},{image:'/statics/img/fondo.jpg'}
        ],
        status:'',
        category: '',
        categories:[],
        price: 0,
        stock: false,
        length: 0,
        quantity: 0,
        weight: 0,
        reference: '',
        order_min: 0,
        width: 0,
        height: 0,
        points: 0,
        active_home: false
      }
    }
  },
  methods: {
    changeMenu(option){
      this.myStore=false;
      this.configTheme=false;
      if(option=="myStore"){
        this.myStore=true;
      }
      else if(option=="configTheme"){
        this.configTheme=true;
      }
    },
    slugable: function(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');

      return slug;
    },
    getStores(){
      this.selectedStore=-1;//Reset index store
      this.storesOptions=[];//Clear array stores
      this.storesOptions.push({
        label:"Seleccionar Tienda",
        value:-1
      });
      this.storesOptions.push({
        label:"Crear nueva tienda",
        value:-2
      });
      //Get stores of user
      let params = {
        remember: false,
        params: {
          include: 'categories',
          filter:{
            allTranslations: true,
            userId:this.userId,
          }
        }
      };//params
      this.$crud.index("apiRoutes.qmarketplace.store",params).then(response => {
        this.stores=response.data;
        for(var i=0;i<this.stores.length;i++){
          this.storesOptions.push({
            label:this.stores[i][this.lang].name,
            value:i
          });
        }//for
      });
    },
    getStoreCategories(){
      //Get stores of user
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
          }
        }
      };//params
      this.$crud.index("apiRoutes.qmarketplace.category",params).then(response => {
        this.categoryOptions=response.data;//
        // for(var i=0;i<this.stores.length;i++){
        //   this.storesOptions.push({
        //     label:this.stores[i][this.lang].name,
        //     value:i
        //   });
        // }//for
      });

    },
    getThemes(){
      //Get stores of user
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
          }
        }
      };//params
      this.$crud.index("apiRoutes.qmarketplace.theme",params).then(response => {
        this.themes_option=response.data;//
        // for(var i=0;i<this.stores.length;i++){
        //   this.storesOptions.push({
        //     label:this.stores[i][this.lang].name,
        //     value:i
        //   });
        // }//for
      });

    },

    clearForm(){
      //Clear data of form create store
      this.company.name="Nombre de tienda";
      this.company.slogan="";
      this.company.description="";
      this.company.address="";
      this.company.schedules[0]="";
      this.company.options.map="";
      this.company.options.youtube="";
      this.company.categories=[];
      this.company.city="";
      this.company.city_id=null;
      this.company.province_id=null;
      this.company.neighborhood="";
      this.company.options.email="";
      this.company.mediasSingle={};
      this.company.mediasMulti={};
      this.company.logo={
        path:'/statics/img/fondo.jpg',
        mimeType:""
      };
      this.company.slider=[
        {
          path:'/statics/img/fondo.jpg',
          mimeType:''
        },{
          path:'/statics/img/fondo.jpg',
          mimeType:''
        }
      ];
      this.company.gallery=[
        {
          path:'/statics/img/fondo.jpg',
          mimeType:''
        },{
          path:'/statics/img/fondo.jpg',
          mimeType:''
        }
      ];
      this.theme.id=null;
      this.theme.primary='#4CAF50';
      this.theme.secondary='#E91E63';
      this.theme.background='#FFFFFF';

      for(var i=0;i<this.company.social.length;i++){
        this.company.social[i].active=false;
        this.company.social[i].url=null;
      }
      for(var i=0;i<this.company.options.payment_methods.length;i++){
        this.company.options.payment_methods[i].active=false;
      }
      for(var i=0;i<this.company.options.shipping_methods.length;i++){
        this.company.options.shipping_methods[i].active=false;
      }
      this.storeId=false;
      this.myStore=false;
      this.configTheme=false;
    },
    onChangeStore(){
      if(this.selectedStore>=0){
        //Clone data
        this.storeId=this.stores[this.selectedStore].id;
        // this.company=this.stores[this.selectedStore];
        this.company = this.$clone(this.stores[this.selectedStore]);
        this.company[this.lang]=this.stores[this.selectedStore][this.lang];
        this.company.name=this.stores[this.selectedStore][this.lang].name;
        this.company.slogan=this.stores[this.selectedStore][this.lang].slogan;
        this.company.description=this.stores[this.selectedStore][this.lang].description;
        this.theme.id=this.company.theme_id;
        this.theme.primary=this.stores[this.selectedStore].options.theme_config.color_primary;
        this.theme.secondary=this.stores[this.selectedStore].options.theme_config.color_secondary;
        this.theme.background=this.stores[this.selectedStore].options.theme_config.background;
        this.company.categories=[];
        for(var i=0;i<this.stores[this.selectedStore].categories.length;i++){
          this.company.categories.push(parseInt(this.stores[this.selectedStore].categories[i].id));
        }
        this.getCities();
      }else{
        //Clear inputs
        this.clearForm();
      }
      this.myStore=true;
    },
    createStore(){
      this.company[this.lang]={
        name:this.company.name,
        slogan:this.company.slogan,
        description:this.company.description,
        slug:this.slugable(this.company.name)
      };
      this.company.user_id=this.userId;
      // this.company.schedules=[this.company.schedule];
      this.$crud.create("apiRoutes.qmarketplace.store", this.company).then(response => {
        this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'})
        this.getStores();
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      })
    },
    updateStore(){
      this.company[this.lang]={
        name:this.company.name,
        slogan:this.company.slogan,
        description:this.company.description,
        slug:this.slugable(this.company.name)
      };
      if(this.theme.id!=null){
        this.company.theme_id=this.theme.id;
        this.company.options.theme_config.color_primary=this.theme.primary;
        this.company.options.theme_config.color_secondary=this.theme.secondary;
        this.company.options.theme_config.background=this.theme.background;
      }
      this.$crud.update("apiRoutes.qmarketplace.store", this.stores[this.selectedStore].id,this.company).then(response => {
        this.$alert.success({message: this.$tr('ui.message.recordUpdated'), pos: 'bottom'})
        this.clearForm();
        this.getStores();
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      })
    },
    getProvinces(){
      // cityOptions
      // sectorOptions
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
            country:48
          }
        }
      };//params
      this.$crud.index("apiRoutes.ilocations.provinces",params).then(response => {
        this.provincesOptions=[];
        this.provincesOptions.push({label:"Selecciona una provincia",value:null});
        for(var i=0;i<response.data.length;i++){
          this.provincesOptions.push({label:response.data[i].name,value:response.data[i].id});
        }
      });
    },
    getCities(){
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
            province_id:this.company.province_id
          }
        }
      };//params
      this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
        this.cityOptions=[];
        this.cityOptions.push({label:"Selecciona una ciudad",value:null});
        for(var i=0;i<response.data.length;i++){
          this.cityOptions.push({label:response.data[i].name,value:response.data[i].id});
        }
      });
    }


  },
  mounted(){
    this.getStores();
    this.getStoreCategories();//
    this.getProvinces();//
    this.getThemes();//

  }
}
</script>
<style lang="stylus">
@import "~variables"
.store-page
  .images
    .absolute-bottom-right
      bottom -5px
      right -5px
      .btn
        width 40px
        height 40px
  .q-carousel-quick-nav
    background transparent
  .border-bottom-gray
    border-bottom 1px solid #E1E1E1
  .btn-arrow-send-pink:after
    right 92px

  .card-border-right
    border-right 3px solid #E1E1E1
    padding-right 32px
    @media screen and (max-width: $breakpoint-md)
        border-right 0
        padding-right 0
  .border
    border 1px solid #E1E1E1
    box-shadow none !important
    border-radius 5px
  .border-top-contact
    border-top 1px solid #e0e0e0  
  .selectStore
    border-bottom 2px solid $tertiary   
    .q-input-target
      color $tertiary
      font-weight bold
      font-size 1.2rem
    .q-icon
      color $tertiary
      font-size 2rem
#listMenuAdmin    
  .selected-item
    background-color $tertiary
    color #ffffff 
    .q-icon
      color #ffffff !important

</style>
