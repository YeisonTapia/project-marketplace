<template>
  <div id="initOptionsComponent" class="relative-position text-center">

    <div class="bg-white q-pa-md shadow-2 text-center rounded-lg q-mb-lg" >
      <router-link :to="{name:'auth.register',params: { userRol: 'user' }}">
        <div class="text-h5 font-family-secondary text-primary">REGISTRATE COMO USUARIO</div>
        <div class="text-body2 text-secondary">Ganaras puntos, premios, regalos y muchas sorpresas</div>
      </router-link>
    </div>

    <div class="bg-white q-pa-md shadow-2 rounded-lg q-mb-lg" >
      <router-link :to="{name:'auth.register',params: { userRol: 'business' }}">
        <div class="text-h5 font-family-secondary text-primary">CREA TU TIENDA VIRTUAL</div>
        <div class="text-body2 text-secondary">Registra tu negocio o empresa local y muestralo al mundo entero</div>
      </router-link>
    </div>

    <div class="bg-white q-pa-md shadow-2 rounded-lg q-mb-lg" >
      <div class="btn-guest" @click="authenticate()">
        <div class="text-h5 font-family-secondary text-primary">ENTRA SIN REGISTRARTE</div>
        <div class="text-body2 text-secondary">No tendras beneficios ni sorpresas</div>
      </div>
    </div>

    <div class="text-body1 q-mb-lg text-white">¿Ya estás registrado?</div>

    <q-btn label="Entra aquí" @click="emitSelectForm()"text-color="white" outline style="border-left:0;border-right:0; border-radius:0;" />


  </div>
</template>

<script>
  export default {
    props: {
     selectForm: {type: String, default: 'init'}
    },
    watch: {

    },
    mounted() {

    },
    data() {
      return {
        loading: false,
        inRequest: false,
        form: {
          username: 'guest@dondeestaesavaina.com',
          password: 'nm7o4Ex8BS#ovOt'
        },
        redirectTo: { name: 'app.home' }
      }
    },
    computed: {

    },
    methods: {
      emitSelectForm(){
        this.$emit('selectForm','login');
      },
      //Login
      async authenticate() {
        if (!this.inRequest) {
          this.inRequest = true
          this.loading = true
          const {username, password} = this.form
          this.$store.dispatch('quserAuth/AUTH_REQUEST', {username, password}).then((response) => {
            this.loading = false
            this.inRequest = false
            this.redirect()
          }).catch(error => {
            this.loading = false
            this.inRequest = false
          })
        }
      },
      //Redirect after login
      redirect () {
        this.$cache.remove('route.after.login');
        let params={
          params:{
            include:'plan.product',
            filter:{
              userId:this.$store.state.quserAuth.userId,
              status:1
            }
          }
        };
        this.$crud.index("apiRoutes.qsubscription.suscriptions",params).then(response => {
          if(response.data.length==0){
            this.$router.push({name:products.show,params:{slug:'tiendas-en-linea'}});
          }
        });
        this.$router.push(this.redirectTo)
      }
    }
  }
</script>
<style lang="stylus">

.btn-guest
  cursor pointer

</style>
