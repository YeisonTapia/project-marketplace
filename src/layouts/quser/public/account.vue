<template>
    <q-layout :view="$q.platform.is.mobile ? 'lHh LpR lFf' : 'hhh LpR lff'">
        <!-- HEADER -->
        <frontend-header v-if="appState.loadPage"/>

        <!-- ROUTER VIEW -->

        <q-page-container class="master-frontend">
            <q-page id="profilePage" class="page bg-fondo q-layout-page layout-padding frontend-page">

                <q-pull-to-refresh @refresh="refreshPage">

                    <div class="row q-col-gutter-lg q-my-xl">

                      <div class="col-12 col-md-12 col-lg-4 col-xl-3">
                        <menuAccount :pointsAvailables="pointsAvailables"/>
                      </div>

                      <div class="col-12 col-md-12 col-lg-8 col-xl-9">
                        <router-view v-if="appState.loadPage" :pointsAvailables="pointsAvailables" :changePoints="changePoints" @changePoints ="changePoints = $event"/>
                      </div>

                    </div>

                </q-pull-to-refresh>

            </q-page>
        </q-page-container>


        <!-- FOOTER -->
        <frontend-footer v-if="appState.loadPage"/>
    </q-layout>
</template>

<script>
    /*Components*/
    import frontendHeader from 'src/components/master/frontend/header'
    import frontendFooter from 'src/components/master/frontend/footer'
    import configApp from 'src/config/app'
    import menuAccount from 'src/components/account/public/menu' // PUBLIC
    import http from "axios"

    export default {
        preFetch({store}) {
            return new Promise(async resolve => {
                //Get main menu
                await store.dispatch('qcrudMaster/SHOW', {
                    indexName: 'qmenu-menus-main',
                    criteria: 'main',
                    apiRoute: 'apiRoutes.qmenu.menus',
                    requestParams: {
                       // refresh: true,
                        params: {filter: {field: 'name'}, include: 'menuitems'}
                    }
                })

                resolve(true)

            })
        },
        meta() {
            let routetitle = ((this.$route.meta && this.$route.meta.title) ? this.$route.meta.title : '')
            let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
            let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
            let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path

            return {
                title: `${this.$tr(routetitle)} | ${siteName}`,
                meta: {
                    description: {name: 'description', content: siteDescription || siteName},
                },
                link: [{rel: 'icon', href: iconHref, id: 'icon'}],
            }
        },
        components: {
            frontendHeader,
            frontendFooter,
            menuAccount
        },
        mounted() {
            this.$nextTick(async function () {
                this.init()
            })
        },
        data() {
            return {
                appIsBackend: config('app.isBackend'),
                pointsAvailables: 0,
                changePoints: false,
                userId: this.$route.params.userId
            }
        },
        computed: {

            quserState() {
                return this.$store.state.quserAuth
            },
            appState() {
                return this.$store.state.app
            }
        },
        methods: {

            async refreshPage(done) {
                await this.$store.dispatch('app/REFRESH_PAGE')
                done()
            },
             //init
            async init() {
                //await this.getPointsUser()
            },

            // Get Points Available User
            getPointsUser(){
                return new Promise((resolve, reject) => {

                  this.pointsAvailables = 0

                  //Params
                  let params = {
                    params: {
                      filter: {
                        userId: this.$store.state.quserAuth.userId,
                        type: 'availablePointsUser'
                      }
                    }
                  }

                  http.get(config('apiRoutes.qredeems.calculates'),params)
                    .then(response => {

                      if(response.data.data.points>0)
                        this.pointsAvailables = response.data.data.points

                      console.warn("*** GET POINTS USER - Puntos Disponibles:"+this.pointsAvailables )
                      resolve(true);

                    })
                    .catch(error => {
                      reject(error);
                    });
                })
            },
        },
        watch: {
          changePoints(val,oldval) {
            if(val==true){
                this.getPointsUser()
                this.changePoints = false
            }
          }
        }
    }
</script>
