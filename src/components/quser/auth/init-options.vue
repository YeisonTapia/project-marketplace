<template>
  <div id="initOptionsComponent" class="relative-position text-center">

    <div class="bg-white q-pa-md shadow-2 text-center rounded-lg q-mb-lg" >
      <router-link :to="{name:'auth.login',params: { tform: 'register' }}">
        <div class="q-title text-primary">REGISTRATE COMO USUARIO</div>
        <div class="q-caption">Ganaras puntos, premios, regalos y muchas sorpresas</div>
      </router-link>
    </div>

    <div class="bg-white q-pa-md shadow-2 rounded-lg q-mb-lg" >
      <div class="q-title text-primary">CREA TU TIENDA VIRTUAL</div>
      <div class="q-caption">Registra tu negocio o empresa local y muestralo al mundo entero</div>
    </div>

    <div class="bg-white q-pa-md shadow-2 rounded-lg q-mb-lg" >
      <div class="q-title text-primary">ENTRA SIN REGISTRARTE</div>
      <div class="q-caption">No tendras beneficios no sorpresas</div>
    </div>

    <div class="q-body-1 q-mb-lg text-white">¿Ya estás registrado?</div>  

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
       
      }
    },
    computed: {
      
    },
    methods: {
      emitSelectForm(){
        this.$emit('selectForm','login');
      }
    }
  }
</script>
<style lang="stylus">


</style>
