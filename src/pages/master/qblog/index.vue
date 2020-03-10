<template>
   <q-page class="page-blog">

      <div class="bg-fondo q-px-sm">
         <div class="q-container">
            <div class="row justify-end">
               <div class="col-auto text-center q-my-lg">
                  <div  v-if="category">

                     <!--BreadCrum-->
                     <q-breadcrumbs active-color="secondary" color="secondary" align="right">
                        <!-- Separator -->
                        <q-icon name="fas fa-angle-right" slot="separator" slot-scope="props"/>
                        <!-- Route Home -->
                        <q-breadcrumbs-el label="Inicio" :to="{name : 'app.home'}"/>
                        <!-- To category -->
                        <q-breadcrumbs-el :label="$route.params.category.split('-').join(' ')"/>
                     </q-breadcrumbs>

                  </div>
               </div>
            </div>
            <div class="row" v-if="$q.platform.is.desktop">
               <div class="col-12">
                  <h5 class="bg-secondary font-family-secondary text-weight-bold q-inline-block text-white q-px-lg q-py-md"> {{category.title}} </h5>
               </div>
            </div>

            <div class="row q-col-gutter-xl">
               <div class="col-xs-12 col-sm-12 col-md-8 q-mb-lg" v-if="category && category.posts">

                  <div class="row q-col-gutter-lg">
                     <div :class="[ key == 0 ?  'col-12' : 'col-xs-12 col-sm-12 col-md-12 col-lg-6']" :key="key" v-for="(post,key) in category.posts">

                        <q-card>
                           <q-card-section class="q-px-none q-pt-none">
                              <router-link
                                :to="{name: 'qblog.show',params:{category: post.category.slug, slugPost: post.slug}}">
                                 <q-img :ratio="4/3" :src="post.mainImage.path"/>
                              </router-link>
                           </q-card-section>
                          <q-card-section>
                              <!--<span class="text-tertiary">Por liseth torres</span> - -->  {{ $trd(post.createdAt) }}
                          </q-card-section>
                          <q-card-section>
                           <h4 class="title q-my-none text-sencondary">
                              <router-link
                                :to="{name: 'qblog.show',params:{category: post.category.slug, slugPost: post.slug}}">

                                    {{post.title}}

                              </router-link>
                           </h4>
                            <p class="q-my-md"> {{post.summary}}</p>
                          </q-card-section>
                          <q-card-actions align="between">

                            <q-btn :to="{name: 'qblog.show',params:{category: post.category.slug, slugPost: post.slug}}" no-caps flat color="primary" icon="fas fa-caret-right" label="Seguir leyendo" />
                            <div class="div">
                              <q-btn flat color="primary" icon="fab fa-facebook" />
                              <q-btn flat color="primary" icon="fab fa-whatsapp" />
                              <q-btn flat color="primary" icon="fab fa-twitter" />
                            </div>
                          </q-card-actions>
                        </q-card>


                     </div>

                </div>

               </div>
               <!--Not results-->
               <not-results v-else />
               <div class="col-xs-12 col-sm-12 col-md-4 q-mb-lg desktop-only">

                  <categories></categories>

                  <featured></featured>

                  <more-popular></more-popular>

               </div>
            </div>
         </div>

         <div class="q-container banner q-py-xl text-center">
           <img class="full-width" src="statics/img/publicidad1-100.jpg" alt="banner">
         </div>

      </div>
   </q-page>
</template>

<script>
import categories from 'src/components/qblog/categories'
import featured from 'src/components/qblog/featured'
import morePopular from 'src/components/qblog/morePopular'
   export default {
      components: {
         categories,
         featured,
         morePopular
      },
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            let category = currentRoute.params.category || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qblog-categories-${category}`,
               criteria: category,
               apiRoute: 'apiRoutes.qblog.categories',
               requestParams: {
                  //refresh: true,
               params: {include: 'posts'}
               }

            })
            resolve(true)
         })
      },
      meta() {

         let routetitle = this.$route.params.category || 'productos'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path
         //Set category data
         let category = this.$store.state.qcrudMaster.show[`qblog-categories-${routetitle}`].data
         if (category) {
            routetitle = category.title
            siteDescription = category.summary
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      data() {
         return {
            category: this.$store.state.qcrudMaster.show[`qblog-categories-${this.$route.params.category}`].data,
         }
      }
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



