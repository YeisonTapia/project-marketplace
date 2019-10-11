<template>
  <div id="formLoginComponent" :style="'max-width: '+(horizontal ? '700px' : '300px')">
    <div class="row gutter-x-sm">
      <!-- User field -->
      <div :class="columnsFieldsClass">
        <q-field
          :error="$v.form.username.$error"
          :error-label="$tr('ui.message.fieldRequired')"
          class="q-my-sm"
        >
         
          <p class="caption q-mb-xs">
             <!-- <q-icon name="fas fa-user"/> -->
             {{$trp('ui.form.email')}}
          </p>

          <q-input name="username"
                   autofocus
                   ref="username"
                   autocomplete="off"
                   v-model="form.username"
                   type="text"
                   @keyup.enter="authenticate()"
          />
        </q-field>
      </div>
      <!-- Password field -->
      <div :class="columnsFieldsClass">
        <q-field
          :error="$v.form.password.$error"
          :error-label="$tr('ui.message.fieldRequired')"
          class="q-my-sm"
        >
          <p class="caption q-mb-xs">
             <!-- <q-icon name="fas fa-lock"/> -->
             {{$tr('ui.form.password')}}
          </p>
          <q-input v-model="form.password"
                   type="password"
                   name="password"
                   ref="password"
                   @keyup.enter="authenticate()"
          />
        </q-field>
      </div>
    </div>

    <!-- Social Testing -->
    <!--
    <div class="row social-links text-center q-mb-lg">
      <p class="w-100">O ingresa por medio de tu red social</p>

      <div class="socials flex flex-center w-100">
        <div class="link uppercase facebook q-px-xs" @click="showModal('facebook')">
          <q-icon name="fab fa-facebook" size="20px" class="q-mr-xs"></q-icon>
          facebook
        </div>
        <div class="link uppercase google q-px-xs" @click="showModal('google')">
          <q-icon name="fab fa-google" size="20px" class="q-mr-xs"></q-icon>
          google
        </div>
      </div>

    </div>
    -->

    <!-- Modal -->
    <q-modal v-model="opened" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
      <q-modal-layout>
        <div class="layout-padding">

           <iframe 
            v-if="loadedSocial"
            :src="socialRedirect"
            height="300"
            width="300"
            frameborder="0"
          ></iframe>
    
        </div>
      </q-modal-layout>
    </q-modal>
    
    <!-- Button login -->
    <div class="text-center q-mt-sm">
      <q-btn :loading="loading"
             color="primary" name="submit"
             @click="authenticate()"
             class="btn-login no-border font-family-secondary">
        {{$tr('quser.layout.label.login')}}
        <span slot="loading">
          <q-spinner-mat class="on-left"/>
          {{`${$tr('ui.label.validating')}...`}}
        </span>
      </q-btn>
    </div>

    <div class="remembered text-center q-mt-lg"> 
        <router-link :to="{ name: 'auth.reset.password'}" append>
            {{$tr('quser.layout.label.iforgot')}}
        </router-link>
    </div>

  </div>
</template>

<script>
  //Plugins
  import {required, email, numeric, minLength} from 'vuelidate/lib/validators';

  import config from 'src/config/index'
  import http from "axios"

  export default {
    props: {
      email: {default: null},
      horizontal: {type: Boolean, default: false}
    },
    watch: {
      email() {
        this.setEmail()
      }
    },
    validations: {
      form: {
        username: {required},
        password: {required}
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.setEmail()
      })
    },
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rememberData: true,
        loading: false,
        inRequest: false,
        fromRoute: false,
        opened: false,
        socialRedirect: '',
        loadedSocial: false
      }
    },
    computed :{
      columnsFieldsClass(){
        if(this.horizontal) return 'col-12 col-md-6'
        else return 'col-12'
      }
    },
    methods: {
      //Login
      async authenticate() {
        if (!this.inRequest) {
          this.$v.$touch();
          if (!this.$v.$error) {
            this.inRequest = true
            this.loading = true;
            const {username, password} = this.form;
            this.$store.dispatch("quserAuth/AUTH_REQUEST", {username, password}).then((response) => {
              this.loading = false;
              this.inRequest = false
              this.$emit('logged')
            }).catch(error => {
              this.loading = false;
              this.inRequest = false
            });
          } else {
            this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
          }
        }
      },
      //Set email
      setEmail() {
        if (this.email) {
          this.form.username = this.$clone(this.email)
          this.$refs.password.focus()
        } else this.$refs.username.focus()
      },
      // Show Modal Social
      async showModal(provider){
          this.loading = true;
          await this.searchUrl(provider)
          if(this.socialRedirect!=''){
            //this.opened = true
            //this.loadedSocial = true
            console.warn(this.socialRedirect)
            window.location.href = this.socialRedirect
          }
          this.loading = false;
      },
      // Search url Social
      searchUrl(provider){
        return new Promise((resolve, reject) => {

            let apiUrl = '/profile/v1/auth/social/'+provider

            http.get(config('apiRoutes.api.api_url') + apiUrl)
            .then(response => {

              this.socialRedirect = response.data.data.redirect
             
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
  
  .btn-login
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
  
  .remembered
    a
      color $secondary
      
  .socials
    .link
      cursor:pointer
      

  .fa-twitter
    color #00ACEE
  .fa-facebook
    color #3B5998
  .fa-instagram,.fa-google
    color $primary
      
</style>
