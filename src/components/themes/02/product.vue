<template>
  <q-card :class="className">
    <q-card-section class="q-pa-sm">
      <q-img :ratio="1" :src="product.image" class="rounded-sm"/>
    </q-card-section>
    <q-card-section class="card-title bg-primary">
      <q-list>
        <q-item>
          <q-item-section><h5 class="q-my-none text-white">${{product.price}}</h5></q-item-section>
          <q-item-section avatar>
            <q-icon color="white" name="favorite" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section class="card-main q-pt-sm">
      <q-rating size="20px"
        v-model="product.rating" color="secondary"
        :max="5" v-if="product.rating>0"
      />
      <p class="q-my-sm text-truncate">{{product.name}}</p>
      <p class="q-my-sm text-truncate"><small>{{product.tienda}}</small></p>  
    </q-card-section>
    <q-card-actions>
      <q-btn color="secondary" label="COMPRAR" icon="shopping_cart"/>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
    name: 'ProductComponent',
    props: ['product','className']
}
</script>
<style lang="stylus">
.cardProductTwo
  border-radius 20px 20px 20px 0
  position relative
  background-color var(--q-color-light)
  & .card-title
    margin-right 30px
    margin-top -30px
    z-index 9
    position relative
    margin-bottom 10px
    padding 10px
    border-radius 0 10px 10px 0 !important
  & .card-main
    font-size 16px
  & .q-card__actions  
      .q-btn
        margin-left -7px
        border-radius 0
        margin-bottom 10px
        box-shadow none
        padding-right 20px



</style>
