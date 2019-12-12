<template>
   <q-page class="bg-fondo page-chat">
      <div class="q-py-xl">
        <div class="q-container">
          <div class="row">
            <div class="col-12">
              <div class="text-h5 text-primary q-mb-xs font-family-secondary">Chat</div>
            </div>
            <div class="col-12">

              <q-card class="rounded-md bg-white full-width q-my-xl">

                  <div class="row gutter-md justify-center">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 card-border-right">

                      <q-toolbar class="bg-blue-grey-2 q-pr-none" style="border-top-left-radius: 20px;">
                        <q-toolbar-title>
                          <q-icon name="chat_bubble" color="green" /> Paula Martinez
                        </q-toolbar-title>
                                   <q-separator  vertical />
                        <q-btn stretch flat icon="minimize" />
                             <q-separator vertical />
                        <q-btn stretch flat icon="crop_square" />
                        <q-separator  vertical />
                        <q-btn stretch flat icon="close" />
                      </q-toolbar>

                      <q-card-section class="q-pa-xl">
                        <q-chat-message
                          name="me"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['hey, how are you?']"
                          stamp="7 minutes ago"
                          sent
                          text-color="white"
                          bg-color="blue-10"
                        />
                        <q-chat-message
                          name="Jane"
                          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                          :text="['doing fine, how r you?']"
                          stamp="4 minutes ago"
                          text-color="white"
                          bg-color="blue"
                        />

                        <q-chat-message
                          name="Jane"
                          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                          text-color="white"
                          bg-color="blue"
                        >
                          <q-spinner-dots size="2rem" />
                        </q-chat-message>
                      </q-card-section>

                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 bg-light" style="border-bottom-right-radius: 20px;">
                      <q-toolbar class="bg-grey-9 text-white q-pr-none" style="border-top-right-radius: 20px;">
                        <q-btn flat  icon="fas fa-arrow-left" />
                        <q-toolbar-title>
                          Mensajes directos
                        </q-toolbar-title>
                      </q-toolbar>

                      <q-card-section>
                        
                        <q-input outlined placeholder="Busqueda" bg-color="white" class="full-width q-mb-lg" v-model="text"  dense>
                          <q-btn round color="primary" flat icon="search" />
                        </q-input>

                        <q-list>
                          <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                            <q-item-section avatar>
                              <q-avatar color="primary" text-color="white">
                                {{ contact.letter }}
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>{{ contact.name }}</q-item-label>
                              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon name="chat_bubble" color="green" />
                            </q-item-section>
                          </q-item>

                          <q-separator class="q-mt-md" />
                          <q-item-label header>Offline</q-item-label>

                          <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
                            <q-item-section avatar>
                              <q-avatar>
                                <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>{{ contact.name }}</q-item-label>
                              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon name="chat_bubble" color="grey" />
                            </q-item-section>
                          </q-item>
                        </q-list>


                      </q-card-section>

                    </div>
                  </div>
      
              </q-card>


            </div>

          </div>
      </div>    
    </div>
   </q-page>
</template>

<script>
   export default {
      name: "about",
      data () {
        return {
          text: '',
          contacts: [{
            id: 1,
            name: 'Ruddy Jedrzej',
            email: 'rjedrzej0@discuz.net',
            letter: 'R'
          }, {
            id: 2,
            name: 'Mallorie Alessandrini',
            email: 'malessandrini1@marketwatch.com',
            letter: 'M'
          }, {
            id: 3,
            name: 'Elisabetta Wicklen',
            email: 'ewicklen2@microsoft.com',
            letter: 'E'
          }, {
            id: 4,
            name: 'Seka Fawdrey',
            email: 'sfawdrey3@wired.com',
            letter: 'S'
          }],
          offline: [{
            id: 5,
            name: 'Brunhilde Panswick',
            email: 'bpanswick4@csmonitor.com',
            avatar: 'avatar2.jpg'
          }, {
            id: 6,
            name: 'Winfield Stapforth',
            email: 'wstapforth5@pcworld.com',
            avatar: 'avatar6.jpg'
          }]
        }
      }
   }
</script>
<style lang="stylus">
.page-chat
  .card-border-right
    border-right 2px solid #E1E1E1
</style>