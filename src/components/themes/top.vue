<template>
   <div>
      <div class="q-pa-xl full-width  q-mb-xl" v-if="$q.platform.is.desktop">
         <div class="row q-col-gutter-lg q-pt-xl">
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
      <div class="topWidgetHomeMobile q-mt-lg q-mb-md" v-else>

         <carousel id="movil-widget-home-carousel" autoplay
                   :autoplayTimeout="4000"
                   :loop="true"
                   :centerMode="true"
                   :perPageCustom="[[480, 2], [768, 2]]">

            <slide>
               <div class="content-modal" @click="modal.quiz = !modal.quiz"></div>
               <quiz></quiz>
            </slide>
            <slide>
               <div class="content-modal" @click="modal.companies = !modal.companies"></div>
               <top-companies></top-companies>
            </slide>
            <slide>
               <div class="content-modal" @click="modal.users = !modal.users"></div>
               <top-users></top-users>
            </slide>
            <slide>
               <div class="content-modal" @click="modal.trivia = !modal.trivia"></div>
               <trivia v-if="success" :trivia="trivia" :isModal="false" className="home-trivia"></trivia>
            </slide>
         </carousel>
         <!-- -->
         <q-dialog v-model="modal.quiz" maximized>
            <!--  -->
            <q-card class="topWidgetHomeMobile">
               <q-toolbar>
                  <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
                  <q-toolbar-title class="text-primary font-family-secondary">Encuesta</q-toolbar-title>
               </q-toolbar>
               <quiz></quiz>
            </q-card>
         </q-dialog>
         <q-dialog v-model="modal.companies" maximized>
            <q-card class="topWidgetHomeMobile">
               <q-toolbar>
                  <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
                  <q-toolbar-title class="text-primary font-family-secondary">Mejores Empresas</q-toolbar-title>
               </q-toolbar>
               <top-companies class="q-pt-md"></top-companies>
            </q-card>
         </q-dialog>
         <q-dialog v-model="modal.users" maximized>
            <q-card class="topWidgetHomeMobile">
               <q-toolbar>
                  <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
                  <q-toolbar-title class="text-primary font-family-secondary">Usuarios Destacados</q-toolbar-title>
               </q-toolbar>
               <top-users class="q-pt-md"></top-users>
            </q-card>
         </q-dialog>
         <q-dialog v-model="modal.trivia" maximized>
            <q-card class="topWidgetHomeMobile">
               <q-toolbar>
                  <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
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
            triviaUserIds: [],
            trivias: [],
            trivia: null,
            slide: 0,
            encuesta: false,
            modal: {
               quiz: false,
               trivia: false,
               companies: false,
               users: false,
            },
            userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null
         }
      },
      methods: {
         // Init Method
         async init() {

            this.loading = true

            if (this.userId != null) {
               await this.getUserTrivias().catch(error => {
               })
               await this.getTrivias().catch(error => {
               })
               if (this.trivias.length > 0)
                  this.trivia = this.trivias[0]
            }

            this.loading = false
            this.success = true

         },
         // Get Trivias with all questions
         // Loggin - Limit 1 Trivia - Exclude Trivias
         getTrivias() {
            return new Promise((resolve, reject) => {

               //filter:
               let fixFilter = {}

               fixFilter = {allTranslations: true, status: 1, exclude: this.triviaUserIds}

               //Params
               let params = {
                //  refresh: true,
                  params: {
                     include: 'questions',
                     filter: fixFilter,
                     take: 1
                  }
               }

               this.$crud.index("apiRoutes.qtrivia.trivias", params).then(response => {
                  this.trivias = response.data

                  resolve(true)//Resolve
               }).catch(error => {
                 // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  console.warn('ERROR - THEMES - TOP - GET TRIVIAS')
                  reject(false)//Resolve
               })

            })
         },
         //Get trivias Ids from User
         getUserTrivias() {
            return new Promise((resolve, reject) => {
               //Params
               let params = {
                //  refresh: true,
                  params: {
                     filter: {userId: this.userId},
                     fields: 'trivia_id'
                  }
               }

               this.$crud.index("apiRoutes.qtrivia.userTrivias", params).then(response => {
                  response.data.forEach((userTrivias, index) => {
                     this.triviaUserIds.push(userTrivias.trivia_id)
                  });
                  resolve(true)//Resolve
               }).catch(error => {
                 // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  console.warn("ERROR - THEMES - TOP - GET USER TRIVIAS ")
                  reject(false)//Resolve
               })

            })
         }

      }

   }
</script>
<style lang="stylus">
   .topWidgetHomeMobile
      .content-modal
         z-index 10000
         width 100%
         height 100%
         position absolute
      .card-top-users
         .img-title
            margin-top 0

      .card-top-users, .card-top
         .text-h6
            display none !important

      .card-quiz, .home-trivia
         .img-title
            padding-top 10px

      .home-trivia
         padding-top 20px

      .q-avatar
         img
            font-size 60px
            border 3px solid $primary
            padding 3px
            border-radius 50%
            overflow hidden

      .VueCarousel-pagination
         .VueCarousel-dot-container
            margin-top -30px !important

      .VueCarousel
         .VueCarousel-slide
            padding 0 12px
            max-height 210px
            border-radius: 10px;
            overflow hidden

            .card-top-users
               .img-title
                  height 50px
                  margin-bottom 0

            .q-card__top
               .img-title
                  height 30px

            .q-card__section
               font-size 10px
               margin-top 0
               padding-top 0

               .q-stepper__nav
                  padding 0 16px
               ol, ul
                  li
                     margin-bottom 8px
                     font-size 12px

               .text-h6
                  font-size 10px
                  line-height: normal

               & .q-option-group
                  > div
                     border-radius 20px
                     margin-bottom 5px

                     .q-radio__inner
                        width: 20px
                        min-width: 10px
                        height: 20px
                        padding: 10px
                        display: none

                     & .q-icon
                        font-size 8px !important

                     & .q-radio__label
                        font-size 8px !important

      #movil-widget-home-carousel
         .movil-nav
            display none !important
         ol, ul
            margin-top 5px
            li
               margin-bottom 2px
               font-size 12px
               max-width 80px
               white-space: nowrap;
               text-overflow: ellipsis;
               overflow: hidden;
               padding 2px
         .q-card__section
            padding 5px !important
            .text-h6
               margin 0 9px
               font-weight bold


</style>
