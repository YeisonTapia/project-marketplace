<template>
    <div>
        <div class="row">
          <div class="col-12" style="position: relative;">
            <full-width-gallery system-name="principal"></full-width-gallery>

            <div class="q-container info-tienda">
              <div class="row gutter-md justify-between">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 text-center ">
                  <div class="logo-tienda">
                    <router-link :to="{ name: 'app.home'}">
                        <img :src="logo" class="line-grey">
                    </router-link>
                  </div>
                  <div class="q-headline bg-primary q-inline-block q-pa-md text-white q-mb-sm">Juliana Vargas</div>
                  <h5 class="q-subheading text-secondary q-mt-none">MAQUILLADORA PROFESIONAL</h5>

                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-mb-lg">

                  <q-card class="card-rounded bg-white btn-top no-shadow q-mx-xl line-primary text-center q-mb-sm ">
                    <q-card-title class="q-pa-sm row items-center">
                      <span class="text-secondary">Recomendar</span>
                      <div slot="right" class="row items-center bg-primary q-pa-sm rounded-circle">
                        <q-icon color="white" round name="far fa-thumbs-up" /> 
                      </div>
                    </q-card-title>
                  </q-card>

                  <q-card class="card-rounded no-shadow text-center">
                    <q-card-title>
                      <span class="text-primary">1.800 usuarios</span>
                      <div class="text-secondary w-100">
                        Recomiendan esta página 
                      </div>
                    </q-card-title>
                  </q-card>

                </div>
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
  },
  data() {
    return {
      logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path
    }
  }

}
</script>
<style lang="stylus">
@import "~variables";
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
