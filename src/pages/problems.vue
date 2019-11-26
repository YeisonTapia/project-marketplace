<template>
  <q-page>
    <img class="full-width" src="/statics/img/contacto.jpg" alt="¿Problemas con una tienda?">
    <div class="bg-fondo page-problems q-px-sm q-py-xl">
      <div class="q-container q-py-xl">
        <div class="row justify-center ">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7">
            <q-card flat class="rounded-md bg-white full-width">
              <h3 class="title-label text-center bg-secondary text-white q-mt-lg q-ml-20">
                <div>¿Tuviste problema con una Tienda?</div>
              </h3>
              <div class="text-subtitle1 text-center q-pa-lg">
                  Si tienes alguna duda, alguna consulta no dudes en
                  contactarnos, estatemos listos para responderte.
                </div>
              <q-card-section class="q-px-xl q-pb-xl form-general">
                <q-input v-model="form.name"  label="Nombre:" />
                <q-input v-model="form.email"  label="Correo Electrónico:" />
                <q-input v-model="form.phone"  label="Teléfono:" />
                <q-select v-model="form.type" label="Tipo de Solicitud:" :options="typeOptions" />
                <q-input type="textarea" v-model="form.message"  label="Escribe aquí tu caso e intermediaremos para tratar de solucionarlo" />
              </q-card-section>
              <q-card-actions  align="right" no-caps class="q-pr-xl q-pb-lg">
                <q-btn class="bg-primary text-white btn-arrow-send-yellow" @click="sendEmail()">Enviar</q-btn>
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
        type: null,
        message: null,
        form_id: 1
      },
      loading: false,
      typeOptions: [ 'Pregunta','Queja','Reclamo', 'Solicitud' ]
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
        type: null,
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
</style>