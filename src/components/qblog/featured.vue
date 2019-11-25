<template> 
  <q-card class="line-red q-mb-xl">
    <q-card-section class="text-secondary font-family-secondary">
      <h5 class="q-my-none q-mx-lg">Destacado</h5>
    </q-card-section>
    <q-separator />
    <q-card-section>
    	<q-img :ratio="16/9" :src="featudedPost.mainImage.path"/>
    </q-card-section>
    <q-card-section class="q-pb-none">
      <p class="q-my-none q-body-2"><!--<span class="text-tertiary">Por liseth torres</span> - --> {{$trd(featudedPost.createdAt)}}</p>
    </q-card-section>
    <q-card-section>
      <h6 class="title q-my-none"><a href="">{{featudedPost.title}} </a></h6>
      <p class="q-my-md">{{featudedPost.summary}} </p>
    </q-card-section>
    <q-separator />
    <q-card-actions align="between">
      <q-btn :to="{name: 'qblog.show',params:{category: featudedPost.category.slug, slugPost: featudedPost.slug}}" no-caps flat color="primary" icon="fas fa-caret-right" label="Seguir leyendo" />
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
    name: 'FeatureBlogComponent',
  data() {
    return {
      loading: false,
      featudedPost:null,
    }
  },
  created() {
    this.getpost()
  },
  methods: {
    getpost() {
      let params = {
        params: {
          filter: {
           field: 'category_id'
          },include:'category'
        }
      }
      this.$crud.show("apiRoutes.qblog.posts",2, params).then(response => {
        this.featudedPost=response.data;
        console.error(this.featudedPost)
        this.loading = false
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        this.loading = false
      })
    },
  }
}
</script>
<style lang="stylus"> 
</style> 