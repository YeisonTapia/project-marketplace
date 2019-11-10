<template>

  <div class="account-menu" v-if="success">

    <!-- Bloque Nivel-->
    <div class="row bloque-nivel-club">
      <div class="col-12">
        <div class="nivel relative-position text-white text-center q-pt-lg round-borders">
          <h4 class="text-uppercase q-my-sm font-family-secondary">nivel</h4>
          <h5 class="text-uppercase q-mb-xs q-mt-md">club de conocidos</h5>
          <p class="text-center text-white">dondeestaesavaina.com</p>
        </div>
        <div class="club text-center">
          <div class="circulo bg-secondary text-white round flex items-center justify-center">
            <div class="points font-family-secondary">100</div>
          </div>
          <h5 class="font-family-secondary text-secondary q-my-md">Puntos historicos</h5>
        </div>
      </div>
    </div>

    <!-- Bloque Menu -->
    <div class="row bloque-op-profile relative-position bg-white rounded-md shadow-5">
      <div class="col-12">

        <!--Image-->
        <upload-image v-model="imgUser" class="q-mt-lg q-mb-md"/>

        <!--FullName-->
        <h5 class="fullname font-family-secondary text-center relative-position">{{form.firstName}} {{form.lastName}}</h5>

        <!--Links-->
        <q-list no-border inset-delimiter class="q-px-lg">

                 <q-item :key="item.to" v-for="(item, index) in menuAccount" class=" q-mb-lg round-borders" :to="{name:item.to}">
                    <q-item-section avatar>
                      <q-icon :name="item.icon" size="20px"></q-icon>
                    </q-item-section>
                    <q-item-section class="item-title">
                      {{item.title}}
                        <!--
                       <q-item-tile tag="a" color="grey-10" style="text-decoration: none">
                        {{item.title}}
                      </q-item-tile>
                      -->
                    </q-item-section>
                  </q-item>

                  <!--Logout-->
                  <q-item tag="label" class="q-mb-lg round-borders" link :to="{name:'auth.logout'}" v-if="$store.state.quserAuth.userToken">
                    <q-item-section avatar>
                      <q-icon name="fas fa-sign-out-alt" size="20px"></q-icon>
                    </q-item-section>
                    <q-item-section class="item-title">
                      {{$t('ui.configList.signOut', {capitalize : true})}}
                      <!--
                      <q-item-tile tag="a"
                                   color="grey-10"
                                   style="text-decoration: none">
                        {{$t('ui.configList.signOut', {capitalize : true})}}
                      </q-item-tile>
                      -->
                    </q-item-section>
                  </q-item>

        </q-list>

      </div>
    </div>

  </div>

</template>

<script>
  //Plugins
  import {required, email, minLength} from 'vuelidate/lib/validators'

  export default {
    props: {},
    components: {},
    watch: {
      imgUser(val,oldval){

        this.form.fields.mainImage.value = val

        if(this.success==true){

          let data = this.$clone(this.form)//Fet form data
          data.fields = this.$helper.convertToBackField(data.fields)//Convert fields

          this.$crud.update('apiRoutes.quser.users', data.id, data).then(response => {
              this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
              this.loading = false//Login

            }).catch(error => {
              console.error('[UPDATE PROFILE] ', error)
              this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
              this.loading = false
          })

        }

      }
    },
    validations() {
      return {
        form: {
          fields: {}
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
        imgUser: null,
        form: {
          firstName: null,
          lastName: null,
          email: null,
          fields: {}
        },
        menuAccount:[
          {
            title: 'Editar Perfil',
            icon: 'far fa-edit',
            to: 'user.profile.me'
          },
          {
            title: 'Mis Puntos',
            icon: 'fas fa-dot-circle',
            to: 'qredeems.account.points'
          },
          {
            title: 'Mis Premios',
            icon: 'fas fa-award',
            to: 'app.home'
          },
          {
            title: 'Mis Mensajes',
            icon: 'far fa-envelope',
            to: 'app.home'
          },
          {
            title: 'Mis Compras',
            icon: 'fas fa-shopping-bag',
            to: 'app.home'
          },
          {
            title: 'Mis Tiendas Favoritas',
            icon: 'far fa-star',
            to: 'app.home'
          }
        ]
      }
    },
    computed: {
      defaultFields() {
        return [
          {name: 'mainImage', value: {}}
        ]
      }
    },
    methods: {
      //init
      async init() {
        this.loading = true//Loading
        this.form.fields = this.$clone(this.defaultFields)//Set default fields
        await this.setUserData()//Set user data
        this.success = true//Success page
        this.loading = false//Loading
      },
      //Set user data
      async setUserData() {
        let sessionData = await this.$cache.get.item('sessionData')//Get data from storage
        let userData = this.$clone(sessionData.userData)//Get user data
        //Convert fields
        userData.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields);

        //Set data in form
        this.form.id = this.$clone(userData.id)
        this.form.activated = this.$clone(userData.activated)
        this.form.firstName = this.$clone(userData.firstName)
        this.form.lastName = this.$clone(userData.lastName)
        this.form.email = this.$clone(userData.email)
        this.form.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields)

        if(this.form.fields.mainImage.value!="")
          this.imgUser=this.form.fields.mainImage.value

      }
    }
  }
</script>

<style lang="stylus">

  #profilePage
    .form-title
      color $primary

  #uploadImageComponent
    margin-top 35px
    .img-file
      .content-manage-file
        text-align: left
        .q-btn
          background-color $primary !important

  .account-menu
    max-width 245px

  .nivel
    background-image url('/statics/img/label-primary.png')
    background-size 100% 100%
    height 200px
    h4
      font-size 25px
      border 1px solid white
      border-left 0px
      border-right 0px
      width 70%
      margin auto
      letter-spacing 10px
    h5
      font-size 22px
      font-family 'Trebuchet MS'
    p
      font-size 18px
      font-family 'Trebuchet MS'
  .club
    margin-top -20px
    z-index 1
    position relative

  .circulo
    width 70px
    height 70px
    border-radius 50%
    margin auto
    font-size 20px

  .bloque-op-profile
    border 1px solid $tertiary
    margin-left 10px
    &:before
      content ''
      position absolute
      background-color $primary
      width 10px
      height 90%
      border-top-left-radius 12px
      border-bottom-left-radius 12px
      top 50px
      left -10px
    &:after
      content ''
      position absolute
      background-color $tertiary
      width 10px
      height 90%
      border-top-right-radius 12px
      border-bottom-right-radius 12px
      top 50px
      right -10px
    .q-list
      .q-item
        border-color  $tertiary
      .q-router-link--active
        background-color $primary
        .q-icon
          color white
        .item-title
          color white !important
      .q-link
        &:hover
          background-color $primary
          .q-icon
            color white
          .item-title
            color white !important
    .fullname
       &:after
        content ''
        position absolute
        background-color black
        width 70%
        height 1px
        left 0px
        right 0px
        margin-left auto
        margin-right auto
        bottom -12px
        box-shadow 0px 0px 1px #000




</style>
