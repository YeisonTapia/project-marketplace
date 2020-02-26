<template>
   <div class="imsocial">
      <div>
         <q-btn v-for="(item, i) in socialNetworks" :icon="item.icon" :key="i" flat round @click="openUrl(item.url)"/>
      </div>
   </div>
</template>
<script>
   export default {
      name: 'imSocialComponent',
      computed: {
         socialNetworks() {
            let response = {}
            let socialNetworks = this.$store.getters['qsiteSettings/getSettingValueByName']('isite::socialNetworks')
            socialNetworks.forEach(item => {
               if (item.label.value == 'facebook') response[item.label.value] = {
                  url: item.value,
                  icon: 'fab fa-facebook'
               }
               if (item.label.value == 'instagram') response[item.label.value] = {
                  url: item.value,
                  icon: 'fab fa-instagram'
               }
               if (item.label.value == 'twitter') response[item.label.value] = {url: item.value, icon: 'fab fa-twitter'}
               if (item.label.value == 'linkedin') response[item.label.value] = {
                  url: item.value,
                  icon: 'fab fa-linkedin'
               }
               if (item.label.value == 'skype') response[item.label.value] = {url: item.value, icon: 'fab fa-skype'}
               if (item.label.value == 'whatsapp') response[item.label.value] = {
                  url: item.value,
                  icon: 'fab fa-whatsapp'
               }
            })

            return response//Response
         }
      },
      methods: {
         openUrl(url, target) {
            return window.open(url, target)
         }
      }
   }
</script>
