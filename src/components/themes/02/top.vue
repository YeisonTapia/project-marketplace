<template>
    <div class="q-mb-lg">
      <div class="row">
        <div class="col-12">
          <div class="q-container">
            <div class="q-mb-md border-slider" >
              <full-width-gallery system-name="principal"></full-width-gallery>
              <div style=" margin-bottom: 25px;"></div>

              <div class="q-container info-tienda" >
                <div class="row q-col-gutter-md justify-end q-mx-sm">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3 q-mb-lg text-center">
                    <div class="row q-col-gutter-xs items-center justify-end">
                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                          <q-card class="card-circle text-center q-mb-sm">
                            <q-card-section class="q-pa-sm">
                              <div class="text-h6">
                                <q-icon color="white" size="30px" round name="grade" /> 
                              </div>
                              <div class="text-body2">7.5 de 200 usuarios</div>
                            </q-card-section>
                          </q-card> 
                        </div>
                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                          <q-card class="card-circle text-center q-mb-sm">
                            <q-card-section class="q-pa-sm ">
                              <div class="text-h5">
                                <q-icon color="white" size="30px" round name="far fa-thumbs-up" /> 
                              </div>
                              <div class="text-body2"> Seguir Tienda</div>
                            </q-card-section>
                          </q-card>
                        </div>
                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                          <q-card class="card-rounded text-center">
                            <q-card-section class="q-pa-sm">
                              <div class="text-h6">350 </div>
                              <div class="text-body2">Seguidores</div>
                            </q-card-section>
                          </q-card>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="col-12 bg-primary menu-02">
          <div class="q-container">
            <div class="bg-white rounded-lg text-white q-mx-xl q-py-sm"  v-if="$q.platform.is.desktop">
              <div class="row">
                <div class="col q-pl-md">
                  <q-btn flat round dense icon="fas fa-home" no-caps color="primary"/>
                  <q-btn flat icon="fas fa-bars" no-caps label="Category" color="primary"/>
                  <q-btn flat icon="fas fa-map-marker-alt" no-caps label="Info Empresa" color="primary"/>
                  <q-btn flat icon="far fa-comment-dots" no-caps label="Chatea con la tienda" color="primary"/>
                </div>
                <div class="col-auto q-pr-md">
                  <div class="q-inline-block q-px-sm border-x">
                    <q-input dense
                      placeholder="¿Qué buscas?"
                      color="white" outlined  >
                      <template v-slot:append>
                        <q-icon name="search" color="white" />
                      </template>
                      </q-input>
                  </div>
                  <q-btn flat icon="fas fa-heart" color="secondary"/>
                  <q-btn flat icon="fa fa-shopping-cart"  color="secondary">
                     <q-badge align="top" color="primary" floating>1</q-badge>
                  </q-btn>
                </div>
              </div>  
            </div>
            <q-toolbar color="white" text-color="primary" v-else>
              <q-btn flat round dense icon="fas fa-home"  />
              <q-btn flat round dense icon="fas fa-bars" />
              <q-btn flat round dense icon="fas fa-map-marker-alt"/>
              <q-btn flat round dense icon="far fa-comment-dots"/>
              <q-toolbar-title>
              </q-toolbar-title>
              <q-btn flat round dense icon="fas fa-search"/>
              <q-btn flat round dense icon="fas fa-heart"/>
              <q-btn flat round dense icon="fa fa-shopping-cart"  color="secondary">
                 <q-badge align="top" color="secondary" floating>1</q-badge>
              </q-btn>
            </q-toolbar>


            <p class="text-h6 text-center text-white q-my-xl">Tu pizzería por excelencia, con vista y vientos del mar </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import fullWidthGallery from 'src/components/qslider/qcarousel'
export default {
  name: 'TopComponent',
  components: {
    fullWidthGallery
  }
}
</script>
<style lang="stylus">
.theme-layout-02
  .border-slider
    border 10px solid #fff
    position relative
    z-index 9
  .menu-02
    min-height 300px 
    margin-top -150px 
    padding-top 150px
  .info-tienda
    position absolute
    margin 0 auto
    left 0
    bottom 0
    right 0
    .card-rounded
      background-color $secondary
      border-radius 20px 0 20px 0
      color #ffffff
      border 5px solid #fff
      width 150px
      margin 5px auto
      .q-card-section
        line-height 1.1rem
    .card-circle
      background-color $secondary
      border-radius 50%
      color #ffffff
      border 5px solid #fff  
      height 100px
      width 100px
      margin 5px auto
      .q-card-section
        line-height 1.1rem
  .border-x
    .q-field__control
      border-left 1px solid $primary
      border-bottom 0
      border-right 1px solid $primary 
      border-radius 0
    .q-field--outlined .q-field__control:before  
      border 0
    .q-placeholder  
      color $primary    
</style>
