<template>
   <div id="masterHeaderAdmin">
      <q-no-ssr>
      <!-- HEADER -->
      <q-header class="no-shadow">

         <div class="header-desktop font-family-secondary" v-if="$q.platform.is.desktop">

            <div class="row bg-degradado full-width">
               <div class="col-auto self-center logo-circle" style=" background-image: url('statics/img/bg-logo.png')">
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
                           <q-btn class="q-pa-none" dense round flat icon="fas fa-heart"
                                  :to="{name: 'qmarketplace.account.favorite.stores'}"/>
                           <span class="q-px-sm font-family-primary line">|</span>
                           <!--== Button Config ==-->
                           <q-btn round dense flat icon="fas fa-cog"
                                  @click="drawer.config = !drawer.config">
                           </q-btn>
                           <span class="q-px-sm font-family-primary line">|</span>
                           <notification/>
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
                              <search-store></search-store>
                           </div>
                           <div class="col-xs-12 col-sm-9 col-md-auto">
                              <q-btn v-if="$auth.hasAccess('marketplace.stores.create')&& storeSelect"
                                     class="btn-tienda" flat icon="fas fa-store" color="white" no-caps
                                     label="Mi Tienda" @click="createStore()"/>
                              <q-btn v-else class="btn-tienda" flat icon="fas fa-store" color="white"
                                     no-caps label="Crea tu Tienda Virtual" @click="createStore()"/>

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
            <q-toolbar class="bg-degradado header-movil">
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
                  <notification/>
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
         <!--Select Store-->
         <div id="storeSelect">
            <q-select v-if="store.selected"
                      :loading="store.loading" outlined dense :options="store.options"
                      @input="$store.dispatch('qmarketplaceStores/SET_STORE', store.selected),getStore(),$store.dispatch('app/REFRESH_PAGE')"
                      label="Store" v-model="store.selected" emit-value map-options
            />
         </div>

         <div class="q-pb-none q-mt-md">
            <div class="label-primary text-center text-white">

               <q-btn flat color="withe" class="title font-family-secondary" :to="{name:'qmarketplace.admin.mystore.level'}">NIVEL</q-btn>

               <div class="subtitle">
                  <!-- TIENDA PROFESIONAL -->
                  {{selectStore.level}}
               </div>
            </div>
         </div>
         <!-- === LOGO === -->
         <div class="logo-tienda text-center q-pb-lg">
            <router-link :to="{ name: 'app.home'}" v-if="!store.selected">
               <img :src="logo">
            </router-link>
            <router-link :to="{name: 'qmarketplace.admin.stores.my.store'}" v-else="!store.selected">
               <img :src="selectStore.logo.path">
            </router-link>
         </div>

         <!--= MENU =-->
         <menu-list v-if="store.selected || $auth.hasAccess('marketplace.stores.manage')" :menu="menu"/>

         <div class="bg-light text-center q-py-lg">
            <div class="q-headline text-primary text-weight-bold">¿NECESITAS AYUDA</div>
            <div class="q-subheading text-primary  text-weight-bold q-mb-md">PARA EDITAR TU TIENDA?</div>
            <q-btn rounded to="/contacto" color="primary" label="Contáctanos aquí"/>
         </div>

      </q-drawer>

      <!-- Config -->
      <q-drawer bordered id="menu_right" :overlay="true" v-model="drawer.config" side="right">
         <config-list/>
      </q-drawer>
      </q-no-ssr>
   </div>
</template>
<script>
   import configList from '../configList'
   import menuList from '../recursiveItemAdmin'
   import imSocial from 'src/components/master/imSocial'
   import widgetUser from 'src/components/quser/widget-user'
   import searchStore from 'src/components/master/searchStore'
   import notification from '@imagina/qmarketplace/_components/info/notifications/widget-notification'

   export default {
      props: {},
      components: {
         configList,
         menuList,
         imSocial,
         widgetUser,
         searchStore,
         notification
      },
      watch: {},
      mounted() {
         this.$nextTick(function () {
            this.init()
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
            selectStore: {
               logo:
                   {
                      path: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path
                   },
               level: 'Básico'
            },
            canCreateStore: false,
            menu: config('sidebar'),
            logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
            logoStore: '',
            store: {
               selected: null,
               options: [],
            },
            loading: false
         }
      },
      computed: {
         quserState() {
            return this.$store.state.quserAuth
         },
         storeSelect() {
            return this.$store.state.qmarketplaceStores.storeSelected
         }
      },
      methods: {
         async init() {
            this.loading = true
            await this.$store.dispatch('qmarketplaceStores/GET_USER_STORES')
            await this.$store.dispatch('qmarketplaceStores/SET_STORE')
            await this.getSuscriptionData();
            this.getStore();
            this.getNotifications()
            this.store.selected = this.$store.state.qmarketplaceStores.storeSelected
            this.store.options = this.$store.getters['qmarketplaceStores/userStoresSelect']
            this.loading = false
         },
         //Show drawer specific
         getSuscriptionData() {
            if (this.$store.state.quserAuth.authenticated) {
               if (this.$auth.hasAccess('marketplace.stores.create')) {
                  let criteria = this.$store.state.quserAuth.userId
                  let params = {
                     params: {
                        filter: {
                           userId: this.$store.state.quserAuth.userId,
                           status: 1
                        }
                     }
                  };
                  this.$crud.index("apiRoutes.qsubscription.subscriptions", params).then(response => {
                     if (response.data.length > 0) {
                           if (!this.storeSelect) {
                              this.canCreateStore = true;
                           }
                        } else if (!this.$auth.hasAccess('subscriptions.subscriptions.manage')) {
                           this.$router.push({
                              name: 'products.show',
                              params: {slug: 'tiendas-en-linea'},
                              query: {'storeId': this.storeSelect}
                           })
                        }
                  }).catch(error => {
                     console.error('[GET PRODUCT] ', error);
                     //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                     reject(false)//Resolve
                  })
               }//businessRole
            }
         },
         toggleDrawer(name, show) {
            //Hidden all drawers
            for (var drawer in this.drawer) {
               this.drawer[drawer] = false
            }
            this.drawer[name] = show//Show only drawer specific
         },
         createStore() {
            //Crear Tienda
            this.$router.push({name: 'qmarketplace.admin.stores.my.store'});
         },
         editStore() {
            this.$router.push({name: 'qmarketplace.admin.stores.my.store'});
         },
         getStore() {
            if (this.store.selected) {
               let params = {
                  params: {
                     filter: {}
                  }
               }
               let criteria = this.store.selected;
               this.$crud.show("apiRoutes.qmarketplace.store", criteria, params).then(response => {
                  this.selectStore = response.data;
               });
            }
         },
         getNotifications() {
            let params = {
               params: {
                  include: '',
                  filter: {
                     me: true,
                     read: false,
                  },
                  take: 1,
                  page: 1
               }
            };//params
            this.loading = true
            this.$crud.index("apiRoutes.qnotification.notifications", params).then(response => {
               this.notifications = response.meta.page.total
            }).catch(error => {
               console.error('[GET NOTIFICATIONS] ', error);
               //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         },
      }
   }
</script>
<style lang="stylus">
   #masterHeaderAdmin

      #storeSelect
         .q-select
            background $grey-4

            .q-field__control
               height 68px
               border-bottom $primary solid 3px

               .q-field__native
                  font-size 17px
                  color $primary

            .q-field__control:before
               border none
               border-radius inherit
               border-bottom $primary solid 1px

            .q-field__append
               color: $primary
               height 68px

               i
                  font-weight bold
                  font-size 36px

      .header-desktop
         .logo-circle
            position relative
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
                  height 150px

         .imsocial
            display inline-block
            -webkit-transform skew(20deg)
            transform skew(20deg)
            background-color #ffffff
            border-radius 0 0 10px 10px
            padding 5px 15px

            & > div
               -webkit-transform skew(-20deg)
               transform skew(-20deg)
               padding 5px

               & .q-btn
                  min-height 3em !important
                  min-width 3em !important
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
               min-height 1em !important
               min-width 1em !important

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
               top -0
               border-radius 50%
               margin-left auto
               margin-right auto

            &:after
               height 33px
               background-image url('/statics/img/btn-arrow-2.png')
               background-size contain
               background-repeat no-repeat
               width 65px
               content ''
               position absolute
               bottom -30px
               margin-left -32.5px
               left 50%

            & .q-icon
               color #f7c837

            & .q-focus-helper
               opacity 0

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
               -webkit-transform skew(-10deg)
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
                  color #ffffff !important

                  i
                     color #ffffff

            .q-expansion-item__content
               .q-item
                  padding: 10px 25px


</style>
