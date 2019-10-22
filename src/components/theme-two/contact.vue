<template>
  <div class="q-container">
    <div class="row items-center q-pt-xl">
      <div class="col-md-4 q-pb-xl text-center"> 

            <div class="logo">
              <router-link :to="{ name: 'app.home'}">
                <img :src="logo">
              </router-link>
            </div>  

      </div>
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

    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactComponent',
  data() {
    return {
      logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path
    }
  }
}
</script>
<style lang="stylus"> 
</style>
