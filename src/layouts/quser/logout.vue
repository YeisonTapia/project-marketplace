<template>
  <q-page id="pageLogout" class="flex flex-center">

    <div class="row shadow-3 bg-white q-mx-xl rounded-md" style="width: 350px">
      <div class="flex flex-center col-12 relative-position"
           style="padding: 20px; min-height: 300px">
        <div class="text-center">
          <q-icon name="fas fa-user-lock" color="primary" size="60px"/>
          <div class="text-grey-8 q-headline q-mt-md">
            {{$tr('quser.layout.message.logout')}}
          </div>
          <q-btn :label="$tr('quser.layout.label.login')" color="primary"
                 :loading="loading"
                 class="q-mt-md font-family-secondary btn-arrow" :to="{name : 'auth.login'}"/>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        loading : false
      }
    },
    mounted() {
      this.loading = true
      this.$nextTick(async function () {
        await this.$store.dispatch("quserAuth/AUTH_LOGOUT")
        this.loading = false
      })
    }
  }
</script>

<style lang="stylus">

.btn-arrow
    &:after
      content ''
      background-image url('/statics/img/arrow-send-pink.png')
      background-repeat no-repeat
      background-size contain
      width 74px
      height 100px
      top -4px
      left -50px
      position absolute
      
</style>