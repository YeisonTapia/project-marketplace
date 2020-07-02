<template>
  <div id="dynamicFieldComponent" class="relative-position" v-if="success">
    <!--Label-->
    <div class="input-title text-capitalize" v-if="loadField('html') || loadField('multiSelect')">
      {{fieldLabel}}
    </div>
    <!--Crud-->
    <crud v-model="responseValue" @created="getOptions" v-bind="field.props || {}" :key="field.name"
          :type="field.props.crudType || 'select'" ref="crudComponent"
          v-if="loadField('crud') || (field.props && field.props.crudData)"
          :class="`q-mb-xs ${(field.props && field.props.crudType == 'button-create') ? 'absolute-right' : ''}`"/>
    <!--Input-->
    <q-input v-model="responseValue" @keyup.enter="$emit('enter')" v-if="loadField('input')" :label="fieldLabel"
             v-bind="{bgColor:'white', outlined : true, dense : true, ...(field.props || {})}"/>
    <!--Date-->
    <q-input
      v-model="responseValue" :label="fieldLabel" v-if="loadField('date')" v-bind="{
      bgColor:'white', color:'primary', outlined : true, dense : true,
      placeholder:'YYYY/MM/DD', mask:'date', ...(field.props || {})}"
    >
      <template v-slot:append>
        <q-icon name="fas fa-calendar-day"/>
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="responseValue" @input="() => $refs.qDateProxy.hide()"
                  v-bind="{...(field.props || {})}"/>
        </q-popup-proxy>
      </template>
    </q-input>
    <!--Hour-->
    <q-input
      v-model="responseValue" :label="fieldLabel" v-if="loadField('hour')" v-bind="{
      bgColor:'white', color:'primary', outlined : true, dense : true,
      placeholder:'HH:MM', mask:'time', ...(field.props || {})}"
    >
      <template v-slot:append>
        <q-icon name="fas fa-clock"/>
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-time v-model="responseValue" :format24h="false" @input="() => $refs.qDateProxy.hide()"
                  v-bind="{...(field.props || {})}"/>
        </q-popup-proxy>
      </template>
    </q-input>
    <!--Select-->
    <q-select v-model="responseValue" :options="formatOptions" :label="fieldLabel"
              @input="field.props.useChips ? matchTags() : false"
              @filter="(val, update)=>update(()=>{options = $helper.filterOptions(val,rootOptions,responseValue)})"
              v-if="loadField('select')" :loading="loading" use-input v-bind="{
                emitValue : true, mapOptions : true, outlined:true, dense : true,
                bgColor:'white', style:'width: 100%', ...(field.props || {})}">
      <!--No options slot-->
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{$tr('ui.message.notFound')}}
          </q-item-section>
        </q-item>
      </template>
      <!--Option tu multiple prop-->
      <template v-slot:option="scope" v-if="field.props && field.props.multiple">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section>
            <q-checkbox v-model="responseValue" :val="scope.opt.value" :label="scope.opt.label"/>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <!--HTML-->
    <q-field v-model="responseValue" v-if="loadField('html')" label=""
             v-bind="{borderless : true, dense : true, ...(field.props || {})}">
      <q-editor v-model="responseValue" class="full-width" v-bind="{
                  toolbar:editorText.toolbar, contentClass:'text-grey-9', toolbarTextColor:'grey-9',
                  ...(field.props || {})}"/>
    </q-field>
    <!--multiSelect-->
    <q-field v-model="responseValue" v-if="loadField('multiSelect')" label=""
             v-bind="{borderless : true, dense : true, ...(field.props || {})}">
      <recursive-select v-model="responseValue" class="bg-white full-width" :items="options"/>
    </q-field>
    <!--Checkbox-->
    <q-field v-model="responseValue" v-if="loadField('checkbox')" label="" class="checkbox-field"
             v-bind="{borderless : true, dense : true, ...(field.props || {})}">
      <q-checkbox v-model="responseValue" :label="fieldLabel" v-bind="field.props || {}"/>
    </q-field>
    <!--Image-->
    <q-field v-model="responseValue" v-if="loadField('image')" label=""
             v-bind="{borderless : true, dense : true, ...(field.props || {})}">
      <upload-image v-model="responseValue" v-bind="{...(field.props || {})}"/>
    </q-field>
    <!--Media-->
    <q-field v-model="responseValue" v-if="loadField('media')" label=""
             v-bind="{borderless : true, dense : true, ...(field.props || {})}">
      <media v-model="responseValue" class="bg-white" v-bind="{
        multiple : (field.props.zone == 'gallery'), entityId:itemId, ...(field.props || {})}"/>
    </q-field>
    <!--Manage Permission-->
    <manage-permissions v-model="responseValue" class="q-mb-sm" v-if="loadField('permissions')"
                        @input="watchValue" :allow-inherit="field.allowInherit ? true : false"/>
    <!--Manage Settings-->
    <manage-settings v-model="responseValue" class="q-mb-sm" :settings="field.settings"
                     v-if="loadField('settings')" @input="watchValue"/>
  </div>
</template>
<script>
  //Component
  import recursiveSelect from '@imagina/qsite/_components/master/recursiveListSelect'
  import managePermissions from '@imagina/qsite/_components/master/managePermissions'
  import manageSettings from '@imagina/qsite/_components/master/manageSettings'
  import media from '@imagina/qmedia/_components/form'
  import uploadImage from '@imagina/qsite/_components/master/uploadImage'

  export default {
    name: 'dynamicField',
    beforeDestroy() {
      //Close listen event
      if (this.$refs.crudComponent) {
        this.$root.$off(`crudForm${this.$refs.crudComponent.params.apiRoute}Created`)
      }
    },
    props: {
      value: {default: false},
      field: {default: false},
      language: {default: false},
      itemId: {default: ''}
    },
    components: {managePermissions, manageSettings, recursiveSelect, media, uploadImage},
    watch: {
      value(newValue, oldValue) {
        //Order Value
        if (newValue != oldValue)
          this.setDefaultVModel(newValue)
      },
      responseValue(newValue, oldValue) {
        this.watchValue(newValue)
      },
      rootOptions(newValue) {
        this.options = this.rootOptions
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        success: false,//global component status
        loading: false,
        responseValue: null,//value to response
        options: [],//Options
        rootOptions: [],//Options
        editorText: {
          toolbar: [
            ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
            ['link'],
            [
              {
                label: 'Font Size',
                icon: 'format_size',
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
              }
            ],
            ['quote', 'unordered', 'ordered'],
            ['fullscreen']
          ]
        },
      }
    },
    computed: {
      //Return label to field
      fieldLabel() {
        let response = ''
        if (this.field.props && this.field.props.label) {
          response = this.field.props.label
          if (this.field.isTranslatable) response = `${response} (${this.language})`
        }
        return response
      },
      //Return format of datetime
      formatDateTime() {
        let response = ''

        if (this.field.type == 'date') response = 'MMM DD, YYYY'
        if (this.field.type == 'time') response = 'HH:mm a'
        if (this.field.type == 'datetime') response = 'MMM DD, YYYY - HH:mm a'

        return response
      },
      //Convert value of options to string
      formatOptions() {
        let options = this.$clone(this.options)

        //Convert to string
        options.forEach(item => {
          if (item.value || item.value >= 0) item.value = item.value.toString()
        })

        return options
      }
    },
    methods: {
      //initi
      async init() {
        if (this.field.type) {
          this.setDefaultVModel(this.field.value)//Set default values by field type
          this.listenEventCrud()//config dynamic component
          this.success = true//sucess
          //Set options if is type select
          if (['select', 'multiSelect'].indexOf(this.field.type) != -1) {
            if (this.field.loadOptions) {
              await this.getOptions()
            }//Get options
            else if (this.field.props && this.field.props.options) this.rootOptions = this.field.props.options
          }
        }
      },
      //Set default values by type
      setDefaultVModel(value) {
        let propValue = this.$clone(value)
        switch (this.field.type) {
          case 'crud':
            //Get crudProps
            let crudProps = (this.field.props && this.field.props.crudProps) ? this.field.props.crudProps : {}
            //Validate if select is multiple
            if (crudProps.multiple) {
              this.responseValue = []
              //Get filter options
              let filterField = (crudProps.config && crudProps.config.options) ?
                crudProps.config.options : {label: 'title', value: 'id'}
              //if value is array, get id option
              if (propValue && (typeof (propValue) == 'object'))
                propValue.forEach(item => {
                  if (item[filterField.value]) this.responseValue.push(item[filterField.value])
                  else this.responseValue.push(item)
                })
            } else this.responseValue = (propValue && propValue.id) ? propValue.id : propValue
            break;
          case 'input':
            this.responseValue = propValue || null
            break
          case 'html':
            this.responseValue = propValue || ''
            break
          case 'select':
            this.responseValue = (propValue != undefined) ?
              ((propValue && (typeof (propValue) == 'object')) ? propValue : propValue.toString()) : null
            break
          case 'multiSelect':
            this.responseValue = propValue || []
            break
          case 'checkbox':
            this.responseValue = propValue || false
            break
          case 'media':
            this.responseValue = propValue || {}
            break
          case 'permissions':
            this.responseValue = (propValue.length == undefined) ? propValue : {}
            break
          case 'settings':
            this.responseValue = propValue || {}
            break
          default :
            ''
            this.responseValue = propValue || null
            break
        }
        this.orderOptions()//Order Value
      },
      //Order options if is a object
      orderOptions() {
        //If field is select, order values
        if (['select', 'multiSelect'].indexOf(this.field.type) != -1) {
          if (Array.isArray(this.responseValue) && this.responseValue.length) {
            if (this.responseValue[0].id) {
              let values = []
              this.responseValue.forEach(item => {
                values.push(item.id)
              })
              this.responseValue = this.$clone(values)
            }
          }
        }
      },
      //Config dynamic component
      listenEventCrud() {
        setTimeout(() => {
          if (this.field.create && this.field.create.component) {
            let componentCrud = this.$refs.crudComponent
            if (componentCrud) {
              //Activate listen to chanel
              this.$root.$on(`crudForm${componentCrud.params.apiRoute}Created`, async () => {
                this.getOptions()//Get options
              })
            }
          }
        }, 500)
      },
      //Get options if is load options
      getOptions() {
        return new Promise((resolve, reject) => {
          let loadOptions = this.$clone(this.field.loadOptions)
          this.loading = true//Open loading

          //==== Request options
          if (loadOptions.apiRoute) {
            this.rootOptions = []//Reset options
            let fieldSelect = {label: 'title', id: 'id'}

            let params = {//Params to request
              refresh: true,
              params: loadOptions.requestParams || {}
            }

            //add filter
            if (!params.params.filter) params.params.filter = {}
            params.params.filter.allTranslations = true

            //Request
            this.$crud.index(loadOptions.apiRoute, params).then(response => {
              let formatedOptions = []
              //Format response as tree
              formatedOptions = this.$array.select(response.data, loadOptions.select || fieldSelect)

              //Assign options
              this.rootOptions = (this.field.props && this.field.props.options) ?
                this.$clone((this.field.props.options || []).concat(formatedOptions)) : formatedOptions
              this.loading = false
              resolve(true)
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading = false
              reject(true)
            })
            //==== Delayed loading options
          } else if (loadOptions.delayed) {
            loadOptions.delayed.then(response => {
              this.rootOptions = this.$clone(response)
              this.loading = false
              resolve(true)
            }).catch(error => {
              this.loading = false
              resolve(true)
            })
          } else {
            this.loading = false
            resolve(true)
          }
        })
      },
      //Reges to tags
      matchTags() {
        let tags = []
        //only letters and spaces
        this.responseValue.forEach((tag, index) => {
          let tagString = tag.trim()//Trim
          tagString = tagString.match(/^[a-zA-Z\-\s]*$/)//Regex
          if (tagString && tagString.length) tags.push(tagString.join(''))
        })
        this.responseValue = this.$clone(tags)
      },
      //Check if value change
      watchValue() {
        let value = this.$clone(this.value)
        let response = this.$clone(this.responseValue)

        if (JSON.stringify(value) !== JSON.stringify(response)) {
          this.$emit('input', response)
        }
      },
      //Validate if show  field
      loadField(name) {
        let response = false
        let field = this.field

        if (field.type == name) {
          response = true
          if (field.props && (field.props.vIf != undefined)) response = field.props.vIf
        }
        //Response
        return response
      },
    }
  }
</script>
<style lang="stylus">
  #dynamicFieldComponent
    .checkbox-field
      .q-field__control-container
        padding-top 0px !important
</style>
