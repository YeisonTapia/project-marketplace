<template>
  <div class="share-networks bg-white">
    <div class="row items-center">
      <div class="col-12">
        <div class="networks text-center">
          <a href="" target="_blank"><i class="fab fa-facebook"></i></a>
          <a href="" target="_blank"><i class="fab fa-whatsapp"></i></a>
          <a href="" target="_blank"><i class="fab fa-twitter"></i></a>
          <a href="" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShareNetworksComponent',
}
</script>
<style lang="stylus">
.theme-layout-03
  .share-networks
    padding 2% 0
    .networks  
      a
      & i
        margin 10px
        font-size 2rem
        color $secondary
        &:hover 
          color $primary
</style>
