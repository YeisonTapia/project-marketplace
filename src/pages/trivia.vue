<template>
  <q-page class="bg-fondo page-trivia">

    <div class="q-container">
      <div class="row">
        <div class="col-12 q-pt-xl q-pb-md q-px-sm">
          <h1 class="title-label-trivia bg-secondary text-white text-center">
            <div>Trivias</div>
          </h1>

          <p class="text-h6 q-my-xl text-justify">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commod.</p>
        </div>

        <div v-if="success" class="col-12 q-pb-xl">
          <div class="row q-col-gutter-xs"> 
          
            <div class="col-sm-12 col-md-6 col-lg-4 q-pb-lg" v-for="trivia in trivias" :key="trivia.id">
              <q-card square  class="card-trivia-item no-shadow q-ma-sm" >
                <div @click="openModal(trivia)">
                  <q-img :ratio="4/3" :src="trivia.mainImage.path" />
                  <q-card-section class="bg-white">
                    <div>{{trivia.description}}</div>
                  </q-card-section>
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
.page-trivia
  padding-top 20px
  .card-trivia-item
    cursor pointer
    .q-card__section
      border-top 6px solid $tertiary
  .title-label-trivia
    -webkit-transform skew(10deg)
    transform skew(10deg)
    border-radius 10px
    padding 10px 25px
    display inline-block
    width 30%
    font-size 25px
    line-height 25px
    position relative
    font-family $font-secondary
    &:after
      content ''
      background-image url('/statics/img/icon-trivia.png')
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
      background-image url('/statics/img/arrow-down-pink.png')
      position absolute
      right -13px
      width 65px
      height 65px
      background-repeat no-repeat
      top 21px
    & > div
      -webkit-transform  skew(-10deg)
      transform skew(-10deg)  
    @media screen and (max-width: $breakpoint-md)
        width 60%

   

</style>