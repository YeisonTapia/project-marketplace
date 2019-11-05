<template>
  <div class="q-pa-xl full-width shadow-2 q-mb-xl">
    <div class="row gutter-md">
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
      lang: this.$q.i18n.lang,
      loading: false,
      success: false,
      triviaUserIds:[],
      trivias:[],
      trivia:null,
      userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null
    }
  },
  methods:{
    // Init Method
    async init() {
      
      this.loading = true

      if(this.userId!=null){
        await this.getUserTrivias()
        await this.getTrivias()
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
