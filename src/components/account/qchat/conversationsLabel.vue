<template>
  <div>
    <q-item
      :class="`bordered-b ${this.$route.params.id == conversation.id ? 'bg-grey-2': ''}`"
      v-if="conversation"
      clickable
      @click="redirectToConversation(conversation)">
      <q-item-section avatar>
        <q-avatar class="q-ma-sm">
          <img :src="conversation.user.smallImage">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{conversation.user.fullName}}
        </q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-spinner-ios
          v-if="loading"
          color="primary"
          size="1em"
        />
        <q-icon
          v-else
          :color="`${conversation.lastMessageReaded ? 'primary' : 'grey-5'}`"
          name="fas fa-comment-dots">
          <q-badge
            color="green"
            floating
            style="width: 1px; height: 12px; border-radius: 50%"
            v-if="conversation.lastMessageReaded"/>
        </q-icon>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
  export default {
    props: {
      conversation:{
        type: Object,
        required: true,
        default: () => {}
      },
    },
    data (){
      return {
        loading: false
      }
    },
    computed:{

    },
    methods:{
      async redirectToConversation(conversation){
        await this.updateLastMessageReaded()
        await this.$router.push({
          name: 'app.account.messages.conversation',
          params:{
            id: this.conversation.id
          }
        })
      },
      async updateLastMessageReaded(){
        this.loading = true
        /* If lastMessageReaded not is null, update to null */
        if(this.conversation.lastMessageReaded != null ){
          /* preparing data for update */
          let criteria = this.conversation.conversationUsers
          let data = {
            lastMessageReaded: null
          }
          /* Send update */
          await this.$crud.update('apiRoutes.qchat.conversationUser', criteria, data).then( response => {
            console.log( response )
            this.loading = false
            /* Update to null in lastMessageReaded of this conversation */
            this.conversation.lastMessageReaded = null
          }).catch( error => {
            console.error( error)
            this.loading = false
          })
          /* Bug message */
          console.warn('Updating last message readed ...')
        }
        this.loading = false
      }
    }
  }
</script>
