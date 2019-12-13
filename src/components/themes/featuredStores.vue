<template>
    <div class="q-my-lg full-width">
        <div class="feature-stores text-center ">
            <h3 class="title-label-secondary text-center">
                <div>Tiendas Destacadas</div>
            </h3>
          <div class="row ">
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-3" v-for="store in stores">
              <store :store="store"></store>
            </div>  
          </div>
        </div>
    </div>
</template>
<script>
    import store from 'src/components/themes/store'
    export default {
        name: 'FeaturedStoreComponent',
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
            }
        },
        methods: {
            getStores() {
                this.$crud.index("apiRoutes.qmarketplace.store", {
                    params:{
                        filter:{

                        }
                    }
                }).then(response => {
                    this.stores=response.data;
                });
            }
        }
    }
</script>
<style lang="stylus">
.feature-stores   
    background-color $warning
</style>
