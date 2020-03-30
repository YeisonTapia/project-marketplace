<template>
   <div id="formLoginComponent" class="relative-position">

      <h4 class="text-primary text-center font-family-secondary q-mt-lg q-mb-none">Registro</h4>
      <div class="q-body-2 text-center">Bienvenido, tu vaina en el mundo entero</div>
      <hr class="line-grey q-my-md">


      <q-form @submit="register()" ref="formContent"
              @validation-error="$alert.error($tr('ui.message.formInvalid'))"
              class="row q-col-gutter-x-sm q-pt-sm " autocomplete="off">
         <!-- Name field -->
         <div :class="columnsFieldsClass" class="q-mt-xs">
            <p class="q-subheading q-mb-sm"> {{$tr('ui.form.name')}}: </p>
            <q-input v-model="form.firstName" color="primary" rounded outlined dense
                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
            >
            </q-input>
         </div>

         <!-- Last Name field -->
         <div :class="columnsFieldsClass">
            <p class="q-subheading q-mb-sm"> {{$tr('ui.form.lastName')}}: </p>
            <q-input v-model="form.lastName" color="primary" rounded outlined dense
                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
            >
            </q-input>
         </div>

         <!-- Phone field -->
         <div :class="columnsFieldsClass" v-if="form.fields.cellularPhone">
            <p class="q-subheading q-mb-sm">{{$tr('ui.form.phone')}}: </p>
            <q-input mask="phone"
                     v-model="form.fields.cellularPhone.value" color="primary" rounded outlined dense
                     unmasked-value :rules="[
                  val => !isValueRequired('cellularPhone',val) || $tr('ui.message.fieldRequired'),
                  val => !val || val.length == 10 || $tr('ui.message.fieldMinLeng',{num : 10})
                 ]">
            </q-input>
         </div>

         <!-- Email field -->
         <div :class="columnsFieldsClass">
            <p class="q-subheading q-mb-sm">{{$tr('ui.form.email')}}: </p>
            <q-input v-model="form.email" color="primary" type="email" rounded outlined dense
                     :rules="[
                  val => !!val || $tr('ui.message.fieldRequired'),
                  val => $helper.validateEmail(val) || $tr('ui.message.fieldEmail')
                 ]">
            </q-input>
         </div>

         <!-- Password field -->
         <div :class="columnsFieldsClass">
            <p class="q-subheading q-mb-sm">{{$tr('ui.form.password')}}: </p>
            <q-input v-model="form.password" type="password" color="primary" rounded outlined dense
                     :rules="[
                  val => !!val || $tr('ui.message.fieldRequired'),
                  val => val.length >= 8 || $tr('ui.message.fieldMinLeng', {num : 8})
                 ]">
            </q-input>
         </div>

         <!-- comfirm Password field -->
         <div :class="columnsFieldsClass">
            <p class="q-subheading q-mb-sm">{{$tr('ui.form.checkPassword')}}:</p>
            <q-input v-model="form.passwordConfirmation" type="password"
                     color="primary" rounded outlined dense
                     :rules="[
                  val => !!val || $tr('ui.message.fieldRequired'),
                  val => val == form.password || $tr('ui.message.fieldCheckPassword')
                  ]">
            </q-input>
         </div>

         <!-- text -->
         <div class=" col-12 q-body-2 line-text text-center q-mt-md q-mb-lg">
            <hr class="line-grey q-my-none full-width">
            <span class="bg-white q-px-lg">O ingresa por medio de tu red social </span>
         </div>

         <!-- Social -->
         <div class="col-12">
            <div class="row">
               <div class="col-xs-12 col-sm-6 text-center">
                  <q-btn icon="fab fa-facebook text-blue" flat label="FACEBOOK"/>
               </div>
               <div class="col-xs-12 col-sm-6 text-center">
                  <q-btn icon="fab fa-google text-red-14" flat label="GOOGLE"/>
               </div>
            </div>
         </div>


         <div class="col-12 text-center q-my-sm">
            <q-btn class="text-primary font-family-secondary" @click="$router.push({name: 'auth.login'})" no-caps flat
                   :label="$tr('quser.layout.label.login')"/>
         </div>


         <!--captcha-->
         <captcha v-model="form.captcha" class="full-width" ref="captcha"/>


         <!-- Button Register -->
         <div class="full-width text-center q-my-md">
            <q-btn :loading="loading" type="submit" color="primary" name="submit"
                   class="font-family-secondary  btn-arrow2">
               {{$tr('quser.layout.label.createAccount')}}
               <div slot="loading">
                  <q-spinner class="on-left"/>
                  {{`${$tr('ui.label.loading')}...`}}
               </div>
            </q-btn>
         </div>

      </q-form>

      <!--inner loading-->
      <inner-loading :visible="loading"/>
   </div>
</template>

<script>
   export default {
      props: {
         horizontal: {type: Boolean, default: false},
         horizontalExtraFields: {type: Boolean, default: false}
      },
      components: {},
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            loading: false,
            fullLoading: false,
            isHorizontal: false,
            extraFields: this.$store.getters['qsiteSettings/getSettingValueByName']('iprofile::registerExtraFields'),
            form: {
               firstName: null,
               lastName: null,
               email: null,
               password: null,
               passwordConfirmation: null,
               captcha: false,
               fields: {}
            },
         }
      },
      computed: {
         initData() {
            return {
               firstName: null,
               lastName: null,
               email: null,
               password: null,
               passwordConfirmation: null,
               fields: {}
            }
         },
         columnsFieldsClass() {
            this.isHorizontal = this.$clone(this.horizontal)
            if (this.horizontalExtraFields && this.extraFields.length) this.isHorizontal = true
            if (this.isHorizontal) {
               return 'col-12 col-md-6'
            } else {
               return 'col-12'
            }
         }
      },
      methods: {
         //Init template
         async init() {

            let captcha = this.$clone(this.form.captcha)//Save captcha
            this.form = this.$clone(this.initData)//inti form
            this.form.captcha = captcha//Add captch
            //Reset component image
            if (this.$refs.uploadComponent) {
               this.$refs.uploadComponent.removeFile()
            }
            this.orderExtraFields()//Order extra fields
         },
         //Order extra fields
         orderExtraFields() {
            this.extraFields.forEach(item => {
               if (item.active) {
                  this.$set(this.form.fields, item.field, {
                     name: item.field, value: null
                  })
               }
            })
         },
         //Login
         async register() {
            if (!this.inRequest) {
               if (this.checkedCaptcha()) {
                  this.loading = true
                  let data = this.$clone(this.form)
                  data.fields = this.$helper.convertToBackField(this.form.fields)

                  // Check rol to register
                  let uRol = this.$route.params.userRol

                  if (uRol && uRol == "business") {
                     let roles = [8]
                     data['roles'] = roles
                  }

                  //console.warn(data)

                  this.$crud.create('apiRoutes.quser.register', data).then(response => {
                     this.callbackRequest(true, response.data)
                  }).catch(error => {
                     this.callbackRequest(false, error)
                  })


               }
            }
         },
         //check if captcha is defined
         checkedCaptcha() {
            return true
            let captcha = this.form.captcha
            let response = false
            if (captcha && captcha.token) response = true
            if (!response) this.$alert.error({message: this.$tr('ui.message.requiredCaptcha')})
            if (this.$q.platform.android) {
               return true
            }
            return true
         },
         //Action after request
         callbackRequest(success = true, response) {
            this.loading = false
            this.$refs.captcha.reset()
            this.$refs.formContent.resetValidation()
            let message = `${this.$tr('quser.layout.message.activateAccount')} ${this.form.email}`

            if (success) {
               // if (!response.checkEmail) message = ''
               if (!response.checkEmail) message = 'Bienvenido a dondeestaesavaina.com, ya has ganado 5 puntos por registrarte, corre y gana otros 10 puntos completando tu perfil personal'
               //Dialog to go to iniciar sesión when id register

               //console.warn("Callback "+response)

               this.$q.dialog({
                  title: this.$tr('ui.message.recordCreated'),
                  message: message,
                  color: 'blue-grey',
                  ok: this.$tr('quser.layout.label.login'),
                  cancel: false,
                  noBackdropDismiss: true,
                  noEscDismiss: true,
               }).onOk(async data => {
                  this.login(response.checkEmail)
               })
            } else {
               console.error('[auth.register]', response)
               if (response) {//Message Vali
                  let errorMsg = JSON.parse(response)
                  if (errorMsg.email) {
                     this.$alert.error({
                        message: this.$tr('quser.layout.message.emailExist'),
                        pos: 'bottom', timeOut: 4000
                     })
                  } else {
                     this.$alert.error({message: `${this.$tr('ui.message.recordNoCreated')}`})
                  }
               }
            }
         },
         //Login user or redirect to from login acooding "check email" from backend
         login(checkEmail) {
            if (!checkEmail) {//Login
               this.fullLoading = true
               let data = {
                  username: this.form.email, password: this.form.password
               }
               this.$store.dispatch('quserAuth/AUTH_REQUEST', data).then((response) => {
                  this.fullLoading = false

                  //console.warn("REGISTER - USER LOGGED")
                  //console.warn("UserID "+this.$store.state.quserAuth.userId)
                  this.checkPointsProccess()

                  this.$emit('logged')
               }).catch(error => {
                  this.fullLoading = false
               })
            } else {//Emmit event
               this.$emit('registered', this.form.email)
               this.$emit('input', this.form.email)
               this.init()//Init form
            }
         },
         //Validte if field is required
         isFieldRequired(name, value) {
            let field = this.extraFields.find(item => item.field == name)
            return field.required || false
         },
         //Vlaidte if field is required
         isValueRequired(name, value) {
            let field = this.extraFields.find(item => item.field == name)
            if (field && field.required && !value) return true
            return false
         },
         // Check Points Proccess
         async checkPointsProccess() {

            let checkPointRegister = this.$store.getters['qsiteSettings/getSettingValueByName']('iredeems::points-per-register-user-checkbox')

            // Check active register user points
            if (checkPointRegister) {
               let pointPerRegister = this.$store.getters['qsiteSettings/getSettingValueByName']('iredeems::points-per-register-user')
               if (pointPerRegister > 0) {
                  await this.savePointsRegister(pointPerRegister)
               }
            }

         },
         // Save Points
         savePointsRegister(pointPerRegister) {

            let data = {
               user_id: this.$store.state.quserAuth.userId,
               pointable_id: this.$store.state.quserAuth.userId,
               pointable_type: 'Modules\\User\\Entities\\Sentinel\\User',
               type: 'user-register',
               points: pointPerRegister,
               description: 'Puntos por registro'
            }

            this.$crud.create('apiRoutes.qredeems.points', data).then(response => {
               //console.warn("SAVE IREDEEMS - POINTS PER REGISTER")
            }).catch(error => {
               console.error('[CREATE IREDEEMS - POINTS PER REGISTER] ', error)
               this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            })

         }

      }
   }
</script>

<style lang="stylus">

   #pageCaptcha
      //margin-top 5px

      .text-info-v3
         text-align center
         font-size 10px
         line-height 1.2

      .btn-arrow2
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

</style>
