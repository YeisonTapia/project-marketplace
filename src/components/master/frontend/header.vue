<template>
  <div id="masterHeader">
    <!-- ============= HEADER ======================= -->
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
                </div>
              </div>
              <div class="col-12 q-py-lg">
                <div class="row q-col-gutter-sm justify-center items-center">
                  <div class="col-md-9 col-lg-auto">

                    <search-store></search-store>
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
            <menu-list class="menu" :menu="menuItems"></menu-list>
          </div>
        </div>

      </div>

      <q-toolbar class="bg-degradado header-movil" v-else>
        <q-btn color="primary" flat dense round  @click="drawer.menu = !drawer.menu" icon="menu"/>
        <q-toolbar-title class="q-pl-none">
          <div class="q-inline-block logo">
           <router-link :to="{ name: 'app.home'}">
              <img :src="logo" :alt="projectName"  style="height: 42px; position: relative; top: 4px;">
            </router-link>
          </div>
        </q-toolbar-title>
        <widget-user></widget-user>
        <q-btn flat round dense icon="fas fa-heart" />
        <q-btn flat round dense @click="createStore()" icon="fas fa-store" />
      </q-toolbar>

    </q-header>

    <!-- MENU LEFT -->
    <q-drawer id="menu_master" v-model="drawer.menu">
      <q-list no-border >
        <!-- === LOGO === -->
        <q-item-section class="logo-tienda text-center q-py-lg">
          <router-link :to="{ name: 'app.home'}">
              <img :src="logo">
          </router-link>
        </q-item-section>

        <!--= MENU =-->
        <menu-list :menu="menuItems" class="menu"/>
      </q-list>
    </q-drawer>
  </div>
</template>
<script>
  import menuList from "../recursiveItem";
  import imSocial from 'src/components/master/imSocial';
  import widgetUser from "src/components/quser/widget-user";
  import searchStore from 'src/components/master/searchStore'

  export default {
    props: {},
    components: {
      menuList,
      imSocial,
      widgetUser,
      searchStore 
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        projectName: 'Test',//this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
        drawer: {
          menu: false
        },
        logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
        modal: {
          show: true,
          search: ''
        },
        phones: [],//this.$store.getters['qsiteSettings/getSettingValueByName']('isite::phones')
      }
    },
    computed: {
        menuItems() {
            let menu = this.$store.state.qcrudMaster.show['qmenu-menus-main']
            let items = []
            //Transform data
            if (menu && menu.data.menuitems) {
                menu.data.menuitems.forEach(item => {
                    if (parseInt(item.status))
                        items.push({
                            permission: null,
                            activated: true,
                            name: item.uri,
                            title: item.title,
                            icon: item.icon
                        })
                })
            }

            console.warn(items)
            return items
        },
      getImageUrl() {
        return config('apiRoutes.api.base_url') + '/' + this.userData.smallImage;
      },
      userData() {
        return []//this.$store.state.quserAuth.userData
      },
    },
    methods: {
      //Show drawer specific
      toggleDrawer(name, show) {
        //Hidden all drawers
        for (var drawer in this.drawer) {
          this.drawer[drawer] = false
        }
        this.drawer[name] = show//Show only drawer specific
      },
      //open URL
      openUrl(url) {
        window.open(url, '_blank')
      },
      createStore() {
        //Crear Tienda
        this.$router.push({ name: 'app.editartienda'});
      },
    }
  }
</script>
<style lang="stylus">
#masterHeader
  .header-movil
    .logo
      background-image url('/statics/img/bg-logo.png')
      background-size 100% 100%
      padding 0 10px
    &:before
      content ''
      background-color #fff
      width 100px
      height 50px
      position absolute
      top 0
      left 0

  #menu_master    
    .menu  
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
          color #ffffff
          i 
            color #ffffff

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

    .menu
      > div
        -webkit-transform skew(10deg)
        transform skew(10deg)
        border-radius 10px
        padding 10px 15px
        margin -14px 0 10px 0
        background-color $warning
        font-size 1rem
        position relative
        z-index 99
        > .q-list
          -webkit-transform  skew(-10deg)
          transform skew(-10deg)     
          display -ms-flexbox
          display flex
          -ms-flex-wrap wrap
          flex-wrap wrap
          margin 0
          list-style none
          padding 0 
          > .q-item
            -ms-flex 1 1 auto
            flex 1 1 auto
            cursor pointer  
            position relative
            color $secondary
            &:hover 
              color $tertiary
              &:before
                content ''
                background-image url('/statics/img/menu-hover.png')
                position absolute
                width 100%
                height 10px
                background-repeat no-repeat
                bottom -3px
                left 0
                right 0
                background-position center
</style>
