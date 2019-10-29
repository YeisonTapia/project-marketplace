<template>
  <q-page class="bg-fondo-q store-page layout-padding">

      <div class="q-container" style="padding-top: 40px;">
        <div class="row gutter-md">
          <!-- DISENO -->
          <div class="col-12" v-show="selectedStore>=0">
            <h3 class="text-center q-my-xl">Diseño</h3>
          </div>

          <div class="col-12" v-show="selectedStore>=0">

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-actions  align="end" no-caps class="q-pa-lg">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions>

              <q-card-main class="q-px-xl q-pb-xl form-general">
                <div class="q-headline text-primary q-mb-xs">Eligue tu tema</div>
                <div class="q-subheading text-secondary">
                  Completa la configuración de tu tienda, ¡es muy fácil!
                </div>
                <div class="q-my-lg line-grey w-100"></div>

                <div class="row gutter-md justify-center">
                  <div @click="theme.image = t.image" class="col-xs-12 col-sm-12 col-md-6 col-lg-5 q-mb-md cursor-pointer" v-for="(t,index) in themes_option" :key="index">
                    <div class="ratio-1 line-grey">
                      <img :src="t.image">
                    </div>
                    <div class="q-pa-md" :class="[theme.image == t.image ? 'bg-secondary text-light' : 'bg-light text-secondary']">
                       Diseño #{{index+1}} - {{t.name}}
                    </div>
                  </div>
                </div>

                <div class="q-my-lg line-grey w-100"></div>

                <div class="q-headline text-primary q-mb-xs">Personaliza tu sitio web</div>
                <div class="q-subheading text-secondary q-mb-lg">
                  Elige los colores de acuerdo a la imagen de tu empresa
                </div>

                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Primario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <div @click="showingPrimary = true"  class="q-pa-md line-grey text-center" :style="{ 'background-color': theme.primary }">
                      {{theme.primary}}

                      <q-popover v-model="showingPrimary" anchor="bottom right" self="bottom left">
                        <q-tabs align="justify">
                          <q-tab default  slot="title" name="tab-1" label="HEX" :style="{ 'background-color': theme.primary }"/>
                          <q-tab  slot="title" name="tab-2" label="RGB" :style="{ 'background-color': theme.primary }"/>
                          <q-tab-pane name="tab-1" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.primary }">
                                {{theme.primary}}
                              </div>
                              <q-color-picker v-model="theme.primary" format-model="hex" />
                          </q-tab-pane>
                          <q-tab-pane name="tab-2" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.primary }">
                                {{theme.primary}}
                              </div>
                              <q-color-picker v-model="theme.primary" format-model="rgb" />
                          </q-tab-pane>
                        </q-tabs>
                      </q-popover>
                    </div>
                  </div>
                </div>
                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Secondario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <div @click="showingSecondary = true" class="q-pa-md line-grey text-center line" :style="{ 'background-color': theme.secondary }">
                      {{theme.secondary}}

                      <q-popover v-model="showingSecondary" anchor="bottom right" self="bottom left">
                        <q-tabs align="justify">
                          <q-tab default  slot="title" name="tab-1" label="HEX" :style="{ 'background-color': theme.secondary }"/>
                          <q-tab  slot="title" name="tab-2" label="RGB" :style="{ 'background-color': theme.secondary }"/>
                          <q-tab-pane name="tab-1" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.secondary }">
                                {{theme.secondary}}
                              </div>
                              <q-color-picker v-model="theme.secondary" format-model="hex" />
                          </q-tab-pane>
                          <q-tab-pane name="tab-2" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.secondary }">
                                {{theme.secondary}}
                              </div>
                              <q-color-picker v-model="theme.secondary" format-model="rgb" />
                          </q-tab-pane>
                        </q-tabs>
                      </q-popover>
                    </div>
                  </div>
                </div>
                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Fondo</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <div @click="showingBackground = true" class="q-pa-md line-grey text-center" :style="{ 'background-color': theme.background }">
                      {{theme.background}}

                      <q-popover v-model="showingBackground" anchor="bottom right" self="bottom left">
                        <q-tabs align="justify">
                          <q-tab default  slot="title" name="tab-1" label="HEX" :style="{ 'background-color': theme.background }"/>
                          <q-tab  slot="title" name="tab-2" label="RGB" :style="{ 'background-color': theme.background }"/>
                          <q-tab-pane name="tab-1" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.background }">
                                {{theme.background}}
                              </div>
                              <q-color-picker v-model="theme.background" format-model="hex" />
                          </q-tab-pane>
                          <q-tab-pane name="tab-2" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.background }">
                                {{theme.background}}
                              </div>
                              <q-color-picker v-model="theme.background" format-model="rgb" />
                          </q-tab-pane>
                        </q-tabs>
                      </q-popover>
                    </div>
                  </div>
                </div>

              </q-card-main>
            </q-card>

          </div>
          <!-- DISENO -->

        </div>
      </div>


  </q-page>
</template>
<script>
import uploadMedia from '@imagina/qmedia/_components/form'

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
          path:'/assets/img/fondo.jpg',
          mimeType:''
        },
        category: '',
        mediasSingle: {},
        mediasMulti: {},
        slider: [
          {
            path:'/assets/img/fondo.jpg',
            mimeType:''
          },{
            path:'/assets/img/fondo.jpg',
            mimeType:''
          }
        ],
        gallery: [
          {
            path:'/assets/img/fondo.jpg',
            mimeType:''
          },{
            path:'/assets/img/fondo.jpg',
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
        image: '/assets/img/product.jpg',
        primary: '#4CAF50',
        secondary: '#E91E63',
        background: '#FFFFFF'
      },
      themes_option: [
        {
          image: '/assets/img/product.jpg'
        },
        {
          image: '/assets/img/pregunta.jpg'
        }
      ],
      product: {
        name: '',
        summary: '',
        description: '',
        image: '/assets/img/fondo.jpg',
        gallery: [
          {image:'/assets/img/fondo.jpg'},{image:'/assets/img/fondo.jpg'}
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
          include: '',
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
        path:'/assets/img/fondo.jpg',
        mimeType:""
      };
      this.company.slider=[
        {
          path:'/assets/img/fondo.jpg',
          mimeType:''
        },{
          path:'/assets/img/fondo.jpg',
          mimeType:''
        }
      ];
      this.company.gallery=[
        {
          path:'/assets/img/fondo.jpg',
          mimeType:''
        },{
          path:'/assets/img/fondo.jpg',
          mimeType:''
        }
      ];

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
    },
    onChangeStore(){
      console.log('on change store');
      if(this.selectedStore>=0){
        console.log('selected store');
        //Clone data
        this.storeId=this.stores[this.selectedStore].id;
        this.company=this.stores[this.selectedStore];
        this.company[this.lang]=this.stores[this.selectedStore][this.lang];
        this.company.name=this.stores[this.selectedStore][this.lang].name;
        this.company.slogan=this.stores[this.selectedStore][this.lang].slogan;
        this.company.description=this.stores[this.selectedStore][this.lang].description;
        this.company.categories=[];//
        console.log(this.stores);
        console.log(this.stores[this.selectedStore].categories.length);
        for(var i=0;i<this.stores[this.selectedStore].categories.length;i++){
          this.company.categories.push(parseInt(this.stores[this.selectedStore].categories[i].id));
        }
        this.getCities();
        console.log(this.company);
      }else{
        //Clear inputs
        this.clearForm();
        console.log('clear form');
        console.log(this.company);
      }
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
        this.loading = false
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
        this.loading = false
      })
    },
    updateStore(){
      this.company[this.lang]={
        name:this.company.name,
        slogan:this.company.slogan,
        description:this.company.description,
        slug:this.slugable(this.company.name)
      };
      this.$crud.update("apiRoutes.qmarketplace.store", this.stores[this.selectedStore].id,this.company).then(response => {
        this.$alert.success({message: this.$tr('ui.message.recordUpdated'), pos: 'bottom'})
        this.clearForm();
        this.getStores();
        this.loading = false
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
        this.loading = false
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


</style>
