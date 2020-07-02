<template>
    <q-layout :view="$q.platform.is.mobile ? 'lHh LpR lFf' : 'hhh LpR lff'">
        <!-- HEADER -->
        <frontend-header v-if="appState.loadPage"/>

        <!-- ROUTER VIEW -->
        <q-page-container>
            <q-pull-to-refresh @refresh="refreshPage">
                <router-view v-if="appState.loadPage"/>
            </q-pull-to-refresh>
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

    export default {
        preFetch({store}) {
            return new Promise(async resolve => {
                //Get main menu
                await store.dispatch('qcrudMaster/SHOW', {
                    indexName: 'qmenu-menus-main',
                    criteria: 'main',
                    apiRoute: 'apiRoutes.qmenu.menus',
                    requestParams: {
                        //refresh: true,
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
        watch: {
            '$route': {
                deep: true,
                handler: function (newValue) {
                    console.warn('>>>>Rote name:', newValue.name)
                }
            }
        },
        components: {
            frontendHeader,
            frontendFooter
        },
        mounted() {
            this.$nextTick(async function () {
            })
        },
        data() {
            return {}
        },
        computed: {
            appState() {
                return this.$store.state.app
            }
        },
        methods: {
            async refreshPage(done) {
                await this.$store.dispatch('app/REFRESH_PAGE')
                done()
            }
        }
    }
</script>
