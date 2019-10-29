<template>
  <div class="qredeems-account-points">

    <div v-if="success" class="qredeems-content">

      <h4>Crear layout en esta ruta - src/layouts/qredeems/account/index</h4>

    </div>
   
    <!--Inner loading-->
    <inner-loading :visible="loading"/>
    
  </div>

</template>
<script>
  export default {
    props: {},
    components: {},
    watch: {},
    validations() {
      return {}
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        loading: false,
        success: false,
      }
    },
    methods: {
      //init
      async init() {
        this.loading = true
        this.loading = false
        this.success = true
      }


    }
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
