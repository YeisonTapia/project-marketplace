<template>
  <div
    class="row bordered-x bordered-b">
    <div class="col-xs-12 bg-grey-2 bordered-x bordered-t relative-position">
      <q-item class="bordered-b">
        <q-item-section avatar class="q-pa-sm">
          <q-avatar>
            <img :src="this.$store.state.quserAuth.userData.mainImage">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{this.$store.state.quserAuth.userData.fullName}}</q-item-section>
        <q-item-section side>
          <usersContainer/>
        </q-item-section>
      </q-item>
      <q-input
        rounded
        outlined
        :placeholder="$tr('qchat.layout.search')"
        bg-color="white"
        class="full-width q-pa-sm"
        v-model="search"
        dense>
        <template v-slot:append>
          <q-icon
            color="primary"
            v-if="search"
            name="close"
            @click.stop="search = ''"
            class="cursor-pointer" />
          <q-icon
            v-else
            color="primary"
            name="search"/>
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 relative-position">
      <q-scroll-area
        ref="scrollArea"
        style="height: 75vh"
        class="bordered-a">
        <q-list class="rounded-borders">
          <div>
            <conversationsLabel
              v-for="(conversation, index) in conversationsFiltered"
              :key="index"
              :conversation="conversation"
            />
          </div>
        </q-list>
        <infinite-loading
          ref="InfiniteLoading"
          class="q-pt-md"
          spinner="waveDots"
          @infinite="infiniteHandler">
          <div slot="no-more">
            {{$tr('qchat.layout.message.noMoreConversations')}}
          </div>
          <div slot="spinner">
            <skeletonList :cant="Math.floor((Math.random() * 5) + 1)"/>
          </div>
          <div slot="no-results">
            {{$tr('qchat.layout.message.noConversationsResults')}}
          </div>
          <div slot="error">
            {{$tr('qchat.layout.message.error')}}
          </div>
        </infinite-loading>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
  import { orderArray } from '@imagina/qchat/utils/index'
  import conversationsLabel from 'src/components/account/qchat/conversationsLabel'
  import skeletonList from '@imagina/qchat/_components/common/skeletonList'
  import InfiniteLoading from 'vue-infinite-loading'
  import Pusher from 'pusher-js'
  import usersContainer from '@imagina/qchat/_components/admin/usersContainer'

  export default {
    components:{
      conversationsLabel,
      skeletonList,
      InfiniteLoading,
      usersContainer
    },
    data () {
      return {
        loading: false,
        conversations: [],
        pagination:{
          page: 1,
          take: 20
        },
        search: '',
        pusher: null,
      }
    },
    computed: {
      conversationsFiltered () {
        return this.conversations.filter( conversation => {
          return conversation.user.fullName.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    beforeDestroy () {
      this.$root.$off('newNewConversationMessage', this.handlerNewNewConversationMessage)
    },
    created() {
      this.$root.$on('newNewConversationMessage', this.handlerNewNewConversationMessage)
      this.$nextTick(function () {
        this.connetPusher()
      })
    },
    methods:{
      infiniteHandler($state) {
        let params = {
          refresh: true,
          params: {
            filter: {
              myconversations: true
            },
            include: 'conversationUsers',
            page: this.pagination.page,
            take: this.pagination.take,
          },
        }
        this.$crud.index('apiRoutes.qchat.conversations',  params).then( ({ data })  => {
          if (data.length) {
            this.pagination.page += 1;
            this.conversations.push(...this.formatedConversation(data));
            $state.loaded();
          } else {
            $state.complete();
          }
        }).catch( error => {
          console.error( error)
        })
      },
      formatedConversation(data){
        return data.map( conversation => {
          let authUserId = this.$store.state.quserAuth.userId
          let newUser = {
            ...conversation,
            user: conversation.users.find( user => user.id != authUserId),
            conversationUsers: conversation.conversationUsers.find( user => user.userId == authUserId).id
          }
          delete newUser.users
          return newUser
        })
      },
      async connetPusher(){
        await this.disconnectPusher()
        /* Disconnet pusher if it has a instance */
        let key = env('PUSHER_APP_KEY')
        let config = {
          cluster:  env('PUSHER_APP_CLUSTER')
        }
        /* Init instance pusher */
        this.pusher = new Pusher(key, config)
        /* Suscribe pusher to global event */
        this.pusher.subscribe('global')
        let event = `conversationsUserUpdated${this.$store.state.quserAuth.userData.id}`
        /* listen event conversation_:id */
        this.pusher.bind(event, ({message}) => {
          /* handler event when is received a new message */
          this.updateConversationsPusher(message)
        })
        /* Show debugging message */
        console.log(`[APP] Connecting pusher Conversations`)
      },
      async updateConversationsPusher(message){
        /* Refresh conversation */
        await this.refresh()

        /* Is it in same conversations, it not change status in lastMessageReaded */
        if(this.$route.params.id == message.conversationId ||
          message.userId == this.$store.state.quserAuth.userData.id){
          return
        }

        /* Get conversation for update */
        let conversation = this.conversations.find( item => (
          item.id == message.conversationId
        ))

        /* Update lastMessageReaded in convesation founded */
        conversation.lastMessageReaded = message.id

        /*let conversationIndex = this.conversations.indexOf(
          this.conversations.find( conversation => (
            conversation.id == message.conversationId
          ))
        )
        this.conversations[conversationIndex].lastMessageReaded = message.id*/
      },
      disconnectPusher(){
        if(this.pusher !== null ){
          /* Disconnect pusher */
          this.pusher.disconnect()
          /* Show debugging message */
          console.log(`[APP] Disconnecting pusher Conversations`)
        }
      },
      handlerNewNewConversationMessage(event){
        this.refresh()
      },
      refresh(){
        this.pagination.page = 1
        this.conversations = []
        this.$refs.InfiniteLoading.stateChanger.reset()
      }
    }
  }
</script>

