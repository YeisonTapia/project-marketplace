<template>
  <div class="q-mt-lg w-100">
    <div class="bg-fondo text-center ">
      <h3 class="title-label-pink text-center">
        <div>Productos Destacados</div>
      </h3>
      <div class="q-container q-pt-lg">
        <div class="row q-py-lg">
          <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="product in products">
            <product :product="product"></product>
          </div>
        </div>
      </div>
      <div class="q-container banner q-py-xl text-center">
        <img class="w-100" src="/assets/img/publicidad2-100.jpg" alt="banner">
      </div>
    </div>
  </div>
</template>
<script>
    import product from 'src/components/master/home/product'
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
                price: 10.00
            },
            {
                name: 'Mochila 2',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 3',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 4',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
                        {
                name: 'Mochila 5',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 6',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 7',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 8',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
                        {
                name: 'Mochila 9',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 10',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 11',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            },
            {
                name: 'Mochila 12',
                image: '/assets/img/product.jpg',
                tienda: 'artesanias',
                price: 10.00
            }
            ]
        }
      }
    }
</script>
<style lang="stylus">
</style>
