<template>
    <div class="featured-products q-mb-xl">
        <h4 class="line-text q-mb-lg"> 
            <hr class="line-secondary q-my-none full-width">
            <span class="bg-white q-pr-lg">DESTACADOS</span>
        </h4>
        <div class="row q-col-gutter-lg q-py-lg">
          <div class="col-xs-12" >

            <carousel autoplay
                :autoplayTimeout="4000"
                :loop="true"
                :centerMode="true"
                :perPageCustom="[[480, 1], [768, 2], [992, 3]]"
                navigationNextLabel="<i class='fas fa-angle-right'></i>"
                navigationPrevLabel="<i class='fas fa-angle-left'></i>">

                <slide v-for="product in products" :key="index">
                    <product :product="product" className="cardProductTwo"></product>
                </slide>
            </carousel>

          </div>
        </div>
    </div>
</template>
<script>
import product from 'src/components/themes/02/product'
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
.theme-layout-02
    .featured-products
        .line-text
          position relative    
          color $secondary
          .line-secondary
            position absolute
            top 50%
            z-index 0
            @media screen and (max-width: $breakpoint-xs)
              display none
          span  
            position relative
            z-index 2  
        .VueCarousel-pagination
            position absolute
            top -117px
            text-align right !important
            right -2px
            .VueCarousel-dot-container
                background-color #fff !important
                z-index 9
                padding-left 10px
                padding-right 10px
                .VueCarousel-dot
                    background-color #fff !important
                    border 1px solid $secondary !important
                    padding 0 !important
                    width 15px !important
                    height 15px !important
                    margin 5px
                    &:focus
                        outline 0 !important
                .VueCarousel-dot.VueCarousel-dot--active    
                    background-color $secondary !important
</style>
