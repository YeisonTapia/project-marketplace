<template>
    <div class="q-my-lg full-width">
        <div class="virtual-directory text-center ">
            <h3 class="title-label-secondary-none text-center text-white">
                <div>Directorio Virtual</div>
            </h3>
          <div class="row q-pa-lg">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="store in stores">
              <store :store="store"></store>
            </div>
          </div>
        </div>
       <q-inner-loading :visible="loading" />
    </div>
</template>
<script>
    import store from 'src/components/themes/store'
    export default {
        name: 'virtualDirectoryComponent',
        components: {
            store
        },
       mounted() {
          this.$nextTick(function () {
             this.getStores()
          })
       },
       data () {
          return {
             stores: [],
             loading:false
          }
       },
       methods: {
          getStores() {
             this.$crud.index("apiRoutes.qmarketplace.store", {
                params:{
                   filter:{
                      rating:'top',
                      type:2
                   },
                   take:8
                }
             }).then(response => {
                this.stores=response.data;
                this.loading = false
             }).catch(error => {
                this.loading = false
             });
          }
       }
    }
</script>
<style lang="stylus">
.virtual-directory   
    background-color $tertiary
</style>
