<template>
  <q-page>
    <img class="full-width" src="/statics/img/contacto.jpg" alt="contacto">
    <div class="bg-fondo page-contacto q-px-sm q-py-xl">
      <div class="q-container q-pt-xl">
        <div class="row q-col-gutter-xl">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <q-card flat class="card-contacto rounded-md bg-white full-width">
              <div class="text-center">
                <img class="img-title" src="/statics/img/mail.png">
              </div>
              <q-card-section>
                
                <div class="q-px-xl q-pb-xl">
                  <div class="text-h4 text-primary q-mb-md text-center font-family-secondary">Datos de contacto</div>
                  <div class="text-subtitle1 text-center q-pb-lg  text-secondary">
                    Si tienes alguna duda, alguna consulta o
                    simplemente quieres saludarnos, nos dudes en
                    contactarnos, estatemos listos para responderte.
                  </div>
                  <hr>

                  <q-list class=" q-pt-lg list-info">
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="fas fa-phone" />
                      </q-item-section>
                      <q-item-section class="q-pl-md q-mb-xl">
                        <div class="text-subtitle1 font-family-secondary">Teléfonos</div>
                        <div class="text-subtitle1"><a href="tel:00">+00000000</a>  -  <a href="tel:00">+00000000</a></div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="far fa-envelope" />
                      </q-item-section>
                      <q-item-section class="q-pl-md">
                        <div class="text-subtitle1 font-family-secondary">E-mail</div>
                        <div class="text-subtitle1"><a href="mailto:info@dondeestaesavaina.com">info@dondeestaesavaina.com</a></div>
                      </q-item-section>
                    </q-item>
                  </q-list>

                </div>
                
              </q-card-section>
            </q-card>

            <div class="redes-contacto text-center">
              <h5 class="q-mb-md text-secondary font-family-secondary">Síguenos en nuestras redes sociales</h5>
              <im-social></im-social>
            </div>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <q-card flat class="rounded-md bg-white text-white full-width">
              <h3 class="title-label text-center bg-secondary text-white q-mt-lg q-ml-20">
                <div>Escríbenos</div>
              </h3>
              <q-card-section class="q-px-xl q-pb-xl form-general">
                <q-input v-model="form.name"  label="Nombre:" />
                <q-input v-model="form.phone"  label="Teléfono:" />
                <q-input v-model="form.email"  label="Email:" />
                <q-input v-model="form.subject"  label="Asunto:" />
                <q-input v-model="form.message"  label="Mensaje:" />
              </q-card-section>
              <q-card-actions  align="right" no-caps class="q-pr-xl q-pb-lg">
                <q-btn class="bg-primary btn-arrow-send-yellow" @click="sendEmail()">Enviar</q-btn>
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
import {required, email} from 'vuelidate/lib/validators';
import alert from '@imagina/qhelper/_plugins/alert';

export default {
  name: 'PageContacto',
  components: {
    imSocial
  },
  validations() {
    return {
      form: {
        name: {required},
        phone: {required},
        email: {required, email},
        message: {required},
      }
    }
  },
  data() {
    return {
      form: {
        name: null,
        phone: null,
        email: null,
        subject: null,
        message: null,
        form_id: 1
      },
      loading: false
    }
  },
  methods: {    
    async sendEmail() {
      this.$v.$touch();
      if (this.$v.$error) {
        this.$alert.error({message: 'Por favor revisa de nuevo los campos.', pos: 'bottom'});
      } else {
        
        this.loading = true;
        this.$crud.create('apiRoutes.iform.send', this.form).then(response => {

            if (response.status === "error") {
              this.loading = false;
              this.$alert.error({message: 'Ha ocurrido un error al enviar el correo.'});
            } else {
              this.loading = false;
              this.$alert.success({message: 'Mensaje enviado exitosamente. Pronto nos pondremos en contacto con usted.'});
              this.$router.push({name: 'app.home'})
            }
        });       
      }
    },
    clearForm(){
      this.form = {
        name: null,
        phone: null,
        email: null,
        message: null,
        form_id: 1
      }
      this.$v.form.$reset()
    },
    forceSet(field, value) {
      this.$nextTick(() => {
        this.form[field] = value
      })
    }
  }

}
</script>
<style lang="stylus">
.page-contacto
  .card-contacto 
    & .img-title
      object-fit contain
      width  auto
      margin: -70px  auto 0
    & .q-item__section--avatar
      border-radius 50%
      border 1px solid $primary
      padding 10px
      width 50px
      height 50px
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
  .text-subtitle1
    font-weight 600    
  .list-info    
    a
      color $secondary 
      &:hover 
        color $tertiary
</style>