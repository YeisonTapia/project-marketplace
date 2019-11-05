<template>
    <div class="bg-light q-py-lg q-px-md">
      <h4 class="text-center text-secondary">
        • PRODUCTOS •
      </h4>
      <div class="q-container">
        <div class="row q-col-gutter-lg q-py-lg">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="product in products">
            <product :product="product" className="cardProductOne"></product>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import product from 'src/components/themes/01/product'
    export default {
      name: 'GeneralProductsComponent',
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
            },
            {
                name: 'Mochila 4 ddel d dedede e  dasd ggggggggg',
                image: '/statics/img/pregunta.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 2
            },
            {
                name: 'Mochila 5',
                image: '/statics/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 1
            },
            {
                name: 'Mochila 6',
                image: '/statics/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 3
            },
            {
                name: 'Mochila 7',
                image: '/statics/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 3
            },
            {
                name: 'Mochila 8',
                image: '/statics/img/product.jpg',
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
