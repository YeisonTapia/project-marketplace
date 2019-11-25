<template>
  <q-card class="q-mb-xl">
    <q-card-section class="text-secondary font-family-secondary">
      <h5 class="q-my-none q-mx-lg">Post populares</h5>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">

      <q-list class="border-0">
        <q-item  v-for="n in 4" :key="n">
          <div class="row items-center">
            <div class="col-6">
              <q-card-section>
                <q-img :ratio="4/3" src="/statics/img/blog.jpg"/>
              </q-card-section>
            </div>
            <div class="col-6">
              <h6 class="title q-my-none"><a href="/#">Small plates, salads & sandwiches </a></h6>
            </div>
            <div class="col-12">
            	<q-card-section class="q-py-none">
               		<p class="q-mt-none q-mb-md q-body-2">
               		<!-- <span class="text-tertiary">Por liseth torres</span> - --> 09 / 07 / 2019</p>
           		</q-card-section>
            </div>
          </div>    
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>  
</template>    
<script>
export default {
    name: 'MorePopularBlogComponent'
}
</script>
<style lang="stylus"> 
</style> 