<template>
  <q-card flat  class="card-top-users bg-primary text-white w-100 h-100 relative-position">
    <div class="text-center">
      <img class="img-title" src="/statics/img/copa.png">
    </div>
    <q-card-main>
      <h2 class="q-mb-0 font-family-secondary">Usuarios Destacados</h2>
      <div v-if="listUsers.length>0">
        <ul>
          <li v-for="user of listUsers">{{user.fullName}}</li>
        </ul>
      </div>
      <div v-else>
          <q-alert :color="alertContent.color" :icon="alertContent.icon" class="q-mx-sm q-mt-xl">
              {{alertContent.msj}}
          </q-alert>
      </div>
    </q-card-main>

    <q-inner-loading :visible="loading" />
  </q-card>
</template>
<script>
  export default {
    name: 'TopUsersComponent',
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data () {
      return {
        loading: false,
        success: false,
        listUsers: [],
        userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
        alertContent:{
          color:'secondary',
          icon:'warning',
          msj:'No existen datos disponbiles'
        },
      }
    },
    methods: {
      // Init Method
      async init(){
        this.loading = true

        if(this.userId!=null){
          await this.getTopUsers()
        }else{
          this.alertContent.msj = "Para visualizar este contenido, debes Iniciar Sesión"
          this.alertContent.icon = "account_circle"
        }
        
        this.success = true
        this.loading = false

      },
      // Get Top User
      getTopUsers(){
        return new Promise((resolve, reject) => {

          //Params
          let params = {
            refresh: true,
            params: { 
              take: 5
            }
          }

          //Request
          this.$crud.index('apiRoutes.quser.users',params).then(response => {
            this.listUsers = response.data
            resolve(true)//Resolve
          }).catch(error => {
            console.error('[TOP USERS - GET TOP USERS] ', error)
            reject(false)//Resolve
          })
        })
      }

    }

  }
</script>
<style lang="stylus">
.card-top-users
  border-radius 10px
  & .img-title
    object-fit contain
    width  auto
    margin: -25px  auto 12px
    height 80px
  & .q-card-main
    padding 10px 25px 15px 25px
    font-family 'Trebuchet MS'
    & h2
      font-size 20px
      margin-bottom 30px
    & ul 
        list-style none
        padding-left 5px
        font-size 17px
        li 
          margin-bottom 20px
          display flex
          &:before 
            margin-right 6px
            content '\f005'
            color: #F7C837
            font-family 'fontawesome'
</style>
