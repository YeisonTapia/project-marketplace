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
   }
</script>
