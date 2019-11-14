<template>
  <q-layout view="lHh LpR fFf">
    
    <!-- === ROUTER VIEW === -->
    <q-page-container class="bg-degradado">
      <div id="layout-init" class="flex flex-center">
        <div class="row q-col-gutter-lg">

          <div class="col-12 col-md-5 column-logo q-p-md flex justify-center ">

            <div class="self-center">
              <router-link :to="{name:'app.home'}">
                <img :src="logo" :alt="projectName">
              </router-link>
            </div>

          </div>

          <div class="col-12 col-md-7 rounded-borders">

            <div id="formInit">
               <router-view/>
            </div>
            
          </div>

        </div>
      </div>
     
      <q-ajax-bar />

    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    meta () {
      let routetitle = ((this.$route.meta && this.$route.meta.title) ? this.$route.meta.title : '')
      let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
      let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
      let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path

      return {
        title: `${this.$tr(routetitle)} | ${siteName}`,
        meta : {
          description: { name: 'description', content: (siteDescription || siteName) },
        },
        link: [{rel: 'icon', href: iconHref, id: 'icon'}],
      }
    },
    async mounted () {
    },
    data () {
      return {
        
        logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo2').path,
        projectName : "Donde esta esa vaina",
        
      }
    },
  }
</script>

<style lang="stylus">

#formInit
  max-width 500px
      
</style>
