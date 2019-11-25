<template>
  <q-card class="q-mb-xl popularPost">
    <q-card-section class="text-secondary font-family-secondary">
      <h5 class="q-my-none q-mx-lg">Post populares</h5>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">

      <q-list class="border-0">
        <q-item  v-for="post in popularPost" :key="post.id">
          <div class="row items-center">
            <div class="col-6">
              <q-card-section>
                <router-link
                        :to="{name: 'qblog.show',params:{category: post.category.slug, slugPost: post.slug}}">
                <q-img :ratio="4/3" :src="post.mainImage.path"/>
                </router-link>
              </q-card-section>
            </div>
            <div class="col-6">
              <router-link
                      :to="{name: 'qblog.show',params:{category: post.category.slug, slugPost: post.slug}}">
                <h6 class="title q-my-none">{{post.title}}</h6>
              </router-link>
            </div>
            <div class="col-12">
            	<q-card-section class="q-py-none">
               		<p class="q-mt-none q-mb-md q-body-2">
                       {{$trd(post.createdAt)}}</p>
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
    name: 'MorePopularBlogComponent',
  data() {
    return {
      loading: false,
      popularPost:null,
    }
  },
  created() {
    this.getpost()
  },
  methods: {
    getpost() {
      let params = {
        params: {
          filter: {},
          take:4,
          include:'category'
        }
      }
      this.$crud.index("apiRoutes.qblog.posts", params).then(response => {
        this.popularPost=response.data;
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
  .popularPost
    a
      color $secondary
</style> 