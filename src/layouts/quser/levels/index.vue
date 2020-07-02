<template>
    <div id="userReport">

        <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Nivel de Usuario</div>
        <q-card class="rounded-md bg-white full-width q-my-sm" v-if="user.level">
            <div class="q-pa-lg">
                <div class="row q-col-gutter-md q-pt-lg">
                    <div class="col-xs-12 col-sm-12">
                        <div class="q-pa-md row items-start q-gutter-md">
                            <q-card class="levels">
                                <q-card-section>
                                    <div class="text-h5 text-tertiary ">Nivel {{user.level.order+1}} - {{user.level.name}}</div>
                                </q-card-section>
                                <q-separator inset />
                                <q-card-section class="q-pt-md" v-html="user.level.description">
                                </q-card-section>
                                <q-card-section class="q-py-sm" v-if="user.benefits.length">
                                    <div class="text-h6 text-primary">Beneficios Activos</div>
                                    <q-list>
                                        <q-item clickable v-for="(benefit,j) in user.benefits" :key="j">
                                            <q-item-section avatar>
                                                <q-icon color="primary" name="fas fa-chevron-circle-right" />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>{{benefit.name}}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-card-section>

                            </q-card>
                        </div>
                        <div class="q-pa-md">
                            <div v-if="success">
                                <h5 class="title-label-profile font-family-secondary  q-mb-lg">
                                    Siguientes niveles
                                </h5>
                                <div class="q-pa-md row items-start q-gutter-md">
                                <q-card class="levels" v-for="(item,i) in levels" :key="i">
                                    <q-card-section>
                                        <div class="text-h5 text-tertiary ">{{item.order+1}} - {{item.name}}</div>
                                    </q-card-section>
                                    <q-separator inset />
                                    <q-card-section class="q-pt-md" v-html=" item.description">
                                    </q-card-section>
                                    <q-card-section class="q-py-sm">
                                        <div class="text-h6 text-primary">Beneficios</div>
                                        <q-list>
                                            <q-item clickable v-for="(benefit,j) in item.benefits" :key="j">
                                                <q-item-section avatar>
                                                    <q-icon color="primary" name="fas fa-chevron-circle-right" />
                                                </q-item-section>
                                                <q-item-section>
                                                    <q-item-label>{{benefit.name}}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-card-section>
                                    <q-card-section class="q-py-sm">
                                        <div class="text-h6 text-primary">Requisitos</div>
                                    <div v-if="item.options.criterias">
                                        <div v-for="(criteria,k) in item.options.criterias" :key="k">
                                            <q-card-section class="q-py-xs">
                                                <div class="q-mt-xs">
                                                    <q-chip color="tertiary" text-color="white">{{criteria.name}}: {{criteria.value}}</q-chip>
                                                </div>
                                            </q-card-section>
                                        </div>
                                    </div>
                                    </q-card-section>
                                </q-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </q-card>
        <q-card class="rounded-md bg-white full-width q-my-sm" v-else>
            <div class="q-pa-lg">
                <div class="row q-col-gutter-md q-pt-lg">
                    <div class="col-xs-12 col-sm-12">
                        <div class="q-pa-md">
                            <div class="text-h5 text-primary q-mb-lg">
                                Nivel inicial
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </q-card>
    </div>
</template>
<script>
    import {Chart} from 'highcharts-vue'
    import cardUser from '@imagina/qmarketplace/_components/info/cardUser'
    import store from "../../../store";

    export default {
        props: {},
        components: {
            Chart,
            cardUser

        },
        watch: {},
        data() {
            return {
                loading: true,
                levels: [],
                success: false,
                user: null,
                benefitValue: true
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.init()
            });
        },
        methods: {
            async init() {
                this.user = this.$clone(this.$store.state.quserAuth.userData);
                await this.levelUser()
            },
            levelUser() {
                return new Promise((resolve, reject) => {
                    //Params
                    let criteria = []
                    for (var i = 0; i <= this.user.level.order; i++) {
                        criteria.push(i)
                    }
                    let params = {
                        //   refresh: true,
                        params: {
                            include: 'benefits',
                            filter: {
                                excludeOrder: criteria,
                                levelType: this.user.level.level_type_id,
                            }
                        }
                    }
                    //Request
                    this.$crud.index('apiRoutes.qmarketplace.level', params).then(response => {
                        this.levels = response.data
                        console.warn('levels', this.level)
                        this.success = true
                        resolve(true)//Resolve
                    }).catch(error => {
                        //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                        console.warn(error)
                        reject(false)//Resolve
                    })
                })
            },
        }
    }
</script>
<style lang="stylus">
    #userReport
        .btn-more
            border-top 1px solid #eee

        .highcharts-legend
            display none !important

        .avatar-user
            .q-avatar__content
                border-radius 50%
                border 2px solid #eee

        .q-list
            .items-product
                border-bottom 1px solid #eee
                padding 10px

            .items-product:last-child
                border-bottom 0
        @media screen and (max-width: $breakpoint-xs)
            .icon-sm
                display none !important

            .text-h6
                text-align center
</style>
