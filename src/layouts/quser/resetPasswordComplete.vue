<template>
  <div id="authResetPassword" class="flex flex-center">
    <!--Form-->
    <q-card class="rounded-md">
      <q-card-section class="q-px-xl q-py-lg ">
        <!--Title-->
        <div class="text-primary font-family-secondary text-h6">{{$tr('quser.layout.label.reset')}}</div>

        <q-separator class="q-mt-xs q-mb-md"/>

        <!--Form-->
        <q-form @submit="changePassword()" autocomplete="off"
                @validation-error="$alert.error($tr('ui.message.formInvalid'))">
          <!--Password-->
          <p class="q-subheading q-mb-sm">{{$tr('ui.form.password')}}*</p>
          <q-input name="username" autofocus ref="username" autocomplete="off" rounded outlined dense
                    v-model="form.password" type="password" color="blue-grey"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>

          <!--Email field-->
          <p class="q-subheading q-mb-sm">{{$tr('ui.form.checkPassword')}}*</p>
          <q-input name="username" ref="username" autocomplete="off" rounded outlined dense
                    v-model="form.passwordConfirmation"
                   type="password" color="blue-grey" :rules="[
                    val => !!val || $tr('ui.message.fieldRequired'),
                    val => val == form.password || $tr('ui.message.fieldCheckPassword')
                   ]"/>

          <!--Button submit-->
          <div class="text-center q-mt-lg">
            <q-btn :loading="loading" color="primary" type="submit" class="font-family-secondary btn-arrow"
                   :label="$tr('quser.layout.label.resetPassword')">
              <div slot="loading">
                <q-spinner-oval class="on-left"/>
                {{`${$tr('ui.label.validating')}...`}}
              </div>
            </q-btn>
          </div>
        </q-form>

        <!--Button Login-->
        <div class="text-center q-mt-sm">
          <q-btn flat label="Iniciar sesion" :to="{name : 'auth.login'}" color="grey-8"/>
        </div>
      </q-card-section>
    </q-card>

    <!--Dialog message-->
    <q-dialog persistent v-model="showMessage">
      <q-card>
        <q-card-section>
          <!--Title-->
          <div class="text-positive text-center text-h6">
            <q-icon name="fas fa-check" size="20px"/>
            {{$tr('ui.label.ready')}}
          </div>

          <!--Message-->
          <p class="text-subtitle1 text-justify">
            {{$tr('quser.layout.message.changend')}}
          </p>
          <!--Button login-->
          <div class="text-center q-mt-sm">
            <q-btn :label="$tr('quser.layout.label.login')"
                   :to="{name : 'auth.login', query : {email : email}}" color="primary"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          password: null,
          passwordConfirmation: null,
        },
        email : '',
        showMessage: false,
        loading: false,
      }
    },
    methods: {
      //send
      async changePassword() {
        this.loading = true;
        //Request params
        let requestParams = {
          password: this.form.password,
          passwordConfirmation: this.form.passwordConfirmation,
          userId: this.$route.params.userId,
          token: this.$route.params.token
        }

        this.$store.dispatch("quserAuth/CHANGED_PASSWORD_REQUEST", requestParams).then(response => {
          this.loading = false
          if(response.data && response.data.email) this.email = response.data.email
          this.showMessage = true
        }).catch(error => {
          this.$alert.error(this.$tr('ui.message.errorRequest'))
          this.loading = false
        });
      },
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
