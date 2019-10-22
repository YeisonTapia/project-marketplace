<template>
    <div class="q-mb-xl">
        <h5 class="text-weight-bold text-secondary q-my-none">
            DESTACADOS
        </h5>
        <div class="row gutter-md q-py-lg">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="product in products">
            <product :product="product" className="cardProductTwo"></product>
          </div>
        </div>
    </div>
</template>
<script>
import product from 'src/components/theme-two/product'
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
            image: '/assets/img/product.jpg',
            tienda: 'artesanias',
            price: 10.00,
            rating: 3
        },
        {
            name: 'Mochila 2',
            image: '/assets/img/contacto.jpg',
            tienda: 'artesanias',
            price: 10.00,
            rating: 3
        },
        {
            name: 'Mochila 3',
            image: '/assets/img/fondo.jpg',
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
