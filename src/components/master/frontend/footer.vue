<template>
  <footer>
    <!--=== Copyright ===-->
    <div class="bg-degradado" v-if="desktop">
      <div class="row flex flex-center gutter-x-sm q-py-md">
        <div>
          <logo-imagina></logo-imagina>
        </div>
        <div class="text-white text-center">
          Copyright {{ new Date().getFullYear() }} © Donde esta esa vaina. Todos Los Derechos Reservados.
        </div>
      </div>
    </div>
    
    <q-layout-footer v-else>
      <q-tabs color="transparent" class="bg-degradado">
        <q-route-tab
          icon="home"
          :to="{ name: 'app.home'}"
          name="app.home"
          slot="title"
        />
        <q-tab name="xtab-1" icon="search" slot="title" />
      </q-tabs>
    </q-layout-footer>
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
      return {
        desktop: this.$q.platform.is.desktop
      }
    },
    methods: {}
  }
</script>
