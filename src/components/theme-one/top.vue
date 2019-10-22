<template>
    <div>
        <div class="row">
          <div class="col-12" style="position: relative;">
            <full-width-gallery system-name="principal"></full-width-gallery>

            <div class="q-container info-tienda">
              <div class="row gutter-md justify-end">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mb-lg">

                  <q-card class="card-rounded text-center q-mb-sm">
                    <q-card-title>
                      Seguir Tienda
                      <div slot="right" class="row items-center">
                        <q-icon color="secondary" round name="far fa-thumbs-up" /> 
                      </div>
                    </q-card-title>
                  </q-card>

                  <q-card class="card-rounded text-center">
                    <q-card-title>
                      7.5 de 200 usuarios
                      <div slot="right" class="row items-center">
                        <q-icon color="secondary" round name="grade" /> 
                      </div>
                    </q-card-title>
                  </q-card>

                </div>
              </div>
            </div>
          </div>
          <div class="col-12 bg-primary">
            <div class="q-container text-primary">
               submenu 
            </div>
          </div>
        </div>
        <div class="q-container">
          <div class="row gutter-md justify-end">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mb-lg">
              <div class="bg-secondary text-white text-center q-pa-md">
                340<br>
                <small>usuarios siguen esta tienda</small> 
              </div>
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
