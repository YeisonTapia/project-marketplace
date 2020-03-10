<template>
  <q-card flat  class="card-top-users bg-primary text-white full-width full-height relative-position">
    <div class="text-center">
      <img class="img-title" src="statics/img/copa.png">
    </div>
    <q-card-section>
      <div class="text-h6 destc-text font-family-secondary">Usuarios Destacados</div>
      <div v-if="listUsers.length>0">
        <ul>
        <li v-for="item of listUsers" :key="item.userId" @click="openModalUser(item.user)" clickable>{{item.user.fullName}}</li>
        </ul>
      </div>
      <div v-else>
          <q-banner :class="alertContent.color" class="q-mt-md">
            <template v-slot:avatar>
              <q-icon :name="alertContent.icon" color="white" />
            </template>
            <div class="text-center text-white">
              {{alertContent.msj}}
            </div>
          </q-banner>
      </div>
    </q-card-section>
    <q-dialog v-model="card.open">
      <card-user-public :card="card"></card-user-public>
    </q-dialog>
    <q-inner-loading :visible="loading" />
  </q-card>
</template>
<script>
  import cardUserPublic from '@imagina/qmarketplace/_components/info/cardUserPublic'
  export default {
    name: 'TopUsersComponent',
    components: {

      cardUserPublic
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
        listUsers: [],
        userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
        alertContent:{
          color:'bg-secondary',
          icon:'warning',
          msj:'No existen datos disponbiles'
        },
        card: {
          open: false,
          info: [],
        },
      }
    },
    methods: {
      // Init Method
      async init(){
        this.loading = true

        if(this.userId!=null){
          await this.getTopUsers().catch(error => {})
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
            //refresh: true,
            params: {
              take: 5
            }
          }

          //Request
          this.$crud.index('apiRoutes.qredeems.featuredUsers',params).then(response => {
            this.listUsers = response.data
            resolve(true)//Resolve
          }).catch(error => {
            console.error('[TOP USERS - GET TOP USERS] ', error)
            reject(false)//Resolve
          })
        })
      },
      openModalUser(result) {
        this.card.open = true;
        this.card.info = result;
        this.card.info.fields=this.$helper.convertToFrontField(this.card.info.fields);
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
  & .q-card__section
      padding 10px 25px 15px 25px
      & ul
          list-style none
          padding-left 5px
          font-size 17px
          li
            padding 10px
            border-radius 10px
            display flex
            cursor pointer
            &:before
              margin-right 6px
              content '\f005'
              color $warning
              font-family 'fontawesome'
            &:hover
              background rgba(255 255 255 0.5)
  @m
</style>
