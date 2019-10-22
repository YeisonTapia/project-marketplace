<template>
  <q-page class="theme-layout-02">
    <!-- Imagen textos y menu usuarios que siguen la tienda-->
    <top></top>

    <!--  publicidad encuenta -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-4 q-mb-xl">
            <div class="ratio-1">
              <img src="/assets/img/theme-one/banner-bottom.jpg" alt="">
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 q-mb-xl">
            <div class="ratio-1">
              <img src="/assets/img/theme-one/banner-bottom.jpg" alt="">
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4">
            <quiz></quiz>
          </div>
        </div>
      </div>
    </div>  

    <!-- Compartir -->
    <div class="share-networks q-mb-xl">
      <div class="q-container">
        <div class="row justify-center">
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-6">
            <div class="networks text-center">
              <h4 class="q-my-md text-white">CONOCENOS</h4>
              <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur architecto cumque fugit placeat assumenda illum debitis minima ducimus fuga enim quod nihil, ullam non vitae iusto repellat libero voluptate. Cumque.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- destacado  y compartir -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <featured-products></featured-products>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <q-list class="q-mb-lg border-0">
              <q-list-header>Compartir</q-list-header>
              <q-item>
                <q-item-side icon="fab fa-facebook" />
                <q-item-main label="Facebook" />
              </q-item>
              <q-item-separator />
              <q-item>
                <q-item-side icon="fab fa-twitter" />
                <q-item-main label="Twitter" />
              </q-item>
              <q-item-separator />
              <q-item>
                <q-item-side icon="fab fa-instagram" />
                <q-item-main label="Instagram" />
              </q-item>
            </q-list>

            <q-btn color="secondary" no-caps class="rounded-sm q-py-lg q-px-xl">
              <div class="q-subheading q-mb-md w-100">¿Tienes alguna duda?</div>
              <q-icon size="3em" color="white" name="far fa-comment-dots" /> 
              <div class="q-subheading q-mt-md">CHATEA AQUI CON LA TIENDA</div>
            </q-btn>

          </div>
        </div>
      </div>
    </div>  



    <!-- Productos -->
    <general-products></general-products>



    <!-- direcciones -->
    <contact></contact>

  </q-page>
</template>
<script>
import imSocial from 'src/components/master/imSocial';
import generalProducts from 'src/components/theme-two/generalProducts'
import featuredProducts from 'src/components/theme-two/featuredProducts'
import newProducts from 'src/components/theme-two/newProducts'
import quiz from 'src/components/theme-two/quiz'
import top from 'src/components/theme-two/top'
import contact from 'src/components/theme-two/contact'
export default {
  name: 'PageLayout1',
  components: {
    imSocial,
    featuredProducts,
    generalProducts,
    newProducts,
    quiz,
    top,
    contact
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus">
@import "~variables";
.theme-layout-02
  .share-networks
    background-image url('/assets/img/theme-one/share-network.jpg')
    background-size cover
    padding 10% 0
    position relative
    &:before
      height 100%
      width 100%    
      background-color  rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0
    .networks  
      position relative
      z-index 3
      .imsocial
        display inline-block
        a
        & i
          margin 10px
          font-size 2rem
          color #ffffff 
          &:hover 
            color $secondary

  .banner-bottom
    background-image url('/assets/img/theme-one/banner-bottom.jpg')
    background-size cover
    padding-top 60%
    padding-bottom 40%
    position relative
    .content 
      position relative
      z-index 3
    &:before
      height 100%
      width 100%    
      background-color  rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0
      
</style>