<template>
  <div id="authResetPassword" class="flex flex-center">
    
        <div class="content q-px-xl q-py-md ">
          <!--Form-->
          <q-card class="rounded-md">
            <q-card-section class="q-px-xl q-py-lg ">
              <!--Title-->
              <div class="text-primary font-family-secondary text-h6">{{$tr('quser.layout.label.reset')}}</div>

              <q-separator class="q-mt-xs q-mb-md"/>

              <!--Form-->
              <q-form @submit="resetPassword()" autocomplete="off"
                      @validation-error="$alert.error($tr('ui.message.formInvalid'))">


                <!--Email field-->
                <p class="q-subheading q-mb-sm">{{$tr('ui.form.email')}}*</p>
                <q-input name="username" autofocus ref="username" autocomplete="off" rounded outlined dense
                         v-model="form.username" type="text" 
                        class="q-mb-sm" :rules="[
                            val => !!val || $tr('ui.message.fieldRequired'),
                            val => $helper.validateEmail(val) || $tr('ui.message.fieldEmail')]"/>

                <!--Button submit-->
                <div class="text-center q-mt-lg">
                  <q-btn :loading="loading" color="primary" type="submit" class="font-family-secondary btn-arrow" :label="$tr('quser.layout.label.reset')">
                    <div slot="loading">
                      <q-spinner-oval class="on-left"/>
                      {{`${$tr('ui.label.validating')}...`}}
                    </div>
                  </q-btn>
                </div>
              </q-form>

              <!--Button Login-->
              <div class="text-center q-mt-sm">
                <q-btn flat :label="$tr('quser.layout.label.login')"
                      :to="{name : 'auth.login'}" color="grey-8"/>
              </div>
            </q-card-section>
          </q-card>

          <!--Dialog message-->
          <q-dialog persistent v-model="showMessage">
            <q-card>
              <q-card-section>
                <!--Title-->
                <div class="text-primary text-center text-h6">{{$tr('quser.layout.label.reset')}}</div>
                <!--Message-->
                <p class="text-subtitle1 text-justify">{{$tr('quser.layout.message.reset')}}</p>
                <!--Button login-->
                <div class="text-center q-mt-sm">
                  <q-btn label="Iniciar sesion" :to="{name : 'auth.login'}" color="primary"/>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

        </div>

  </div>
</template>

<script>
  export default {
    props: {
      email: {default: null},
    },
    watch: {
      email() {
        this.setEmail()
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
          username: ''
        },
        showMessage: false,
        loading: false,
        logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo2').path,
        projectName : "Donde esta esa vaina",
      }
    },
    methods: {
      //Login
      async resetPassword() {
        this.loading = true;
        const {username} = this.form;
        this.$store.dispatch("quserAuth/RESET_PASSWORD_REQUEST", {username}).then((response) => {
          this.loading = false;
          this.showMessage = true
        }).catch(error => {
          this.loading = false;
        });
      },

      //Set email
      setEmail() {
        if (this.email) {
          this.form.username = this.$clone(this.email)
        } else this.$refs.username.focus()
      }
    }
  }
</script>

<style lang="stylus">
  #authResetPassword
    min-height 100vh
    
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
