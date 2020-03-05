<template>
   <div class="q-mt-lg full-width">
      <div class="bg-fondo text-center ">
         <h3 class="title-label-primary text-center">
            <div>Productos Destacados</div>
         </h3>
         <div class="q-container q-pt-lg">
            <q-infinite-scroll @load="getProducts" :offset="250" ref="infinityScroll">
               <div v-for="(item,i) in items" :key="i">
                  <div class="row q-py-lg">
                     <div class="col-xs-6 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="product in item.products"
                          :key="product.id">
                        <product :product="product"></product>
                     </div>
                  </div>
                  <div class="q-container banner q-py-xl text-center">
                     <qbanner :slide="item.banner" height="auto"/>
                  </div>
               </div>
               <template v-slot:loading v-if="loadingScroll">
                  <div class="row justify-center q-my-md">
                     <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
                  </div>
               </template>
            </q-infinite-scroll>
         </div>
      </div>
   </div>
</template>
<script>
   import product from 'src/components/themes/product'
   import qbanner from "src/components/qbanners/qbanner";

   export default {
      name: 'FeaturedProductsComponent',
      components: {
         product,
         qbanner
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            products: [],
            loading: false,
            loadingScroll: true,
            page: 1,
            items: [],
            totalPage: 0,
            take: 16,
            slide: [],
            position: [],
            numSlide: 0
         }
      },
      methods: {
         async init() {
           // this.getProducts(this.page, ()=>{})
            await this.getBanner()
         },
         getProducts(index, done) {
            let currentPage = this.page
            //Validate last page before do request
            if ((currentPage != 1) && (currentPage > this.totalPage)) return this.$refs.infinityScroll.stop()
            //Request Params
            let params = {
               params: {
                  include: '',
                  filter: {
                     visible: true,
                     order: {
                        field: 'created_at',
                        way: 'desc'
                     }
                  },
                  take: this.take,
                  page: currentPage
               }
            };
            //Request
            this.$crud.index("apiRoutes.qcommerce.products", params).then(response => {
               if (this.position.banners.length <= this.numSlide) this.numSlide = 0
               this.items.push({products : response.data, banner: this.position.banners[this.numSlide]})
               this.totalPage = response.meta.page.lastPage
               this.page ++
               this.numSlide ++
               done()
            }).catch(error => done());
         },
         getBanner() {
            let params = {
               params: {
                  filter: {
                     field: 'system_name'
                  }
               }
            }
            this.loading = true
            this.$crud.show('apiRoutes.qbanner.positions', 'home-productos-destacados', params).then(response => {
               this.position = response.data
               this.loading = false
               this.slide.push(this.position.banners[this.numSlide])
               this.numSlide++
            }).catch(error => {
               console.error('[GET POSITIONS] ', error);
               //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         },
      },

   }
</script>
<style lang="stylus">
</style>
