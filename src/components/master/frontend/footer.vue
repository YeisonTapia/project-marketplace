<template>
  <footer>
    <!--=== Copyright ===-->
    <div class="bg-degradado">
      <div class="row flex flex-center gutter-x-sm q-py-md">
        <div>
          <logo-imagina></logo-imagina>
        </div>
        <div class="text-white text-center">
          Copyright {{ new Date().getFullYear() }} © Donde esta esa vaina. Todos Los Derechos Reservados.
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  import logoImagina from 'src/components/master/imaginaSVG'
  export default {
    props: {},
    components: {
      logoImagina
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
