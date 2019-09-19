<template>
  <q-layout view="lHh LpR lFr"
            class="bg-grey-1"
            v-if="$store.state.app.active">
    <!-- HEADER -->
    <admin-header />


    <!-- ROUTER VIEW -->
    <q-page-container>
      <router-view class="q-layout-page layout-padding" />
    </q-page-container>

    <!-- FOOTER -->
    <admin-footer />

  </q-layout>
</template>

<script>
  /*Components*/
  import adminHeader from 'src/components/admin/header'
  import adminFooter from 'src/components/admin/footer'

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
      adminHeader, adminFooter,
    },
    mounted() {
      this.$nextTick(async function () {
        //Call to config when is mounted
        let params = this.$route.params
      })
    },
    data() {
      return {
        appIsBackend: true
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
