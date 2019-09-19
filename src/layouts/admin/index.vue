<template>
  <q-page class="flex flex-center">

    <div>
      <img alt="Logo" :src="logo">
    </div>

  </q-page>
</template>
<script>
  import fullWidthGallery from '@imagina/qslider/_components/fullWidthGallery'
  import top from 'src/components/master/home/top'
  import featuredStores from 'src/components/master/home/featuredStores'
  import interestStores from 'src/components/master/home/interestStores'
  import independentsStores from 'src/components/master/home/independentsStores'
  import virtualDirectory from 'src/components/master/home/virtualDirectory'
  import featuredProducts from 'src/components/master/home/featuredProducts'
  export default {
    name: 'PageIndex',
    components: {
      fullWidthGallery,
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
        appIsBackend: true
      }
    }
  }
</script>
