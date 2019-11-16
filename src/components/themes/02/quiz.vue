<template>
  <q-card class="card-quiz-2  q-mb-xl">

    <div class="q-card-title font-family-secondary text-center text-primary q-py-sm">
      <h6 class="q-mt-md q-mb-none">Participa en </h6>
      <h3 class="q-my-none">Encuenta</h3>
    </div>


    <q-stepper v-if="success && answers.length>0 && !alertContent.active" ref="stepper" v-model="currentStep" class="no-shadow">
      

      <q-step :name="question.id" :order="index" :title="question.title" v-for="(question, index) in poll.questions" :key="index">

        <q-card-section>

          <div class="text-h6 q-mb-sm text-center">{{question.title}}</div>
            
          <q-option-group keep-color
            v-model="selectedOptions"
            :options="answers[index]"
            type="checkbox" color="primary"
          />

        </q-card-section>

        <q-stepper-navigation  align="right" class="q-pa-md" v-if="index < poll.questions.length - 1" >
          <div class="text-center cursor-pointer" @click="next()">
            <div class="font-family-secondary">Siguiente</div>
            <img src="statics/img/arrow-right-blue.png" style="width:25px;">
          </div>
        </q-stepper-navigation>
        <q-stepper-navigation align="right" v-else class="send q-pa-md" >
           <q-btn class="bg-secondary text-white font-family-secondary" @click="saveData">Enviar</q-btn>
        </q-stepper-navigation>
        
      </q-step>

      <q-inner-loading :visible="loading" />
    </q-stepper>
    

    <!-- msj final -->
    <q-alert v-if="alertContent.active" :color="alertContent.color" :icon="alertContent.icon" class="q-mx-sm q-mt-xl">
      <q-card-section class="text-center">
        {{alertContent.msj}}
      </q-card-section>
    </q-alert>

  </q-card>


</template>
<script>
  //Plugins
  import {required} from 'vuelidate/lib/validators'

    export default {
        name: 'QuizComponent',
        validations() {
          return {
            selectedOptions: {required}
          }
        },
        beforeMount() {
          this.$nextTick(function () {
             this.init()
          })
        },
        data () {
            return {
                loading: false,
                success: false,
                pollUserIds:[],
                polls:[],
                poll:null,
                answers: [],
                answersOptions: [],
                selectedOptions: [],
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
          async init() {
            this.loading = true

            // Get polls where user has voted
            if(this.userId!=null)
                await this.getUserPolls()

            await this.getPolls()
           
            if(this.polls.length>0){

              this.poll = this.polls[0]
              // Get answers for each question
              for (let i=0;i<this.poll.questions.length;i++) {
                let qId = this.poll.questions[i].id
                await this.getAnswers(qId,i)
                this.answers[i] = this.answersOptions
                this.answersOptions = []

                // Set questionID to step
                if(i==0) this.currentStep = qId
              }

            }else{
              if(this.userId!=null)
                this.alertContent.msj = "Ya respondiste todas las encuestas disponibles"
              else
                this.alertContent.msj = "No existen Encuestas disponibles"

              this.alertContent.active = true
            }

            this.success = true
            this.loading = false

          },

          // Get Polls with all questions
          // Not Loggin - Limit 1 Poll - random
          // Loggin - Limit 1 Poll - Exclude Polls
          getPolls(){
            return new Promise((resolve, reject) => {

              //filter: 
              let fixFilter = {}

              if(this.userId!=null)
                fixFilter =  {allTranslations: true,status: 1,exclude:this.pollUserIds}
              else
                fixFilter = {allTranslations: true,status: 1,random:true}

              //Params
              let params = {
                refresh: true,
                params: {
                  include: 'questions',
                  filter: fixFilter,
                  take: 1
                }
              }

              this.$crud.index("apiRoutes.qquiz.polls",params).then(response => {
               
                this.polls = response.data
                resolve(true)//Resolve
              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                
                reject(false)//Resolve
              })

            })
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
            
              this.$crud.show("apiRoutes.qquiz.questions",questionId,params).then(response => {
               
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
                
                this.$crud.create('apiRoutes.qquiz.userQuestionAnswers', data).then(response => {
                  //console.warn("SAVE USER QUESTION ANSWER")
                }).catch(error => {
                  console.error('[CREATE USER QUESTION ANSWERS] ', error)
                  this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
                  this.loading = false
                })
               
              })// End Save Answers

              // Finished Poll
              if(this.userId!=null)
                this.saveUserPoll()
              
              this.$v.$reset()//Reset validations
              this.alertContent.active = true
              this.loading = false;
             
            }else{
              this.$alert.error({message: 'Encuesta: Debe seleccionar una respuesta', pos: 'bottom'})
            }

          },
          //Save Data User Poll Finished
          saveUserPoll(){

            let data = {
              'poll_id': this.poll.id,
              'user_id' : this.userId
            }
            this.$crud.create('apiRoutes.qquiz.userPolls', data).then(response => {
              this.loading = false
            }).catch(error => {
              console.error('[CREATE USER POLLS] ', error)
              this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            })

          },
          //Get polls Ids from User
          getUserPolls(){
            return new Promise((resolve, reject) => {

              //Params
              let params = {
                refresh: true,
                params: {
                  filter: {userId:this.userId},
                  fields: 'poll_id'
                }
              }

              this.$crud.index("apiRoutes.qquiz.userPolls",params).then(response => {
                response.data.forEach((userPolls, index) => {
                    this.pollUserIds.push(userPolls.poll_id)
                });
                resolve(true)//Resolve
              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                
                reject(false)//Resolve
              })

            })
          },
          // Next question
          next(){
            this.$v.$touch()
            if (!this.$v.$error) {

              this.setDataFinal()
              this.$refs.stepper.next()
             
            }else{
              this.$alert.error({message: 'Encuesta: Debe seleccionar una respuesta', pos: 'bottom'})
            }
          },
          // set data to Save
          setDataFinal(){

            this.selectedOptions.forEach((answerId, index) => {
              this.finalDataSave.push({
                question_id:this.currentStep,
                answer_id:answerId,
                user_id: this.userId
              })
            })
            this.selectedOptions = []

          }

        }
    }
</script>
<style lang="stylus">
.card-quiz-2
  background-color var(--q-color-light)
  border-radius 30px 0 30px 0
  & .q-card-title
    font-weight bold
    & .q-option-group  
      font-size 17px
  & .send
    background-image url('/statics/img/arrow-send-pink.png')
    background-repeat no-repeat
    background-position 82% 68%
    background-size 25%
    
  .q-stepper
    background-color var(--q-color-light)
    .q-stepper__header
      display none
    .q-stepper__step-inner  
      padding 15px
</style>