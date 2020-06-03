<template>
   <q-card flat class="card-top bg-light full-width full-height">
      <div class="text-center">
         <img class="img-title" src="statics/img/top-companies.png">
      </div>
      <q-card-section>
         <div class="text-h6 text-primary font-family-secondary">Mejores Empresas</div>
         <ol>
            <li v-for="(item, index) in stores" :key="item.id" @click="openModalStore(item)" clickable>
               {{item.name}}
            </li>
         </ol>

         <div class="row">
            <div class="col text-center">
               <q-btn dense size="md"
                      label="Ver mas" color="primary" :to="{name:'stores.best-company.search'}"/>
            </div>
         </div>

      </q-card-section>
      <q-dialog v-model="card.open">
         <card-store :card="card"></card-store>
      </q-dialog>
   </q-card>
</template>
<script>
   import cardStore from '@imagina/qmarketplace/_components/info/store/cardStore'

   export default {
      name: 'TopCompaniesComponent',
      components: {
         cardStore
      },
      mounted() {
         this.$nextTick(function () {
            this.getStores()
         })
      },
      data() {
         return {
            stores: [],
            card: {
               open: false,
               info: [],
            },
         }
      },
      methods: {
         getStores() {
            this.$crud.index("apiRoutes.qmarketplace.store", {
               params: {
                  filter: {
                     rating: 'top'
                  },
                  include: 'categories',
                  take: 5
               }
            }).then(response => {
               this.stores = response.data;
            });
         },
         openModalStore(result) {
            this.card.open = true;
            this.card.info = result;
         }
      }
   }
</script>
<style lang="stylus">
   .card-top
      border-radius 10px

      & .img-title
         object-fit contain
         width auto
         margin: -12px auto 0
         height 80px

      & .q-card__section
         padding 10px 25px 15px 25px

         & ol
            list-style none
            counter-reset my-awesome-counter
            padding-left 5px
            font-size 17px

            li
               counter-increment my-awesome-counter
               padding 10px
               border-radius 10px
               display flex
               cursor pointer

               &:before
                  content counter(my-awesome-counter)
                  color $primary
                  margin-right 8px
                  font-family 'Carter One'
                  top 0
                  position relative

               &:hover
                  background rgba(253 45 94 0.5)

</style>
