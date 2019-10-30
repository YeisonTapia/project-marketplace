<template>
    <div>
        <div class="row">
          <div class="col-12" style="position: relative;">
            <full-width-gallery system-name="principal"></full-width-gallery>

            <div class="q-container info-tienda">
              <div class="row gutter-md justify-end q-mx-sm">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mb-lg">

                  <q-card class="card-rounded text-center q-mb-sm">
                    <q-card-title class="q-pa-sm row items-center">
                      Seguir Tienda
                      <div slot="right" class="row items-center bg-secondary q-pa-sm rounded-circle">
                        <q-icon color="white" round name="far fa-thumbs-up" /> 
                      </div>
                    </q-card-title>
                  </q-card>

                  <q-card class="card-rounded text-center">
                    <q-card-title class="q-pa-sm row items-center">
                      7.5 de 200 usuarios
                      <div slot="right" class="row items-center bg-secondary q-pa-sm rounded-circle">
                        <q-icon color="white" round name="grade" /> 
                      </div>
                    </q-card-title>
                  </q-card>

                </div>
              </div>
            </div>
          </div>
          <div class="col-12 bg-primary">
            <div class="q-container q-py-sm" v-if="$q.platform.is.desktop">
              <div class="row justify-center">
                <div class="col">
                  <q-btn flat icon="fas fa-home" no-caps label="Inicio" color="white"/>
                  <q-btn flat icon="fas fa-bars" no-caps label="Category" color="white"/>
                  <q-btn flat icon="fas fa-map-marker-alt" no-caps label="Info Empresa" color="white"/>
                  <q-btn flat icon="far fa-comment-dots" no-caps label="Chatea con la tienda" color="white"/>
                </div>

                <div class="col-auto">
                  <div class="q-inline-block q-px-sm border-x">
                    <q-input
                      placeholder="¿Qué buscas?"
                      color="primary" inverted class="no-shadow "  
                      :after="[{ icon: 'search'} ]" />
                  </div>
                  <q-btn flat icon="fas fa-heart" color="white "/>
                  <q-btn flat icon="fa fa-shopping-cart"  color="white ">
                    <q-chip floating color="secondary">1</q-chip>
                  </q-btn>
                </div>
              </div> 
            </div>
            <q-toolbar color="primary" v-else>
              <q-btn flat round dense icon="fas fa-home" />
              <q-btn flat round dense icon="fas fa-bars" />
              <q-btn flat round dense icon="fas fa-map-marker-alt"/>
              <q-btn flat round dense icon="far fa-comment-dots"/>
              <q-toolbar-title>
              </q-toolbar-title>
              <q-btn flat round dense icon="fas fa-search"/>
              <q-btn flat round dense icon="fas fa-heart"/>
              <q-btn flat round dense icon="fa fa-shopping-cart">
                <q-chip floating color="secondary">1</q-chip>
              </q-btn>
            </q-toolbar>
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
  .border-x
    border-left 1px solid #fff
    border-bottom 0
    border-right 1px solid #fff 
    .q-if-inner
      margin 0

</style>
