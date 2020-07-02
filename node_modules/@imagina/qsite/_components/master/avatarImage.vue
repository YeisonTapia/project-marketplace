<template>
  <div id="avatarImageComponent" class="inline-block">
    <!--Avatar-->
    <q-avatar v-if="src" @click="dialog.show = true">
      <img :src="src">
    </q-avatar>

    <!--Full screen-->
    <q-dialog v-model="dialog.show">
      <q-card>
        <img :src="src" style="max-width: 570px">
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      src: {default: false}
    },
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        dialog: {show: false}
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="stylus">
</style>
