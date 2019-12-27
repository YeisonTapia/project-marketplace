<template>
  <div id="formLoginComponent" class="relative-position">

        <h4 class="text-primary text-center font-family-secondary q-mt-lg q-mb-none">Login</h4>
        <div class="q-body-2 text-center">Bienvenido, tu vaina en el mundo entero</div>
        <hr class="line-grey q-my-md">
     
        <q-form @submit="authenticate()" class="row q-gutter-x-sm q-pt-sm"
            autocorrect="off" autocomplete="off" @validation-error="$alert.error($tr('ui.message.formInvalid'))">

            <!-- User field -->
            <div :class="columnsFieldsClass">
              <p class="q-subheading q-mb-sm">{{$tr('ui.form.email')}}: </p>
              <q-input name="username" autofocus ref="username" rounded outlined dense
                       v-model="form.username" type="text" color="primary"
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                       >
              </q-input>
            </div>
    
            <!-- Password field -->
            <div :class="columnsFieldsClass">
              <p class="q-subheading q-mb-sm">{{$tr('ui.form.password')}}:</p>
              <q-input name="password" ref="password" v-model="form.password" rounded outlined dense
                       type="password" color="primary"
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                       >
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
                   <q-btn icon="fab fa-facebook text-blue" flat label="FACEBOOK" />
                 </div>
                 <div class="col-xs-12 col-sm-6 text-center">
                   <q-btn icon="fab fa-google text-red-14" flat label="GOOGLE" />
                 </div>
               </div>
            </div>
          
            <!-- Button login -->
            <div class="text-center col-12">
              <q-btn :loading="loading" type="submit" color="primary" class="btn-arrow q-mt-lg font-family-secondary">
                {{$tr('quser.layout.label.login')}}
                <template v-slot:loading>
                  <q-spinner-oval class="on-left"/>
                  {{$tr('ui.label.validating')}}
                </template>
              </q-btn>
            </div>

            <!-- Button Register -->
            <div class="text-center col-12">
              <q-btn flat :label="$tr('quser.layout.label.resetPassword')" class="q-mt-md"
                 :to="{name : 'auth.reset.password'}" color="grey-8"/>
            </div>

             <!-- Button Volver -->
            <div class="text-center col-12">
              <q-btn flat label="Volver" class="q-mt-md"
                @click="emitSelectForm()" color="grey-8"/>
            </div>
          
           
        </q-form>
        
  </div>
</template>

<script>
  export default {
    props: {
      email: {default: null},
      horizontal: {type: Boolean, default: false},
      selectForm: {type: String, default: 'init'}
    },
    watch: {
      email() {
        this.setEmail()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        props: {},
        logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo2').path,
        projectName : "Donde esta esa vaina",
        form: {
          username: '',
          password: ''
        },
        rememberData: true,
        loading: false,
        inRequest: false,
        fromRoute: false
      }
    },
    computed: {
      columnsFieldsClass() {
        if (this.horizontal) {
          return 'col-12 col-md-6'
        } else {
          return 'col-12'
        }
      }
    },
    methods: {
      //init
      init() {
        this.props = this.$clone(this.$props)
        this.setEmail()
      },
      //Login
      async authenticate() {
        if (!this.inRequest) {
          this.inRequest = true
          this.loading = true
          const {username, password} = this.form
          this.$store.dispatch('quserAuth/AUTH_REQUEST', {username, password}).then((response) => {
            this.loading = false
            this.inRequest = false
            this.$emit('logged')
          }).catch(error => {
            this.$alert.error(this.$tr('quser.layout.message.userOrPasswordInvalid'))
            this.loading = false
            this.inRequest = false
          })
        }
      },
      //Set email
      setEmail() {
        let emailFromUrl = this.$route.query.email
        let email = this.email ? this.$clone(this.email) : emailFromUrl
        setTimeout(() => {
          if (email) {
            this.form.username = email
            this.$refs.password.focus()
          } else {
            this.$refs.username.focus()
          }
        }, 200)
      },
      emitSelectForm(){
        this.$emit('selectForm','init');
      }
    }
  }
</script>
<style lang="stylus">

#formLoginComponent
  max-width 800px

  .column-form
    border 1px solid $tertiary
    
  .btn-arrow
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
