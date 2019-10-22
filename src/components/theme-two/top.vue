<template>
    <div class="q-mb-lg">
        <div class="row">
          <div class="col-12">
            <div class="q-container">
              <full-width-gallery system-name="principal"></full-width-gallery>
            </div>
          </div>
          <div class="col-12 bg-primary">
            <div class="q-container">
              <div class="bg-white rounded-lg text-white">
                submenu
              </div>
              <p class="text-center q-my-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit..</p>
            </div>
          </div>
        </div>

    </div>
</template>
<script>
import fullWidthGallery from '@imagina/qslider/_components/fullWidthGallery'
export default {
  name: 'TopComponent',
  components: {
    fullWidthGallery
  }
}
</script>
<style lang="stylus">
@import "~variables";
.theme-layout-01
  .info-tienda
    position absolute
    margin 0 auto
    left 0
    bottom 0
    right 0
    .card-rounded
      background-color #ffffff
      border-radius 20px 0 20px 0
      color $primary 
</style>
