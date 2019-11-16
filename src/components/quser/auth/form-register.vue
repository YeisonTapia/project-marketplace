<template>
  <q-card class="q-my-xl">
    
    <div class="content q-px-xl q-py-md bg-white rounded-md">

      <register-form :horizontal-extra-fields="props.horizontalExtraFields"
                       :horizontal="props.horizontal"
                       v-model="email"
                       @logged="emitLogged()"
                       @registered="emitRegister()"/>
            
    </div>
   
  </q-card>
</template>
<script>
  //components
  import loginForm from 'src/components/quser/auth/login'
  import registerForm from 'src/components/quser/auth/register'

  export default {
    props: {
      horizontal: { type: Boolean, default: false },
      horizontalExtraFields: { type: Boolean, default: false }
    },
    components: {
      loginForm,
      registerForm
    },
    watch: {
    },
    mounted () {
      this.$nextTick(function () {
      })
    },
    data () {
      return {
        props: {},
        withRegister: false,//this.$store.getters['qsiteSettings/getSettingValueByName']('iprofile::registerUsers'),
        tabModel: 'tab-login',//'tab-login',
        email: null,
        selectForm: 'init',
        logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo2').path,
        projectName : "Donde esta esa vaina",
        cBackground: false
      }
    },
    methods: {
      init () {
        this.props = this.$clone(this.$props)
      },
      emitRegister () {
        this.tabModel = 'tab-login'
        this.$emit('registered', this.email)
      },
      emitLogged () {
        this.$emit('logged')
      }
    }
  }
</script>
<style lang="stylus">
  #authLoginRegister
    #formAuthPage
      &.form-content
        max-width 100%

        .form-title
          color $blue-grey
          text-align center
          border-bottom 2px solid #f1f1f1
          font-size 34px
          margin 0 0 10px 0

        .input-title
          font-size 16px

          .q-icon
            margin-right 5px
            
    .q-card
      background none !important
      box-shadow none !important
      
    #formInit
      max-width 800px

   
    .column-form
      border 1px solid $tertiary
   
    
</style>
