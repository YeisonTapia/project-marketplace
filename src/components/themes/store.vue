<template>
   <div>
      <q-card class="card-store q-ma-sm q-pa-sm">
         <router-link :to="{name: 'stores.show',params: {slug: store.slug}}">
            <q-img :ratio="4/3" :src="store.mainImage.path">
               <div class="absolute-top-left text-center q-ml-md">
                  <div class="pts text-subtitle1" v-if="store.averageRating">
                     <span>{{store.averageRating}}pt</span>
                  </div>
               </div>
               <div class="absolute-bottom-left text-center q-ma-sm">
                  <q-avatar round class="bg-white" size="100px">
                     <img :src="store.logo.path">
                  </q-avatar>
               </div>

               <div class="absolute-bottom-right q-my-md q-pa-none">
                  <div v-if="$q.platform.is.desktop" class="bg-white text-subtitle1 text-bold text-primary label-title q-px-md q-py-xs text-uppercase">
                     {{store.name}}
                  </div>
               </div>
            </q-img>
         </router-link>
         <router-link :to="{name: 'stores.show',params: {slug: store.slug}}">
            <q-card-section class="summary text-subtitle2 items-center text-dark row">
               <div class="col-12" v-if="$q.platform.is.desktop">
                  {{store.slogan}}
               </div>
               <div class="col-12" v-else>
                  {{store.name}}
               </div>
            </q-card-section>
         </router-link>
         <!-- Dejar de Seguir Tienda-->
         <q-card-section v-if="favStoreId" class="leaveFollow items-center row">
            <div class="col-12">
               <q-btn @click="deleteFavoriteStore(favStoreId)" color="negative" icon="fas fa-trash-alt" size="sm"
                      class="q-ml-xs">
                  <q-tooltip :delay="300">Dejar de Seguir</q-tooltip>
               </q-btn>
            </div>
         </q-card-section>
      </q-card>
   </div>
</template>
<script>
   export default {
      name: 'StoreComponent',
      props: ['store', 'favStoreId', 'chargeFavorite'],
      data() {
         return {}
      },
      methods: {
         // Delete Favorite Store
         deleteFavoriteStore(id) {

            let criteria = id

            this.$crud.delete("apiRoutes.qmarketplace.favoriteStore", criteria).then(response => {

               // Notify MSG
               this.$q.notify({
                  color: 'green',
                  message: 'Proceso realizado exitosamente!!',
                  position: 'bottom-right'
               })

               this.emitChargeFavorite()

            }).catch(error => {
               console.error("ERROR - DELETED FAVORITE STORES")
               //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            })

         },
         // Ready
         emitChargeFavorite() {
            this.$emit('chargeFavorite', true);
         },
      }
   }
</script>
<style lang="stylus">
   .card-store
      border-radius 0px 0px 20px 20px

      a
         color: inherit;
         text-decoration: none;

      .summary
         min-height 100px

      .q-img__content > div
         padding 0
         font-weight bold
         background transparent

         & .pts
            background-image url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 54.18'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:%23fff;}%3C/style%3E%3C/defs%3E%3Ctitle%3ERecurso 2%3C/title%3E%3Cg id='Capa_2' data-name='Capa 2'%3E%3Cg id='home'%3E%3Cpath class='cls-1' d='M42.37,54,24,44.26,5.63,54A4.54,4.54,0,0,1,0,49.41V0H48V49.41A4.54,4.54,0,0,1,42.37,54Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            color $primary
            font-family $font-secondary
            display flex
            align-items center
            justify-content center
            background-size 100% 100%
            padding 0 5px
            height: 55px;
            width: 55px;
            background-repeat no-repeat
            background-position center

         & .label-title
            border-radius 10px 0 0 10px

         & img
            border 2px solid #ffffff
   @media screen and (max-width: $breakpoint-md)
      .card-store
         .summary
            font-weight bold
            color $tertiary !important
            line-height: normal;
   @media screen and (max-width: $breakpoint-xs)
      .text-subtitle1
         font-size 9px
         min-height 20px
      .card-store
         border-radius 0px 0px 20px 20px
         a
            color: inherit;
            text-decoration: none;

         .summary
            font-size 10px
            min-height 50px
            line-height: normal;
            font-weight bold
            color $tertiary !important

         .q-img__content > div
            padding 0
            font-weight bold
            background transparent

            & .pts
               background-image url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 54.18'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:%23fff;}%3C/style%3E%3C/defs%3E%3Ctitle%3ERecurso 2%3C/title%3E%3Cg id='Capa_2' data-name='Capa 2'%3E%3Cg id='home'%3E%3Cpath class='cls-1' d='M42.37,54,24,44.26,5.63,54A4.54,4.54,0,0,1,0,49.41V0H48V49.41A4.54,4.54,0,0,1,42.37,54Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
               color $primary
               font-family $font-secondary
               display flex
               align-items center
               justify-content center
               background-size 100% 100%
               padding 0 2px
               height: 40px;
               width: 40px;
               background-repeat no-repeat
               background-position center
               font-size 11px !important

            & .label-title
               border-radius 10px 0 0 10px

            & img
               border 2px solid #ffffff

         .q-avatar
            height: 40px
            width: 40px
</style>
