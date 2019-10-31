<template>
  <q-page class="page-blog">

    <div class="bg-fondo q-px-sm q-pt-xl">
      <div class="q-container">
        <div class="row justify-end">
          <div class="col-auto text-center q-my-lg">
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Inicio"  to="/" />
              <q-breadcrumbs-el label="Blog"/>
            </q-breadcrumbs>
          </div>
        </div>
        <div>
          <div class="row gutter-md">
            <div class="col-xs-12 col-sm-12 col-md-8">

              <q-card class="bg-white">
                <q-card-title class="text-center">
                  <h4 class="title q-my-none text-secondary">Small plates, salads & sandwiches</h4>
                  <span class="text-tertiary">Por liseth torres</span> - 09 / 07 / 2019
                </q-card-title>

                <q-card-media>
                  <div class="ratio-16-9">
                  <img src="/statics/img/blog.jpg">
                </div>
                </q-card-media>

                <q-card-main>
                  <p class="q-subheading q-my-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum iusto quibusdam modi, quas dolorem, commodi corporis consectetur similique qui dolorum praesentium voluptate corrupti at? Est quas, doloribus. Reiciendis, dolores, quibusdam. </p>

                  <div class="q-mt-md">
                    <div class="bg-tertiary q-pa-md text-white text-weight-bold">
                      COMENTA AHORA
                      </div>
                      <div class="q-pa-sm bg-light">
                        <div class="comment-facebook bg-white q-pa-sm">

                        </div>
                      </div>
                  </div>

                </q-card-main>
                <q-card-actions align="end">
                    <q-btn flat color="primary" icon="fab fa-facebook" />
                    <q-btn flat color="primary" icon="fab fa-whatsapp" />
                    <q-btn flat color="primary" icon="fab fa-twitter" />
                </q-card-actions>
              </q-card>
    
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <q-card class="bg-white q-mb-xl">
                <q-card-title class="text-secondary font-family-secondary">
                  <h5 class="q-my-none q-mx-lg">Categorías</h5>
                </q-card-title>
                <q-card-separator />
                <q-card-main class="q-pa-sm">

                  <q-list class="list-category border-0">
                    <q-item link to="/#">
                      <q-item-side color="primary" icon="fas fa-caret-right" />
                      <q-item-main label="Moda" />
                    </q-item>
                    <q-item link to="/#">
                      <q-item-side color="primary" icon="fas fa-caret-right" />
                      <q-item-main label="Moda" />
                    </q-item>
                    <q-item link to="/#">
                      <q-item-side color="primary" icon="fas fa-caret-right" />
                      <q-item-main label="Moda" />
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>      

              <q-card class="bg-white line-red q-mb-xl">
                <q-card-title class="text-secondary font-family-secondary">
                  <h5 class="q-my-none q-mx-lg">Destacado</h5>
                </q-card-title>
                <q-card-separator />
                <q-card-media>
                  <div class="ratio-16-9">
                  <img src="/statics/img/blog.jpg">
                </div>
                </q-card-media>
                <q-card-title class="q-pb-none">
                  <p class="q-my-none q-body-2"><span class="text-tertiary">Por liseth torres</span> - 09 / 07 / 2019</p>
                </q-card-title>
                <q-card-main>
                  <h6 class="title q-my-none"><a href="">Small plates, salads & sandwiches </a></h6>
                  <p class="q-my-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum iusto quibusdam modi, quas dolorem, commodi corporis consectetur similique qui dolorum praesentium voluptate corrupti at? Est quas, doloribus. Reiciendis, dolores, quibusdam. </p>
                </q-card-main>
                <q-card-separator />
                <q-card-actions align="between">
                  <q-btn no-caps flat color="primary" icon="fas fa-caret-right" label="Seguir leyendo" />
                </q-card-actions>
              </q-card>    

              <q-card class="bg-white q-mb-xl">
                <q-card-title class="text-secondary font-family-secondary">
                  <h5 class="q-my-none q-mx-lg">Post populares</h5>
                </q-card-title>
                <q-card-separator />
                <q-card-main class="q-pa-none">


                  <q-list class="border-0">
                    <q-item>
                      <div class="row gutter-sm items-center">
                        <div class="col-6">
                          <q-card-media>
                            <div class="ratio-4-3">
                              <img src="/statics/img/blog.jpg">
                            </div>
                          </q-card-media>
                        </div>
                        <div class="col-6">
                          <h6 class="title q-my-none"><a href="/">Small plates, salads & sandwiches </a></h6>
                        </div>
                        <div class="col-12">
                           <p class="q-mt-none q-mb-md q-body-2"><span class="text-tertiary">Por liseth torres</span> - 09 / 07 / 2019</p>
                        </div>
                      </div>    
                    </q-item>
                    <q-item>
                      <div class="row gutter-sm items-center">
                        <div class="col-6">
                          <q-card-media>
                            <div class="ratio-4-3">
                              <img src="/statics/img/blog.jpg">
                            </div>
                          </q-card-media>
                        </div>
                        <div class="col-6">
                          <h6 class="title q-my-none"><a href="/">Small plates, salads & sandwiches </a></h6>
                        </div>
                        <div class="col-12">
                           <p class="q-mt-none q-mb-md q-body-2"><span class="text-tertiary">Por liseth torres</span> - 09 / 07 / 2019</p>
                        </div>
                      </div>    
                    </q-item>
                  </q-list>


 
                </q-card-main>



              </q-card>    

            </div>
          </div>
        </div>
      </div>

      <div class="q-container banner q-py-xl text-center">
        <img class="w-100" src="/statics/img/publicidad1-100.jpg" alt="banner">
      </div>  
    </div>




  </q-page>
</template>
<script>
import imSocial from 'src/components/master/imSocial';
export default {
  name: 'PageContacto',
  components: {
    imSocial
  },
  data() {
    return {
      lang: this.$q.i18n.lang,
      contact: {
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>
<style lang="stylus">
@import "~variables"
.page-blog
  .list-category    
    .q-item-icon
      font-size 15px
  .title
    a    
      color $secondary
  .line-red
    border-top 3px solid $negative    
  .q-card-actions
    i
      color $primary  
</style>