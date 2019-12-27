<template>
  <q-page>
    <img class="full-width" src="/statics/img/contacto.jpg" alt="¿Problemas con una tienda?">
    <div class="bg-fondo page-problems q-px-sm q-py-sm">
      <div class="q-container q-py-sm">
        <div class="row gutter-md">
          <div class="col-12">
            <h2 class="text-primary text-center font-family-secondary title-problem">
              ¿Tuviste problema con una Tienda?
            </h2>
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-md">
            <q-card flat class="rounded-md bg-white full-width">
              <h3 class="title-label text-center bg-secondary text-white q-mt-lg q-ml-20">
                <div>Escribenos</div>
              </h3>
              <div class="text-subtitle1 text-center q-pa-md">
                  Si tienes alguna duda, alguna consulta no dudes en
                  contactarnos, estatemos listos para responderte.
                </div>
              <q-card-section class="q-px-lg q-pb-lg form-general">
                <q-input v-model="form.name"  label="Nombre:" />
                <q-input v-model="form.email"  label="Correo Electrónico:" />
                <q-input v-model="form.phone"  label="Teléfono:" />
                <q-select v-model="form.storeTitle" label="Tienda donde tuviste el problema :" :options="storeOptions" use-input @filter="filterFn()">
                </q-select>
                <q-select v-model="form.type" label="Tipo de Solicitud:" :options="typeOptions" />
                <q-input type="textarea" v-model="form.message"  label="Escribe aquí tu caso e intermediaremos para tratar de solucionarlo" />
                <q-input type="textarea" v-model="form.solution"  label="Como esperas que te solucionen el problema" />
              </q-card-section>
              <q-card-actions  align="right" no-caps class="q-pr-xl q-pb-lg">
                <q-btn class="bg-primary text-white btn-arrow-send-yellow" @click="sendEmail()">Enviar</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-md">
            <q-card flat class="card-contacto rounded-md bg-white full-width">
              <div class="text-center">
                <img class="img-title" src="/statics/img/mail.png">
              </div>
              <q-card-section>

                <div class="q-px-xl q-pb-xl">
                  <div class="text-h4 text-primary q-mb-md text-center font-family-secondary">Datos de contacto</div>
                  <div class="text-subtitle1 text-center q-pb-lg  text-secondary">
                    Si tienes alguna duda, alguna consulta o
                    simplemente quieres saludarnos, no dudes en
                    contactarnos, estaremos listos para responderte.
                  </div>
                  <hr>

                  <q-list class=" q-pt-lg list-info">
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="fas fa-phone" />
                      </q-item-section>
                      <q-item-section class="q-pl-md q-mb-xl">
                        <div class="text-subtitle1 font-family-secondary">Teléfonos</div>
                        <div class="text-subtitle1"><a href="tel:3017753585">+57 301-775-3585</a>  -  <a href="tel:301558520">+57 301-558-5201</a></div>
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

        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import imSocial from 'src/components/master/imSocial';
import {required, email} from 'vuelidate/lib/validators';
import alert from '@imagina/qhelper/_plugins/alert';
import array from "@imagina/qhelper/_plugins/array";

export default {
  name: 'PageContacto',
  components: {
    imSocial
  },
  mounted() {
    this.$nextTick(() => {
      this.getStore()
    })
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
        solution:null,
        storeTitle:null,
        form_id: 1
      },
      loading: false,
      typeOptions: [
        {label:'Pregunta',id:0},
        {label:'Queja',id:1},
        {label:'Reclamo',id:2},
        {label:'Solicitud',id:3},
        ],
      storeOptions:null,
      options: this.$clone(this.storeOptions),
      text:''
    }
  },
  methods: {
    async sendEmail() {
      this.$v.$touch();
      if (this.$v.$error) {
        this.$alert.error({message: 'Por favor revisa de nuevo los campos.', pos: 'bottom'});
      } else {
        var data={};
        data.subject="Problema con tienda: "+this.form.storeTitle.id+" , "+this.form.message;
        data.message=this.form.solution;
        data.fullName=this.form.name;
        data.type=this.form.type.id;
        data.email=this.form.email;
        data.phone=this.form.phone;
        this.loading = true;
        this.$crud.create('apiRoutes.qticket.tickets', data).then(response => {

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
    },
    getStore(){
        this.$crud.index("apiRoutes.qmarketplace.store", {
          params:{
            filter:{}
          }
        }).then(response => {
          this.storeOptions=array.select(response.data, {label : 'name', id : 'name'})
        });
    },
    filterFn (val, update) {
      let data = this.$clone(this.options)
      return data.filter(item => {
        return item.name.toLowerCase().includes(this.text.toLowerCase())
      })

    }

  }

}
</script>
<style lang="stylus">
  .page-problems
    .card-contacto
    & .img-title
      object-fit contain
      width  auto
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
  @media screen and (max-width: $breakpoint-xs)
      .page-problems
        .title-problem
          font-size: 24px;
          line-height: 24px;
</style>
