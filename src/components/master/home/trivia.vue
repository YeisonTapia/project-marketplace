<template>
  <q-card flat :class="className">
    <img class="img-title w-100" v-show="!isModal" src="/assets/img/trivia-title.png">

    <q-stepper ref="stepper" v-model="currentStep" class="no-shadow">
      <!-- Step: -->
      <q-step :name="index" :order="index" :title="question.title" v-for="(question, index) in trivia.questions" :key="index">

        <q-card-main>
          <h2 class="text-primary">{{question.title}}</h2>
          <div class="ratio-16-9" v-show="isModal">
              <img :src="trivia.image">
          </div>  
          <div class="q-py-md">
             <q-option-group
              v-model="question.answer"
              type="radio"
              :options="question.options"
              color="primary"
            />
          </div>
        </q-card-main>

        <q-card-actions class="q-pa-md">

          <div class="row justify-end items-center w-100 h-100" v-if="index != trivia.questions.length - 1">
            <div class="col-6 text-center cursor-pointer" v-show="isModal">
              <q-icon name="fas fa-share-alt"/>
                <div>Conexion</div>
            </div>
            <div class="col-6 text-right">
              <div class="text-primary cursor-pointer" @click="$refs.stepper.next()">
                <div class="font-family-secondary">Siguiente</div>
                <img src="assets/img/arrow-right-blue.png" style="width:25px;">
              </div>
            </div>
          </div>

          <div class="row justify-end items-center w-100 h-100" v-else>
            <div class="col-6 text-center" v-show="isModal">
              <q-icon name="fas fa-share-alt"/>
                <div>Conexion</div>
            </div>
            <div class="col-6 text-right">
                <q-btn 
                    color="primary"
                    @click="onCloseModalSend()"
                    label="Enviar" v-show="isModal"
                  />

                  <q-btn class="btn-arrow-send-pink text-primary font-family-secondary" @click="onCloseSend()" v-show="!isModal" >Enviar</q-btn>

            </div>
          </div>
        </q-card-actions> 

      </q-step>
    </q-stepper>
  </q-card>
</template>
<script>
export default {
  name: 'TriviaComponent',
  props: ['isModal', 'className', 'trivia'],
  data () {
      return {
        currentStep: 0,
      }
  },
  methods: {
    onCloseModalSend() {
      /* Enviar los datos de la trivia*/
      console.log('mensaje de envio por modal de trivia')
      this.currentStep=0;
      this.$emit('closedModal',false);
    },
    onCloseSend() {
      /* Enviar los datos de la trivia*/
      console.log('mensaje del envio');
    }
  }  
}
</script>
<style lang="stylus">
@import "~variables";
.modaltrivia
  & .q-card-main
    padding 0
    h2 
      font-size 18px
      text-align center
      margin-top 0
  & .q-option-group
    > div
      border 1px solid #FD2D5E
      border-radius 20px
      margin-bottom 10px
      padding 8px
      & .q-icon
        color #FD2D5E
        font-size 20px    
  .q-stepper-header
    display none
  .q-stepper-step-inner
    padding-top 0!important

.home-trivia
  border-radius 10px
  width 100%
  height 100%
  background-color var(--q-color-light)
  & .send
    background-image url('/assets/img/arrow-send-yellow.png')
    background-repeat no-repeat
    background-position 73% 74%
    background-size: 25%
  & .img-title
    margin-top -22px
  & .q-card-main
    padding 10px 25px 15px 25px
    & h2
      font-size 18px
      position relative
      margin-bottom 0
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
        font-size 20px
  .q-stepper-header
    display none
  .q-stepper-step-inner
    padding 0!important
</style>
