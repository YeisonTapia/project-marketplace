<template>
  <div id="authLoginRegister" class="flex flex-center">
    <div class="q-px-md q-pt-xl q-pb-md">
      <form-auth :horizontal-extra-fields="true" @logged="redirect()"/>
    </div>
  </div>
</template>

<script>
  //components
  import formAuth from 'src/components/quser/auth/form'

  export default {
    props: {},
    components: { formAuth },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.checkRedirect(from))
    },
    mounted () {
      console.warn("inicia")
      //this.$route.params.id
      this.$nextTick(function () {
        this.checkRedirect()
      })
    },
    data () {
      return {
        redirectTo: false
      }
    },
    methods: {
      //check if redirect to route specific
      async checkRedirect (from = false) {
        let route = from || await this.$cache.get.item('route.after.login')

        if (route && route.name && (route.name != 'auth.logout')) {
          this.redirectTo = route
          //Save data of route in storage
          this.$cache.set('route.after.login', {
            name: route.name,
            fullPath: route.fullPath,
            meta: route.meta,
            params: route.params,
            path: route.path,
            query: route.query
          })
        } else {
          //Search route in storage
          this.redirectTo = { name: 'app.home' }
        }
      },
      //Redirect after login
      redirect () {
        this.$cache.remove('route.after.login')
          /*Get role user autentichated*/
          var roles=this.$store.state.quserAuth.userData.roles;
          var businessRole=0;
          for (var i=0;i<roles.length;i++){
            if(roles[i].slug=="business"){
              //Vendedor
              businessRole=1;
              break;
            }//if role business
          }//for
          if(businessRole){
            //Query axios
            //If doesn't suscription active, redirect to plans
            let params={
              params:{
                filter:{
                  userId:this.$store.state.quserAuth.userId,
                  status:1
                }
              }
            };
            this.$crud.index("apiRoutes.qsubscription.suscriptions",params).then(response => {
              if(response.data.length==0)
                this.$router.push({name: 'products.show',params:{slug:'tiendas-en-linea'}});
            })
          }
        this.$router.push(this.redirectTo)
      }
    }
  }
</script>

<style lang="stylus">
  #authLoginRegister
    min-height 100vh
</style>
