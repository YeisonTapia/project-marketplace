import { Carousel, Slide } from 'vue-carousel';
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import HighchartsVue from 'highcharts-vue'
import Lingallery from 'lingallery';

export default async ({app, router, store, Vue}) => {

  //Components
  let components = [
    {name: 'Carousel', component: Carousel},
    {name: 'Slide', component: Slide},
    {name: 'highcharts', component: HighchartsVue},
    {name: 'lingallery', component: Lingallery},
  ]

  //Register components
  components.forEach(item => {
    Vue.use(item.component)
    Vue.component(item.name, item.component)
  })
}


