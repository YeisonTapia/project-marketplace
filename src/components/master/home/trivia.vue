<template>
  <q-card flat :class="className" class="relative-position">
    <img class="img-title w-100" v-show="!isModal" src="/statics/img/trivia-title.png">
    <div class="content-stepper">

     <q-stepper v-if="success && answers.length>0 && !alertContent.active" ref="stepper" v-model="currentStep" class="no-shadow">
      <!-- Step: -->
      <q-step :name="question.id" :order="index" :title="question.title" v-for="(question, index) in trivia.questions" :key="index">

        <q-card-main>
          <h2 class="text-primary">{{question.title}}</h2>
          <div class="ratio-16-9" v-show="isModal">
              <img :src="trivia.mainImage.path">
          </div>  
          <div class="q-py-md">
             <q-option-group
              v-model="selectedOption"
              type="radio"
              :options="answers[index]"
              color="primary"
            />
          </div>
        </q-card-main>

        <q-card-actions class="q-pa-md">

          <div class="row justify-end items-center w-100 h-100" v-if="index < trivia.questions.length - 1">
            <div class="col-6 text-center cursor-pointer" v-show="isModal">
              <q-icon name="fas fa-share-alt"/>
                <div>Conexion</div>
            </div>
            <div class="col-6 text-right">
              <div class="text-primary cursor-pointer" @click="next()">
                <div class="font-family-secondary">Siguiente</div>
                <img src="statics/img/arrow-right-blue.png" style="width:25px;">
              </div>
            </div>
          </div>

          <div class="row justify-end items-center w-100 h-100" v-else>
            <div class="col-6 text-center" v-show="isModal">
              <q-icon name="fas fa-share-alt"/>
                <div>Conexion</div>
            </div>
            <div class="col-6 text-right">

                <q-btn v-show="!isModal" class="btn-arrow-send-pink text-primary font-family-secondary" @click="saveData()"  >Enviar</q-btn>

                <q-btn  v-show="isModal" color="primary" @click="saveData()" label="Enviar"
                  />

            </div>
          </div>
        </q-card-actions> 

      </q-step>

      
    </q-stepper>

    <q-inner-loading class="absolute-center" :visible="loading" />
    </div>

    <!-- msj final -->
    <q-alert v-if="alertContent.active" :color="alertContent.color" :icon="alertContent.icon" class="q-mx-sm q-mt-xl">
        {{alertContent.msj}}
    </q-alert>

  </q-card>
</template>
<script>
//Plugins
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'TriviaComponent',
  props: ['isModal', 'className', 'trivia','loading2'],
  validations() {
    return {
      selectedOption: {required}
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data () {
      return {
        loading: false,
        success: false,
        answers: [],
        answersOptions: [],
        selectedOption: '',
        finalDataSave:[],
        userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
        alertContent:{
          active: false,
          color:'secondary',
          icon:'check',
          msj:'Gracias por participar!!'
        },      
        currentStep: null
      }
  },
  methods: {

    // Init Method
    async init(){

      this.loading = true

      if(this.userId!=null){
        if(this.trivia!=null){
          // Get answers for each question
          for (let i=0;i<this.trivia.questions.length;i++) {
            let qId = this.trivia.questions[i].id
            await this.getAnswers(qId,i)
            this.answers[i] = this.answersOptions
            this.answersOptions = []

            // Set questionID to step
            if(i==0) this.currentStep = qId
          }
  
        }else{
          this.alertContent.msj = "No existen trivias disponibles"
          this.alertContent.icon = "info"
          this.alertContent.active = true
        }
      }else{
        this.alertContent.msj = "Debes iniciar sesion"
        this.alertContent.icon = "account_circle"
        this.alertContent.active = true
      }

      this.success = true
      this.loading = false

      if(this.isModal)
        this.$emit('loading2',false);
     
    },
    // Get Answers for question
    getAnswers(questionId,pos){
      return new Promise((resolve, reject) => {
      //Params
      let params = {
        refresh: true,
        params: {
        include: 'answers',
        filter: {allTranslations: true},
        }
      }
            
      this.$crud.show("apiRoutes.qtrivia.questions",questionId,params).then(response => {
               
        response.data.answers.forEach((answer, index) => {
          this.answersOptions.push({
            label:answer.title,
            value:answer.id
          })
        });
        resolve(true)//Resolve

      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})  
        reject(false)//Resolve
      })
             

      })
    },
    // Save Data Answers
    saveData(){
      this.$v.$touch()
      if (!this.$v.$error) {
              
        this.loading = true;
        this.setDataFinal()
      
        this.finalDataSave.forEach((data, index) => {
                
          this.$crud.create('apiRoutes.qtrivia.userQuestionAnswers', data).then(response => {
            //console.warn("TRIVIA - SAVE USER QUESTION ANSWER")
          }).catch(error => {
            console.error('[TRIVIA - CREATE USER QUESTION ANSWERS] ', error)
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
          })
               
        })// End Save Answers
       

        // Finished Trivia
        this.saveUserTrivia()
       
        this.$v.$reset()//Reset validations
        this.alertContent.active = true
        this.loading = false;
             
      }else{
        this.$alert.error({message: 'Trivia: Debe seleccionar una respuesta', pos: 'bottom'})
      }

    },
    // Next question
    next(){
      this.$v.$touch()
      if (!this.$v.$error) {
        this.setDataFinal()
        this.$refs.stepper.next() 
      }else{
        this.$alert.error({message: 'Trivia: Debe seleccionar una respuesta', pos: 'bottom'})
      }
    },
    // set data to Save
    setDataFinal(){
      this.finalDataSave.push({
        question_id:this.currentStep,
        answer_id:this.selectedOption,
        user_id: this.userId
      })
      this.selectedOption = ''
    },
    //Save Data User Trivia Finished
    saveUserTrivia(){

      let data = {
        'trivia_id': this.trivia.id,
        'user_id' : this.userId
      }
      this.$crud.create('apiRoutes.qtrivia.userTrivias', data).then(response => {
        this.loading = false
      }).catch(error => {
        console.error('[TRIVIA - CREATE USER TRIVIAS] ', error)
        this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
      })

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
    background-image url('/statics/img/arrow-send-yellow.png')
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
    
.content-stepper
  .q-inner-loading
    background:none
</style>
