import {Carousel, Slide} from 'vue-carousel';
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import {Chart} from 'highcharts-vue'
import Lingallery from 'lingallery';
import SocialSharing from 'vue-social-sharing'

export default async ({app, router, store, Vue}) => {

   //Components
   let components = [
      {name: 'Carousel', component: Carousel},
      {name: 'Slide', component: Slide},
      {name: 'chart', component: Chart},
      {name: 'lingallery', component: Lingallery},
      {name: 'SocialSharing', component: SocialSharing}
   ]

   //Register components
   components.forEach(item => {
      Vue.use(item.component)
      Vue.component(item.name, item.component)
   })
   document.addEventListener('deviceready', () => {
      document.addEventListener('backbutton', () => {
         if (this.__history.length) {
            this.__history.pop().handler()
         } else if (window.location.hash === '#/') {
            navigator.app.exitApp()
         } else {
            window.history.back()
         }
      }, false)
   })
}

