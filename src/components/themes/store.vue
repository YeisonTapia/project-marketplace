<template>

  <q-card class="card-store q-ma-md">
    <router-link :to="{name: 'stores.show',params: {slug: store.slug}}">
    <q-img :ratio="4/3" :src="store.mainImage.path" >
      <div class="absolute-top-left text-center q-ml-md">
        <div class="pts text-subtitle1" v-if="store.pts">
          <span>{{store.pts}}pt</span>
        </div>
      </div>
      <div class="absolute-bottom-left text-center q-ma-sm"  v-if="$q.platform.is.desktop">
        <q-avatar round class="bg-white" size="100px">
          <img :src="store.logo.path">
        </q-avatar>
      </div>

      <div class="absolute-bottom-right q-my-md q-pa-none"  v-if="$q.platform.is.desktop">
        <div class="bg-white text-subtitle1 text-bold text-primary label-title q-px-md q-py-xs text-uppercase">
          {{store.name}}
        </div>
      </div>
    </q-img>
    </router-link>
    <q-card-section class="summary text-subtitle2 items-center row" v-if="$q.platform.is.desktop">
      <div class="col-12">
        {{store.slogan}}
      </div>
    </q-card-section>
    <q-card-section class="q-pa-xs text-subtitle1 text-bold text-primary label-title text-uppercase" v-else>
        {{store.name}}
    </q-card-section>
    <!-- Dejar de Seguir Tienda-->
    <q-card-section v-if="favStoreId" class="leaveFollow items-center row">
      <div class="col-12">
        <q-btn @click="deleteFavoriteStore(favStoreId)" color="negative" icon="fas fa-trash-alt" size="sm" class="q-ml-xs">
          <q-tooltip :delay="300">Dejar de Seguir</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>

  </q-card>
</template>
<script>
  export default {
    name: 'StoreComponent',
    props: ['store','favStoreId','chargeFavorite'],
    data() {
      return {
      }
    },
    methods: {
       // Delete Favorite Store
      deleteFavoriteStore(id){

        let criteria = id

        this.$crud.delete("apiRoutes.qmarketplace.favoriteStore",criteria).then(response => {
           
            // Notify MSG
            this.$q.notify({
              color:'green',
              message: 'Proceso realizado exitosamente!!',
              position: 'bottom-right'
            })

            this.emitChargeFavorite()

          }).catch(error => {
            console.error("ERROR - DELETED FAVORITE STORES")
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
 
      },
      // Ready
      emitChargeFavorite(){
        this.$emit('chargeFavorite',true);
      },
    }
  }
</script>
<style lang="stylus">
  .card-store
    border-radius 0px 0px 20px 20px
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
        height 45px
        width 45px
        background-repeat no-repeat
        background-position center
      & .label-title
        border-radius 10px 0 0 10px
      & img
        border 2px solid #ffffff
</style>
