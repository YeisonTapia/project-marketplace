<template> 
  <q-card class="line-red q-mb-xl">
    <q-card-section class="text-secondary font-family-secondary">
      <h5 class="q-my-none q-mx-lg">Destacado</h5>
    </q-card-section>
    <q-separator />
    <q-card-section>
    	<q-img :ratio="16/9" src="/statics/img/blog.jpg"/>
    </q-card-section>
    <q-card-section class="q-pb-none">
      <p class="q-my-none q-body-2"><!--<span class="text-tertiary">Por liseth torres</span> - --> 09 / 07 / 2019</p>
    </q-card-section>
    <q-card-section>
      <h6 class="title q-my-none"><a href="">Small plates, salads & sandwiches </a></h6>
      <p class="q-my-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum iusto quibusdam modi, quas dolorem, commodi corporis consectetur similique qui dolorum praesentium voluptate corrupti at? Est quas, doloribus. Reiciendis, dolores, quibusdam. </p>
    </q-card-section>
    <q-separator />
    <q-card-actions align="between">
      <q-btn no-caps flat color="primary" icon="fas fa-caret-right" label="Seguir leyendo" />
    </q-card-actions>
  </q-card> 
</template> 
<script>
export default {
    name: 'FeatureBlogComponent'
}
</script>
<style lang="stylus"> 
</style> 