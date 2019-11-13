<template>
  <div id="masterHeaderAdmin">
    <!-- HEADER -->
    <q-header class="no-shadow">

      <div class="header-desktop font-family-secondary"  v-if="$q.platform.is.desktop">

        <div class="row bg-degradado full-width">
          <div class="col-auto self-center logo-circle">
            <div class="logo">
              <router-link :to="{ name: 'app.home'}">
                <img :src="logo">
              </router-link>
            </div>
          </div> 
          <div class="col">

            <div class="row full-height justify-end">
              <div class="col-auto self-start">
                <im-social></im-social> 
                <div class="profile">
                  <widget-user></widget-user>
                  <span class="q-px-sm font-family-primary line">|</span>
                  <q-btn class="q-pa-none" round flat icon="fas fa-heart" />
                  <span class="q-px-sm font-family-primary line">|</span>
                  <!--== Button Config ==-->
                  <q-btn round dense flat icon="fas fa-cog"
                    @click="drawer.config = !drawer.config">
                  </q-btn>
                  <span class="q-px-sm font-family-primary line">|</span>
                  <!--= BUTTON MENU =-->
                  <q-btn flat dense round
                         @click="drawer.menu = !drawer.menu"
                         aria-label="Menu">
                    <q-icon name="menu"/>
                  </q-btn>
                </div>
              </div>
              <div class="col-12 q-py-lg">
                <div class="row q-col-gutter-sm justify-center items-center">
                  <div class="col-md-9 col-lg-auto">

                    <q-toolbar class="search q-px-none">
                      <q-btn class="btn-search q-mr-xs" 
                          round color="warning"  icon="search" @click="searchStore()" />
                      <q-input v-model="search.text" dense color="white" outlined 
                          placeholder="Busca tu vaina aquí..."/>   
                      <q-select outlined dense class="select-neighborhood"
                                v-model="search.neighborhood" :options="neighborhoodOptions" />
                      <q-space class="q-mx-sm" />
                      <q-select outlined class="select-cities" v-model="search.city" :options="cityOptions">
                        <template v-slot:prepend>
                          <q-icon name="fas fa-globe-americas" />
                        </template>
                      </q-select>
                    </q-toolbar>
                  </div>
                  <div class="col-xs-12 col-sm-9 col-md-auto">
                    <q-btn class="btn-tienda" flat icon="fas fa-store" color="white" no-caps label="Crea tu Tienda Virtual" @click="createStore()" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--= Menu Desktop =-->
        <div class="row justify-center full-width">
          <div class="col-11">
            <div class="title-menu">
                <q-btn :label="$tr($route.meta.title)" flat
                 @click="drawer.menu = !drawer.menu"
                 class="btn-page-title q-px-md" no-caps
                 :icon="$route.meta.icon"/>
            </div>
          </div>
        </div>

      </div>

      <div class="" v-else>

        <q-toolbar class="bg-degradado header-movil" >
          <!--= BUTTON MENU =-->
          <q-btn flat dense round
                 @click="drawer.menu = !drawer.menu"
                 aria-label="Menu">
            <q-icon name="menu"/>
          </q-btn>

          <!--= TITLE =-->
          <q-toolbar-title class="items-center">
            <!--Toogle Menu-->
            <q-btn :label="$tr($route.meta.title)" flat
                   @click="drawer.menu = !drawer.menu"
                   class="btn-page-title"
                   :icon="$route.meta.icon"/>
          </q-toolbar-title>

          <!--== Button User ==-->
          <q-no-ssr>
            <q-btn :to="{name: 'user.profile.me'}" flat no-caps v-if="quserState.authenticated">
              <q-avatar size="25px">
                <img :src="quserState.userData.mainImage">
              </q-avatar>
              <div class="q-ml-xs">{{quserState.userData.firstName}}</div>
            </q-btn>
          </q-no-ssr>

          <!--== Button Config ==-->
          <q-btn round dense flat icon="fas fa-cog"
                 @click="drawer.config = !drawer.config">
          </q-btn>
        </q-toolbar>


      </div>

    </q-header>

    <!-- MENU -->
    <q-drawer bordered id="menu_left" class="no-shadow" v-model="drawer.menu">

      <div class="q-pb-none q-mt-md">
        <div class="label-primary text-center text-white">
          <div class="title q-pb-md font-family-secondary">
            <span>NIVEL</span>
          </div>
          <div class="subtitle" >
            TIENDA PROFESIONAL
          </div>      
        </div>
      </div>
      <!-- === LOGO === -->
      <div class="logo-tienda text-center q-pb-lg">
        <router-link :to="{ name: 'app.home'}">
            <img :src="logo">
        </router-link>
      </div>
      <!--= MENU =-->
      <menu-list :menu="menu"/>

      <div class="bg-light text-center q-py-lg">
        <div class="q-headline text-primary text-weight-bold">¿NECESITAS AYUDA </div>
        <div class="q-subheading text-primary  text-weight-bold q-mb-md">PARA EDITAR TU TIENDA?</div>
        <q-btn rounded to="/contacto" color="primary" label="Contáctanos aquí"/>
      </div>
    </q-drawer>

    <!-- Config -->
    <q-drawer bordered id="menu_right" :overlay="true" v-model="drawer.config" side="right">
      <config-list/>
    </q-drawer>
  </div>
</template>
<script>
  import configList from '../configList'
  import menuList from '../recursiveItem'
  import imSocial from 'src/components/master/imSocial'
  import widgetUser from "src/components/quser/widget-user"

  export default {
    props: {},
    components: {
      configList,
      menuList,
      imSocial,
      widgetUser 
    },
    watch: {},
    mounted () {
      this.$nextTick(function () {
      })
    },
    data () {
      return {
        projectName: this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
        drawer: {
          menu: true,
          config: false,
          notification: false
        },
        menu: config('sidebar'),
        logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
        search: {
          text: '',
          neighborhood: 'Barrios',
          city: 'Rioacha'
        },
        neighborhoodOptions: [ 'Barrios','Barrios','Barrioswert' ],
        cityOptions: [ 'Rioacha','Playaacha','Lagoacha'],
      }
    },
    computed: {
      quserState () {
        return this.$store.state.quserAuth
      }
    },
    methods: {
      //Show drawer specific
      toggleDrawer (name, show) {
        //Hidden all drawers
        for (var drawer in this.drawer) {
          this.drawer[drawer] = false
        }
        this.drawer[name] = show//Show only drawer specific
      },
      createStore() {
        //Crear Tienda
        this.$router.push({ name: 'app.editartienda'});
      },
    }
  }
</script>
<style lang="stylus">
#masterHeaderAdmin
  .header-desktop
    .logo-circle
      position relative
      background-image url('/statics/img/bg-logo.png')
      background-size 100% 100%
      padding 10px
      .logo
        padding 15px
        img
          height auto
          width 100%
          z-index 9
          position relative
          object-fit contain
          height 165px

    .imsocial
      display inline-block
      -webkit-transform  skew(20deg)
      transform skew(20deg)
      background-color #ffffff
      border-radius 0 0 10px 10px
      padding 5px 15px
      & > div
        -webkit-transform  skew(-20deg)
        transform skew(-20deg)
        padding 5px
        & .q-btn
          height 1.5em
          width 1.5em
          color $primary
          & :hover
            color $warning
        & .q-focus-helper  
          background none !important 
    .profile
      display inline-block
      color #ffffff
      padding 10px 25px
      & .q-btn
        height 1.5em
        width 1.5em
        & :hover
          color $warning
      & .q-focus-helper  
        background none !important
      & .line
        position relative
        top 3px

    .btn-tienda
      font-size 19px
      &:before
        height 2px
        background-image url('/statics/img/btn-arrow-1.png')
        background-size contain
        width 65px
        content ''
        position absolute
        top -0
        border-radius 50%
      &:after
        height 33px
        background-image url('/statics/img/btn-arrow-2.png')
        background-size contain
        background-repeat no-repeat
        width 65px
        content ''
        position absolute
        bottom -30px
      & .q-icon
        color #f7c837
      & .q-focus-helper
        opacity 0

    .search
      .select-neighborhood
        & .q-icon
          color $tertiary
        .q-field__control
          color transparent
          background-color #ffffff
          border-radius 0 20px 20px 0
          &:before
            border 0!important  
        & .q-field__native
          color $tertiary   
          font-size 18px
      .btn-search
        font-size 20px
        margin-right -10px
        z-index 9
        & .q-icon
          font-size 30px
      .q-input
        margin-right 2px
        & .q-field__control
          border-radius 0
          padding-left 15px
          background-color #ffffff
          &:before
            border 0!important
        & .q-field__native
          color $primary   
          font-size 18px
          &::-webkit-input-placeholder
            color $primary !important
          &::-moz-placeholder
            opacity 1
            color $primary !important
          &:-moz-placeholder
            color $primary !important
          &:-ms-input-placeholder
            color $primary !important
      .select-cities
        font-size 20px
        .q-field__control
          color transparent
          &:before
            border 0!important
        & .q-field__native
          color #FFFFFF
        & .q-icon
          color $warning  

    .title-menu
      -webkit-transform skew(10deg)
      transform skew(10deg)
      border-radius 10px
      padding 10px 15px
      margin -14px 0 10px 0
      background-color $warning
      font-size 18px
      position relative
      z-index 99
      > .q-btn
        -webkit-transform  skew(-10deg)
        transform skew(-10deg)     
        display -ms-flexbox
        display flex
        -ms-flex-wrap wrap
        flex-wrap wrap
        margin 0
        list-style none
        padding 0 15px
        color $secondary  

  #menu_left
    .q-list
      font-weight 700
      font-size 16px
      border-top 1px solid #e0e0e0 !important
      .q-icon
        font-size 16px
        padding 0 15px
        color $secondary
      .q-item
        padding 20px 10px
        color $secondary
        border-bottom 1px solid #e0e0e0 !important
        &:hover
          background $tertiary!important
          color #ffffff!important
          i 
            color #ffffff
      .q-expansion-item__content  
        .q-item
          padding: 10px 25px
 

 
</style>
