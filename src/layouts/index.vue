<template>
  <q-page class="flex flex-center">

    <div v-if="appIsBackend">
      <img alt="Logo" :src="logo">
    </div>
    <div v-else>
      <top></top> 
      <featured-stores></featured-stores>

      <div class="q-container banner q-py-xl text-center">
        <img class="w-100" src="/assets/img/publicidad1-100.jpg" alt="banner">
      </div>

      <interest-stores></interest-stores>

      <div class="q-container banner q-py-xl text-center">
        <img class="w-100" src="/assets/img/publicidad2-100.jpg" alt="banner">
      </div>

      <independents-stores></independents-stores>

      <virtual-directory></virtual-directory>

      <div class="q-container banner q-py-xl text-center">
        <img class="w-100" src="/assets/img/publicidad3-100.jpg" alt="banner">
      </div>

      <featured-products></featured-products>
    </div>
  </q-page>
</template>
<script>
  import top from 'src/components/master/home/top'
  import featuredStores from 'src/components/master/home/featuredStores'
  import interestStores from 'src/components/master/home/interestStores'
  import independentsStores from 'src/components/master/home/independentsStores'
  import virtualDirectory from 'src/components/master/home/virtualDirectory'
  import featuredProducts from 'src/components/master/home/featuredProducts'
  export default {
    name: 'PageIndex',
    components: {
      top,
      featuredStores,
      interestStores,
      independentsStores,
      virtualDirectory,
      featuredProducts
    },
    data() {
      return {
        lang: this.$q.i18n.lang,
        logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
        appIsBackend: config('app.isBackend')
      }
    }
  }
</script>
