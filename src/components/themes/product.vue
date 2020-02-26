<template>
   <q-card class="card-product q-ma-sm q-pa-sm">
      <router-link
              :to="{name: 'stores.product.show',params:{slug: product.store.slug, product: product.slug}}">
         <q-img :ratio="1" :src="product.mainImage.path"/>
         <q-card-actions class="q-px-none" style="z-index: 100000">
            <q-btn @click="$router.push({name: 'stores.product.show',params:{slug: product.store.slug, product: product.slug}})"
                   flat dense
                   icon="shopping_cart"/>
         </q-card-actions>
         <q-card-section class="text-left q-pa-sm text-secondary">
            <q-rating 
                      v-model="product.averageRating" readonly color="primary"
                      :max="5"
            />
            <h5 class="q-my-sm price font-family-secondary">${{$n(product.price)}}</h5>
            <div class="text-subtitle1 font-family-secondary text-truncate">{{product.name}}</div>
            <div class="text-subtitle2 text-truncate">{{product.store.name}}</div>
         </q-card-section>
      </router-link>
   </q-card>
</template>
<script>
   export default {
      name: 'ProductComponent',
      props: {
         product: {
            default: () => {
               return {}
            }
         }
      },
   }
</script>
<style lang="stylus">
   .card-product
      border-radius 0
      box-shadow none
      background-color transparent

      .text-subtitle2
         color #666666
         font-size 0.7rem
         line-height 1rem

      &:hover
         background-color #FFFFFF
         box-shadow 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)

      & .q-card__actions
         float right

         .q-btn:first-child
            color $primary
            border-left 1px solid #666666
            border-radius 0

         .q-btn:last-child
            color $secondary
            border-right 1px solid #666666
            border-radius 0
      .q-rating
         font-size 30px      
      @media screen and (max-width: $breakpoint-xs)
         .price 
            font-size 1rem!important
            line-height 1rem !important   
         .q-rating 
            font-size 15px      
</style>
