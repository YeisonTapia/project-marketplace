<template>
  <div id="masterHeader">
    <!-- ============= HEADER ======================= -->
    <q-layout-header class="no-shadow">
      <q-toolbar color="transparent" class="bg-degradado">
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
        <q-btn :to="{name: 'user.profile.me'}" flat no-caps>
          <div class="button-profile-image" :style="`background-image: url('${userData.smallImage}')`"/>
          <span class="q-hide q-md-show">
            {{userData.firstName}}
          </span>
        </q-btn>

        <!--== Button Config ==-->
        <q-btn round dense flat icon="fas fa-cog"
               @click="drawer.config = !drawer.config">
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <!-- ============= DRAWERS ======================= -->
    <!-- MENU -->
    <q-layout-drawer id="menu_master" class="no-shadow" v-model="drawer.menu">
      <q-list no-border link inset-delimiter class="q-pa-none">


        <q-list-header class="q-pb-none">
          <div class="label-primary text-center text-white">

            <div class="title q-pb-md font-family-secondary">
              <span>NIVEL</span>
            </div>
            <div class="subtitle q-pt-md " >
              TIENDA PROFESIONAL
            </div>
                      
          </div>
        </q-list-header>



        <!-- === LOGO === -->
        <q-list-header class="logo-tienda text-center">
          <router-link :to="{ name: 'app.home'}">
              <img :src="logo">
          </router-link>
        </q-list-header>


        <!--= MENU =-->
        <menu-list :menu="menu"/>

        <q-list-header class="bg-light text-center q-py-lg">
          <div class="q-headline text-primary text-weight-bold">¿NECESITAS AYUDA </div>
          <div class="q-subheading text-primary  text-weight-bold q-mb-md">PARA EDITAR TU TIENDA?</div>
          <q-btn rounded to="/contacto" color="primary" label="Contáctanos aquí"/>
        </q-list-header>
      </q-list>
    </q-layout-drawer>

    <!-- Config -->
    <q-layout-drawer id="menu_master" :overlay="true"
                     v-model="drawer.config" side="right"
    >
      <config-list></config-list>
    </q-layout-drawer>
  </div>
</template>
<script>
  import WidgetUser from "@imagina/quser/_components/widget-user";
  import configList from 'src/components/admin/configList';
  import menuList from "src/components/admin/recursiveItem";

  export default {
    props: {},
    components: {
      WidgetUser,
      configList,
      menuList
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        projectName: this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
        drawer: {
          menu: true,
          config: false,
          notification: false
        },
        menu: config('sidebar'),
        logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path
      }
    },
    computed: {
      getImageUrl() {
        return config('apiRoutes.api.base_url') + '/' + this.userData.smallImage;
      },
      userData() {
        return this.$store.state.quserAuth.userData
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
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
  #masterHeader
    .q-toolbar-title
      padding 0 5px
      .btn-page-title
        padding 5px
        .q-icon
          background-color white
          border-radius 50%
          height 25px
          width 25px
          color $primary
          font-size 15px
          padding 5px
          margin-right 5px
          transition .5s
          &.on-right
            margin-left 5px
          @media screen and (max-width: $breakpoint-xs)
            display none
        &.menu-openend
          .q-icon
            transform rotate(90deg)

    .q-layout-drawer-delimiter
      box-shadow $shadow-1

    .button-profile-image
      height 25px
      width 25px
      border-radius 50%
      background-repeat no-repeat
      background-position center
      background-size cover
      margin-right 5px
</style>
