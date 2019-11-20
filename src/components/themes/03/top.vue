<template>
    <div>
        <div class="row">
          <div class="col-12 relative-position">
            <full-width-gallery system-name="principal"></full-width-gallery>
         
            <div class="q-container info-tienda">
              <div class="row q-col-gutter-md justify-between">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 text-center ">
                  <div class="logo-tienda">
                    <router-link :to="{ name: 'app.home'}">
                        <img :src="logo" class="line-grey">
                    </router-link>
                  </div>
                  <div class="text-h5 bg-primary q-inline-block q-pa-md text-white q-mb-sm">Juliana Vargas</div>
                  <h5 class="text-subtitle1 text-secondary q-mt-none">MAQUILLADORA PROFESIONAL</h5>

                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-mb-lg">

                  <q-card class="card-rounded  btn-top no-shadow q-mx-xl line-primary text-center q-mb-sm ">
                    <q-list bordered >
                      <q-item clickable>
                         <q-item-section avatar class="q-pl-md">
                            <q-avatar color="primary" text-color="white" icon="far fa-thumbs-up" />
                          </q-item-section>
                          <q-item-section class="q-py-md text-h5">Recomendar</q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>

                  <q-card class="card-rounded no-shadow text-center">
                    <q-card-section>
                      <span class="text-primary">1.800 usuarios</span>
                      <div class="text-secondary w-100">
                        Recomiendan esta página 
                      </div>
                    </q-card-section>
                  </q-card>

                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import fullWidthGallery from 'src/components/themes/qcarousel'
export default {
  name: 'TopComponent',
  components: {
    fullWidthGallery
  },
  data() {
    return {
      logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path
    }
  }

}
</script>
<style lang="stylus">
.theme-layout-03
  .logo-tienda
    margin-top -150px
    padding-bottom 5px !important
    img
      border 5px solid #E1E1E1 !important
      background-color #fff
  .btn-top
    margin-top -40px
    position relative
    z-index 9    
</style>
