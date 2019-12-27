<template>
  <q-page class="page">

    <div class="bg-fondo q-px-sm q-py-s,">
      <div class="q-container">
        <div class="row">
          <div class="col-12 text-center q-my-sm">

            <h4 class="font-family-secondary text-tertiary" v-if="product.id==4">Elige tu plan de Tienda Online o Directorio Virtual</h4>
            <p class="text-weight-medium text-weight-bold" v-html="product.description"></p>

            <h4 class="title-arrow-line-tertiary font-family-secondary">
              {{product.name}}
            </h4>

          </div>
        </div>
        <div class="row q-mb-xl stairs">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mb-xl step" v-for="(plan,index) in product.plans" :style="{ marginTop: (index+5) + '0px' }">
            <q-card class="rounded-sm bg-white plan relative-position full-width full-height my-card">

              <div class="bg-degradado text-right q-card-title">
                <img class="img-title" :src="plan.mainImage.path" alt="plan">
              </div>

              <q-card-section class="q-px-xl" style=" padding-bottom: 100px;">

                <div class="row">
                  <div class="col-8">
                     <h5 class="font-family-secondary text-primary q-mt-xl q-mb-none">{{plan.name}}</h5>
                  <h6 class="q-mt-none">{{plan.description}}</h6>
                  </div>
                </div>


                <div class="list-plan q-subheading" v-for="feature in plan.features">
                  <i class="fas fa-check text-primary q-pr-md" v-if="parseInt(feature.type)==2 && feature.value==true"></i>
                  <i class="fas fa-window-close text-primary q-pr-md" v-else-if="parseInt(feature.type)==2 && feature.value!=true"></i>
                  <i class="fas fa-check text-primary q-pr-md" v-else-if="parseInt(feature.type)==0"></i>
                  <i class="fas fa-window-close text-primary q-pr-md" v-else-if="parseInt(feature.type)==1"></i>
                  <label style="margin-right:4px;" v-if="parseInt(feature.type)==0">
                    {{feature.value}}
                  </label>
                  <span>
                    {{feature.name}}
                  </span>
                </div>

              </q-card-section>

              <q-card-actions class="bg-degradado font-family-secondary">
                <div class="row items-center full-width">
                <div class="col-6 text-center  text-white">
                    {{plan.price}} - {{plan.frequency}} {{plan.billCycleText}}
                </div>
                <div class="col-6 text-center  text-white" style="border-left:1px solid #dee2e6!important">

                  <q-btn
                  flat
                  size="lg"
                  :loading="loading.page"
                  no-caps
                  label="Suscribirme" @click="subscribe(plan.id)"
                  />

                </div>
              </div>
              </q-card-actions>
            </q-card>

          </div>
        </div>
      </div>
    </div>

    <product productId="6"/>

    <!-- Modal Register / Login-->
   <q-dialog transition-show="rotate" transition-hide="rotate" full-height full-width @hide="loading.page=false" v-model="minimizedModal" minimized :content-css="{borderRadius: '20px', minWidth: '50vw', backgroundColor: 'transparent', boxShadow: 'none'}" ref="modalRef">

     <div class="bg-degradado modal-subscription shadow-2 rounded-md q-my-xl">
       <div class="row items-center">
         <div class="col-md-4 q-pa-xl">
           <img :src="logo" :alt="projectName" class="full-width">
         </div>
         <div class="col-md-8">
           <div class="form-general bg-white form rounded-md line-primary border-primary q-pa-xl">
             <h4 class="text-primary text-center font-family-secondary q-my-none">Suscribirme</h4>
             <div class="q-body-2 text-center">Bienvenido, tu vaina en el mundo entero</div>
             <hr class="line-grey q-my-md">

             <!--captcha-->
             <captcha v-model="form.captcha" class="q-my-md" ref="captcha"/>

             <!-- name -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm"> {{$tr('ui.form.name')}}: </p>
               <q-input v-model="form.firstName" inverted color="white" class="line-grey no-shadow rounded-sm" />
             </q-field>

             <!-- lastName -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm"> {{$tr('ui.form.lastName')}}: </p>
               <q-input v-model="form.lastName" inverted color="white" class="line-grey no-shadow rounded-sm" />
             </q-field>

             <!-- phone -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm">{{$tr('ui.form.phone')}}: </p>
               <q-input type="text" v-model="form.fields.phone" inverted color="white" class="line-grey no-shadow rounded-sm"/>
             </q-field>

             <!-- email -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm">{{$tr('ui.form.email')}}: </p>
               <q-input type="email" v-model="form.email" inverted color="white" class="line-grey no-shadow rounded-sm"/>
             </q-field>

             <!-- password -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm">{{$tr('ui.form.password')}}:</p>
               <q-input type="password" v-model="form.password" inverted color="white" class="line-grey no-shadow rounded-sm"/>
             </q-field>

             <!-- password confirmation -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm">{{$tr('ui.form.checkPassword')}}:</p>
               <q-input type="password" v-model="form.passwordConfirmation" inverted color="white" class="line-grey no-shadow rounded-sm"/>
             </q-field>

             <!-- text -->
             <div class="q-body-2 line-text text-center q-mb-lg">
               <hr class="line-grey q-my-none full-width">
               <span class="bg-white q-px-lg">O ingresa por medio de tu red social </span>
             </div>

             <div class="row">
               <div class="col-xs-12 col-sm-6 text-center">
                 <q-btn icon="fab fa-facebook text-blue" flat label="FACEBOOK" />
               </div>
               <div class="col-xs-12 col-sm-6 text-center">
                 <q-btn icon="fab fa-google text-red-14" flat label="GOOGLE" />
               </div>
               <div class="col-12 text-center q-my-sm">
                 <q-btn class="text-primary font-family-secondary" @click="$router.push({name: 'auth.login'})"  no-caps flat :label="$tr('quser.layout.label.login')" />
               </div>
               <div class="col-12 text-center q-mt-sm">
                 <q-btn no-caps class="bg-primary text-white btn-arrow-send-pink" @click="register()">Crear cuenta</q-btn>
               </div>
             </div>

           </div>
         </div>
       </div>
     </div>
   </q-dialog>

  </q-page>
</template>
<script>
//Plugins
import {required} from 'vuelidate/lib/validators'
import _cloneDeep from 'lodash.clonedeep'
//Components
import mediaForm from '@imagina/qmedia/_components/form'
import product from '@imagina/qsubscription/_components/frontend/product'
// import captcha from '@imagina/qsite/_components/captcha'

export default {
  props: {},
  components: { mediaForm,product},
  watch: {},
  validations() {
    return {}
  },
  mounted() {
    this.$nextTick(function () {
      this.getProduct();
      this.init();
      /*
        Get role user autentichated
        var roles=this.$store.state.quserAuth.userData.roles;
        var businessRole=0;
        for (var i=0;i<roles.length;i++){
          if(roles[i].slug=="business"){
            //Vendedor
            businessRole=1;
            break;
          }//if role business
        }//for
        if(businessRole){
          //Query axios
          //If doesn't suscription active, redirect to plans
          $router.push({name: 'products.show',params:{slug:'tiendas-en-linea'}})
        }
      */
      console.log(this.$store.state.quserAuth);
    })
  },
  data() {
    return {
      logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo2').path,
      projectName : "Donde esta esa vaina",
      loading: {
        page: false
      },
      configName: 'apiRoutes.qsubscription.products',
      productId: 0,
      slug: this.$route.params.slug,
      minimizedModal: false,
      plans:[],
      product:[],
      userId: this.$store.state.quserAuth.userId,
      form:{
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        captcha: false,
        fields:{
          phone:''
        }
      },
      status: 0,
      locale: {
        fields: {
          id: '',
          userId: this.$store.state.quserAuth.userId,

        },
        fieldsTranslatable: {

        },
        validations: {
          name: {required}
        }
      },
      editorText: {
        toolbar: [
          ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
          ['link'],
          [
            {
              label: 'Font Size',
              icon: 'format_size',
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
            }
          ],
          ['quote', 'unordered', 'ordered'],
          ['fullscreen']
        ]
      },
      buttonActions: {}
    }
  },
  methods: {

    init(){
      let captcha = _cloneDeep(this.form.captcha)//Save captcha
      this.form.captcha = captcha//Add captch
    },
    //check if captcha is defined
    checkedCaptcha() {
      let captcha = this.form.captcha
      let response = false
      if (captcha && captcha.token) response = true
      if (!response) this.$alert.error({message : this.$tr('ui.message.requiredCaptcha')})

      return response
    },
    register(){
      if (this.checkedCaptcha()) {
        this.loading = true;
        let data = this.$clone(this.form)
        data.fields = this.$helper.convertToBackField(this.form.fields)
        this.$crud.create('apiRoutes.quser.register', data).then(response => {
          this.callbackRequest(true, response.data)
        }).catch(error => {
          this.callbackRequest(false, error)
        })
      }
    },
    //Action after request
    callbackRequest(success = true, response) {
      this.$v.$reset()//Reset validations
      this.loading = false
      this.$refs.captcha.reset()
      let message = `${$tr('quser.layout.message.activateAccount')} this.form.email`

      if (success) {
        if (!response.checkEmail) message =''
        //Dialog to go to iniciar sesión when id register
        this.$q.dialog({
          title: this.$tr('ui.message.recordCreated'),
          message: message,
          color: 'blue-grey',
          ok: this.$tr('quser.layout.label.login'),
          cancel: false,
          noBackdropDismiss: true,
          noEscDismiss: true,
        }).then(async data => {
          this.login(response.checkEmail)
        }).catch(() => {
        })
      } else {
        console.error('[auth.register]', response)
        if (response) {//Message Vali
          let errorMsg = JSON.parse(response)
          if (errorMsg.email)
            this.$alert.error({
              message: this.$tr('quser.layout.message.emailExist'),
              pos: 'bottom', timeOut: 4000
            })
          else this.$alert.error({message: `${this.$tr('ui.message.recordNoCreated')}`})
        }
      }
    },
    //Login user or redirect to from login acooding "check email" from backend
    login(checkEmail) {
      if (!checkEmail) {//Login
        this.loading = true;
        let data = {
          username: this.form.email, password: this.form.password
        }
        this.$store.dispatch("quserAuth/AUTH_REQUEST", data).then((response) => {
          this.loading = false;
        }).catch(error => {
          this.loading = false;
        });
      }
    },

    subscribe(planId){
      this.loading.page = true;
      // this.$router.push({ name: 'subscriptions.shopping.cart', params: { planId: planId }});
      if(this.userId){
        //push to shopping cart
        this.$router.push({ name: 'subscriptions.shopping.cart', params: { planId: planId }});
      }else{
        this.minimizedModal = true
      }

    },
    getProduct() {
      return new Promise((resolve, reject) => {
        this.loading.page = true

        if (this.slug) {

          //Params
          let params = {
            refresh: true,
            params: {
              include: 'plans.features',
              filter: {
                allTranslations: true,
                search:"slug"
              }
            }
          }

          //Request
          this.$crud.show("apiRoutes.qsubscription.products",this.slug,params).then(response => {
            this.product=response.data;
            this.loading.page = false;
            resolve(true)//Resolve
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            this.loading.page = false;
            this.$router.push({ name: 'app.home'});
            reject(false)//Resolve
          })
        } else {
          resolve(true)//Resolve
        }//else

      })
    },

  }
}
</script>
<style lang="stylus">
</style>
