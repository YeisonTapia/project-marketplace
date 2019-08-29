<template>
  <q-card class="card-store q-ma-md">
    <q-card-media>
      <div class="ratio-4-3">
        <img  :src="store.image">
      </div>
      <div class="absolute-top-left text-center q-ml-md">
        <div class="pts text-primary" v-if="store.pts">
          {{store.pts}}pt
        </div>
      </div>
      <div class="absolute-bottom-left text-center q-mx-md q-my-sm">
        <div class="avatar">
          <img :src="store.avatar">
        </div>
      </div>

      <div class="absolute-bottom-right q-my-md q-pa-none">
        <div class="bg-white label-title text-primary text-uppercase">
          {{store.name}}
        </div>
      </div>
    </q-card-media>
    <q-card-main class="bg-white">
      {{store.summary}}
    </q-card-main>
  </q-card>
</template>
<script>
  export default {
    name: 'StoreComponent',
    props: ['store']
  }
</script>
<style lang="stylus">
  .card-store
    border-radius 0px 0px 20px 20px
    font-family 'Trebuchet MS'
    & .q-card-main
      font-size 16px
    & .q-card-media 
      & .avatar
        img
          border-radius 50%
          border 2px solid #FFFFFF
          height 100px
          width 100px
      & .pts
        background-image url('/assets/img/label.png')
        display flex
        align-items center
        justify-content center
        background-size 100% 100%
        padding 0 5px
        height 50px
        background-repeat no-repeat
        background-position center
        font-size 18.14px
      & .label-title
        border-radius 10px 0 0 10px
        font-size 18px
        padding 10px 14px
</style>
