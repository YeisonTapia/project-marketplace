<template>
  <q-page class="theme-layout-03">
    <!-- Imagen textos y menu usuarios que siguen la tienda-->
    <top></top>

    <!-- destacado encuenta nuevos y publicidad -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row gutter-xl">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div class="line-grey q-my-lg"></div>
              <q-list class="list-profile border-0 q-mb-lg">
                <q-item>
                  <q-item-side icon="far fa-user" color="primary" />
                  <q-item-main>
                    <q-item-tile label>
                      <div class="q-title text-weight-bold q-mb-sm">Mi perfil</div>
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main inset>
                    <q-item-side/>
                    <q-item-tile label>
                      <div class="q-subheading">
                        En cada uno de sus trabajos, Juliana Vargas cuenta con los mejores productos faciales, que van desde frescas hidratantes hasta exclusivas cremas de cacao para las orejas. Además, si quieres definir también tu peinado de novia, también puedes hacerlo con ello, pues trabaja mano a mano con una profesional experta en peinados, que le permite ofrecer un servicio integral de belleza y a la vez dedicarse exclusivamente al maquillaje de la novia y sus acompañantes.
                      </div>
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main inset>
                    <q-item-side/>
                    <q-item-tile label>
                      <div class="q-subheading">
                        Los fotografos de moda, editores de catálogos y responsables de pasarelas como Colombiamoda ya han optado por contratar sus servicios. ¿Quieres ese nivel en tu día más especial? ¡No esperes más y contacta con ella!
                      </div>
                    </q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
              <div class="line-grey q-my-lg"></div>
              <q-list class="list-profile border-0">
                <q-item>
                  <q-item-side icon="fas fa-briefcase" color="primary" />
                  <q-item-main>
                    <q-item-tile label>
                      <div class="q-title text-weight-bold q-mb-sm">Habilidades o servicios</div>
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main inset>
                    <q-item-side/>
                    <q-item-tile label>
                      <div class="q-subheading q-mb-none">
                        <i class="fas fa-check text-primary q-pr-md"></i>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                      </div>
                    </q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main inset>
                    <q-item-side/>
                    <q-item-tile label>
                        <div class="q-subheading q-mb-none">
                        <i class="fas fa-check text-primary q-pr-md"></i>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                      </div>
                    </q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>

              <div class="line-grey q-my-lg"></div>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">

            <q-card>
              <q-card-main class="q-pa-lg text-center">
                <q-btn no-caps class="no-shadow border-0 q-py-sm">
                  <q-icon size="3em" color="primary" name="far fa-comment-dots" /> 
                  <h5 class="text-secondary q-mt-sm q-mb-none w-100">Chatea conmigo ahora</h5>
                </q-btn>
                <div class="line-grey q-my-md"></div>
                <q-btn no-caps class="no-shadow border-0 q-py-sm">
                  <q-icon size="3em" color="primary" name="fas fa-briefcase" /> 
                  <h5 class="text-secondary q-mt-sm q-mb-none w-100">Solicita tu servicio</h5>
                </q-btn>

                <div class="line-grey q-my-md"></div>
                <q-btn no-caps class="no-shadow border-0 q-py-sm">
                  <q-icon size="3em" color="primary" name="star" /> 
                  <h5 class="text-secondary q-mt-sm q-mb-none w-100">Calificar servicio</h5>
                </q-btn>

                <div class="line-grey q-my-md"></div>
                <share></share>

              </q-card-main>
            </q-card>
            <quiz></quiz>

          </div>
        </div>
      </div>
    </div>  


    <div>
      <div class="q-container">
        <q-list class="list-profile border-0">
          <q-item>
            <q-item-side icon="far fa-images" color="primary" />
            <q-item-main>
              <q-item-tile label>
                <div class="q-title text-weight-bold q-mb-sm">Conoce mi trabajo</div>
              </q-item-tile>
            </q-item-main>
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
import generalProducts from 'src/components/theme-three/generalProducts'
import featuredProducts from 'src/components/theme-three/featuredProducts'
import newProducts from 'src/components/theme-three/newProducts'
import quiz from 'src/components/theme-three/quiz'
import contact from 'src/components/theme-three/contact'
import share from 'src/components/theme-three/shareNetworks'
import top from 'src/components/theme-three/top'
export default {
  name: 'PageLayout3',
  components: {
    featuredProducts,
    generalProducts,
    newProducts,
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
@import "~variables";
.theme-layout-03
  .list-profile
    .q-item-icon
      font-size 30px
      margin-right 15px
</style>