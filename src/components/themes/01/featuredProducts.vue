<template>
    <div class="q-mb-xl">
        <div class="bg-primary rounded-sm text-weight-bold q-inline-block text-white q-px-lg q-py-md">
            DESTACADOS
        </div>
        <div class="row q-col-gutter-lg q-py-lg">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="product in products">
            <product :product="product" className="cardProductOne"></product>
          </div>
        </div>
    </div>
</template>
<script>
import product from 'src/components/themes/01/product'
export default {
  name: 'FeaturedProductsComponent',
  components: {
    product
  },
  data () {
    return {
        products:  [
        {
            name: 'Mochila 1',
            image: '/statics/img/product.jpg',
            tienda: 'artesanias',
            price: 10.00,
            rating: 3
        },
        {
            name: 'Mochila 2',
            image: '/statics/img/contacto.jpg',
            tienda: 'artesanias',
            price: 10.00,
            rating: 3
        },
        {
            name: 'Mochila 3',
            image: '/statics/img/fondo.jpg',
            tienda: 'artesanias',
            price: 10.00,
            rating: 3
        }
        ]
    }
  }
}
</script>
<style lang="stylus">
</style>
