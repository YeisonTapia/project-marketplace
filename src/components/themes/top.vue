<template>
  <div>
    <div class="q-pa-xl full-width shadow-2 q-mb-xl" v-if="$q.platform.is.desktop">
      <div class="row q-col-gutter-lg q-pt-xl" >
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <quiz></quiz>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <top-companies></top-companies> 
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <top-users></top-users>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <trivia v-if="success" :trivia="trivia" :isModal="false" className="home-trivia"></trivia>
        </div>
      </div>
    </div>
    <div  class="topWidgetHomeMobile q-mt-lg" v-else>
      <div class="row q-col-gutter-lg">
        <div class="col-auto">
          <div class="text-center">
            <q-avatar round color="white" @click="modal.quiz = !modal.quiz">
              <img src="/statics/img/icon-quiz.png">
            </q-avatar>
            <div class="q-mt-sm text-bold">Encuesta</div>
          </div>
        </div>
        <div class="col-auto">
          <div class="text-center">
            <q-avatar round color="white" @click="modal.companies = !modal.companies">
              <img src="/statics/img/top-companies.png">
            </q-avatar>
            <div class="q-mt-sm text-bold">Empresas</div>
          </div>
        </div>
        <div class="col-auto">
          <div class="text-center">
            <q-avatar round color="white" @click="modal.users = !modal.users">
              <img src="/statics/img/copa.png">
            </q-avatar>
            <div class="q-mt-sm text-bold">Usuarios</div>
          </div>
        </div>
        <div class="col-auto">
          <div class="text-center">
            <q-avatar round color="white" @click="modal.trivia = !modal.trivia">
              <img src="/statics/img/icon-trivia.png">
            </q-avatar>
            <div class="q-mt-sm text-bold">Trivia</div>
          </div>
        </div>
      </div>
      <!-- -->
      <q-dialog v-model="modal.quiz" maximized >
       <!--  -->
        <q-card class="topWidgetHomeMobile">
          <q-toolbar>
            <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left" />
            <q-toolbar-title class="text-primary font-family-secondary">Encuesta</q-toolbar-title>
          </q-toolbar>
          <quiz></quiz>
        </q-card> 
      </q-dialog>
      <q-dialog v-model="modal.companies" maximized >
        <q-card class="topWidgetHomeMobile">
          <q-toolbar>
            <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left" />
            <q-toolbar-title class="text-primary font-family-secondary">Mejores Empresas</q-toolbar-title>
          </q-toolbar>
          <top-companies class="q-pt-md"></top-companies> 
        </q-card>
      </q-dialog>
      <q-dialog v-model="modal.users" maximized >
        <q-card class="topWidgetHomeMobile">
          <q-toolbar>
            <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left" />
            <q-toolbar-title class="text-primary font-family-secondary">Usuarios Destacados</q-toolbar-title>
          </q-toolbar>
          <top-users class="q-pt-md"></top-users>
        </q-card>
      </q-dialog>
      <q-dialog v-model="modal.trivia" maximized >
        <q-card class="topWidgetHomeMobile">
          <q-toolbar>
            <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left" />
            <q-toolbar-title class="text-primary font-family-secondary">Trivia</q-toolbar-title>
          </q-toolbar>
          <trivia v-if="success" :trivia="trivia" :isModal="false" className="home-trivia"></trivia>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
import quiz from 'src/components/themes/quiz'
import topCompanies from 'src/components/themes/topCompanies'
import topUsers from 'src/components/themes/topUsers'
import trivia from 'src/components/themes/trivia'
export default {
  name: 'TopComponent',
  components: {
      quiz,
      topCompanies,
      topUsers,
      trivia
  },
  beforeMount() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      success: false,
      triviaUserIds:[],
      trivias:[],
      trivia:null,
      encuesta:false,
      modal: {
        quiz: false,
        trivia: false,
        companies: false,
        users: false,
      },
      userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null
    }
  },
  methods:{
    // Init Method
    async init() {
      
      this.loading = true

      if(this.userId!=null){
        await this.getUserTrivias().catch(error => {})
        await this.getTrivias().catch(error => {})
        if(this.trivias.length>0)
              this.trivia = this.trivias[0]
      }
      
      this.loading = false
      this.success = true

    },
    // Get Trivias with all questions
    // Loggin - Limit 1 Trivia - Exclude Trivias
    getTrivias(){
      return new Promise((resolve, reject) => {

        //filter: 
        let fixFilter = {}

        fixFilter =  {allTranslations: true,status: 1,exclude:this.triviaUserIds}

        //Params
        let params = {
          refresh: true,
          params: {
            include: 'questions',
              filter: fixFilter,
              take: 1
          }
        }

        this.$crud.index("apiRoutes.qtrivia.trivias",params).then(response => {
          this.trivias = response.data
          resolve(true)//Resolve
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          reject(false)//Resolve
        })

      })
    },
    //Get trivias Ids from User
    getUserTrivias(){
      return new Promise((resolve, reject) => {
        //Params
        let params = {
          refresh: true,
          params: {
            filter: {userId:this.userId},
            fields: 'trivia_id'
          }
        }

        this.$crud.index("apiRoutes.qtrivia.userTrivias",params).then(response => {
          response.data.forEach((userTrivias, index) => {
            this.triviaUserIds.push(userTrivias.trivia_id)
          });
          resolve(true)//Resolve
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          reject(false)//Resolve
        })

      })
    }

  } 
  
}
</script>
<style lang="stylus">
.topWidgetHomeMobile
  .card-top-users
    .img-title 
      margin-top 0 
  .card-top-users, .card-top
    .text-h6
      display none!important      
  .card-quiz, .home-trivia
    .img-title
      display none!important 
  .home-trivia    
    padding-top 20px
  .q-avatar    
    img
      font-size 60px
      border 3px solid $primary
      padding 3px
      border-radius 50%
      overflow hidden
</style>