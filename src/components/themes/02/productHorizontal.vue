<template>
  <q-card :class="className">
    <q-card-main class="q-pb-lg">
      <div class="row gutter-sm">
        <div class="col-6">
          <q-card-media>
            <div class="ratio-1">
              <img :src="product.image">
            </div>
          </q-card-media>
        </div>
        <div class="col-6">
          <p class="q-my-none text-truncate">{{product.name}}</p>
          <p class="q-my-none text-truncate"><small>{{product.tienda}}</small></p>
          <h5 class="q-my-sm">${{product.price}}</h5>

          <q-card-actions>
            <q-btn flat dense icon="favorite"/>
            <q-btn flat dense icon="shopping_cart"/>
          </q-card-actions>
        </div>
      </div>     
    </q-card-main>
  </q-card>
</template>
<script>
export default {
    name: 'ProductHorizontalComponent',
    props: ['product','className']
}
</script>
<style lang="stylus">
.cardProductH
  border-radius 0
  background-color #ffffff
  position relative
  h5
    color $primary
  & .q-card-main
    font-size 16px
  & .q-card-actions
    background-color $secondary
    position absolute
    right 0
    bottom 15px
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
