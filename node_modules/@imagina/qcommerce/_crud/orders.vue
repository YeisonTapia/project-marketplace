<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qcommerce.orders',
          permission: 'icommerce.orders',
          create: false,
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id'},
              {name: 'total', label: this.$tr('qcommerce.layout.form.total'), field: 'total'},
              {name: 'statusName', label: this.$tr('ui.form.status'), field: 'statusName'},
              {name: 'paymentCity', label: this.$tr('qcommerce.layout.form.city'), field: 'paymentCity'},
              {name: 'paymentCountry', label: this.$tr('qcommerce.layout.form.country'), field: 'paymentCountry'},
              {name: 'email', label: this.$tr('ui.form.email'), field: 'email', style: 'width: 50px'},
              {name: 'shippingMethod', label: this.$tr('qcommerce.layout.form.shippingMethod'), field: 'shippingMethod'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {},
            actions : [
              {
                icon : 'fas fa-info-circle',
                color : 'info',
                route : 'qcommerce.admin.shipping.orders.show',
                action : () => {
                
                }
              }
            ]
          },
          update: false,
          delete: false,
          formLeft: {},
        }
      }
    }
  }
</script>
