<template>
  <div id="mediaFormStore" class="row full-width">
    <div v-if="label" class="col-12 q-heading q-caption q-my-sm label" >{{ this.label }}</div>

    <!--= image viewer =-->
    <div class="col-12">
      <!--= if is multiple =-->
      <div v-if="multiple">

        <div class="images relative-position" v-if="files.length == 0">
          <q-carousel
            color="white"
            v-model="slide"
            animated
            navigation
            infinite
          >

          <q-carousel-slide :name="1" class="rounded-md image-multiple" img-src="/statics/img/img-default.jpg" >
        </q-carousel-slide>
          </q-carousel>
          <div class="absolute-bottom-right" >
            <q-btn
              :icon="buttonIcon ? buttonIcon : 'fas fa-camera'"
              color="primary"
              class="rounded-sm btn q-mr-sm"
              @click="modalMedia = true">
              <q-tooltip :delay="300">Añadir Imagen</q-tooltip>
            </q-btn>
          </div>
        </div>

        <div class="images relative-position" v-else>
          <q-carousel
            color="white"
            v-model="slide"
            animated
            navigation
            infinite
          >
          <q-carousel-slide :name="index+1" class="rounded-md image-multiple" v-for="(file,index) in files"
            :key="index" :img-src="file ? file.medium_thumb : ''" >
            <div class="absolute-top-right q-ma-md" >
              <q-btn round color="red" @click="deleteFile(index)" icon="fas fa-times" size="sm"/>
            </div>
          </q-carousel-slide>
          </q-carousel>

          <div class="absolute-bottom-right" >
            <q-btn
              icon="fas fa-edit"
              color="primary"
              class="rounded-sm btn q-mr-sm"
              @click="modalMedia = true">
              <q-tooltip :delay="300">Editar Imagen</q-tooltip>
            </q-btn>
          </div>

        </div>


      </div>
      <!--= if not multiple =-->

      <div v-else>

        <div class="images ratio-4-3" v-if="files.length == 0">

          <img class="rounded-md" src="/statics/img/img-default.jpg" alt="logo">

          <div class="absolute-bottom-right">
            <!--= Add File Button =-->
            <q-btn
              :icon="buttonIcon ? buttonIcon : 'fas fa-camera'"
              color="primary"
              class="rounded-sm btn"
              @click="modalMedia = true">
              <q-tooltip :delay="300">Añadir Imagen</q-tooltip>
            </q-btn>
          </div>
        </div>

        <div class="images ratio-4-3" v-for="(file,index) in files" :key="index" v-else>
          <img class="rounded-md contain" :src="file ? file.medium_thumb : ''"  />

          <div class="absolute-bottom-right">
            <q-btn
              icon="fas fa-edit"
              color="primary"
              class="rounded-sm btn"
              @click="modalMedia = true"/>
            <q-btn
              color="primary"
              class="rounded-sm btn q-ml-sm"
              @click="deleteFile(index)"
              icon="fas fa-trash" />
          </div>
        </div>


      </div>
    </div>

    <!--= Media List Modal =-->
    <q-dialog id="modalMedia" v-model="modalMedia" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>{{$tr('qmedia.layout.selectMedia')}}</q-toolbar-title>
          <q-btn flat v-close-popup icon="fas fa-times"/>
        </q-toolbar>
        <q-card-section class="q-pa-md">
          <media-list embebed @data="pushData" />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>
  /*Components*/
  import mediaList from '@imagina/qmedia/_components/list'

  /*Services*/
  import mediaService from '@imagina/qmedia/_services/index'

  export default {
    props: {
      zone: {
        type: String,
        default: 'image'
      },
      multiple: {
        type: Boolean,
        default: false
      },
      value: {
        type: Object,
        default: () =>{return {}}
      },
      entity: { type: String, required: true },
      entityId: { default: null },
      label: { type: String, default: ''},
      buttonLabel: { type: String, default: ''},
      buttonIcon: { type: String, default: ''}
    },
    components: {
      mediaList
    },
    watch: {
      entityId(){
        if(this.entityId) {
          this.getData()
        }
      },
      zone() {
        if (this.entityId) {
          this.getData()
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        // if has entity id, get the files associated
        if(this.entityId) {

          this.getData()
        }
      })
    },
    data() {
      return {
        modalMedia: false,
        ids: [],
        files: [],
        slide: 1
      }
    },
    methods: {
      getData(){

          let params = {
            params: {
              zone: this.zone,
              entity: this.entity,
              entity_id: this.entityId
            },

          }
          // if is multiple media, call diff routes and transform diff the response.data
          if (this.multiple) {
            this.$crud.index('apiRoutes.qmedia.find', params).then(response => {
              if(response.data)
                this.files = response.data;
              this.pushData()
            }).catch(error => {})
          } else {
            this.$crud.index('apiRoutes.qmedia.findFirst', params).then(response => {

              if(response.data)
                this.files = [response.data];
              this.pushData()
            }).catch(error => {})
          }

      },

      /**
       * push data to v-model
       * @param file
       */
      pushData(file = false){

        if(this.multiple){
          // if file is not false, its pusher on files list
          if(file)
            this.files.push(file)
          let vmodel = {}, ids = []
          this.files.forEach(file => {
            ids.push(file.id)
          })
          vmodel = JSON.parse(JSON.stringify(this.value))
          if(!vmodel[this.zone])
            vmodel[this.zone] = {}

          vmodel[this.zone].files = ids
          vmodel[this.zone].orders = ids.join();
          this.$emit('input',vmodel)
        }else{
          if(file)
            this.files = [file]
          let vmodel = JSON.parse(JSON.stringify(this.value))
          if(!vmodel[this.zone])
            vmodel[this.zone] = {}
          vmodel[this.zone] = file ? file.id : this.files[0] ? this.files[0].id : ''
          this.$emit('input',vmodel)
          this.modalMedia = false
        }

      },
      /**
       * delete files and push data to the v-model
       * @param index
       */
      deleteFile(index){
        this.files.splice(index, 1)
        this.pushData()
      },
    }

  }
</script>
<style lang="stylus">
  #mediaFormStore
    .q-carousel
      height auto
    .image-multiple
      padding-top 71%
      overflow hidden
      height 0

    .label
      text-transform capitalize

  #modalMedia
    .q-card
      min-width 80vw
      .q-card__section
        max-height calc(100vh - 148px) !important
        overflow-y scroll
</style>
