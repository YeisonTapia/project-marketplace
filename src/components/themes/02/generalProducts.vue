<template>
    <div class="general-products">
        <div class="q-container">
            <h4 class="line-text text-center q-mb-lg"> 
                <hr class="line-secondary q-my-none full-width">
                <span class="bg-white q-px-lg">LO MÁS RECOMENDADO</span>
            </h4>
        </div>
        <div class="bg-primary q-py-lg q-px-md">
            <div class="q-container">
                <div class="row q-py-lg">
                    <div class="col-xs-12" >

                        <carousel autoplay
                            :autoplayTimeout="4000"
                            :loop="true"
                            :centerMode="true"
                            :perPageCustom="[[480, 1], [768, 2], [992, 4]]"
                            navigationNextLabel="<i class='fas fa-angle-right'></i>"
                            navigationPrevLabel="<i class='fas fa-angle-left'></i>">

                            <slide v-for="(product,index) in products" :key="index">
                                <product :product="product" className="cardProductTwo"></product>
                            </slide>
                        </carousel>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import product from 'src/components/themes/02/product'
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
            name: 'Mochila 4 ',
            image: '/statics/img/contacto.jpg',
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
        }
        ]
    }
  }
}
</script>
<style lang="stylus">
.theme-layout-02
    .line-text
      position relative    
      color $secondary
      .line-secondary
        position absolute
        top 50%
        z-index 1
        @media screen and (max-width: $breakpoint-xs)
          display none
      span  
        position relative
        z-index 2   
    .general-products
        .VueCarousel-pagination
            .VueCarousel-dot
                background-color #ffffff !important
                padding 5px !important
                width 15px !important
                height 15px !important
                &:focus
                    outline 0 !important
            .VueCarousel-dot.VueCarousel-dot--active    
                background-color #ffffff !important
    
</style>
