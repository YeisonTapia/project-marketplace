<template>
  <q-card flat class="card-quiz bg-primary text-white w-100 h-100">
    <img class="img-title w-100" src="/assets/img/quiz-title.png">

    <q-card-main class="image">
      <h2 class="q-mb-0">¿Cómo te definirías en relación a
        las tendencias de moda?</h2>

      <q-option-group  dark
                       v-model="encuesta"
                       :options="options"
                       color="white"
                       type="checkbox"
      />

    </q-card-main>
    <q-card-actions  align="end" class="send q-pa-md">
      <q-btn class="bg-primary">Enviar</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
    export default {
        name: 'QuizComponent',
        data () {
            return {
                encuesta: [''],
                options: [
                    {
                        label: 'Todo un fashionista',
                        value: 'op1'
                    },
                    {
                        label: 'Consumidor de multitienda',
                        value: 'op2'
                    },
                    {
                        label: 'Seguidor de tendencias',
                        value: 'op3'
                    },
                    {
                        label: 'Creador de tendencias',
                        value: 'op4'
                    },
                    {
                        label: 'Otro',
                        value: 'op53'
                    }
                ]
            }
        }
    }
</script>
<style lang="stylus">
.card-quiz
  border-radius 10px
  & .image
    background-image url('/assets/img/quiz-fondo.png')
    background-repeat no-repeat
    background-position right bottom
    font-family 'Trebuchet MS'
    & h2
      font-size 18px
      position relative
      &:before 
        position absolute
        content "•"
        left -15px
        font-weight bold
    & .q-option-group  
      font-size 17px
  & .send
    background-image url('/assets/img/arrow-send-white.png')
    background-repeat no-repeat
    background-position 72% 68%
    background-size 25%
  & .img-title
    margin-top -22px
  & .q-card-main
    padding 10px 25px 15px 25px
</style>
