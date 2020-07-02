<template>
  <div id="recursiveListOptionsComponent">
    <div v-for="(option, index) in optionsList" v-if="optionsList.length" :key="index">
      <div class="content-option" v-if="option.productOptionValues &&  option.productOptionValues.length">
        <!--Title Option-->
        <div class="title-option q-title q-mb-sm">
          <q-icon name="fas fa-caret-right" color="primary"></q-icon>
          {{option.description}}
          <q-chip pointing="left" v-if="option.required"
                  icon="fas fa-exclamation-triangle"
                  color="negative" class="chip-required">
            Opción requerida
          </q-chip>
        </div>
        <!-- If option type is select -->
        <div v-if="option.type == 'select'">
          <tree-select
            v-model="section[option.id].singleOption"
            :options="getOptionsSelect(option.productOptionValues)"
            placeholder="Select a option..."
            @input="setOptions(option.id,[section[option.id].singleOption])"
          />
        </div>
        <!-- If option type is radio -->
        <div v-if="option.type == 'radio'" class="row text-center">
          <div v-for="(value, key) in option.productOptionValues" class="col-12 col-md-4" :key="key">
            <!--Image-->
            <img :src="value.mainImage.path" style="cursor: pointer"
                 @click="section[option.id].singleOption = value.optionValueId;
                  setOptions(option.id,[section[option.id].singleOption])"
                 v-if="value.mainImage && value.mainImage.path"> <br>
            <!--Radio-->
            <q-radio v-model="section[option.id].singleOption" :val="value.optionValueId"
                     @input="setOptions(option.id,[section[option.id].singleOption])">
              <p class="inline-block q-body-2 q-pl-xs q-ma-none">{{getLabel(value)}}</p>
            </q-radio>
          </div>
        </div>
        <!-- If option type is checkbox -->
        <div v-if="option.type == 'checkbox'">
          <q-checkbox
            @input="setOptions(option.id,section[option.id].multiOption)"
            style="display: block;"
            v-for="(value, index2) in option.productOptionValues"
            :key="index2"
            v-model="section[option.id].multiOption"
            :true-value="value.optionValueId"
            false-value=""
            :val="value.optionValueId">
            <p class="inline-block q-subheading q-ma-none">{{getLabel(value)}}</p>
          </q-checkbox>
        </div>
      </div>
      <!--Children options-->
      <div v-if="section[option.id].singleOption && (option.children && option.children.length)">
        <productOptionValues
          v-model="section[option.id].children"
          @input="vEmit()"
          :options="option.children"
          :additional-price="additionalPrice"
          :parentOptionValueId="section[option.id].singleOption"/>
      </div>
    </div>
  </div>
</template>

<script>
  //Plugins
  import _cloneDeep from 'lodash.clonedeep'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'productOptionValues',
    components: {Treeselect},
    props: {
      options: {default: () => []},
      parentOptionValueId: {default: 0,},
      additionalPrice: {default: true}
    },
    watch: {
      options() {
        this.init()
      },
      parentOptionValueId() {
        this.init()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        section: {},
        section: {},
        optionsList: []
      }
    },
    computed: {
      initData() {
        return {
          optionId: null,
          singleOption: null,
          multiOption: [],
          selectedOptions: [],
          required: false,
          children: {},
          response: {
            options: [],
            total: 0,
            required: false
          }
        }
      }
    },
    methods: {
      //init component
      init() {
        this.orderOptions()//Order Options
        this.addValuesOption()//add mirror for any section
        this.vEmit()//Emmit
      },
      //Order options acording to parent option value
      orderOptions() {
        this.optionsList = []//Init options list
        let options = _cloneDeep(this.options)
        let parentValue = _cloneDeep(parseInt(this.parentOptionValueId))

        //Get just options that match with parent option value
        if (parentValue) {
          options.forEach((opt, i) => {
            let optionValues = []
            opt.productOptionValues.forEach((optValue, j) => {
              if (parseInt(optValue.parentOptionValueId) == parentValue)
                optionValues.push(options[i].productOptionValues[j])
            })
            options[i].productOptionValues = optionValues
          })
          this.optionsList = _cloneDeep(options)
        } else {//Same options
          this.optionsList = _cloneDeep(this.options)
        }
      },
      //Add values to option
      addValuesOption() {
        this.section = {}//init section
        this.optionsList.forEach(item => {
          let optionData = _cloneDeep(this.initData)
          optionData.required = item.required ? true : false
          optionData.optionId = item.id
          this.$set(this.section, item.id, optionData)
        })
      },
      //Set option
      setOptions(optionId, valuesId) {
        //Reset local values
        let options = _cloneDeep(this.section[optionId].response.options = [])
        let total = _cloneDeep(this.section[optionId].response.total = 0)

        //Add option selected and total
        if (valuesId.length) {
          let option = _cloneDeep(this.optionsList.find(item => item.id == optionId))
          valuesId.forEach(valueId => {
            if (valueId) {
              let value = option.productOptionValues.find(item => item.optionValueId == valueId)
              options.push(value)//add option
              //Sum or less to total
              total += parseInt(value.pricePrefix + value.price)
            }
          })
        }
        //Set new values to response
        this.section[optionId].response.options = _cloneDeep(options)
        this.section[optionId].response.total = _cloneDeep(total)
        this.vEmit()//Emmit result
      },
      //Conver options to format select
      getOptionsSelect(options) {
        if (options && options.length) {
          let response = this.$helper.array.tree(options, {label: 'optionValue', id: 'optionValueId'})
          //Add price to label
          response.forEach((item, index) => {
            let valueOption = options.find(opt => opt.optionValueId == item.id)
            if (valueOption && this.additionalPrice) {
              response[index].label +=
                ('  (' + valueOption.pricePrefix + '$' + this.$n(valueOption.price) + ')')
            }
          })
          return response
        } else return []
      },
      //Return label with price
      getLabel(data) {
        if (this.additionalPrice) return `${data.optionValue} (${data.pricePrefix}$${this.$n(data.price)})`
        else return data.optionValue
      },
      //Emit options selected and total
      vEmit() {
        var sections = _cloneDeep(this.section)
        var options = []
        var total = 0
        var required = false

        //Order options selected
        Object.values(sections).forEach(section => {
          let isSelected = (section.singleOption || section.multiOption.length) ? true : false
          options = options.concat(section.response.options)//add all options
          total += parseInt(section.response.total)//Sum total
          let option = this.optionsList.find(item => item.id == section.optionId)
          if (!isSelected && section.required && option.productOptionValues.length) required = true//Set required

          //Merge with response of children
          if (isSelected && section.children.options)
            options = options.concat(section.children.options)
          if (isSelected && section.children.total)
            total += parseInt(section.children.total)
          if (isSelected && section.children.required) required = true
        })

        //Emmit response
        this.$emit('input', {options: options, total: total, required: required})
      },
    },
  }
</script>

<style lang="stylus">
  #recursiveListOptionsComponent
    .chip-required
      min-height 16px !important
      height 25px

      &:before
        left 3px

      .q-chip-side
        margin-right 0px

        .q-icon
          font-size 13px

    .content-option
      border-bottom 1px solid $grey-4
      padding 15px 0px

      .title-option
        text-align left
</style>
