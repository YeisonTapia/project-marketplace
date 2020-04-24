<template>
  <div class="row">
    <div class="col-xs-12">
      <q-card class="no-shadow">
        <q-card-section class="q-pa-none">
          <div class="row">
            <div
              class="col-xs-12 col-sm-6 col-md-6 col-lg-3"
              v-if="($q.platform.is.mobile && !$route.params.id) || $q.platform.is.desktop" >
              <q-card class="no-shadow">
                <conversations />
              </q-card>
            </div>
            <div
              class="col-xs-12 col-sm-6 col-md-6 col-lg-9 bordered-b bordered-r"
              v-if="($q.platform.is.mobile && $route.params.id) || $q.platform.is.desktop" >
              <q-card class="no-shadow">
                <conversation :conversationId="$route.params.id"/>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
  import conversations from 'src/components/account/qchat/conversations'
  import conversation from '@imagina/qchat/_components/admin/conversation'

  export default {
    components:{
      conversations,
      conversation,
    },
    data () {
      return {
        showMenu: true
      }
    },
    mounted() {

    }
  }
</script>

<style lang="stylus">
  .bordered-t
    border-top: 1px solid #0000001f

  .bordered-b
    border-bottom: 1px solid #0000001f

  .bordered-l
    border-left: 1px solid #0000001f

  .bordered-r
    border-right: 1px solid #0000001f

  .bordered-x
    @extend .bordered-l
    @extend .bordered-r

  .bordered-y
    @extend .bordered-t
    @extend .bordered-b

  .bordered-a
    @extend .bordered-x
    @extend .bordered-y

</style>

