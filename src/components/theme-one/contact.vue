<template>
  <div class="q-container">
    <div class="row items-center q-pt-xl">
      <div class="col-md-4 q-pb-xl">

        <q-list class="border-0">
          <q-item>
            <q-item-side icon="fas fa-map-marker-alt fa-3x" color="primary" />
            <q-item-main>
              <q-item-tile label>
                <div class="q-subheading text-weight-bold q-mb-sm">Dirección:</div>
                <div class="q-subheading">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>

      </div>
      <div class="col-md-4 q-pb-xl">

        <q-list class="border-0">
          <q-item>
            <q-item-side size="xl" icon="far fa-clock fa-2x" color="primary" />
            <q-item-main>
              <q-item-tile label>
                <div class="q-subheading text-weight-bold q-mb-sm">Horario de atención:</div>
                <div class="q-subheading">
                  Lunes a sábado: 11am - 9pm
                </div>
                <div class="q-subheading">
                  Domingos y festivos: 2pm - 8pm
                </div>
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>

      </div>
      <div class="col-md-4 q-pb-xl"> 

        <q-list class="border-0">
          <q-item>
            <q-item-side icon="far fa-comment-dots" color="primary" />
            <q-item-main>
              <q-item-tile label>
                <div class="q-subheading text-weight-bold q-mb-sm">¿Tienes alguna duda?</div>
                <div class="q-subheading">Chatea aquí con la Tienda</div>
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>

      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'ContactComponent'
}
</script>
<style lang="stylus"> 
</style>
