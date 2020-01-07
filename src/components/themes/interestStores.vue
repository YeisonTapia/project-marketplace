<template>
   <div class="interest-stores q-my-lg full-width">
      <div class="bg-fondo text-center ">
         <h3 class="title-label-tertiary text-center">
            <div>Tiendas de tu interes</div>
         </h3>
         <div class="q-container">
            <div class="row">
               <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" v-for="store in stores">
                  <store :store="store"></store>
               </div>
            </div>
         </div>
      </div>
     <q-inner-loading :visible="loading" />
   </div>
</template>
<script>
   import store from 'src/components/themes/store'

   export default {
      name: 'InterestStoresComponent',
      components: {
         store
      },
      mounted() {
         this.$nextTick(function () {
            this.getStores()
         })
      },
      data() {
         return {
            stores: [],
           loading:false
         }
      },
      methods: {
         getStores() {
           this.loading=true
            let user= this.$helper.convertToFrontField(this.$store.state.quserAuth.userData.fields)
           let userCategories=[]
           if(user.promotions){
              userCategories= user.promotions.value.map((i => i.value));
           }else{
             userCategories=[1,2,3]
           }
            this.$crud.index("apiRoutes.qmarketplace.store", {
               params: {
                  filter: {
                     categories: userCategories,
                     order: 'random'
                  },
                  take: 6
               }
            }).then(response => {
               this.stores = response.data;
              this.loading = false
            }).catch(error => {
              this.loading = false
            });
         }
      }
   }
</script>
<style lang="stylus">
</style>
