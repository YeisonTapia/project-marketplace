<template>
  <div class="row relative-position">
    <div class="col-12">
      <div>
        <div class="flex justify-end">
          <q-btn
            v-if="slider.id"
            :to="{name: 'qslider.admin.slide.create', params:{sliderId: slider.id}}"
            icon="fas fa-plus"
            color="positive"
            class="btn-small no-shadow"
            :label="$tr('qslider.layout.newSlide')"/>
        </div>
        <draggable
          @change="updateOrderSlides"
          v-model="slider.slides"
          group="slides">
            <renderMedia
              style="cursor: move"
              :slide="slide"
              :index="index"
              v-for="(slide,index) in slider.slides"
              :key="'slide'+index"/>
        </draggable>
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import renderMedia from '@imagina/qslider/_components/admin/slide/renderMedia'
  import draggable from 'vuedraggable'
  
  export default {
    components:{
      draggable,
      renderMedia
    },
    data () {
      return {
        loading: false
      }
    },
    props:{
      slider:{
        type: Object,
        default: () => ({
          id: 0,
        })
      },
    },
    watch:{
    
    },
    methods:{
      hasPermissionRecordMAster (record) {
        let options = record.options || false
        let response = {
          create: true,
          edit: true,
          index: true,
          destroy: true,
        }
        if (options && parseInt(options.masterRecord)) {
          response = {
            create: this.$auth.hasAccess('isite.master.records.create'),
            edit: this.$auth.hasAccess('isite.master.records.edit'),
            index: this.$auth.hasAccess('isite.master.records.index'),
            destroy: this.$auth.hasAccess('isite.master.records.destroy')
          }
        }
        return response
      },
      log(){
        let slides = this.slider.slides.map( slide => ({id: slide.id}))
        console.error(slides)
      },
      updateOrderSlides(){
        let slides = this.slider.slides.map( slide => ({id: slide.id}))
        let data = {
          slider:slides
        }
        this.loading = true
        this.$crud.create('apiRoutes.qslider.orderSlides', data).then( response => {
          this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
          this.loading = false
        }).catch( error => {
          this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
          console.warn( error )
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
