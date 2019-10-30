
<template>
  <div id="masterHeaderFrontend" class="font-family-secondary">
    <q-layout-header class="no-shadow" v-if="desktop">      
      <q-toolbar-title>
        <div class="row gutter-sm bg-degradado">
          <div class="col-3 bg-white self-center logo-circle">
            <div class="logo">
              <router-link :to="{ name: 'app.home'}">
                <img :src="logo" :alt="projectName">
              </router-link>
            </div>
          </div>
          <div class="col-9">
            <div class="row h-100 justify-end">
              <div class="col-auto icon-center-start">
                <im-social class="q-hide q-sm-inline-show"></im-social>
                <div class="profile">
                  <WidgetUser/>
                  <span class="q-px-sm font-family-primary line">|</span>
                  <q-btn class="q-pa-none" round flat icon="fas fa-heart" />
                  <span class="q-lg-hide">
                    <span class="q-px-sm font-family-primary line">|</span>
                    <q-btn  @click="createStore()" round flat icon="fas fa-store" />
                    <span class="q-px-sm font-family-primary line">|</span>
                    <q-btn  @click="toggleDrawer('menu',!drawer.menu)" round flat icon="fas fa-bars" />
                  </span>
                </div>
              </div>
              <div class="col-12 q-py-sm-sm q-py-lg-md q-hide q-sm-show">
                <div class="row gutter-sm justify-center items-center">
                  <div class="col-xs-12 col-sm-11 col-md-9 col-lg-auto">
                    <div class="search">
                      <div class="row items-center">
                        <div class="col-auto">
                          <q-btn class="btn-search" round color="warning" icon="search" @click="searchStore()" />
                        </div>
                        <div class="col">
                          <q-input v-model="search.text" color="white" inverted placeholder="Busca tu vaina aquí..."/>
                        </div>
                        <div class="col-3">
                          <q-select class="select-neighborhood"
                          color="white" inverted
                          hide-underline
                          v-model="search.neighborhood"
                          :options="neighborhoodOptions"
                          />
                        </div>
                        <div class="col-auto q-pl-md">
                          <q-select class="select-cities"
                            color="yellow"
                            hide-underline
                            v-model="search.city"
                            :options="cityOptions"
                            :before="[{ icon: 'fas fa-globe-americas' }]"
                            />
                        </div>
                      </div>
                    </div>

                  </div>
                  <!--<div class="col-xs-12 col-sm-9 col-md-auto q-hide q-sm-show">
                    <q-select class="select-cities"
                    color="yellow"
                    hide-underline
                    v-model="search.city"
                    :options="cityOptions"
                    :before="[{ icon: 'fas fa-globe-americas' }]"
                    />
                  </div> -->
                  <div class="col-xs-12 col-sm-9 col-md-auto q-hide q-md-show">
                    <q-btn class="btn-tienda" flat icon="fas fa-store" color="white" no-caps label="Crea tu Tienda Virtual" @click="createStore()" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center q-mx-xl q-hide q-lg-show">
          <div class="col-12 text-center">
             <menu-component :menu="menu_frontend"/>
          </div>
        </div>
      </q-toolbar-title>
    </q-layout-header>
    <q-layout-header v-else>
        <q-toolbar class="bg-degradado logo-movil">
          <q-btn flat color="primary" dense style="z-index: 9;" round @click="toggleDrawer('menu',!drawer.menu)" aria-label="Menu">
            <q-icon name="menu" />
          </q-btn>
          <q-toolbar-title class="q-pl-sm" style="z-index: 9;">
             <router-link :to="{ name: 'app.home'}">
                <img :src="logo" :alt="projectName" class="row items-center" style="height: 2.4em;">
              </router-link>
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-user-alt" />
          <q-btn flat round dense icon="fas fa-heart" />
          <q-btn flat round dense @click="createStore()" icon="fas fa-store" />
        </q-toolbar>
    </q-layout-header>
    <q-layout-drawer overlay behavior="mobile" content-class=" drawer-main" v-model="drawer.menu">
      <q-list no-border link inset-delimiter class="q-pa-none">

        <q-list-header class="text-center"> Menu </q-list-header>

          <menu-side :menu="menu_frontend"/>

       </q-list>
    </q-layout-drawer>
  </div>
</template>
<script>
import WidgetUser from "src/components/quser/widget-user";
import configList from '../configList';
import imSocial from 'src/components/master/imSocial';
import menuComponent from 'src/components/master/frontend/menu';
import menuSide from 'src/components/master/frontend/menuSide';
export default {
  props: {},
  components: {
    WidgetUser,
    configList,
    imSocial,
    menuComponent,
    menuSide
  },
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      projectName: this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
      userData: this.$store.state.quserAuth.userData,
      drawer: {
        menu: false,
        config: false,
        notification: false
      },
      menu: (this.$store.getters['qmenuMaster/menu'](1)).items,
      logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
      desktop: true, // this.$q.platform.is.desktop,
      text: '',
      search: {
        text: '',
        neighborhood: '1',
        city: '1'
      },
      neighborhoodOptions: [
        {
          label: 'Barrios',
          value: '1'
        },
        {
          label: 'Barrioswert',
          value: '2'
        }
      ],
      cityOptions: [
        {
          label: 'Rioacha',
          value: '1'
        },
        {
          label: 'Playaacha',
          value: '2'
        },
        {
          label: 'Lagoacha',
          value: '3'
        }
      ],
      categories: [
        {
          icon: 'fas fa-bars',
          title: 'Categorias',
          activated: true,
          permission: true,
          children: [
            {
              icon: 'fas fa-apple-alt',
              title: 'Comida',
              page: '',
              activated: true,
              permission: true,
              children: [
                {
                  icon: '',
                  title: 'Restaurantes',
                  page: '/#',
                  activated: true,
                  permission: true,
                }
              ]
            },
            {
              icon: 'fas fa-concierge-bell',
              title: 'Hotel',
              page: '/#',
              activated: true,
              permission: true,
            }
          ]
        }
      ],
      menu_frontend: [
        {
          icon: 'fas fa-bars',
          title: 'Categorias',
          activated: true,
          permission: true,
          children: [
            {
              icon: 'fas fa-apple-alt',
              title: 'Comida',
              page: '',
              activated: true,
              permission: true,
              children: [
                {
                  icon: '',
                  title: 'Restaurantes',
                  page: '/#',
                  activated: true,
                  permission: true,
                }
              ]
            },
            {
              icon: 'fas fa-concierge-bell',
              title: 'Hotel',
              page: '/#',
              activated: true,
              permission: true,
            }
          ]
        },
        {
          icon: 'fas fa-store',
          title: 'Tiendas en ofertas',
          name: 'app.tiendas',
          activated: true
        },
        {
          icon: 'fas fa-car-side',
          title: 'Domicilio',
          name: 'app.domicilio',
          activated: true
        },
        {
          icon: 'far fa-surprise',
          title: '¿Probemas con una tienda?',
          name: 'app.contacto',
          activated: true
        },
        {
          icon: 'far fa-newspaper',
          title: 'Blog',
          name: 'app.blog-index',
          activated: true,
          permission: true,
        },
        {
          icon: 'fas fa-users',
          title: 'Nosotros',
          name: 'app.nosotros',
          activated: true
        },
        {
          icon: 'far fa-envelope-open',
          title: 'Contacto',
          name: 'app.contacto',
          activated: true
        }
      ]
    }
  },
  computed: {
    getImageUrl() {
      return config('apiRoutes.api.base_url') + '/' + this.userData.smallImage;
    }
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
    createStore() {
      //Crear Tienda
      this.$router.push({ name: 'app.editartienda'});

    },
    searchStore() {
      // Buscar tienda
    }
  }
}
</script>
<style lang="stylus">
@import "~variables"

#masterHeaderFrontend
  .q-toolbar-title
    padding 0

  .logo-circle
    position relative
    .logo
      padding 15px
      img
        height auto
        width 100%
        z-index 9
        position relative
        object-fit contain
        max-height 184px
      &:before
        content ''
        height 100%
        width 29%
        background-color #FFFFFF
        display block
        border-radius 0 50% 50% 0
        right -16%
        position absolute
        top 0

  .q-btn-dropdown-arrow
    display none


  .imsocial
    background-color $white
    display inline-block
    font-size 1em
    -webkit-transform  skew(20deg)
    transform skew(20deg)
    background-color #ffffff
    border-radius 0 0 10px 10px
    padding 5px 15px
    & > div
      -webkit-transform  skew(-20deg)
      transform skew(-20deg)
      padding 5px
      a
      & i
        margin 3px
        color $primary
        & :hover
         color $warning

  .profile
    display inline-block
    font-size: 1em
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

  .search
    .select-neighborhood
      color #fd2d5e!important
      box-shadow none
      border-radius 0 20px 20px 0
      border 1px solid $warning
      border-left 0
      & .q-icon
        color #fd2d5e
    .btn-search
      font-size 20px
      margin-right -10px
      z-index 9
      & .q-icon
        font-size 30px
    .q-input
      box-shadow none
      border-radius 0
      margin-right 1px
      border-top 1px solid $warning
      border-bottom 1px solid $warning
      & .q-input-target
        padding-left 15px
        color #fd2d5e
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
      & .q-input-target
        color #FFFFFF
      & .q-icon
        color #F7C837


  .btn-tienda
    font-size 20px
    &:before
      height 2px
      background-image url('/assets/img/btn-arrow-1.png')
      background-size contain
      width 65px
      content ''
      position absolute
      top -0
      border-radius 50%
    &:after
      height 33px
      background-image url('/assets/img/btn-arrow-2.png')
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


  @media screen and (max-width: $breakpoint-sm)
    .icon-center-start
      -ms-flex-item-align center
      align-self center
    .logo-circle
      .logo
        padding 5px
        img
          height 50px


  @media screen and (max-width: $breakpoint-lg)
    .btn-tienda
      font-size 16px
    .select-cities
      font-size 16px
    .search
      .q-input
        font-size 14px
      .q-select
        font-size 14px
      .btn-search
        font-size 18px
        & .q-icon
          font-size 25px
    .logo-circle
      .logo
        &:before
          right -12%

  .logo-movil
    position relative
    &:before
      content ''
      height 100%
      width 140px
      background-color #FFFFFF
      display block
      border-radius 0 40px 40px 0
      left 0
      position absolute
      top 0

</style>
