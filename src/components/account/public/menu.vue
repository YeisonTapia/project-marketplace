<template>

  <div class="account-menu" v-if="success">

    <div  v-if="$q.platform.is.desktop" >

      <!-- Bloque Menu -->
      <div class="row bloque-op-profile relative-position bg-white rounded-md shadow-5">
        <div class="col-12">

          <!--Image-->
          <div class="ImgUserNew">
           <q-avatar rounded size="180px">
             <img :src="userGetData.mediumImage">
           </q-avatar>
          </div>  
       
          <!--FullName-->
          <h5 class="fullname font-family-secondary text-center relative-position">{{form.firstName}} {{form.lastName}}</h5>

          <!--Links-->
          <q-list no-border inset-delimiter class="q-px-lg">

                   <q-item :key="'menu'+index" v-for="(item, index) in menuAccount" class=" q-mb-lg round-borders">

                      <q-item-section avatar>
                        <q-icon :name="item.icon" size="20px"></q-icon>
                      </q-item-section>
                      <q-item-section class="item-title">
                        {{item.title}}
                      </q-item-section>
                    </q-item>

          </q-list>

        </div>
      </div>

    </div>
    <div v-else>
      <q-drawer overlay  v-model="drawer">

        <div class="q-pa-lg">

          
          <!-- Bloque Menu -->
          <div class="row bloque-op-profile relative-position bg-white rounded-md shadow-5">
            <div class="col-12">

              <!--Image-->
              <div class="ImgUserNew">
               <q-avatar rounded size="180px">
                 <img :src="userGetData.mediumImage">
               </q-avatar>
              </div>

              <!--FullName-->
              <h5 class="fullname font-family-secondary text-center relative-position">{{form.firstName}} {{form.lastName}}</h5>

              <!--Links-->
              <q-list no-border inset-delimiter class="q-px-lg">

                 <q-item :key="'menu'+index" v-for="(item, index) in menuAccount" class=" q-mb-lg round-borders">

                    <q-item-section avatar>
                      <q-icon :name="item.icon" size="20px"></q-icon>
                    </q-item-section>
                    <q-item-section class="item-title">
                      {{item.title}}
                    </q-item-section>
                  </q-item>

                 
              </q-list>
            </div>
          </div>  
        </div>  
      </q-drawer>


      <q-page-sticky position="top-left" :offset="[10, 10]" style="z-index: 9;">
        <q-btn round @click="drawer = !drawer" color="primary" icon="arrow_back" />
      </q-page-sticky>


    </div>

  </div>

</template>

<script>

  import http from "axios"

  //Plugins
  import {required, email, minLength} from 'vuelidate/lib/validators'

  export default {
    props: {
      pointsAvailables:{default: 0}
    },
    components: {},
    validations() {
      return {
        form: {
          fields: {}
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        drawer: false,
        loading: false,
        success: false,
        imgUser: null,
        form: {
          firstName: null,
          lastName: null,
          email: null,
          fields: {}
        },
        menuAccount:[
          {
            title: 'Perfil',
            icon: 'far fa-edit',
            to: 'user.profile.me'
          }
        ],
        pointsHistory: 0,
        userId: this.$route.params.userId,
        userGetData: [],
      }
    },
    computed: {
      defaultFields() {
        return [
          {name: 'mainImage', value: {}}
        ]
      }
    },
    methods: {
      //init
      async init() {

        this.loading = true//Loading
        this.form.fields = this.$clone(this.defaultFields)//Set default fields
        
        await this.getInforUser()
        
        
      },
      //Set user data
      setUserData() {

        let userData = this.$clone(this.userGetData)//Get user data

        //Convert fields
        userData.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields);

        //Set data in form
        this.form.id = this.$clone(userData.id)
        this.form.activated = this.$clone(userData.activated)
        this.form.firstName = this.$clone(userData.firstName)
        this.form.lastName = this.$clone(userData.lastName)
        this.form.email = this.$clone(userData.email)
        this.form.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields)

        this.success = true//Success page
        this.loading = false//Loading

      },
      // Get Points History
      async getPointsHistoryc(){
        return new Promise((resolve, reject) => {
          //Params
          let params = {
            params: {
              filter: {
                userId: this.$store.state.quserAuth.userId,
                type: 'availablePointsUser'
              }
            }
          }

          http.get(config('apiRoutes.qredeems.calculates'),params)
            .then(response => {

              if(response.data.data.points>0)
                this.pointsHistory = response.data.data.points

              resolve(true);

            })
            .catch(error => {
              reject(error);
            });
        })
        
      },
      // Get Infor User
      getInforUser(){

        let criteria = this.userId
        let params = {
          refresh: true,
          params: {
            include: 'fields',
          }
        }

        this.$crud.show('apiRoutes.quser.users',criteria,params).then(response => {
            this.userGetData = response.data
            this.setUserData() // Set Data
        }).catch(error => {
            console.error('[GET USER DATA] ', error)
        })

      }

    }
  }
</script>

<style lang="stylus">

  #profilePage
    .form-title
      color $primary

  #uploadImageComponent
    margin-top 35px
    .img-file
      .content-manage-file
        text-align: left
        .q-btn
          background-color $primary !important
          
  .ImgUserNew
    margin 35px auto 20px auto
    width 180px
    height 180px
    img
      border-radius 10px

  .account-menu
    max-width 245px

  .nivel
    background-image url('/statics/img/label-primary.png')
    background-size 100% 100%
    height 200px
    h4
      font-size 25px
      border 1px solid white
      border-left 0px
      border-right 0px
      width 70%
      margin auto
      letter-spacing 10px
    h5
      font-size 22px
      font-family 'Trebuchet MS'
    p
      font-size 18px
      font-family 'Trebuchet MS'
  .club
    margin-top -20px
    z-index 1
    position relative

  .circulo
    width 70px
    height 70px
    border-radius 50%
    margin auto
    font-size 20px

  .bloque-op-profile
    border 1px solid $tertiary
    margin-left 10px
    &:before
      content ''
      position absolute
      background-color $primary
      width 10px
      height 80%
      border-top-left-radius 12px
      border-bottom-left-radius 12px
      top 50px
      left -10px
    &:after
      content ''
      position absolute
      background-color $tertiary
      width 10px
      height 80%
      border-top-right-radius 12px
      border-bottom-right-radius 12px
      top 50px
      right -10px
    .q-list
      .q-item
        border-color  $tertiary
      .q-router-link--active
        background-color $primary
        .q-icon
          color white
        .item-title
          color white !important
      .q-link
        &:hover
          background-color $primary
          .q-icon
            color white
          .item-title
            color white !important
    .fullname
       &:after
        content ''
        position absolute
        background-color black
        width 70%
        height 1px
        left 0px
        right 0px
        margin-left auto
        margin-right auto
        bottom -12px
        box-shadow 0px 0px 1px #000


  

</style>
