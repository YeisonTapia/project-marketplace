<template>
  <q-card :class="className">
    <q-card-media>
      <div class="ratio-1">
        <img :src="product.image">
      </div>
    </q-card-media>
    <q-card-actions>
      <q-btn flat dense icon="favorite"/>
      <q-btn flat dense icon="shopping_cart"/>
    </q-card-actions>
    <q-card-main class="text-left q-pt-sm">
      <q-rating size="20px"
        v-model="product.rating"
        :max="5" v-if="product.rating>0"
      />
      <h5 class="q-my-sm">${{product.price}}</h5>
      <p class="q-my-none text-truncate">{{product.name}}</p>
      <p class="q-my-none text-truncate"><small>{{product.tienda}}</small></p>
    </q-card-main>
  </q-card>
</template>
<script>
export default {
    name: 'ProductComponent',
    props: ['product','className']
}
</script>
<style lang="stylus">
@import "~variables";
.cardProductOne
  border-radius 0
  background-color #ffffff
  h5
    color $primary
  & .q-card-main
    font-size 16px
  & .q-card-actions
    background-color $secondary
    float right  
    margin-top -15px
    z-index 9
    position relative
    .q-btn
      color #fff
      border-radius 0
    .q-btn:first-child
      border-left 1px solid #fff      
    .q-btn:last-child
      border-right 1px solid #fff
  &:hover
    background-color $secondary
    color #fff    
    h5
      color #fff
    & .q-card-actions
      background-color $primary  
</style>
