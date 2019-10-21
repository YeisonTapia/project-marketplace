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

        <div v-if="success" class="col-12 q-pb-xl">
          <div class="row gutter-xs"> 
          
            <div class="col-sm-12 col-md-6 col-lg-4 q-pb-lg" v-for="trivia in trivias" :key="trivia.id">
                <q-card square  class="card-trivia-item no-shadow q-ma-sm" >
                  <div @click="openModal(trivia)">
                  <q-card-media>
                    <div class="ratio-4-3">
                      <img :src="trivia.mainImage.path">
                    </div>
                  </q-card-media>
                  <q-card-main class="bg-white">
                    <div>{{trivia.description}}</div>
                  </q-card-main>
                  </div>
                </q-card>
            </div>

             <triviaModal v-if="trivia" :trivia="trivia" @trivia="trivia = $event"></triviaModal>
           
          </div>
        </div>
      </div>
      <q-inner-loading :visible="loading" />
    </div>


  </q-page>
</template>
<script>
import triviaModal from 'src/components/master/triviaModal'
export default {
  name: 'PageTrivia',
  components: {
    triviaModal
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
      trivias:[],
      trivia:null,
      userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null
    }
  },
  methods: {
    // Init Method
    async init() {
      
      this.loading = true

      await this.getTrivias()

      //set Opened all trivias
      await this.setOpenedAttribute()

      this.loading = false
      this.success = true

    },
    // Get Trivias with all questions
    // Loggin - not Limit - not Exclude
    getTrivias(){
      return new Promise((resolve, reject) => {

        //filter: 
        let fixFilter = {}

        fixFilter =  {allTranslations: true,status: 1,order:true}

        //Params
        let params = {
          refresh: true,
          params: {
            include: 'questions',
            filter: fixFilter,
            take: 12
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
    // set parameter Opened()
    setOpenedAttribute(){
      this.trivias.forEach((trivia, index) => {
          trivia.opened = false
      });
    },
    // Open Modal
    openModal(trivia){
      this.loading = true
      trivia.opened = true
      this.trivia = trivia
      this.loading = false
    }
    
  }
}
</script>
<style lang="stylus">
@import "~variables"
.page-trivia
  padding-top 20px
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