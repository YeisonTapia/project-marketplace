<template>
    <div class="q-mb-lg">
      <div class="row">
        <div class="col-12">
          <div class="q-container">
            <div class="q-mb-md" style="border: 10px solid #fff; position: relative; z-index: 9;">
              <full-width-gallery system-name="principal"></full-width-gallery>
            </div>
          </div>
        </div>
        <div class="col-12 bg-primary" style="min-height: 300px; margin-top: -150px; padding-top: 150px;">
          <div class="q-container">
            <div class="bg-white rounded-lg text-white q-mx-xl q-py-sm">
              <div class="row">
                <div class="col">
                  <q-btn flat icon="fas fa-home" no-caps color="primary"/>
                  <q-btn flat icon="fas fa-bars" no-caps label="Category" color="primary"/>
                  <q-btn flat icon="fas fa-map-marker-alt" no-caps label="Info Empresa" color="primary"/>
                  <q-btn flat icon="far fa-comment-dots" no-caps label="Chatea con la tienda" color="primary"/>
                </div>
                <div class="col-auto">
                  <q-btn flat icon="fas fa-heart" color="primary "/>
                  <q-btn flat icon="fa fa-shopping-cart" color="primary "/>
                </div>
              </div>  
            </div>
            <p class="text-center text-white q-my-xl">Tu pizzería por excelencia, con vista y vientos del mar </p>
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
