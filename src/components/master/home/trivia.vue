<template>
  <q-card flat class="card-trivia bg-light h-100 w-100">
      <img class="img-title w-100" src="/assets/img/trivia-title.png">
    <q-card-main class="image">
      <h2 class="text-primary q-mb-0">¿En que año se inició la Copa América de fútbol?</h2>
      <q-option-group
        v-model="group"
        :options="options"
        color="primary"
      />
    </q-card-main>
    <q-card-actions vertical align="end" class="send text-primary q-pa-md">
      <q-btn>Enviar</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
  export default {
      name: 'TriviaComponent',
      data () {
          return {
              group: [],
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
              ]
          }
      }
  }
</script>
<style lang="stylus">
.card-trivia
  border-radius 10px
  & .send
    background-image url('/assets/img/arrow-send-yellow.png')
    background-repeat no-repeat
    background-position 73% 74%
    background-size: 25%
  & .img-title
    margin-top -22px
  & .q-card-main
    padding 10px 25px 15px 25px
    font-family 'Trebuchet MS'
    & h2
      font-size 18px
      position relative
      &:before 
        position absolute
        color #FD2D5E
        content "•"
        left -15px
        font-weight bold
          
  & .q-option-group
    > div
      border 1px solid #FD2D5E
      border-radius 20px
      margin-bottom 10px
      padding 8px
      & .q-icon
        color #FD2D5E
        font-size: 20px;

</style>
