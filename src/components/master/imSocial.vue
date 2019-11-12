<template>
  <div class="imsocial">
    <div>
      <q-btn icon="fab fa-facebook" flat round v-if="socialNetworks.facebook" @click="openUrl(socialNetworks.facebook)"/>
      <q-btn icon="fab fa-whatsapp" flat round @click="openUrl(socialNetworks.whatsapp)"/>
      <q-btn icon="fab fa-twitter" flat round @click="openUrl(socialNetworks.twitter)"/>
      <q-btn icon="fab fa-instagram" flat round v-if="socialNetworks.instagram" @click="openUrl(socialNetworks.instagram)"/>
    </div>
  </div>
</template>
<script>
export default {
    name: 'imSocialComponent',
    computed: {
      socialNetworks() {
        let response = {}
        let socialNetworks = []//this.$store.getters['qsiteSettings/getSettingValueByName']('isite::socialNetworks')
        //format social networks
        socialNetworks.forEach(item => {
          if (item.label == 'facebook') response[item.label] = `https://facebook.com/${item.value}`
          if (item.label == 'instagram') response[item.label] = `https://instagram.com/${item.value}`
        })

        return response//Response
      }
    }
}
</script>
