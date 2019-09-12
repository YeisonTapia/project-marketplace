<template>
  <q-page class="bg-fondo page-trivia">

    <div class="q-container">
      <div class="row">
        <div class="col-12 q-pt-xl q-pb-md q-px-sm">
          <h1 class="title-label bg-secondary q-my-xl text-white text-center text-uppercase">
            <div>Trivia</div>
          </h1>

          <p class="caption">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commod.</p>
        </div>
        <div class="col-12 q-pb-xl">
          <div class="row gutter-xs"> 
            <div class="col-sm-12 col-md-6 col-lg-4 q-pb-lg" v-for="trivia in trivias" :key="trivia.id">
                <q-card square  class="card-trivia-item no-shadow q-ma-sm" >
                  <div  @click="trivia.opened = !trivia.opened">
                  <q-card-media>
                    <div class="ratio-4-3">
                      <img :src="trivia.image">
                    </div>
                  </q-card-media>
                  <q-card-main class="bg-white">
                    {{trivia.summary}}           
                  </q-card-main>
                  </div>
                </q-card>
                <modal-trivia :trivia="trivia" :opened="trivia.opened" @closedModal="trivia.opened=$event"></modal-trivia>
            </div>
          </div>
        </div>
      </div>

    </div>


  </q-page>
</template>
<script>
import modalTrivia from 'src/components/master/modalTrivia'
export default {
  name: 'PageTrivia',
  components: {
    modalTrivia
  },
  data() {
    return {
      lang: this.$q.i18n.lang,
      trivias:  [
        {
          id: '1',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿titulo de la pregunta ?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿titulo de la segunta pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        },
        {
          id: '2',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿titulo de la pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿titulo de la segunta pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        },
        {
          id: '3',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿titulo de la pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿titulo de la segunta pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        },
        {
          id: '4',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿titulo de la pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿titulo de la segunta pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        },
        {
          id: '5',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿Pregunta 1?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿pregunta 2?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿pregunta3?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        },
        {
          id: '6',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿titulo de la pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿titulo de la segunta pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        },
        {
          id: '7',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿titulo de la pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿titulo de la segunta pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        },
        {
          id: '8',
          opened: false,
          image: '/assets/img/banner.png',
          summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
          questions: [
              {
                title: '¿titulo de la pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1926',
                      value: 'op3'
                  },
                ],
                answer: ''
              },
              {
                title: '¿titulo de la segunta pregunta?',
                options: [
                  {
                      label: '1920',
                      value: 'op1'
                  },
                  {
                      label: '1916',
                      value: 'op2'
                  },
                  {
                      label: '1826',
                      value: 'op3'
                  },
                ],
                answer: ''
              }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="stylus">
@import "~variables"
.page-trivia
  .card-trivia-item
    cursor pointer
    .q-card-main
      border-top 6px solid $tertiary
  .title-label
    width 30%    
    padding 15px 35px
    &:after
      content ''
      background-image url('/assets/img/icon-trivia.png')
      position absolute
      left 6px
      width 81px
      height 90px
      background-repeat no-repeat
      bottom 0
      background-size contain
      background-position bottom
    &:before
      content ''
      background-image url('/assets/img/arrow-down-pink.png')
      position absolute
      right -13px
      width 65px
      height 65px
      background-repeat no-repeat
      top 21px
    @media screen and (max-width: $breakpoint-md)
        width 60%

</style>