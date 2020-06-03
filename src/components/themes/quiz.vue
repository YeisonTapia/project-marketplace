<template>
  <q-card flat class="card-quiz bg-primary full-width full-height">
    <div>
      <img class="img-title full-width" src="statics/img/quiz-title.png">
    </div>

    <q-stepper v-if="success && answers.length>0 && !alertContent.active && !showVotes" ref="stepper" v-model="currentStep" class="no-shadow">


      <q-step :name="question.id" :order="index" :title="question.title" v-for="(question, index) in poll.questions" :key="index">

        <q-card-section class="image">

         <div class="text-h6 q-mb-sm text-light">{{question.title}}</div>

          <q-option-group  keep-color size="sm"
            v-model="selectedOption"
            :options="answers[index]"
            color="light"
            type="radio"
          />

        </q-card-section>

        <q-stepper-navigation  align="right" class="q-pa-md movil-nav" v-if="index < poll.questions.length - 1" >
          <div class="text-light text-center cursor-pointer" @click="next()">
            <div class="font-family-secondary">Siguiente</div>
            <img src="statics/img/arrow-right-blue.png" style="width:25px;">
          </div>
        </q-stepper-navigation>
        <q-stepper-navigation align="right" v-else class="send q-pa-md movil-nav" >
           <q-btn :loading="btnLoading" class="bg-primary text-light font-family-secondary" @click="saveData">Enviar
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
            </template>
           </q-btn>
        </q-stepper-navigation>

      </q-step>

      <q-inner-loading :visible="loading" />
    </q-stepper>

    <!-- msj final -->
    <q-banner v-if="alertContent.active && !showVotes" :class="alertContent.color" class="q-mx-sm q-mt-xl q-py-md">
      <template v-slot:avatar>
        <q-icon :name="alertContent.icon" color="white" />
      </template>

      <div class="text-center text-white">
        {{alertContent.msj}}
      </div>
    </q-banner>

    <!-- Votes Poll -->
    <div v-if="showVotes" class="q-px-xs q-py-md scroll" style="height: 350px;">
      <div class="chart-quiz" v-for="(chart, index) in chartsOptions" :key="index">
        <chart :options="chart" style=" height:300px;"/>
      </div>
    </div>
    <!--
    <div v-if="showVotes" class="votesPoll text-white q-px-md q-py-md">

        <div class="text-h6 font-family-secondary q-my-sm">Resultados</div>
        <div class="contentPoll" v-for="(question, index) in votesPoll" :key="index">

          <div class="question q-mb-md">
            <div class="text-center text-subtitle1">{{question.title}} </div>
            <table class="q-mx-auto">
              <thead>
                <tr>
                  <th style="width:50%;"></th>
                  <th class="text-center" style="width:20%;">Votos</th>
                </tr>
              </thead>
              <tbody>
                <tr class="answers" v-for="(answer, index2) in question.answers" :key="index2">
                  <td>{{answer.title}}</td> <td class="text-center">  {{answer.votes}} </td>
                </tr>
                <tr>
                 <td>
                   TOTAL
                 </td>
                 <td class="text-center">
                   {{question.totalVotes}}
                 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

    </div>
    -->

  </q-card>


</template>
<script>
  //Plugins
  import {required} from 'vuelidate/lib/validators'

  import {Chart} from 'highcharts-vue'

    export default {
        name: 'QuizComponent',
        components: {
          Chart
        },
        validations() {
          return {
            selectedOption: {required}
            //selectedOptions: {required}
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
                //selectedOptions: [],
                selectedOption: '',
                finalDataSave:[],
                userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
                alertContent:{
                  active: false,
                  color:'bg-secondary',
                  icon:'check',
                  msj:'Gracias por participar!!'
                },
                currentStep: null,
                votesPoll: null,
                showVotes: false,
                btnLoading: false,
                chartsOptions: [],
                chartOptions: {},
                chartOptionsBase: {
                  chart: {
                      type: 'bar',
                      backgroundColor: null,
                  },
                  title: {
                      text: '',
                      style: {
                          fontFamily: 'Trebuchet MS',
                          color: '#ffffff',
                          fontSize: '15px'
                      }
                  },
                  xAxis: {
                    categories: [], //Answers
                    title: {
                      text: null,
                      style: {
                        color: '#fff'
                      }
                    },
                    labels: {
                      style: {
                          fontSize: '12px',
                          color: '#ffffff',
                      }
                    },
                    gridLineWidth: 0,
                  },
                  yAxis: {
                    gridLineWidth: 0,
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        overflow: 'justify'
                    }
                  },
                  /*
                  tooltip: {
                      valueSuffix: '%'
                  },
                  */
                  plotOptions: {
                      bar: {
                          dataLabels: {
                              enabled: true
                          },
                          borderWidth: 0
                      }
                  },
                  credits: {
                    enabled: false
                  },
                  colors: ['#fff'],
                  series: [
                    {
                      name: "Resultados",
                      //pointWidth: 25,
                      //pointPadding: 0.01,
                      //pointPlacement:'between',
                      data: []
                    }
                  ],

                }
            }
        },
        methods: {
          // Init Method
          async init() {
            this.loading = true

            // Get polls where user has voted
            if(this.userId!=null)
                await this.getUserPolls().catch(error => {})

            await this.getPolls().catch(error => {})

            if(this.polls.length>0){

              this.poll = this.polls[0]

              // If it has questions
              if(this.poll.questions.length>0){

                // Get answers for each question
                for (let i=0;i<this.poll.questions.length;i++) {
                  let qId = this.poll.questions[i].id
                  await this.getAnswers(qId,i).catch(error => {})
                  this.answers[i] = this.answersOptions
                  this.answersOptions = []

                  // Set questionID to step
                  if(i==0) this.currentStep = qId
                }

              }else{

                await this.getResultsPoll()

                if(this.votesPoll.length==0){
                  this.alertContent.msj = "No existen Encuestas disponibles"
                  this.alertContent.active = true
                }

              }

            }else{

              await this.getResultsPoll()

              if(this.votesPoll.length==0){
                this.alertContent.msj = "No existen Encuestas disponibles"
                this.alertContent.active = true
              }

              /*
              if(this.userId!=null)
                this.alertContent.msj = "Ya respondiste todas las encuestas disponibles"
              else
                this.alertContent.msj = "No existen Encuestas disponibles"

              this.alertContent.active = true
              */
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
                fixFilter = {allTranslations: true,status: 1,random:true,logged:0}

              //Params
              let params = {
                //refresh: true,
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
                //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                console.error('[GET POLLS] ', error);
                reject(false)//Resolve
              })

            })
          },
          // Get Answers for question
          getAnswers(questionId,pos){
            return new Promise((resolve, reject) => {
              //Params
              let params = {
                //refresh: true,
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
               // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                console.error('[GET QUESTIONS] ', error);
                reject(false)//Resolve
              })


            })
          },
          // Save Data Answers
          saveData(){
            this.$v.$touch()
            if (!this.$v.$error) {


              this.loading = true
              this.btnLoading = true


              this.setDataFinal()

              this.finalDataSave.forEach((data, index) => {

                this.$crud.create('apiRoutes.qquiz.userQuestionAnswers', data).then(response => {
                  //console.warn("SAVE USER QUESTION ANSWER")


                }).catch(error => {
                  console.error('[CREATE USER QUESTION ANSWERS] ', error)
                  //this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
                  this.loading = false
                })

              })// End Save Answers

              // Finished Poll
              if(this.userId!=null)
                this.saveUserPoll()

              //console.warn("Termino Encuesta")
              //console.warn("Poll ID "+this.poll.id)

              this.getResultsPoll(this.poll.id)

              this.$v.$reset()//Reset validations
              //this.alertContent.active = true // OJOOOOOOO

              //this.showVotes = true

              this.loading = false
              this.btnLoading = false

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
              this.$q.dialog({
                title: 'Encuesta realizada usted a ganado 5 puntos!',
                color: 'positive',
                ok: 'Ir a Mis Puntos',
                cancel: 'Continuar'
              }).onOk(() => {
                this.$router.push({name: 'qredeems.account.points'})
              }).onCancel(() => {
                this.init()
                this.loading = false
              })

            }).catch(error => {
              console.error('[CREATE USER POLLS] ', error)
             // this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            })

          },
          //Get polls Ids from User
          getUserPolls(){
            return new Promise((resolve, reject) => {

              //Params
              let params = {
                //refresh: true,
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
               // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                console.error('[GET USER POLLS] ', error);
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

            this.finalDataSave.push({
              question_id:this.currentStep,
              answer_id:this.selectedOption,
              user_id: this.userId
            })
            this.selectedOption = ''
            /*
            this.selectedOptions.forEach((answerId, index) => {
              this.finalDataSave.push({
                question_id:this.currentStep,
                answer_id:answerId,
                user_id: this.userId
              })
            })
            this.selectedOptions = []
            */

          },
          // get Results Poll
          getResultsPoll(pId = null){
            return new Promise((resolve, reject) => {

              //Params
              let params = {
               // refresh: true,
                params: {
                  filter: {votes:true,pollId: pId},
                  include: 'answers',
                  take: 1,
                  order: {
                    field: 'created_at',
                    way: 'desc'
                  }
                }
              }

              this.$crud.index("apiRoutes.qquiz.questions",params).then(response => {

                this.votesPoll = response.data

                this.fixDataChart(this.votesPoll)

                resolve(true)//Resolve

              }).catch(error => {
                console.error('[GET QUESTIONS] ', error);
               // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                console.error(error)
                reject(false)//Resolve
              })

            })
          },
          // Fix Data To Chart
          fixDataChart(resultVotes){

            // Results by each questions
            resultVotes.forEach((question, index) => {

              this.chartOptions = this.$clone(this.chartOptionsBase)

              // Copy Params to Chart
              // Get Questions Infor
              this.chartOptions.title.text = question.title
              this.chartOptions.yAxis.title.text = "Total de Votos: "+question.totalVotes

              // Get Answers Infor
              question.answers.forEach((answer, index) => {
                this.chartOptions.xAxis.categories.push(answer.title)
                this.chartOptions.series[0].data.push(answer.votes)
                //this.chartOptions.series[0].data.push(this.getPercentage(question.totalVotes,answer.votes))
              });

              // Copy All Chart
              this.chartsOptions.push(this.chartOptions)

            });

            this.showVotes = true
          },
          // Convert Percentage
          getPercentage(total, obt)
          {
            return Math.round((obt*100)/total);
          }

        }
    }
</script>
<style lang="stylus">
.chart-quiz
  .highcharts-yaxis-labels
    display none
  .highcharts-axis-title
    color #fff !important
    fill #fff !important
  .highcharts-legend
    display none

.card-quiz
  border-radius 10px
  .q-radio__outer-circle
    border-radius 4px
  & .image
    background-image url('/statics/img/quiz-fondo.png')
    background-repeat no-repeat
    background-position right bottom
    font-family 'Trebuchet MS'
    & .text-h6
      font-size 18px
      position relative
      &:before
        position absolute
        content "•"
        left -15px
        font-weight bold
    & .q-option-group
      font-size 17px
      color var(--q-color-light)
  & .send
    background-image url('/statics/img/arrow-send-white.png')
    background-repeat no-repeat
    background-position 60% 68%
    background-size 25%
  & .img-title
    margin-top -22px
  & .q-card-main
    padding 10px 25px 15px 25px

  .q-stepper
    background-color $primary
    .q-stepper__header
      display none
    .q-stepper__step-inner
      padding 15px
</style>
