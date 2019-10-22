<template>
  <q-page>

    <img class="w-100" src="/assets/img/contacto.jpg" alt="contacto">
    <div class="bg-fondo page-contacto q-px-sm q-py-xl">
      <div class="q-container q-pt-xl">
        <div class="row gutter-xl">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <q-card flat class="card-contacto rounded-md bg-white w-100">
              <div class="text-center">
                <img class="img-title" src="/assets/img/mail.png">
              </div>
              <q-card-main>
                
                <div class="q-px-xl q-pb-xl">
                  <div class="q-headline text-primary text-center font-family-secondary">Datos de contacto</div>
                  <div class="q-subheading text-center q-pb-lg  text-secondary">
                    Si tienes alguna duda, alguna consulta o
                    simplemente quieres saludarnos, nos dudes en
                    contactarnos, estatemos listos para responderte.
                  </div>
                  <hr>

                  <q-list class="border-0 q-pt-lg list-info">
                    <q-item>
                      <q-item-side icon="fas fa-phone" color="primary" />
                      <q-item-main>
                        <q-item-tile label>
                          <div class="q-subheading font-family-secondary">Teléfonos</div>
                          <div class="q-subheading"><a href="tel:00">+00000000</a>  -  <a href="tel:00">+00000000</a></div>
                        </q-item-tile>
                      </q-item-main>
                    </q-item>
                    <q-item>
                      <q-item-side icon="far fa-envelope" color="primary" />
                      <q-item-main>
                        <q-item-tile label>
                          <div class="q-subheading font-family-secondary">E-mail</div>
                          <div class="q-subheading"><a href="mailto:info@dondeestaesavaina.com">info@dondeestaesavaina.com</a></div>
                        </q-item-tile>
                      </q-item-main>
                    </q-item>
                  </q-list>

                </div>
                
              </q-card-main>
            </q-card>

            <div class="redes-contacto text-center">
              <h5 class="q-mb-md text-secondary font-family-secondary">Síguenos en nuestras redes sociales</h5>
              <im-social></im-social>
            </div>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <q-card flat class="rounded-md bg-white text-white w-100">
              <h3 class="title-label text-center bg-secondary text-white q-mt-lg q-ml-20">
                <div>Escríbenos</div>
              </h3>
              <q-card-main class="q-px-xl q-pb-xl form-general">
                <q-input v-model="contact.name" float-label="Nombre:" />
                <q-input v-model="contact.phone" float-label="Teléfono:" />
                <q-input v-model="contact.email" float-label="Email:" />
                <q-input v-model="contact.subject" float-label="Asunto:" />
                <q-input v-model="contact.message" float-label="Mensaje:" />
              </q-card-main>
              <q-card-actions  align="end" no-caps class="q-pr-xl">
                <q-btn class="bg-primary btn-arrow-send-yellow">Enviar</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
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
.page-contacto
  .card-contacto 
    & .img-title
      object-fit contain
      width  auto
      margin: -70px  auto 0
    & .q-item-icon
      border-radius 50%
      border 1px solid $primary
      padding 10px
      margin-right 15px
  .redes-contacto
    .imsocial
      display inline-block
      padding 15px
      border-bottom 2px solid $tertiary
      a
      & i
        margin 10px
        font-size 2rem
        color $tertiary
        &:hover 
          color $secondary
  .q-subheading
    font-weight 600    
  .list-info    
    a
      color $secondary 
      &:hover 
        color $tertiary
</style>