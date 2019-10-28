<template>
    <div class="bg-light q-py-lg q-px-md">
      <h4 class="text-center text-secondary">
        • PRODUCTOS •
      </h4>
      <div class="q-container">
        <div class="row gutter-md q-py-lg">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="product in products">
            <product :product="product" className="cardProductOne"></product>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import product from 'src/components/theme-one/product'
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
            },
            {
                name: 'Mochila 4 ddel d dedede e  dasd ggggggggg',
                image: '/assets/img/pregunta.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 2
            },
            {
                name: 'Mochila 5',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 1
            },
            {
                name: 'Mochila 6',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 3
            },
            {
                name: 'Mochila 7',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00,
                rating: 3
            },
            {
                name: 'Mochila 8',
                image: '/assets/img/product.jpg',
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
