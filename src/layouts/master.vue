<template>
  <q-layout view="lHh LpR lFr"
            v-if="$store.state.app.active">
    <!-- HEADER -->

    <frontend-header/>

    <!-- ROUTER VIEW -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!-- FOOTER -->
    <frontend-footer/>
  </q-layout>
</template>

<script>
  /*Components*/
  import frontendHeader from 'src/components/master/frontend/header'
  import frontendFooter from 'src/components/master/frontend/footer'

  export default {
    meta() {
      let routetitle = ((this.$route.meta && this.$route.meta.title) ? this.$route.meta.title : '')
      let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
      let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path
      return {
        title: `${siteName} | ${this.$tr(routetitle)}`,
        link: [{rel: 'icon', href: iconHref, id: 'icon'}],
      }
    },
    beforeRouteLeave(to, from, next) {
      next()
    },
    components: {
      frontendHeader, frontendFooter
    },
    mounted() {
      this.$nextTick(async function () {
        //Call to config when is mounted
        let params = this.$route.params
      })
    },
    data() {
      return {
        appIsBackend: config('app.isBackend')
      }
    },
    computed: {
      showApp() {
        return this.$store.state.app.show
      },
    },
    methods: {
      isInStandaloneMode() {
        (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone);
      },
    }
  }
</script>

<style lang="stylus">
  @import "~variables";

  #list_menu
    .q-icon
      font-size: 16px

    .q-item-side
      min-width 20px !important

  .q-item-main
    font-size: 15px !important

  #menu_leads
    .q-item
      padding: 8px 0px

  .q-item-side
    min-width: auto

  .border-content
    border 2px solid $grey-4
    border-radius 3px


</style>
