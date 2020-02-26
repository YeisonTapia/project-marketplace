<template>
   <footer>
      <q-no-ssr>
         <q-footer bordered v-if="$q.platform.is.mobile">
            <q-tabs no-caps color="transparent" class="bg-degradado text-white">
               <q-route-tab
                       icon="home"
                       :to="{ name: 'app.home'}"
                       exact
               />
               <q-tab name="xtab-1" icon="search" @click="modal = !modal"/>
            </q-tabs>

            <q-dialog v-model="modal">
               <q-card class="bg-degradado">
                  <q-card-section>
                     <div class="text-h6 text-white font-family-secondary">Buscador de Tiendas</div>
                  </q-card-section>

                  <q-card-section>
                     <search-store></search-store>
                  </q-card-section>

                  <q-card-actions align="right">
                     <q-btn flat color="white" label="CERRAR" v-close-popup/>
                  </q-card-actions>
               </q-card>
            </q-dialog>


         </q-footer>
      </q-no-ssr>
   </footer>
</template>
<script>
   import menuList from "../recursiveItem"
   import logoImagina from 'src/components/master/imaginaSVG'
   import searchStore from 'src/components/master/searchStore'

   export default {
      props: {},
      components: {
         menuList,
         logoImagina,
         searchStore
      },
      watch: {},
      mounted() {
         this.$nextTick(function () {
         })
      },
      data() {
         return {
            modal: false,
         }
      },
      computed: {
         menu() {
            let menu = config('sidebar')
            let menufooter = ['app.home', 'app.reservations', 'app.branchOffices', 'app.contact']
            let response = []
            //Get just menufooter items
            menu.forEach(item => {
               if (menufooter.indexOf(item.name) != -1) response.push(item)
            })
            return response//Response
         }
      },
      methods: {}

   }
</script>
<style lang="stylus">
   #footer
      @media screen and (max-width: $breakpoint-md)
         padding-bottom 50px

      .menuFooter
         text-align center
         background-color $dark
         color white
         padding 5px 0
         @media screen and (max-width: $breakpoint-md)
            padding 2px 0
            position fixed
            bottom 0
            width 100%
         @media screen and (max-width: $breakpoint-sm)
            padding 0

         .q-item
            display inline-block
            border 0px !important

            .q-item-side
               display inline-block

               .q-icon
                  font-size 17px
                  color white
                  @media screen and (max-width: $breakpoint-sm)
                     font-size 10px !important

            .q-item-main
               display inline-block
               margin-left 5px
               font-size 17px !important
               @media screen and (max-width: $breakpoint-sm)
                  font-size 10px !important

            &.router-link-active
               background transparent !important

      .search
         background-color red

         .select-cities
            display block
</style>
