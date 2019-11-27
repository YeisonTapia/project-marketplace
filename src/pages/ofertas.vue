<template>
  <q-page class="bg-fondo">
    <div>
      <div class="row gutter-xl">
        <div class="col-12">
          <h2 class="text-primary text-center font-family-secondary q-mb-sm q-mx-lg">
            Tiendas en Ofertas
          </h2>
          <p class="text-center text-h6 q-mx-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta sequi suscipit</p>
        </div>
      </div>
      <div class="row q-pa-lg">
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="store in stores">
          <store :store="store"></store>
        </div>
      </div>
    </div>

    <div class="q-container banner q-py-xl text-center">
      <img class="full-width" src="/statics/img/publicidad2-100.jpg" alt="banner">
    </div>

  </q-page>
</template>
<script>
import store from 'src/components/themes/store'
export default {
  name: 'PageCategoria',
  components: {
    store
  },
  data() {
    return {
      stores: null
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getStores()
    })
  },
  methods: {
    getStores() {
      this.$crud.index("apiRoutes.qmarketplace.store", {
        params:{
          filter:{

          }
        }
      }).then(response => {
        console.warn(response.data)
        this.stores=response.data;
      });
    }
  }
}
</script>
