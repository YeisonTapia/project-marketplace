<template>
  <div class="q-inline-block">
    <q-btn-dropdown class="q-pa-none" flat no-caps icon="fas fa-user-alt" v-if="userData">
      <q-list class="bg-light">
        <q-item tag="label" :to="{name: 'user.profile.me'}">
          <q-item-side class="img-user">
            <q-item-tile avatar >
              <img :src="userData.mediumImage" >
            </q-item-tile>
          </q-item-side>
          <q-item-main :label="userData.fullName" />
        </q-item>
        <q-item-separator />
        <q-item tag="label" link :to="{name:'auth.logout'}">
          <q-item-side>
            <q-icon color="tertiary" name="fas fa-sign-out-alt" ></q-icon>
          </q-item-side>
          <q-item-main :label="$t('ui.configList.signOut')" />
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
        helper.storage.get.item('sessionData').then(response => {
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
 
</style>
