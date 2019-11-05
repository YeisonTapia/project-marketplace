<template>
  <q-card class="card-product q-ma-sm q-pa-sm">

      <q-img :ratio="1" :src="product.image" />
  
    <q-card-actions class="q-px-none">
      <q-btn flat dense icon="favorite"/>
      <q-btn flat dense icon="shopping_cart"/>
    </q-card-actions>
    <q-card-section class="text-left q-pa-none ">
      <q-rating size="20px"
        v-model="product.rating"
        :max="5" v-if="product.rating>0"
      />
      <h5 class="q-my-sm font-family-secondary">${{product.price}}</h5>
      <div class="text-subtitle1 font-family-secondary text-truncate">{{product.name}}</div>
      <div class="text-subtitle2 text-truncate">{{product.tienda}}</div>
    </q-card-section>
  </q-card>
  </q-card>
</template>
<script>
    export default {
        name: 'ProductComponent',
        props: ['product']
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
    box-shadow 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
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
</style>
