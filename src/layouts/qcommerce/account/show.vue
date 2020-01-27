<template>
  <div id="pageId" class="q-layout-page layout-order layout-padding">
    <!--TITLE-->
    <h1 class="text-h5 text-primary q-mb-xl font-family-secondary">
      <q-icon v-if="$route.meta.icon" class="q-pr-sm" :name="$route.meta.icon"/>
       Orden N° {{this.$route.params.id}}
    </h1>


    <div class="row q-col-gutter-lg">
      <div class="col-12">

        <q-card class="rounded-sm">
          <h3 class="title-label-order text-center bg-tertiary">
            <div>Información</div>
          </h3>
          <q-card-section class="q-pa-lg">
            <div class="row">
              <div class="col-md-3">
                <div class="text-bold">{{$tr('qcommerce.layout.orderStatus')}}</div>
              </div>
              <div class="col-md-9">
                {{order.statusName}}
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="text-bold">{{$tr('qcommerce.layout.orderDate')}}</div>
              </div>
              <div class="col-md-9">{{(order.createdAt)}}</div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="text-bold">{{$tr('qcommerce.layout.placedFromIP')}}</div>
              </div>
              <div class="col-md-9">{{order.ip}}</div>
            </div>
                    <div class="row">
              <div class="col-md-3">
                <div class="text-bold">{{$tr('ui.form.name')}}</div>
              </div>
              <div class="col-md-9">
                {{order.customer.fullName}}
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="text-bold">{{$tr('ui.form.email')}}</div>
              </div>
              <div class="col-md-9">
                {{order.customer.email}}
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <b>{{$tr('qcommerce.layout.billingAddress')}}</b>
              </div>
              <div class="col-md-9">
                {{order.shippingFirstName}},
                {{order.shippingLastName}},
                {{order.shippingAddress1}},
                {{order.shippingCity}},
                {{order.shippingZipCode}},
                {{order.shippingCountry}}
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <b>{{$tr('qcommerce.layout.paymentInformation')}}</b>
              </div>
              <div class="col-md-9">
                {{order.paymentMethod}}
              </div>
            </div>

          </q-card-section>

        </q-card>
      </div>




      <div class="col-12">

        <q-card class="rounded-sm q-mt-lg">
          <h3 class="title-label-order text-center bg-primary">
            <div>{{$tr('qcommerce.layout.itemsOrdered')}}</div>
          </h3>


          <q-card-section class="q-mt-lg">
            <orderItems :items="order.items"/>
          </q-card-section>


          <q-card-section>

            <div class="row justify-end">
              <div class="col-md-6">
                <div class="text-h6 font-family-secondary text-bold q-mb-md">{{$tr('qcommerce.layout.orderTotal')}}</div>


                <div class="row">
                  <div class="row q-mb-sm full-width">
                    <div class="col-6 ">
                      {{$tr('qcommerce.layout.subtotal')}}
                    </div>
                    <div class="col-6 text-right secondary-font">

                      <!-- $ {{$n(order.total - order.shippingAmount)}} -->
                      $ {{$n(subTotal)}}
                    </div>
                  </div>
                  <div class="row q-mb-sm full-width">
                    <div class="col-6 secondary-font">
                      {{$tr('qcommerce.layout.shipping')}}
                    </div>
                    <div class="col-6 text-right secondary-font">
                      $ {{$n(order.shippingAmount)}}
                    </div>
                  </div>
                  <div class="row q-mb-sm full-width" v-if="discount>0">
                    <div class="col-6 secondary-font">
                      {{$tr('qsubscription.layout.form.checkout.discount')}}
                    </div>
                    <div class="col-6 text-right secondary-font">
                      $ {{$n(discount)}}
                    </div>
                  </div>
                  <div class="row q-mb-sm q-title text-weight-bold full-width">
                    <div class="col-6  secondary-font">
                      {{$tr('qcommerce.layout.form.total')}}
                    </div>
                    <div class="col-6 text-right secondary-font">
                      $ {{$n(order.total)}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>



      </div>
      <div class="col-12">
        <q-card class="rounded-sm q-mt-lg">
          <h3 class="title-label-order text-center bg-tertiary">
            <div>{{$tr('qcommerce.layout.orderHistory')}}</div>
          </h3>

          <q-card-section>
            <order-status-history :items="order.histories" />

          </q-card-section>
        </q-card>
      </div>

    </div>


            <q-dialog v-model="modal">
              <q-card>
                <q-card-section>
                  <div class="text-h6 font-family-secondary">Agregar Estado
                    <div class="float-right">
                      <q-btn round color="primary" icon="close" v-close-popup />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <addStatusOrder @orderHistoryCreated="getOrder()"/>
                </q-card-section>
              </q-card>
            </q-dialog>




    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
import orderStatusHistory from '@imagina/qmarketplace/_components/admin/orders/orderStatusHistory';
import orderItems from '@imagina/qmarketplace/_components/admin/orders/orderItems';
import addStatusOrder from '@imagina/qmarketplace/_components/admin/orders/addStatusOrder'
export default {
  components:{
    orderItems,
    orderStatusHistory,
    addStatusOrder
  },
  data (){
    return {
      loading: false,
      modal: false,
      order : {
        customer: {
          fullName: ''
        },
        items:[],
      }
    }
  },
  computed:{
    subTotal(){
      let subTot=0;
      if(this.order.items.length>0){
        for(var i=0;i<this.order.items.length;i++){
          subTot=parseFloat(subTot)+parseFloat(this.order.items[i].total);
        }//for
      }
      return subTot;
    },
    discount(){
      if(this.order){
        let discont=0;
        if((this.subTotal+parseFloat(this.order.shippingAmount))>parseFloat(this.order.total)){
          discont=(this.subTotal+parseFloat(this.order.shippingAmount))-parseFloat(this.order.total);
        }
        return discont;
      }
    }
  },
  created() {
    this.getOrder()
  },
  methods:{
    getOrder () {
      this.loading = true
      let params = {
        params :{
          filter:{
            key:this.$route.query.key
          }
        }
      }
      let criteria = this.$route.params.id
      this.$crud.show('apiRoutes.qcommerce.orders', criteria , params)
      .then( response => {
        this.order = response.data
        this.loading = false
      })
      .catch( error => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="stylus">
.layout-order
  .title-label-order
    -webkit-transform skew(10deg)
    transform skew(10deg)
    border-radius 10px
    padding 0px 30px
    display inline-block
    min-width 40%
    margin -58px 0 10px 0
    color #FFFFFF
    font-size 20px
    position relative
    font-family $font-secondary
    &:before
      content ''
      background-image url('/statics/img/arrow-down-blue.png')
      position absolute
      right -25px
      width 100%
      height 50px
      background-repeat no-repeat
      background-size contain
      top 27px
      background-position right
    @media screen and (max-width: $breakpoint-md)
      min-width 60%
      font-size 20px
      padding 0 15px
      &:before
          display none !important
    @media screen and (max-width: $breakpoint-sm)
      min-width 60%
      font-size 15px
      padding 0 10px
    & > div
      -webkit-transform  skew(-10deg)
      transform skew(-10deg)

</style>
