<template>
  <q-card class="card-product q-ma-sm q-pa-sm">
    <q-card-media>
      <div class="ratio-1">
        <img :src="product.image">
      </div>
    </q-card-media>
    <div class="row">
      <div class="col">
        <q-card-main class="text-left q-pt-none">
          <h5 class="q-my-sm">${{product.price}}</h5>
          <p class="q-my-none">{{product.name}}</p>
          <p class="q-my-none"><small>{{product.tienda}}</small></p>
        </q-card-main>
      </div>
      <div class="col">
        <q-card-actions style="float:right;">
          <q-btn flat round dense icon="favorite" color="primary"/>
          <q-btn flat round dense icon="shopping_cart" color="blue-grey"/>
        </q-card-actions>
      </div>   
    </div>
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
  font-family 'Trebuchet MS'
  border-radius 0
  box-shadow none
  &:hover
    background-color #FFFFFF
    box-shadow 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
  & .q-card-main
    font-size 16px
</style>
