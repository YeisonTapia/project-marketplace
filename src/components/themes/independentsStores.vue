<template>
    <div class="independents-stores full-width q-my-lg">
        <div class="bg-white text-center q-pb-xl">
            <h3 class="title-label-primary text-center">
                <div>Independientes Destacados</div>
            </h3>
            <div class="line-primary"></div>
            <div class="row">
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
        name: 'IndependentsStoresComponent',
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
                this.loading=true
                this.$crud.index("apiRoutes.qmarketplace.store", {
                    params:{
                        filter:{
                            rating:'top',
                            type:1
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
.independents-stores
    .line-primary
        width 100%
        height 4px
        top 27px
        background-color $primary
        margin-top -45px
        margin-bottom 45px
</style>
