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
                                <div class="text-bold">{{$tr('qcommerce.layout.orderStatus')}}: </div>
                            </div>
                            <div class="col-md-9">
                                 {{ order.statusName}}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="text-bold">{{$tr('qcommerce.layout.orderDate')}}: </div>
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
                                <div class="text-bold">Tienda</div>
                            </div>
                            <div class="col-md-6">
                                {{order.storeName}}
                            </div>
                            <div class="col-md-3 col-xs-12 flex flex-center q-my-md" v-if="order.statusId == 4">
                                <q-btn @click="ratingStore=true;" label="Calificar tienda" color="primary" v-if="order.statusId == 4"/>
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
                                <div class="text-h6 font-family-secondary text-bold q-mb-md">
                                    {{$tr('qcommerce.layout.orderTotal')}}
                                </div>


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
                        <order-status-history :items="order.histories"/>

                    </q-card-section>
                </q-card>
            </div>

        </div>


        <q-dialog v-model="modal">
            <q-card>
                <q-card-section>
                    <div class="text-h6 font-family-secondary">Agregar Estado
                        <div class="float-right">
                            <q-btn round color="primary" icon="close" v-close-popup/>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <addStatusOrder @orderHistoryCreated="getOrder()"/>
                </q-card-section>
            </q-card>
        </q-dialog>

        <!-- RATING STORE QDIALOG -->
        <q-dialog v-model="ratingStore" @hide="ratingStore=false">
          <q-card>
            <q-card-section class="text-center">
	            <div class="text-h5">CALIFICACIÓN</div>
            </q-card-section>

            <q-card-section >
	            <div class="text-body2">¿Qué te ha parecido la tienda <b>{{order.storeName}}</b>?</div>

              <div class="flex flex-center">
	              <q-rating size="40px"
                  v-model="ratingValue"
                  :max="5"
	              />
              </div>
	
	            <q-input autofocus class="q-mt-sm" v-model="comment" outlined dense
	                     label="Comentario" type="textarea"/>

            </q-card-section>

            <q-card-actions align="right" style="border-bottom: 1px solid #f2f2f2" class="q-mx-sm q-pb-lg">
              <q-btn @click="rating();commentStore();" label="OK" color="primary"/>
              <q-btn label="Calificar más tarde" outline color="secondary" v-close-popup/>
            </q-card-actions>
	
	          <!--comentarios-->
	          <q-card-section class="text-center">
		          <div class="text-h6">COMENTARIOS</div>
	          </q-card-section>

            <q-card-section>
	            <div v-if="comments.length>0">
		            <q-chat-message
				            text-color="white"
				            bg-color="primary"
				            v-for="(comentary, key) in comments"
				            :key="key"
				            :name="comentary.user.fullName"
				            :avatar="comentary.user.smallImage"
				            :text="[comentary.comment]"
				            :stamp="comentary.diffTime"/>
	            </div>
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
        components: {
            orderItems,
            orderStatusHistory,
            addStatusOrder
        },
        data() {
            return {
                loading: false,
                modal: false,
                ratingStore: false,
                comment: "",
                ratingValue: 1,
                comments: [],
                storeId: null,
                order: {
                    customer: {
                        fullName: ''
                    },
                    items: [],
                }
            }
        },
        computed: {
            subTotal() {
                let subTot = 0;
                if (this.order.items.length > 0) {
                    for (var i = 0; i < this.order.items.length; i++) {
                        subTot = parseFloat(subTot) + parseFloat(this.order.items[i].total);
                    }//for
                }
                return subTot;
            },
            discount() {
                if (this.order) {
                    let discont = 0;
                    if ((this.subTotal + parseFloat(this.order.shippingAmount)) > parseFloat(this.order.total)) {
                        discont = (this.subTotal + parseFloat(this.order.shippingAmount)) - parseFloat(this.order.total);
                    }
                    return discont;
                }
            }
        },
        created() {
            this.getOrder();
        },
        methods: {
            rating() {
                this.$axios.post(config('apiRoutes.marketplace.store') + '/rating/' + this.storeId, {
                    attributes: {
                        rating: this.ratingValue,
                    }
                }).then(response => {
                    this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
                    this.ratingStore = false;
                }).catch(error => {
                    this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
                });
            },//ratingStore
            commentStore() {
                if (this.comment != "") {
                    this.$axios.post(config('apiRoutes.icomments.comments'), {
                        attributes: {
                            comment: this.comment,
                            commentable_id: this.storeId,
                            commentable_type: "Modules\\Marketplace\\Entities\\Store"
                        }
                    }, {
                        headers: {
                            Authorization: this.$store.state.quserAuth.userToken
                        }
                    }).then(response => {
                        this.comment = "";
                        this.$alert.success({message: "Comentario almacenado exitosamente", pos: 'bottom'});
                        this.ratingStore = false;
                        this.getOrder();
                    }).catch(error => {
                        this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
                    });
                }
            },//comment
            getCommentsOfStore() {
                this.$axios.get(config('apiRoutes.icomments.comments'), {
                    params: {
                        filter: {
                            commentableId: this.storeId,
                            commentableType: "Modules\\Marketplace\\Entities\\Store",
                            order: {
                                field: 'created_at',
                                way: 'desc',
                            }
                        },
                        take: 8
                    }
                }).then(response => {
                    this.comments = response.data.data;
                }).catch(error => {
                    this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
                });
            },
            getOrder() {
                this.loading = true
                let params = {
                    params: {
                        filter: {
                            key: this.$route.query.key
                        },
                        includes: 'store'
                    }
                }
                let criteria = this.$route.params.id
                this.$crud.show('apiRoutes.qcommerce.orders', criteria, params)
                    .then(response => {
                        this.order = response.data;
                        this.storeId = response.data.store.id;
                        this.getCommentsOfStore();
                        this.loading = false
		                    if(this.order.statusId == 4){
	                        this.ratingStore = true;
		                    }
                    })
                    .catch(error => {
                        this.loading = false
                    })
            }
        }
    }
</script>
<style lang="stylus">
    #comments-list
        margin-top 30px
        position relative
        &:before
            content ''
            width 2px
            height 100%
            background #c7cacb
            position absolute
            left 32px
            top 0

        &:after
            content ''
            position absolute
            background #c7cacb
            bottom 0
            left 27px
            width 7px
            height 7px
            border 3px solid #dee1e3
            -webkit-border-radius 50%
            -moz-border-radius 50%
            border-radius 50%

        li
            margin-bottom 15px
            display block
            position relative

            &:after
                content ''
                display block
                clear both
                height 0
                width 0

        .comment-avatar
            width 65px
            height 65px
            position relative
            z-index 99
            float left
            border 3px solid #FFF
            -webkit-border-radius 4px
            -moz-border-radius 4px
            border-radius 4px
            -webkit-box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
            -moz-box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
            box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
            overflow hidden

            img
                width 100%
                height 100%

        .comment-box
            width 680px
            float right
            position relative
            -webkit-box-shadow 0 1px 1px rgba(0, 0, 0, 0.15)
            -moz-box-shadow 0 1px 1px rgba(0, 0, 0, 0.15)
            box-shadow 0 1px 1px rgba(0, 0, 0, 0.15)
            width 390px

            &:before
                border-width 11px 13px 11px 0
                border-color transparent rgba(0, 0, 0, 0.05)
                left -12px

        .reply-list:before, .reply-list:after
            display none

        .reply-list
            padding-left 88px
            clear both
            margin-top 15px

            li
                &:before
                    content ''
                    width 60px
                    height 2px
                    background #c7cacb
                    position absolute
                    top 25px
                    left -55px

            .comment-avatar
                width 50px
                height 50px

            .comment-box
                width 610px
                width 320px

        .comment-main-level
            &:after
                content ''
                width 0
                height 0
                display block
                clear both

        .comments-list .comment-box:before, .comments-list .comment-box:after
            content ''
            height 0
            width 0
            position absolute
            display block
            border-width 10px 12px 10px 0
            border-style solid
            border-color transparent #FCFCFC
            top 8px
            left -11px

        .comment-box
            .comment-head
                background #FCFCFC
                padding 10px 12px
                border-bottom 1px solid #E5E5E5
                overflow hidden
                -webkit-border-radius 4px 4px 0 0
                -moz-border-radius 4px 4px 0 0
                border-radius 4px 4px 0 0

                i
                    float right
                    margin-left 14px
                    position relative
                    top 2px
                    color #A6A6A6
                    cursor pointer
                    -webkit-transition color 0.3s ease
                    -o-transition color 0.3s ease
                    transition color 0.3s ease

                    &:hover
                        color #03658c

                span
                    float left
                    color #999
                    font-size 13px
                    position relative
                    top 1px

            .comment-name
                color #283035
                font-size 14px
                font-weight 700
                float left
                margin-right 10px

                a
                    color #283035

                &.by-author
                    &:after
                        content 'autor'
                        background #03658c
                        color #FFF
                        font-size 12px
                        padding 3px 5px
                        font-weight 700
                        margin-left 10px
                        -webkit-border-radius 3px
                        -moz-border-radius 3px
                        border-radius 3px

            .comment-content
                background #FFF
                padding 12px
                font-size 15px
                color #595959
                -webkit-border-radius 0 0 4px 4px
                -moz-border-radius 0 0 4px 4px
                border-radius 0 0 4px 4px

        .comment-box .comment-name.by-author, .comment-box .comment-name.by-author a
            color #03658c

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
            -webkit-transform skew(-10deg)
            transform skew(-10deg)

</style>
