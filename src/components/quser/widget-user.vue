<template>
  <div class="widget-user" v-if="userData">
    <p>
      Data: <br>
      {{userData.firstName}} <br>
      {{userData.lastName}} <br>
      {{userData.fullName}} <br>
      <img :src="userData.mediumImage" width="32px" style="border-radius: 100%">
    </p>
    <!--= USER/LOGIN =-->
    <q-btn-dropdown
      color="white" split flat v-if="userData"
      :label="userData.firstName" id="user-dropdown">
      <q-list>
        <q-item tag="label" :to="{name: 'user.profile.me'}">
          <q-item-side>
            <img :src="userData.mediumImage" width="32px" style="border-radius: 100%">
          </q-item-side>
          <q-item-main>
            <q-item-tile tag="a"
                         color="tertiary"
                         style="text-decoration: none">
            </q-item-tile>
          </q-item-main>
        </q-item>
        <hr>

        <q-item tag="label" link :to="{name:'auth.logout'}">
          <q-item-side>
            <q-icon color="negative" name="fas fa-sign-out-alt" size="25px"></q-icon>
          </q-item-side>
          <q-item-main>
            <q-item-tile tag="a"
                         color="tertiary"
                         style="text-decoration: none">
              Sign out
            </q-item-tile>
          </q-item-main>
        </q-item>

      </q-list>
    </q-btn-dropdown>
    <div class="q-my-xl">
      asd
    </div>
  </div>
</template>


<script>
  import {helper} from '@imagina/qhelper/_plugins/helper'

  export default {
    props: {},
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.setData()
      })
    },
    data() {
      return {
        userData: false
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
  @import "~variables";
</style>
