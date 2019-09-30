
<template>
  <div id="masterHeaderFrontend" class="font-family-secondary">
    <q-layout-header reveal class="no-shadow">
      <q-toolbar-title>
        <div class="row gutter-sm bg-degradado">
          <div class="col-3 bg-white self-center logo-circle">
            <div class="logo">
              <router-link :to="{ name: 'app.home'}">
                <img :src="logo" :alt="projectName">
              </router-link>
            </div>
          </div>
          <div class="col-9  ">
            <div class="row h-100 justify-end">
              <div class="col-auto icon-center-start">
                <im-social class="q-hide q-sm-inline-show"></im-social>
                <div class="profile">
                  <a href=""><i class="fas fa-user-alt"></i></a>
                  <span class="q-px-sm font-family-primary">|</span>
                  <a href=""><i class="fas fa-heart"></i></a>

                </div>
                <span class="q-lg-hide q-pr-md">
                  <q-btn
                  @click="drawer = !drawer"
                  flat
                  round
                  dense
                  color="white"
                  icon="menu"
                  />
                </span>
              </div>
              <div class="col-12 q-py-sm-sm q-py-lg-md q-hide q-sm-show">
                <div class="row gutter-sm justify-center items-center">
                  <div class="col-xs-12 col-sm-11 col-md-9 col-lg-auto">
                    <div class="search">
                      <div class="row items-center">
                        <div class="col-auto">
                          <q-btn class="btn-search" round color="warning" icon="search" />
                        </div>
                        <div class="col">
                          <q-input v-model="search.text" color="white" inverted placeholder="Busca tu vaina aquí..."/>
                        </div>
                        <div class="col-4">
                          <q-select 
                          color="white" inverted
                          hide-underline
                          v-model="search.select"
                          :options="searchOptions"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-9 col-md-auto q-hide q-md-show">
                    <q-select class="select-cities"
                    color="yellow"
                    hide-underline
                    v-model="cities"
                    :options="cityOptions"
                    :before="[
                    {
                      icon: 'fas fa-globe-americas'
                    }
                    ]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-9 col-md-auto q-hide q-md-show">
                    <q-btn class="btn-tienda" flat icon="fas fa-store" color="white" no-caps label="Crea tu Tienda Virtual" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center q-mx-xl q-hide q-lg-show">
          <div class="col-12 text-center">
             <div class="menu">
               <q-list class="q-pa-none border-0">
                  <q-item  v-for="(item, index) in menu_frontend" :key="index"> 
                     

                    <q-btn-dropdown flat no-caps :icon="item.icon" :label="item.title" v-if="item.children">

                        <q-list class="submenu border-0 q-pa-none bg-light" v-for="(i, index) in item.children" :key="index">
                          <q-collapsible :icon="i.icon" :label="i.title"  v-if="i.children">
                            <div>
                              <p>{{item.title}}</p>
                              <q-item :to="a.page" v-for="(a, index) in i.children" :key="index">
                                <q-item-main :label="a.title" />
                              </q-item>
                            </div>
                          </q-collapsible>
                          <q-item :to="i.page" v-else>
                              <q-item-side :icon="i.icon" />
                              <q-item-main :label="i.title" />
                          </q-item>
                        </q-list>

                    </q-btn-dropdown>
                    <q-btn :to="item.page" :icon="item.icon" flat no-caps :label="item.title" v-else/>


                  </q-item>
                </q-list>
            </div>

          </div>
        </div>
      </q-toolbar-title>
      <div class="q-lg-hide">
        <q-layout-drawer overlay behavior="mobile" content-class=" drawer-main" v-model="drawer">

          <q-list>
            <q-list-header class="text-center"> Menu

            </q-list-header>
          </q-list>

        </q-layout-drawer>
      </div>
    </q-layout-header>
  </div>
</template>
<script>
import WidgetUser from "@imagina/quser/_components/widget-user";
import configList from '../configList';
import imSocial from 'src/components/master/imSocial';
export default {
  props: {},
  components: {
    WidgetUser,
    configList,
    imSocial
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
      logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
      cities: '1',
      text: '',
      drawer: false,
      search: {
        text: '',
        select: '1'
      },
      searchOptions: [
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
      menu_frontend: [
        {
          icon: 'fas fa-bars',
          title: 'Categorias',
          page: '',
          children: [
            {
              icon: 'fas fa-apple-alt',
              title: 'Comida',
              page: '',
              children: [
                {
                  icon: '',
                  title: 'Restaurantes',
                  page: '/#'
                }
              ]
            },
            {
              icon: 'fas fa-concierge-bell',
              title: 'Hotel',
              page: '/#'
            }
          ]
        },
        {
          icon: 'fas fa-store',
          title: 'Tiendas en ofertas',
          page: '/#'
        },
        {
          icon: 'fas fa-car-side',
          title: 'Domicilio',
          page: '/#'
        },
        {
          icon: 'far fa-surprise',
          title: '¿Probemas con una tienda?',
          page: '/#'
        },
        {
          icon: 'far fa-newspaper',
          title: 'Blog',
          page: '/#'
        },
        {
          icon: 'fas fa-users',
          title: 'Nosotros',
          page: '/nosotros'
        },
        {
          icon: 'far fa-envelope-open',
          title: 'Contacto',
          page: '/contacto'
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
  }
}
</script>
<style lang="stylus">
@import "~variables"

#masterHeaderFrontend
  .drawer-main
    .select-cities
      & .q-input-target
        color #333
      & .q-icon
        font-size 1.4rem
        color #333

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

  .menu
    -webkit-transform skew(10deg)
    transform skew(10deg)
    border-radius 10px
    padding 10px 15px
    margin -14px 0 10px 0
    background-color $warning
    font-size 20px
    position relative
    > ul, > .q-list
      -webkit-transform  skew(-10deg)
      transform skew(-10deg)     
      display -ms-flexbox
      display flex
      -ms-flex-wrap wrap
      flex-wrap wrap
      margin 0
      list-style none
      padding 0 
      > li, > .q-item
        -ms-flex 1 1 auto
        flex 1 1 auto
        cursor pointer  
        position relative
        padding 0 
        & .q-btn
          color $secondary
          padding 4px 10px
          position relative
        & :hover 
          color $tertiary
        & .q-btn:hover
            &:before
              content ''
              background-image url('/assets/img/menu-hover.png')
              position absolute
              width 100%
              height 10px
              background-repeat no-repeat
              bottom -3px
              left 0
              right 0
              background-position center
    .q-item.router-link-active, .q-item-link:hover
      background none  
    .q-focus-helper
      display none  

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
    & a
      margin 5px
      color $primary
      & :hover
       color $warning

  .profile
    display inline-block
    font-size: 1em
    color #ffffff
    padding 10px 15px
    & a
      color #ffffff
      & :hover
        color $warning

  .search
    .q-select
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
</style>