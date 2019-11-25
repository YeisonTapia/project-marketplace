<template>
  <q-page class="page page-nosotros">

    <div class="bg-fondo q-px-sm q-py-xl">
      <div class="q-container q-py-lg">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-3 text-center q-py-md">
            <h4 class="title text-secondary font-family-secondary q-my-sm">Domicilios</h4>
            <img src="/statics/img/arrow-right-pink.png" alt="nosotros">
          </div>
          <div class="col-xs-12 col-sm-12 col-md-9 text-justify">
            <p class="text-weight-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic aut libero fuga similique blanditiis mollitia, amet delectus. Totam earum nulla nam nostrum optio tempora officia, distinctio aliquam id facere odio! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic aut libero fuga similique blanditiis mollitia, amet delectus. Totam earum nulla nam nostrum optio tempora officia, distinctio aliquam id facere odio! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic aut libero fuga similique blanditiis mollitia, amet delectus. Totam earum nulla nam nostrum optio tempora officia, distinctio aliquam id facere odio! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic aut libero fuga similique blanditiis mollitia, amet delectus. Totam earum nulla nam nostrum optio tempora officia, distinctio aliquam id facere odio!
            </p>
          </div>

        </div>
      </div>
    </div>

    <div class="q-container q-px-sm">
      <div class="row">
        <div class="col-12">

          <h3 class="title-label-primary text-center"><div> Valores de la Empresa</div></h3>

          <q-list class="border-0 q-py-xl valores">
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-avatar>
                  <img src="/statics/img/arrow-right-pink.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="q-title text-weight-bold">Obsesión por la satisfacción  del cliente:</div>
                <div class="text-subtitle1">Nuestra consigna es la satisfacción 100% del cliente.</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-avatar>
                  <img src="/statics/img/arrow-right-pink.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                  <div class="q-title text-weight-bold">Creatividad e innovación:</div>
                  <div class="text-subtitle1">Buscamos ser creativos e innovar en nuestro día a día.</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-avatar>
                  <img src="/statics/img/arrow-right-pink.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                  <div class="q-title text-weight-bold">Actitud positiva:</div>
                  <div class="text-subtitle1">Siempre tenemos la disposición de darlo todo por nuestros clientes.</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-avatar>
                  <img src="/statics/img/arrow-right-pink.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                  <div class="q-title text-weight-bold">Pro actividad:</div>
                  <div class="text-subtitle1">Acción y no reacción.</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-avatar>
                  <img src="/statics/img/arrow-right-pink.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                  <div class="q-title text-weight-bold">Servicio de calidad:</div>
                  <div class="text-subtitle1">Siempre buscamos brindar un servicio de excelencia y calidad.</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-avatar>
                  <img src="/statics/img/arrow-right-pink.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                  <div class="q-title text-weight-bold">Transparencia:</div>
                  <div class="text-subtitle1">La honestidad ante todo, siempre mostrando nuestra verdadera cara ante nuestros clientes.</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-avatar>
                  <img src="/statics/img/arrow-right-pink.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                  <div class="q-title text-weight-bold">Amistad:</div>
                  <div class="text-subtitle1">Trabajamos con el cliente, no para el cliente, buscamos que tenga participación activa.</div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
</q-page>
</template>
<script>
export default {
  name: 'PageNosotros',
  components: {},
  data() {
    return {
      lang: this.$q.i18n.lang,
    }
  }
}
</script>
<style lang="stylus">
.page-nosotros
  .q-ml-20
    margin-left -20px
  .valores
    .q-item
      margin-bottom 15px
</style>