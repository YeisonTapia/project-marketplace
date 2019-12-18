<template>
  <div class="q-inline-block widget-user">
    <q-btn-dropdown class="q-pa-none" round dense flat no-caps icon="fas fa-user-alt" dropdown-icon="fa" v-if="userData">
      <q-list class="bg-light">

        <!--  :to="{name: 'user.profile.me'}" -->
        <q-item  clickable v-ripple :to="{name: 'quser.account.profile'}">
          <q-item-section avatar>
            <q-avatar>
              <img :src="userData.mediumImage">
            </q-avatar>
          </q-item-section>
          <q-item-section class="q-py-md">{{userData.fullName}}</q-item-section>
        </q-item>

        <q-separator />

        <q-item  clickable v-ripple :to="{name:'auth.logout'}">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-sign-out-alt" />
          </q-item-section>

          <q-item-section class="q-py-md">{{$t('ui.configList.signOut')}}</q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>
    <q-btn v-else class="q-pa-none" round flat icon="fas fa-user-alt" :to="{name:'auth.login'}" />
    <!--
    <q-btn v-else class="q-pa-none" round @click="opened = !opened" flat icon="fas fa-user-alt" />
    <modalInicial :opened="opened"  @opened ="opened = $event"></modalInicial>
    -->
</div>
</template>


<script>
  import {helper} from '@imagina/qhelper/_plugins/helper'
  import modalInicial from 'src/components/master/modalInicial';
  export default {
    props: {},
    components: {
      modalInicial
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.setData()
      })
    },
    data() {
      return {
        userData: false,
        opened: false
      }
    },
    methods: {
      setData() {
        this.$cache.get.item('sessionData').then(response => {
          if(response)
            this.userData = response.userData
        }).catch(error => {
          console.warn("WIDGET-USER:ERROR: "+error)
        })
      }
    }
  }
</script>
<style lang="stylus">
.widget-user
  .q-btn-dropdown__arrow
    display none!important
    margin-left 0
</style>
