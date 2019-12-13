<template>
   <q-page class="page-blog">

      <div class="bg-fondo q-px-sm">
         <div class="q-container" >
            <div class="row justify-end">
               <div class="col-auto text-center q-my-lg" v-if="post">

                  <!--BreadCrum-->
                  <q-breadcrumbs active-color="secondary" color="secondary" align="right">
                     <!-- Separator -->
                     <q-icon name="fas fa-angle-right" slot="separator" slot-scope="props"/>
                     <!-- Route Home -->
                     <q-breadcrumbs-el label="Inicio" :to="{name : 'app.home'}" icon="home"/>
                     <!-- To category -->
                     <q-breadcrumbs-el :label="post.category.title"
                                       :to="{name : 'qblog.index', params : {category: post.category.slug}}"/>
                     <!-- To Post -->
                     <q-breadcrumbs-el :label="post.title"/>
                  </q-breadcrumbs>

               </div>
            </div>
            <div class="row q-col-gutter-xl q-mt-sm">
               <div class="col-xs-12 col-sm-12 col-md-8 q-mb-lg" >

                 <q-card  v-if="post">
                   <q-card-section class="text-center">
                     <h4 class="title q-my-none text-secondary">{{post.title}}</h4>
                     <span class="text-tertiary">Por {{post.editor.first_name+' '+post.editor.last_name}}</span> -  {{ $trd(post.createdAt) }}
                   </q-card-section>

                   <q-card-section class="q-pa-none">
                     <q-img :ratio="16/9" :src="post.mainImage.path"/>
                   </q-card-section>

                   <q-card-section>
                     <div class="q-subheading q-my-md" v-html="post.description"></div>

                     <div class="q-mt-md">
                       <div class="bg-primary q-pa-md text-white text-weight-bold">
                         COMENTA AHORA
                         </div>
                         <div class="q-pa-sm bg-light">
                           <div class="comment-facebook bg-white q-pa-sm">
                              <comment-component></comment-component>
                           </div>
                         </div>
                     </div>

                   </q-card-section>
                   <q-card-actions align="right">
                       <q-btn flat color="primary" icon="fab fa-facebook" />
                       <q-btn flat color="primary" icon="fab fa-whatsapp" />
                       <q-btn flat color="primary" icon="fab fa-twitter" />
                   </q-card-actions>
                 </q-card>

               </div>

               <div class="col-xs-12 col-sm-12 col-md-4 q-mb-lg desktop-only">

                  <categories></categories>

                  <featured></featured>

                  <more-popular></more-popular>

                  <!-- <posts-component :category-slug="$route.params.category"/> -->
               </div>
               <inner-loading :visible="loading"/>
            </div>
         </div>


         <div class="q-container banner q-py-xl text-center">
           <img class="full-width" src="/statics/img/publicidad1-100.jpg" alt="banner">
         </div>  
      </div>
   </q-page>
</template>

<script>
/*Component*/
import commentComponent from 'src/components/master/commentsFB'
import postsComponent from '@imagina/qblog/_components/widgets/widget-post-blog'
import categories from 'src/components/qblog/categories'
import featured from 'src/components/qblog/featured'
import morePopular from 'src/components/qblog/morePopular'
   export default {
      components: {
         categories,
         featured,
         morePopular,
         commentComponent,
         postsComponent
      },
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data post
            let postSlug = currentRoute.params.slugPost || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qblog-posts-${postSlug}`,
               criteria: postSlug,
               apiRoute: 'apiRoutes.qblog.posts',
               requestParams: {refresh: true, params: {include: 'category,user'}}
            })
            //Get list related posts
            let categorySlug = currentRoute.params.category || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qblog-categories-${categorySlug}`,
               criteria: categorySlug,
               apiRoute: 'apiRoutes.qblog.categories',
               requestParams: {refresh: true, params: {}}
            })
            resolve(true)
         })
      },
      meta() {
         let postSlug = this.$route.params.slugPost
         let routetitle = postSlug || 'productos'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         //Set category data
         let post = this.$store.state.qcrudMaster.show[`qblog-posts-${postSlug}`].data
         if (post) {
            routetitle = post.title
            siteDescription = post.summary
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      watch: {
         '$route.params'() {
            this.getData()
         },
      },
      data() {
         return {
            post: this.$store.state.qcrudMaster.show[`qblog-posts-${this.$route.params.slugPost}`].data,
            loading: false
         }
      },
      computed: {
         post() {
            let postSlug = this.$route.params.slugPost
            let post = this.$store.state.qcrudMaster.show[`qblog-posts-${postSlug}`]
            return post.data || false
         }
      },
      methods: {
         async getData() {
            this.loading = true

            let postSlug = this.$clone(this.$route.params.slugPost)
            await this.$store.dispatch('qcrudMaster/SHOW', {
               indexName: `qblog-posts-${postSlug}`,
               criteria: postSlug,
               apiRoute: 'apiRoutes.qblog.posts',
               requestParams: {refresh: true, params: {include: 'categories,user'}}
            })
            this.loading = false
         },
      },
   }
</script>
<style lang="stylus">
.page-blog
  .title
    a    
      color $secondary
  .line-red
    border-top 3px solid $primary  
</style>