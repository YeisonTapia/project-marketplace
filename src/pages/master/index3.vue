<template>
  <q-page class="theme-layout-03">
    <!-- Imagen textos y menu usuarios que siguen la tienda-->
    <top></top>

    <!-- destacado encuenta nuevos y publicidad -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-xl">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div class="line-grey q-my-lg"></div>

              <q-list padding>
                <q-item>
                  <q-item-section top avatar class="q-mr-md">
                    <q-icon size="xl" color="primary" name="far fa-user" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-h5 text-weight-bold q-mb-sm">Mi perfil</q-item-label>
                    <q-item-label class="text-subtitle1">
                       <div class="q-mb-md">
                        En cada uno de sus trabajos, Juliana Vargas cuenta con los mejores productos faciales, que van desde frescas hidratantes hasta exclusivas cremas de cacao para las orejas. Además, si quieres definir también tu peinado de novia, también puedes hacerlo con ello, pues trabaja mano a mano con una profesional experta en peinados, que le permite ofrecer un servicio integral de belleza y a la vez dedicarse exclusivamente al maquillaje de la novia y sus acompañantes.
                      </div>
                      <div>
                        Los fotografos de moda, editores de catálogos y responsables de pasarelas como Colombiamoda ya han optado por contratar sus servicios. ¿Quieres ese nivel en tu día más especial? ¡No esperes más y contacta con ella!
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="line-grey q-my-lg"></div>

              <q-list padding>
                <q-item>
                  <q-item-section top avatar class="q-mr-md">
                    <q-icon size="xl" color="primary" name="fas fa-briefcase" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-h5 text-weight-bold q-mb-sm">Habilidades o servicios</q-item-label>
                    <q-item-label>
                        <div class="text-subtitle1 q-mb-none">
                          <i class="fas fa-check text-primary q-pr-sm"></i>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        </div>
                        <div class="text-subtitle1 q-mb-none">
                          <i class="fas fa-check text-primary q-pr-sm"></i>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        </div>
                        <div class="text-subtitle1 q-mb-none">
                          <i class="fas fa-check text-primary q-pr-sm"></i>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        </div>
                        <div class="text-subtitle1 q-mb-none">
                          <i class="fas fa-check text-primary q-pr-sm"></i>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="line-grey q-my-lg"></div>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">

            <q-card>
              <q-card-section class="q-pa-lg text-center">
                <q-btn no-caps class="no-shadow border-0 q-py-sm">
                  <q-icon size="3em" color="primary" name="far fa-comment-dots" /> 
                  <h5 class="text-secondary q-mt-sm q-mb-none full-width">Chatea conmigo ahora</h5>
                </q-btn>
                <div class="line-grey q-my-md"></div>
                <q-btn no-caps class="no-shadow border-0 q-py-sm">
                  <q-icon size="3em" color="primary" name="fas fa-briefcase" /> 
                  <h5 class="text-secondary q-mt-sm q-mb-none full-width">Solicita tu servicio</h5>
                </q-btn>

                <div class="line-grey q-my-md"></div>
                <q-btn no-caps class="no-shadow border-0 q-py-sm">
                  <q-icon size="3em" color="primary" name="star" /> 
                  <h5 class="text-secondary q-mt-sm q-mb-none full-width">Calificar servicio</h5>
                </q-btn>

                <div class="line-grey q-my-md"></div>
                <share></share>

              </q-card-section>
            </q-card>
            <quiz></quiz>

          </div>
        </div>
      </div>
    </div>  


    <div>
      <div class="q-container">


       <q-list padding class="q-mb-md">
          <q-item>
            <q-item-section top avatar class="q-mr-md">
              <q-icon size="xl" color="primary" name="far fa-images" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h5 text-weight-bold q-mb-sm">Conoce mi trabajo</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>


      </div>
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-3">
          <div class="ratio-4-3" style="border: 2px solid #fff;">
              <img src="/statics/img/theme-three/work1.jpg" alt="">
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <div class="ratio-4-3" style="border: 2px solid #fff;">
              <img src="/statics/img/theme-three/work2.jpg" alt="">
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <div class="ratio-4-3" style="border: 2px solid #fff;">
              <img src="/statics/img/theme-three/work3.jpg" alt="">
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <div class="ratio-4-3" style="border: 2px solid #fff;">
              <img src="/statics/img/theme-three/work4.jpg" alt="">
            </div>
        </div>
      </div>
    </div>

    <!-- direcciones -->
    <contact></contact>

    <!-- Compartir -->
    <share></share>

  </q-page>
</template>
<script>
import quiz from 'src/components/themes/03/quiz'
import contact from 'src/components/themes/03/contact'
import share from 'src/components/themes/03/shareNetworks'
import top from 'src/components/themes/03/top'
export default {
  name: 'PageLayout3',
  components: {
    quiz,
    contact,
    share,
    top
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus">
</style>