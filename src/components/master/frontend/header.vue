<template>
   <div id="masterHeader">
      <q-no-ssr>
      <!-- ============= HEADER ======================= -->
      <q-header class="no-shadow">

         <div class="header-desktop font-family-secondary" v-if="$q.platform.is.desktop">

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
                           <span class="q-px-md font-family-primary line">|</span>
                           <q-btn
                                   class="q-pa-none"
                                   flat dense
                                   icon="fas fa-heart"
                                   :to="{name: 'qmarketplace.account.favorite.stores'}"/>
                           <span class="q-px-md font-family-primary line">|</span>
                           <notification/>

                        </div>

                     </div>
                     <div class="col-12 q-py-lg">
                        <div class="row q-col-gutter-sm justify-center items-center">
                           <div class="col-md-9 col-lg-auto">
                              <search-store/>
                           </div>
                           <div class="col-xs-12 col-sm-9 col-md-auto">
                              <q-btn v-if="$auth.hasAccess('marketplace.stores.create')&& storeSelect"
                                     class="btn-tienda" flat icon="fas fa-store" color="white" no-caps
                                     label="Mi Tienda" @click="editStore()">
                              </q-btn>
                              <q-btn v-else class="btn-tienda" flat icon="fas fa-store" color="white"
                                     no-caps label="Crea tu Tienda Virtual" @click="createStore()"/>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!--= Menu Desktop =-->
            <div class="row justify-center full-width" id="bg-menu">
               <div class="col-11">
                  <menu-list class="menu" :menu="items" in-line/>
               </div>
            </div>

         </div>

         <q-toolbar class="bg-degradado header-movil" v-else>
            <q-btn color="primary" flat dense round @click="drawer.menu = !drawer.menu" icon="menu"/>
            <q-toolbar-title class="q-pl-none">
               <div class="q-inline-block logo" style=" background-image: url('statics/img/bg-logo.png')">
                  <router-link :to="{ name: 'app.home'}">
                     <img :src="logo" :alt="projectName" style="height: 42px; position: relative; top: 4px;">
                  </router-link>
               </div>
            </q-toolbar-title>
            <widget-user></widget-user>
            <q-btn flat round dense icon="fas fa-heart" :to="{name: 'qmarketplace.account.favorite.stores'}"/>
            <q-btn  flat round dense @click="createStore()" icon="fas fa-store"/>
            <notification/>
         </q-toolbar>

      </q-header>

      <!-- MENU LEFT -->
      <q-drawer id="menu_master" v-if="$q.platform.is.mobile" v-model="drawer.menu">
         <q-list no-border>
            <!-- === LOGO === -->
            <q-item-section class="logo-tienda text-center q-py-lg">
               <router-link :to="{ name: 'app.home'}">
                  <img :src="logo">
               </router-link>
            </q-item-section>

            <!--= MENU =-->
            <menu-list :menu="items" class="menu"/>
         </q-list>
      </q-drawer>
      <inner-loading :visible="loading"/>
      </q-no-ssr>
   </div>
</template>
<script>
   import menuList from "../recursiveItem";
   import imSocial from 'src/components/master/imSocial';
   import widgetUser from "src/components/quser/widget-user";
   import searchStore from 'src/components/master/searchStore'
   import notification from '@imagina/qmarketplace/_components/info/notifications/widget-notification'

   export default {
      props: {},
      components: {
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
               menu: false
            },
            logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
            modal: {
               show: true,
               search: ''
            },
            canCreateStore: false,
            phones: [],//this.$store.getters['qsiteSettings/getSettingValueByName']('isite::phones')
            items: [
               {
                  icon: 'fas fa-bars',
                  title: 'app.layout.menu.categories',
                  activated: true,
                  name: '#',
                  children: null
               },
               {
                  icon: 'fas fa-store',
                  title: 'app.layout.page.storesOnOffer',
                  name: 'app.ofertas',
                  activated: true
               },
               {
                  icon: 'fas fa-car-side',
                  title: 'app.layout.menu.domicilios',
                  name: 'stores.index',
                  params: {slug: 'agencias-de-envos'},
                  activated: true
               },
               {
                  icon: 'far fa-surprise',
                  title: 'app.layout.page.problems',
                  name: 'app.problems',
                  activated: true
               },
               {
                  icon: 'far fa-newspaper',
                  title: 'app.layout.menu.blog',
                  name: 'qblog.index',
                  params: {category: 'blog'},
                  activated: true
               },
               {
                  icon: 'fas fa-users',
                  title: 'app.layout.page.about',
                  name: 'app.nosotros',
                  activated: true
               },
               {
                  icon: 'far fa-envelope-open',
                  title: 'app.layout.page.contact',
                  name: 'app.contacto',
                  activated: true
               }
            ],
            loading:false,
            notifications:0
         }
      },
      computed: {
         getImageUrl() {
            return config('apiRoutes.api.base_url') + '/' + this.userData.smallImage;
         },
         userData() {
            return []//this.$store.state.quserAuth.userData
         },
         storeSelect(){
            return this.$store.state.qmarketplaceStores.storeSelected
         }
      },
      methods: {
         async init() {
            this.loading = true
            await this.$store.dispatch('qmarketplaceStores/GET_USER_STORES')
            await this.$store.dispatch('qmarketplaceStores/SET_STORE')
            await this.getCategoryStore();
            await this.getSuscriptionData();
            this.loading = false;
         },
         getCategoryStore() {
            //Transform data
            let params = {
               params: {
                  filter: {
                     parent: 0
                  },
                  include: 'children'
               }
            };
            let child = [];
            this.$crud.index("apiRoutes.qmarketplace.category", params).then(response => {
               if (response.data.length > 0) {

                  response.data.forEach(function (item, i, array) {
                     let itemChild = null;
                     if (item.children.length) {
                        itemChild = [];
                        item.children.forEach(function (item, i, array) {
                           itemChild.push({
                              title: item.title,
                              name: 'stores.index',
                              params: {slug: item.slug},
                              activated: true,
                           })
                        });
                     }
                     child.push({
                        icon: item.icon,
                        title: item.title,
                        name: 'stores.index',
                        params: {slug: item.slug},
                        activated: true,
                        children: itemChild
                     })

                  })
                  this.items[0].children = this.$clone(child);

               }
            });
         },
         getSuscriptionData() {
            if (this.$store.state.quserAuth.authenticated) {
               if (this.$auth.hasAccess('marketplace.stores.create')) {
                  let criteria=this.$store.state.quserAuth.userId
                  let params = {
                     params: {
                        filter: {
                           field:'user_id',
                           status: 1
                        }
                     }
                  };
                  this.$crud.index("apiRoutes.qsubscription.subscriptions", criteria, params).then(response => {
                     if (response.data) {
                        if (response.data.active) {
                           if (!this.storeSelect) {
                              this.canCreateStore = true;
                           }
                        }
                     } else {
                        this.$router.push({name: 'products.show', params: {slug: 'tiendas-en-linea'}})
                     }
                  }).catch(error => {
                     console.error('[GET PRODUCT] ', error);
                     //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                     reject(false)//Resolve
                  })
               }//businessRole
            }
         },
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
            if(process.env.CLIENT){
               window.open(url, '_blank')
            }

         },
         createStore() {
            //Crear Tienda
            if(!this.$auth.hasAccess('marketplace.stores.mystore')){
                this.$router.push({name: 'products.show', params: {slug: 'tiendas-en-linea'}});
            }else{
               this.$router.push({name: 'qmarketplace.admin.stores.my.store'});
            }

         },
         editStore() {
            //editar Tienda
            this.$router.push({name: 'qmarketplace.admin.stores.my.store'});
         },

      }
   }
</script>
<style lang="stylus">
   #masterHeader
      .header-desktop
         #listMenu
            .q-item
               background-color transparent
            .q-expansion-item__container
               .q-expansion-item__content
                  padding 0 0 0 15px

               .q-expansion-item__toggle-icon
                  display none

            .content-item
               transform: none !important;
               border none

               .q-expansion-item__content
                  position absolute

               #listMenu
                  position absolute
                  width 347px
                  transform: skew(0deg) !important;
                  left 0px
                  top 10px
                  background-color $grey-3

                  .q-expansion-item__container
                     .q-expansion-item__toggle-icon
                        display block

                  .content-item
                     padding 0
                     transform: none !important;
                     font-family Trebuchet MS
                     height 69px
                     display block
                     border-bottom 2px solid $grey-5

                     .q-expansion-item
                        height 100%

                        .q-expansion-item__container
                           height 100%

                     .q-item
                        padding-left 45px
                        height 100%

                        .q-icon
                           color $tertiary
                           font-size 27px !important

                     #listMenu
                        padding-top 18px
                        padding-bottom 18px
                        transform: skew(0deg) !important
                        background-color $tertiary
                        position absolute
                        left 347px
                        top -67 px
                        z-index 10000
                        display block

                        .content-item
                           color #fff
                           border-bottom none
                           height 40px
                           display block

                           .q-expansion-item
                              height 100%

                              .q-expansion-item__container
                                 height 100%

                           .q-item
                              height 100%
                              color #fff
                              text-shadow none

                     .q-separator
                        display none

                     .q-item
                        background-color transparent
                        cursor pointer
                        color $secondary
                        font-size: 1.1rem;

                        .q-item__section--avatar
                           min-width 20px
                           padding-right 10px

                        .q-icon
                           font-size 16px

      .header-movil
         .logo
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
                  color $primary
                  min-height 3em !important
                  min-width 3em !important

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

         .menu
            -webkit-transform skew(10deg)
            transform skew(10deg)
            border-radius 10px
            padding 10px 15px
            margin -14px 0 10px 0
            background-color $warning
            font-size 1rem
            position relative
            z-index 99

            > div
               display -ms-flexbox
               display flex
               -ms-flex-wrap wrap
               flex-wrap wrap
               margin 0
               list-style none
               padding 0
               -webkit-transform skew(-10deg) !important
               transform skew(-10deg) !important

               > .content-item
                  -ms-flex 1 1 auto
                  flex 1 1 auto

                  > .q-expansion-item, > .q-item
                     cursor pointer
                     position relative
                     color $secondary
                     font-size 1rem

                     &:hover
                        color $tertiary !important

                        .q-focus-helper
                           background-color transparent !important

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
