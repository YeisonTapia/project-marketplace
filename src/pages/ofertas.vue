<template>
   <q-page class="bg-fondo">
      <div>
         <div class="row gutter-xl">
            <div class="col-12">
               <h2 class="text-primary text-center font-family-secondary q-mb-sm q-mx-lg">
                  Tiendas en Ofertas
               </h2>
               <p class="text-center text-h6 q-mx-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                  dicta sequi suscipit</p>
            </div>
         </div>
         <div style="min-height: 550px">
            <q-infinite-scroll @load="getStores" :offset="550" ref="infinityScrollOfferStore">
              <div v-for="(item,i) in items" :key="i">
               <div class="row q-py-lg">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center" v-for="store in item.stores"
                       :key="store.id">
                     <store :store="store"/>
                  </div>
               </div>
                <div class="q-container banner q-py-xl text-center">
                  <qbanner :slide="item.banner" height="auto"/>
                </div>
              </div>
               <template v-slot:loading v-if="loadingScroll">
                  <div class="row justify-center q-my-md">
                     <q-spinner-dots color="primary" size="40px"/>
                  </div>
               </template>
            </q-infinite-scroll>
         </div>
      </div>

      <qbanner systemName="ofertas" height="auto"/>

   </q-page>
</template>
<script>
   import store from 'src/components/themes/store'
   import qbanner from "src/components/qbanners/qbanner";

   export default {
      name: 'PageCategoria',
      components: {
         store,
         qbanner
      },
      data() {
         return {
            stores: [],
            visible: false,
            page: 1,
            loadingScroll: true,
            items: [],
            totalPage: 0,
            take: 16,
            slide: [],
            position: [],
            numSlide: 0
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      methods: {
         async init() {
           await this.getBanner()
         },
         getStores(index, done) {
           return new Promise((resolve, reject) => {
             let currentPage = this.page
             //Validate last page before do request
             if ((currentPage != 1) && (currentPage > this.totalPage)) return this.$refs.infinityScrollOfferStore.stop()

             this.visible = true;
             this.$crud.index("apiRoutes.qmarketplace.store", {
               params: {
                 filter: {
                    order: {
                       field: 'created_at',
                       way: 'desc'
                    }
                 },
                 take: this.take,
                 page: currentPage
               }
             }).then(response => {
               if (this.position.banners.length <= this.numSlide) this.numSlide = 0
               this.items.push({stores: response.data, banner: this.position.banners[this.numSlide]})
               this.totalPage = response.meta.page.lastPage
               this.page++
               this.numSlide++
               this.visible = false;
               resolve(true)//Resolve
               done()
             }).catch(error => {
                return this.$refs.infinityScroll.stop()
                done()
             });
           })
         },
         getBanner() {

           return new Promise((resolve, reject) => {
            let params = {
               params: {
                  filter: {
                     field: 'system_name'
                  }
               }
            }
            this.$crud.show('apiRoutes.qbanner.positions', 'ofertas', params).then(response => {
               this.position = response.data
               this.slide.push(this.position.banners[this.numSlide])
               this.numSlide++
              resolve(true)//Resolve
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              reject(error)//Resolve
            })
           })
         },
      }
   }
</script>
