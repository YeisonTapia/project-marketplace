<template>
	<q-page class="flex flex-center">

	    <full-width-gallery system-name="principal" />

	    <top></top> 

		<featured-stores></featured-stores>

		<div class="q-container banner q-py-xl text-center">
			<img class="full-width" src="/statics/img/publicidad1-100.jpg" alt="banner">
	    </div>

		<interest-stores></interest-stores>

		<div class="q-container banner q-py-xl text-center">
			<img class="full-width" src="/statics/img/publicidad2-100.jpg" alt="banner">
		</div>

		<independents-stores></independents-stores>

		<virtual-directory></virtual-directory>

		<div class="q-container banner q-py-xl text-center">
			<img class="full-width" src="/statics/img/publicidad3-100.jpg" alt="banner">
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
}
</script>
