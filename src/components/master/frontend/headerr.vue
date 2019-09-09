<template>
  <div id="masterHeader">
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
                  <span class="q-px-sm">|</span>
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
                  <div class="col-xs-12 col-sm-9 col-md-auto">
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
            <nav class="menu" role="navigation">
              <ul class="className">
                  <li>
                    <q-icon name="fas fa-bars"/> Categorias
                    <ul class="dropdown">
                      <li><q-icon name="fas fa-apple-alt"/> Comida</li>
                      <li><q-icon name="fas fa-concierge-bell"/>Hotel</li>
                    </ul>
                  </li>
                  <li> <q-icon name="fas fa-store"/> Tiendas en ofertas</li>
                  <li> <q-icon name="fas fa-car-side"/>  Domicilio</li>
                  <li> <q-icon name="far fa-surprise"/>  ¿Probemas con una tienda?</li>
                  <li> <q-icon name="far fa-newspaper"/>  Blog</li>
                  <li> <q-icon name="fas fa-users"/>Nosotros</li>
                  <li> <q-icon name="far fa-envelope-open"/> Contacto</li>
              </ul>
            </nav>

          </div>
        </div>
      </q-toolbar-title>
      <div class="q-lg-hide">
        <q-layout-drawer overlay behavior="mobile" content-class="bg-light drawer-main" v-model="drawer">

             <q-list>
                <q-item> 
                  <!-- Search -->
                </q-item>
                <q-item> 
                  <!-- cities -->
                </q-item>
                 <q-item-separator />
                <q-item> 
                  <!-- Menu -->
                </q-item>
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
          label: 'Barrios',
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
@import "~variables";

#masterHeader

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
    > ul
      -webkit-transform  skew(-10deg)
      transform skew(-10deg)     
      display -ms-flexbox
      display flex
      -ms-flex-wrap wrap
      flex-wrap wrap
      margin 0
      list-style none
      padding 0
      > li
        -ms-flex 1 1 auto
        flex 1 1 auto
        cursor pointer  
        position relative
        & ul
          visibility: hidden;
          opacity: 0;
          position: absolute;
          transition: all 0.5s ease;
          left: 0;
          display: none;
          width: 99%;
          list-style: none;
          padding: 0; 
          will-change: transform;
    ul li:hover > ul, ul li ul:hover 
      visibility: visible;
      opacity: 1;
      display: block;

      

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
      color #C81E5A

  .profile
    display inline-block
    font-size: 1em
    color #ffffff
    padding 10px 15px
    & a
      color #ffffff

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
        & ::-webkit-input-placeholder 
          color red
        & :-ms-input-placeholder 
          color red
        & ::-moz-placeholder 
          color red
          opacity 1
        & :-moz-placeholder
          color red
          opacity 1


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