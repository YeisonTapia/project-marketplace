<template>
  <div class="q-mt-lg">
    <p>
      <b>New status</b>
    </p>
    <q-field
      helper="Helper"
      :error="$v.form.status.$error"
      error-label="We need a valid email">
      Status
      <tree-select v-model="form.status" :options="statuses"/>
    </q-field>

    <q-field
      helper="Helper"
      :error="$v.form.comment.$error"
      error-label="We need a valid email">
      <q-input  rows="3" type="textarea" v-model="form.comment" stack-label="Comment"/>
    </q-field>

    <div class="q-mt-md">
      <q-btn label="save" color="primary" icon="save" @click="saveOrderHistoryStatus()"/>
    </div>

  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        loading: false,
        statuses:[],
        form :{
          orderId: this.$route.params.id,
          status:null,
          notify: false,
          comment:''
        }
      }
    },
    validations: {
      form: {
        orderId: { required },
        status: { required },
        comment: { required },
      }
    },
    created(){
      this.getStatus()
    },
    methods: {
      getStatus(){
        let params= {
          params :{

          }
        }
        this.$crud.index('apiRoutes.qcommerce.orderStatus', params)
          .then( response => {
            this.statuses =  response.data.map( item => {
              return {
                id: item.id,
                label: item.title
              }
            })
          })
          .catch( error => {

          })
      },
      saveOrderHistoryStatus(){
        this.$v.form.$touch()
        this.loading = true
        if (this.$v.form.$error) {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
          this.loading = false
          return
        }
        this.$crud.create('apiRoutes.qcommerce.orderStatusHistory', this.form)
          .then( response => {
            this.$emit('orderHistoryCreated')
            this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
            this.clearForm()
            this.loading = false
          })
          .catch( error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
        })
      },
      clearForm(){
        this.form.comment = ''
        this.form.status = null
      }
    }
  }
</script>
