<template>
  <div id="selectQuantityComponent">
    <!--Butotn subtract-->
    <q-btn @click="subtract()" icon="remove" color="grey-4"/>
    <!--Input-->
    <q-input v-model="response" type="number"
             @focus="tmpResponse = response"
             @keyup.enter="vEnter()" @blur="vBlur()"/>
    <!--Butotn add-->
    <q-btn @click="add()" icon="add" color="grey-4"/>
  </div>
</template>
<script>
  import _cloneDeep from 'lodash.clonedeep'

  export default {
    props: {
      value: {default: 1},
      min: {type: Number, default: 1},
      max: {type: Number, default: 9999},
    },
    components: {},
    watch: {
      value() {
        this.init()
      },
      response(newValue, oldValue) {
        if (newValue != oldValue) this.vEmit()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        response: 0,
        tmpResponse: 0
      }
    },
    methods: {
      //Init form
      init() {
        this.response = _cloneDeep(this.value)
        this.checkValue()
      },
      //Check if response is between min and max
      checkValue() {
        if (parseInt(this.response) < parseInt(this.min)) {
          this.response = this.min
          return false
        }
        if (parseInt(this.response) > parseInt(this.max)) {
          this.response = this.max
          return false
        }
        return true
      },
      //Subtract to response
      subtract() {
        if (parseInt(this.response) > parseInt(this.min)) {
          this.response--
          this.vBtn()
        } else this.response = this.min
      },
      //Add to response
      add() {
        if (parseInt(this.response) < parseInt(this.max)) {
          this.response++
          this.vBtn()
        } else this.response = this.max
      },
      //Emit input event
      vEmit() {
        if (this.checkValue()) this.$emit('input', this.response)
      },
      //Emit blur event
      vBlur() {
        if (this.tmpResponse != this.response) this.$emit('blur', this.response)
      },
      //Emit enter event
      vEnter() {
        if (this.tmpResponse != this.response) this.$emit('enter', this.response)
      },
      //Emit btn action event
      vBtn() {
        this.$emit('btn', this.response)
      }
    }
  }
</script>
<style lang="stylus">
  #selectQuantityComponent
    .q-btn
      border-radius 0px !important
      color $grey-8 !important
      min-height 27px !important
      width 27px !important
      padding 0px

    .q-input
      display inline-flex
      padding 0px

      input
        width 45px
        height 15px
        text-align center
</style>
