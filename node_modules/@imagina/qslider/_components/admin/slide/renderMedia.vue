<template>
  <div class="q-mt-md">
    <q-card class="my-card">
      <q-item>
        <q-item-section class="q-py-sm ">
          <q-item-label>
            <q-chip
              square
              icon="fas fa-images"
              text-color="white"
              :color="slide.active ? 'positive' : 'grey'">
              {{slide.title}}
            </q-chip>
          </q-item-label>
          <div class="absolute-right q-mt-sm q-mr-sm q-gutter-x-sm">
            <q-btn
              :to="{name: 'qslider.admin.slide.update', params:{sliderId: $route.params.id, id: slide.id}}"
              color="blue-4"
              size="sm"
              round
              icon="fas fa-pen"/>
            <q-btn
              @click="deleteSlideDialog(slide.id, index)"
              color="negative"
              size="sm"
              round
              icon="far fa-trash-alt"/>
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
      <iframe
        v-if="~slide.imageUrl.indexOf('youtube.com')"
        width="100%"
        height="300"
        :src="slide.imageUrl"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      <video
        width="100%"
        height="300"
        v-else-if="~slide.imageUrl.indexOf('.mp4')"
        class='img-responsive center-block'
        loop
        controls='false'>
        <source :src="slide.imageUrl" type='video/mp4'>
      </video>
      <div
        v-else
        :style="`
        background: url('${slide.imageUrl}');
        background-size: cover;
        background-position: center;
        height: 300px;
        display: block;
        max-width: 100%;`">
      </div>
    </q-card>
  </div>
</template>

<script>
  export default {
    props:{
      slide:{
        type: Object,
        default: ()=>({
          imageUrl: '',
        }),
        required: true
      },
      index:{
        type: Number,
        required: true
      }
    },
    methods:{
      deleteSlideDialog(slideId, pos){
        this.$q.dialog({
          title: 'Confirm',
          ok: 'Delete',
          message: 'You are sure to eliminate this slide?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteSlide(slideId, pos)
        }).onCancel(() => {})
      },
      deleteSlide (slideId, pos) {
        this.$crud.delete('apiRoutes.qslider.slides', slideId).then(response => {
          this.$alert.info({ message: this.$tr('ui.message.recordDeleted') })
          //this.slider.slides.splice(pos, 1)
          this.$root.$emit('deleteSlide', 'deleteSlide')
        }).catch(error => {
          this.$alert.error({ message: this.$tr('ui.message.recordNoDeleted'), pos: 'bottom' })
        })
      },
    }
  }
</script>
