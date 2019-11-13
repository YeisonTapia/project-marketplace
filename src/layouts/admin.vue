<template>
  <q-layout view="hhh LpR lFf"  class="bg-fondo-q">
    <!-- HEADER -->
    <admin-header v-if="appState.loadPage"/>

    <!-- ROUTER VIEW -->
    <q-page-container>
      <q-pull-to-refresh @refresh="refreshPage">
        <router-view v-if="appState.loadPage" class="layout-padding"/>
      </q-pull-to-refresh>
    </q-page-container>

    <!-- FOOTER -->
    <admin-footer/>
  </q-layout>
</template>

<script>
  /*Components*/
  import adminHeader from 'src/components/master/admin/header'
  import adminFooter from 'src/components/master/admin/footer'

  export default {
    meta () {
      let routetitle = ((this.$route.meta && this.$route.meta.title) ? this.$route.meta.title : '')
      let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
      let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
      let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path

      return {
        title: `${this.$tr(routetitle)} | ${siteName}`,
        meta: {
          description: { name: 'description', content: siteDescription || siteName },
        },
        link: [{ rel: 'icon', href: iconHref, id: 'icon' }],
      }
    },
    components: {
      adminHeader,
      adminFooter,
    },
    mounted () {
      this.$nextTick(async function () {
      })
    },
    data () {
      return {
        appIsBackend: config('app.isBackend')
      }
    },
    computed: {
      quserState () {
        return this.$store.state.quserAuth
      },
      appState () {
        return this.$store.state.app
      }
    },
    methods: {
      async refreshPage(done){
        await this.$store.dispatch('app/REFRESH_PAGE')
        done()
      }
    }
  }
</script>
