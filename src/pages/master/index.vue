<template>
    <q-page class="">
        <full-width-gallery system-name="principal"/>
        <top></top>
        <featured-stores></featured-stores>

        <div class="q-container banner q-py-xl text-center">
            <qbanner systemName="home-tiendas-destacadas" height="auto"/>
        </div>
        <interest-stores></interest-stores>
        <div class="q-container banner q-py-xl text-center">
            <qbanner systemName="home-tiendas-de-tu-interes" height="auto"/>
        </div>
        <independents-stores></independents-stores>
        <virtual-directory></virtual-directory>
        <div class="q-container banner q-py-xl text-center">
            <qbanner systemName="home-directorio-virtual" height="auto"/>
        </div>
        <featured-products></featured-products>

        <q-dialog v-model="showBenefitsModal" persistent>
            <q-card v-if="levelData"
                    style="background-image:url('/statics/img/congrats7.jpg'); background-size:cover; background-repeat:no-repeat;background-position:center center; ">
                <q-card-section class="row items-center">
                    <div class="q-container">
                        <div class="row">

                            <div class="col-12 text-center">
                                <div class="text-h5 text-primary q-mb-md font-family-secondary q-pt-md">Has ascendido al
                                    nivel: {{levelData.name}}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="caption">
                                    <!-- <q-avatar icon="style" color="primary" text-color="white" /> -->
                                    <div class="text-h7 text-secondary q-mb-md font-family-secondary text-center">Se han
                                        habilitado nuevos beneficios por los que puedes optar:
                                    </div>
                                    <!-- <span class="q-ml-sm">Se han habilitado nuevos beneficios por los que puedes optar:</span> -->
                                </div>
                            </div>

                            <div class="col-12">
                                <q-option-group
                                        :options="benefits"
                                        label="benefits"
                                        type="checkbox"
                                        v-model="benefitsUser"
                                />
                            </div>

                        </div>
                    </div>

                </q-card-section>
                <q-card-actions align="right">
                    <q-btn :loading="loading" flat label="Confirmar" @click="saveBenefits()" color="primary"/>
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<style lang="stylus">

</style>

<script>
    import fullWidthGallery from 'src/components/qslider/qcarousel'
    import top from 'src/components/themes/top'
    import featuredStores from 'src/components/themes/featuredStores'
    import interestStores from 'src/components/themes/interestStores'
    import independentsStores from 'src/components/themes/independentsStores'
    import virtualDirectory from 'src/components/themes/virtualDirectory'
    import featuredProducts from 'src/components/themes/featuredProducts'
    import qbanner from '@imagina/qbanner/_components/frontend/qbanner'

    export default {
        name: 'PageIndex',
        components: {
            fullWidthGallery,
            top,
            featuredStores,
            interestStores,
            independentsStores,
            virtualDirectory,
            featuredProducts,
            qbanner
        },
        data() {
            return {
                loading: false,
                showBenefitsModal: false,
                levelData: null,
                benefits: [],
                benefitsUser: []
            }
        },
        mounted() {
            if (this.$store.state.quserAuth.userId) {
                this.getSubscription();
                console.error('dsfdsfsdfsdf',this.$store.state.quserAuth.userData.benefits)
                if (this.$store.state.quserAuth.userData.levelCompleted == 0) {
                    this.getBenefits();
                }
            }
        },
        methods: {
            getSubscription() {
                /*Get role user autentichated*/
                var roles = this.$store.state.quserAuth.userData.roles;
                var businessRole = 0;
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].slug == "business") {
                        //Vendedor
                        businessRole = 1;
                        break;
                    }//if role business
                }//for
                if (businessRole) {
                    //Query axios
                    //If doesn't suscription active, redirect to plans
                    let params = {
                        params: {
                            filter: {
                                userId: this.$store.state.quserAuth.userId,
                                status: 1
                            }
                        }
                    };
                    this.$crud.index("apiRoutes.qsubscription.subscriptions", params).then(response => {
                        if (response.data.length == 0)
                            this.$router.push({name: 'products.show', params: {slug: 'tiendas-en-linea'}});
                    })
                }//if businessRole
            },
            saveBenefits() {
                this.loadind = true;
                if (this.levelData.benefitsQuantity < this.benefitsUser.length) {
                    this.$alert.error({message: "Solo puedes seleccionar: " + (this.$store.state.quserAuth.userData.benefits.length - this.levelData.benefitsQuantity) + " beneficio(s)"});
                } else {
                    let data = {
                        id: this.$store.state.quserAuth.userId,
                        activated: 1,
                        levelCompleted: 1
                    };
                    data.benefits = this.benefitsUser;
                    this.$crud.update('apiRoutes.quser.users', this.$store.state.quserAuth.userId, data).then(response => {
                        this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
                        this.loading = false//Login
                        this.showBenefitsModal = false
                    }).catch(error => {
                        console.error('[UPDATE PROFILE] ', error)
                        this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
                        this.loading = false
                    });
                }
            },
            getBenefits() {
                //Params
                let benefitsUser = this.$array.select(this.$store.state.quserAuth.userData.benefits, {
                    label: 'name',
                    id: 'id'
                });
                this.benefitsUser=benefitsUser.map( benefit => (benefit.id))
                console.warn(this.benefitsUser)
                let params = {
                    //refresh: true,
                    params: {
                        include: 'benefits',
                        filter: {
                            allTranslations: false,
                        }
                    }
                }
                //Request
                this.$crud.show("apiRoutes.qmarketplace.level", this.$store.state.quserAuth.userData.levelId, params).then(response => {
                    this.levelData = response.data;
                    this.benefits = this.$array.select(this.levelData.benefits, {label: 'name', id: 'id'});
                    console.warn('dsfdsfsdfsdfsfs',this.benefitsUser, this.benefits);
                    this.showBenefitsModal = true;
                }).catch(error => {
                    console.error('Level Error', error);
                })
            }
        }
    }
</script>
