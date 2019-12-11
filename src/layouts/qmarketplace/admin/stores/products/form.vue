<template>
  <div id="productFormPage" ref="productFormPage" class="store-page store-product">
    <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Crear Producto</div>

    <div class="full-width"></div>
    <q-no-ssr>
      <!--Content-->
      <div class="">
        <!--Data-->
        <!--Data-->
        <q-form autocorrect="off" autocomplete="off" ref="formContent" class="box"
                @submit="(!itemId && !field) ? createItem() : updateItem()"
                @validation-error="$alert.error($tr('ui.message.formInvalid'))">

                  <q-card  class="rounded-md q-my-lg" v-if="success">

            <q-card-section class="q-px-xl q-py-none form-general">

              <div class="row q-col-gutter-lg justify-center">

                <div class="col-12">
                  <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 q-pt-none card-border-right"  v-if="locale.success">

                    <!--name-->
                    <div class="q-mt-xl q-mb-lg">
                      <p class="caption q-mb-sm">{{$tr('ui.form.name')}} ({{locale.language}})*</p>
                      <q-input v-model="locale.formTemplate.name" @input="setSlug()" dense
                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"    />

                    </div>
                    <!--Slug-->
                    <div class="q-mb-lg">
                      <p class="caption q-mb-sm">{{$tr('ui.form.slug')}} ({{locale.language}})*</p>
                      <q-input v-model="locale.formTemplate.slug" dense
                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"    />
                    </div>
                    <!--Sumario-->
                    <div class="q-mb-lg">
                      <p class="caption q-mb-sm">Descripción corta ({{locale.language}})*</p>
                      <q-input v-model="locale.formTemplate.summary" dense type="textarea"
                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"  rows="1"  />


                    </div>
                    <!--Description-->
                    <div class="q-mb-xl">
                      <p class="caption q-mb-sm">Descripción completa ({{locale.language}})*</p>
                       <q-editor v-model="locale.formTemplate.description" class="full-width"
                                :toolbar="editorText.toolbar" content-class="text-grey-9" toolbar-text-color="grey-9"/>
                    </div>

                    <p class="caption q-mb-md">Imagen
                      <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                        <q-tooltip>
                          Some text as content of Tooltip
                        </q-tooltip>
                      </q-btn>
                    </p>
                    <div class="row q-col-gutter-md" >
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 relative-position img-product">
                        <upload-media
                          v-model="locale.formTemplate.mediasSingle"
                          entity="Modules\Icommerce\Entities\Product"
                          :entity-id="productId ? productId : null"
                          zone='mainimage'
                        />
                        <div class="img-message">Imagen Principal</div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 relative-position">
                        <upload-media
                          multiple
                          v-model="locale.formTemplate.mediasMulti"
                          entity="Modules\Icommerce\Entities\Product"
                          :entity-id="productId ? productId : null"
                          zone='gallery'
                        />
                        <div class="img-message"> <i class="fas fa-plus"></i>Añadir Imagenes</div>
                      </div>
                    </div>
                    <!--Video-->
                    <div class="q-my-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.video')}}
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="locale.formTemplate.options.video" dense placeholder="https://youtube.com" />
                    </div>

                </div>
                <!--Form right-->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 q-pt-none" v-if="locale.success">

                  <!--Status-->
                  <div class="q-my-xl">
                    <p class="caption q-mb-sm">{{$tr('ui.form.status')}}</p>
                    <tree-select
                      :clearable="false"
                      :append-to-body="true"
                      :options="options.status"
                      value-consists-of="BRANCH_PRIORITY"
                      v-model="locale.formTemplate.status"
                      placeholder=""
                    />
                  </div>

                  <!--Category-->
                  <div class="q-my-xl">
                    <p class="caption q-mb-sm">{{$tr('ui.form.category')}} Principal*
                    </p>
                     <tree-select
                      :clearable="false"
                      :append-to-body="true"
                      class="q-mb-md"
                      :options="optionsTemplate.categories"
                      value-consists-of="BRANCH_PRIORITY"
                      v-model="locale.formTemplate.categoryId"
                      placeholder=""
                    />
                  </div>
                  <!--Categories-->
                  <div class="q-my-xl">
                    <p class="caption q-mb-sm">
                      {{$trp('ui.form.category')}}
                    </p>
                   <recursive-list v-model="locale.formTemplate.categories"
                              :items="optionsTemplate.categories"/>
                  </div>

                </div>
              </div>

            </q-card-section>
          </q-card>

        </q-form>

        <!--Extra Data-->
        <q-card class="rounded-md q-mb-xl" v-if="locale.success">

          <q-card-section class="q-px-xl q-pt-xl form-general">

            <div class="row q-col-gutter-xl justify-center">
              <!-- Left -->
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                <div class="text-h5 text-weight-bold text-primary q-pb-md text-capitalize">{{$tr('ui.label.data')}}</div>
                <!--Price-->
                <div class="q-mb-xl">
                  <p class="caption q-mb-sm">{{$tr('ui.form.price')}}</p>
                  <q-input v-model="locale.formTemplate.price" dense type="number"/>
                </div>
                <!--Quantity-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$tr('ui.form.quantity')}}</p>
                  <q-input dense v-model="locale.formTemplate.quantity" type="number"/>
                </div>
                <!--weight-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$tr('ui.form.weight')}}</p>
                  <q-input v-model="locale.formTemplate.weight"
                         dense type="number"/>
                </div>
                <!--length-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$tr('ui.form.length')}}</p>
                  <q-input v-model="locale.formTemplate.length"
                          dense type="number"/>
                </div>
                <!--width-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$tr('ui.form.width')}}</p>
                  <q-input v-model="locale.formTemplate.width"  dense type="number"/>
                </div>
                <!--height-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$tr('ui.form.height')}}</p>
                  <q-input v-model="locale.formTemplate.height"   dense type="number"/>
                </div>
              </div>
              <!-- Right -->
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

                <!--reference-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$tr('ui.form.reference')}}</p>
                  <q-input v-model="locale.formTemplate.reference" dense  />
                </div>

                <div>
                <!--Status-->
                <q-toggle
                true-value="1"
                false-value="0"
                v-model="locale.formTemplate.stockStatus"
                color="primary"
                label="En stock"
                />
                </div>
                <!--minimum-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$tr('qcommerce.layout.form.minimumOrder')}}</p>
                  <q-input  dense
                         type="number" v-model="locale.formTemplate.minimum"/>
                </div>

                <!--Points-->
                <div class="q-my-xl">
                  <p class="caption q-mb-sm">{{$trp('ui.form.point')}}</p>
                  <q-input v-model="locale.formTemplate.points" dense />
                </div>

                <div class="" v-if="canEnableProductToHome">
                  <q-checkbox
                  v-model="locale.formTemplate.visible"
                  color="primary"
                  label="Agregar producto a la página inicial de 'Donde esta esa vaina'"
                  true-value="1"
                  false-value="0"
                  />
                  <p class="text-primary text-caption q-pl-xl">Disponibles ({{quantityProductsToHome}})</p>
                </div>
                <div class="" v-else-if="locale.formTemplate.visible==1">
                  <q-checkbox
                  v-model="locale.formTemplate.visible"
                  color="primary"
                  label="Agregar producto a la página inicial de 'Donde esta esa vaina'"
                  true-value="1"
                  false-value="0"
                  />
                </div>
                <!-- <div class="text-primary text-caption q-pl-xl">Disponibles(2)</div> -->

                <div class="q-mb-xl"></div>

                <!--  product options -->
                <q-btn v-if="productId"
                  color="primary" size="lg" no-caps class="rounded-sm text-caption" :loading="loading"
                  label="Opciones de producto" @click="optionProducts=true;"
                />

                <q-dialog transition-show="rotate" transition-hide="rotate" full-height full-width  @hide="optionProducts=false" v-model="optionProducts" ref="modalRef">

                  <q-card>

                  <crud-options :productId="productId" v-if="productId"/>
                  <div v-else class="text-center">
                    <div class="q-my-md">
                      <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
                      {{`${$tr('qcommerce.layout.message.warnAddOpt')}...`}}
                    </div>
                    <q-btn icon="fas fa-save" :label="options.btn.saveAndEdit"
                           @click="buttonActions.value = 4; createItem()" color="positive"/>
                  </div>

                </q-card>

                </q-dialog>


              </div>
            </div>

          </q-card-section>
        </q-card>

        <!--SEO-->
        <q-card class="rounded-md q-mb-xl" v-if="locale.success">
          <q-card-section class="q-px-xl q-pt-lg form-general">
            <q-expansion-item >
              <template v-slot:header>
                <q-item-section>
                  <p class="caption q-mb-none cursor-pointer">
                    <q-icon name="fas fa-caret-right" size="md" color="primary" style="margin-left: -15px;" /> Editar SEO
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                      <q-tooltip>
                        Meta título y meta descripción para el SEO del sitio
                      </q-tooltip>
                    </q-btn>
                  </p>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section>

                    <div class="row q-col-gutter-xl justify-center">
                      <!-- Left -->
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                        <!--Meta Title-->
                        <div class="q-my-lg">
                          <p class="text-subtitle1 q-mb-none">{{$tr('ui.form.metaTitle')}} ({{locale.language}})*</p>
                          <q-input v-model="locale.formTemplate.metaTitle"
                               :rules="[val => !!val || $tr('ui.message.fieldRequired')]" />
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

                        <!--Meta Description-->
                        <div class="q-my-lg">
                          <p class="text-subtitle1 q-mb-none">{{$tr('ui.form.metaDescription')}} ({{locale.language}})*</p>
                          <q-input v-model="locale.formTemplate.metaDescription" type="textarea" class="meta-description"
                            :rules="[val => !!val || $tr('ui.message.fieldRequired')]" rows="2"/>
                        </div>

                      </div>
                    </div>

                </q-card-section>
              </q-card>

            </q-expansion-item>

          </q-card-section>
        </q-card>


        <!--RELATED-->
        <q-card class="rounded-md q-mb-xl" v-if="locale.success">
          <q-card-section class="q-px-xl q-pt-lg ">

            <q-expansion-item >
              <template v-slot:header>
                <q-item-section>
                  <div class="form-general">
                    <p class="caption q-mb-none">
                      <q-icon name="fas fa-caret-right" size="md" color="primary" style="margin-left: -15px;" />
                      {{$tr('qcommerce.layout.form.relatedProducts')}}
                      <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                        <q-tooltip>
                          Items relacionados al producto
                        </q-tooltip>
                      </q-btn>
                    </p>
                  </div>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section>

                  <tree-select
                      v-model="locale.formTemplate.relatedProducts"
                      :async="true"
                      :multiple="true"
                      :append-to-body="true"
                      :load-options="searchProducts"
                      :default-options="optionsTemplate.relatedProducts"
                      placeholder=""
                  />

                </q-card-section>
              </q-card>

            </q-expansion-item>
          </q-card-section>
        </q-card>

        <div class="full-width q-my-lg"></div>

        <!--Buttons Actions-->
        <q-page-sticky position="bottom-right" :offset="[40, 30]">
          <!--Update button-->
          <q-btn
            v-if="productId" class="bg-primary text-white btn-arrow-send-pink"
            color="primary" :loading="loading"
            icon="fas fa-edit" :label="$tr('ui.label.update')" @click="updateItem()"
          />
          <!--Save button-->
          <q-btn-dropdown class="bg-primary text-white btn-arrow-send-pink" :label="buttonActions.label" split v-else :loading="loading" color="primary" icon="fas fa-save" @click="createItem()" rounded align="right">

            <q-list>
              <q-item clickable @click.native="buttonActions = {label : options.btn.saveAndReturn, value : 1}"
                      v-close-popup>
                <q-item-section>
                  {{options.btn.saveAndReturn}}
                </q-item-section>
              </q-item>
              <q-item clickable @click.native="buttonActions = {label : options.btn.saveAndEdit, value : 2}"
                      v-close-popup>
                <q-item-section>
                  {{options.btn.saveAndEdit}}
                </q-item-section>
              </q-item>
              <q-item clickable @click.native="buttonActions = {label : options.btn.saveAndCreate, value : 3}"
                      v-close-popup>
                <q-item-section>
                  {{options.btn.saveAndCreate}}
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-page-sticky>

        <!--Loading-->
        <inner-loading :visible="loading"/>
      </div>
    </q-no-ssr>
  </div>
</template>

<script>
  //Components
  // import locales from '@imagina/qsite/_components/locales'
  import uploadMedia from 'src/components/qmedia/form'
  import recursiveList from 'src/components/master/recursiveListSelect'
  // import uploadMedia from '@imagina/qmedia/_components/form'
  import crudOptions from '@imagina/qcommerce/_components/admin/products/crudOptions'
  //Plugins
  import { scroll } from 'quasar'
  const { getScrollTarget, setScrollPosition } = scroll
  export default {
    components: {
      crudOptions,
      recursiveList,
      uploadMedia,
    },
    watch: {
      $route (to, from) {
        this.initForm()
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.initForm();
      });
    },
    data () {
      return {
        locale: {},
        vTab: 'tab-data',
        loading: false,
        loadingCategory: false,
        success: false,
        productId: false,
        optionProducts: false,
        canCreateProduct: false,
        canEnableProductToHome: false,
        quantityProductsToHome:0,
        quantityProductsCanCreate:0,
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
        optionsTemplate: {
          categories: [],
          products: [],
          relatedProducts: []
        },
        buttonActions: { label: '', value: 1 },
        modalShow: {
          category: false
        }
      }
    },
    computed: {
      //Data locale component
      dataLocale () {
        return {
          fields: {
            // storeId:this.$route.params.storeId,
            storeId:this.$store.state.qmarketplaceStores.storeSelected,
            parentId: null,
            status: 0,
            categoryId: null,
            categories: [],
            addedById: this.$store.state.quserAuth.userId,
            sku: 0,
            quantity: 0,
            visible: 0,
            stockStatus: 1,
            price: 0,
            dateAvailable: this.$moment().format('YYYY-MM-DD'),
            weight: 0,
            length: 0,
            width: 0,
            height: 0,
            minimum: 1,
            reference: null,
            shipping: false,
            subtract: false,
            freeshipping: false,
            orderWeight: 0,
            rating: 3,
            points: 0,
            relatedProducts: [],
            productOptions: [],
            mediasSingle: {},
            mediasMulti: {},
            options: {
              masterRecord: 0,
              video: null
            },
            //taxClassId: null,
            //manufacturerId: null,
          },
          fieldsTranslatable: {
            name: '',
            slug: '',
            summary: '',
            description: '',
            metaTitle: '',
            metaDescription: '',
          },
        }
      },
      //Check if update options
      updateOptions () {
        if (this.$route.params.editOptions) {
          setTimeout(() => {
            this.vTab = 'tab-options'
            let target = getScrollTarget(this.$refs.productFormPage)
            let offset = this.$refs.productFormPage.scrollHeight
            setScrollPosition(target, offset, 1000)
          }, 500)
        }
      },
      //Options translatables
      options () {
        return {
          status: [
            { label: "Habilitado", id: 1 },
            { label: "Deshabilitado", id: 0 }
          ],
          stockStatus: [
            { label: this.$tr('ui.label.available'), id: 1 },
            { label: this.$tr('ui.label.soldOut'), id: 0 }
          ],
          btn: {
            saveAndReturn: this.$tr('ui.message.saveAndReturn'),
            saveAndEdit: this.$tr('ui.message.saveAndEdit'),
            saveAndCreate: this.$tr('ui.message.saveAndCreate'),
          }
        }
      },
      //Has manage master record
      canManageRecordMaster () {
        let response = true
        if (this.productId && !this.$auth.hasAccess('isite.master.records.edit')) {
          response = false
          //Validate if record is master
          let record = this.locale.formTemplate
          if (record && record.options && parseInt(record.options.masterRecord)) {
            this.$router.push({ name: 'app.home' })
          }
        }
        if (!this.productId && !this.$auth.hasAccess('isite.master.records.create')) {
          response = false
        }
        return response
      }
    },
    methods: {
      getSuscription(){
        this.loading = true
        let params={
          params:{
            include:'plan.features',
            filter:{
              userId:this.$store.state.quserAuth.userId,
              visible:1
            }
          }
        };
        this.$crud.index("apiRoutes.qsubscription.suscriptions",params).then(response => {
          /*
          console.log('Subscription data');
          console.log(response.data);
          */
          //response.data.plan.features ; id=12 Producto visible en la página value 2 , id:4 Productos y categorías en su tienda, id:44 Productos y categorías ilimitadas
          this.canCreateProduct=false;//Puede crear productos.
          this.canEnableProductToHome=false;//Puede hacer visible productos para el home.
          this.quantityProductsToHome=0;//Cantidad de productos que pueden estar visibles en la página principal
          this.quantityProductsCanCreate=0;//Cantidad de productos que puede crear.
          if(response.data.length>0){
            for(var i=0;i<response.data[0].plan.features.length;i++){
              //Cantidad de productos visibles en la página principal
              if(response.data[0].plan.features[i].id==12){
                this.canEnableProductToHome=true;//Puede hacer visible productos para el home.
                this.quantityProductsToHome=response.data[0].plan.features[i].value;
              }//if
              //Cantidad de productos que puede crear
              if(response.data[0].plan.features[i].id==44){
                this.canCreateProduct=true;
                this.quantityProductsCanCreate=999999999999999;
              }else if(!this.canCreateProduct && response.data[0].plan.features[i].id==4){
                this.canCreateProduct=true;
                this.quantityProductsCanCreate=response.data[0].plan.features[i].value;
              }
            }//for features of plan
            /*
            console.log('Can create product');
            console.log(this.canCreateProduct);
            console.log('Can enable product to home');
            console.log(this.canEnableProductToHome);
            console.log('QUantity of products to home');
            console.log(this.quantityProductsToHome);
            console.log('quantity products can create');
            console.log(this.quantityProductsCanCreate);//
            */
            if(!this.canCreateProduct){
              this.$alert.error({ message: "No puedes crear más productos.", pos: 'bottom' })
              this.$router.push({ name: 'qmarketplace.admin.stores.my.store.products', params: {  }})
            }
            this.validateProductsVisibleOfStore();
          }//if(response.data.length>0){
            this.loading = false
        });
      },
      validateProductsVisibleOfStore(){
        if(this.canEnableProductToHome){
          //Axios products visible of store
          this.$crud.index("apiRoutes.qcommerce.products",{
            params:{
              filter:{
                store: this.$store.state.qmarketplaceStores.storeSelected,
                status:1
              }
            }
          }).then(response => {
            if(response.data.length>0){
              this.quantityProductsToHome=this.quantityProductsToHome-response.data.length;
              if(this.quantityProductsToHome<=0){
                this.canEnableProductToHome=false;
              }
            }
          });
        }//if(this.canEnableProductToHome){
      },
      //Init Form
      async initForm () {
        this.loading = true
        this.success = false//Disable status of page
        this.vTab = 'tab-data'
        this.buttonActions = { label: this.options.btn.saveAndReturn, value: 1 }
        this.locale = this.$clone(this.dataLocale)//Add fields
        this.productId = this.$route.params.id//Update param from route
        if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
        await this.getData().catch(error => {})//Get Data Item
        await this.getCategories().catch(error => {})//Get categories
        this.success = true//Activate status of page
        this.updateOptions
        this.loading = false;
        await this.getSuscription();
      },
      //Get product categories
      getCategories () {
        return new Promise((resolve, reject) => {
          this.loadingCategory = true
          let configName = 'apiRoutes.qcommerce.categories'
          let params = {//Params to request
            refresh: true,
            params: {
              include: 'parent',
              filter:{
                store: this.$store.state.qmarketplaceStores.storeSelected
              }
            },
          }
          //Request
          this.$crud.index(configName, params).then(response => {
            this.optionsTemplate.categories = this.$array.tree(response.data)
            this.locale.fields.categoryId = response.data.length ? response.data[0].id : null
            this.loadingCategory = false
            resolve(true)
          }).catch(error => {
            this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
            this.loadingCategory = false
            reject(true)
          })
        })
      },
      //Get product if is edit
      getData () {
        return new Promise((resolve, reject) => {
          const productId = this.$clone(this.productId)
          if (productId) {
            let configName = 'apiRoutes.qcommerce.products'
            //Params
            let params = {
              refresh: true,
              params: {
                include: 'relatedProducts,categories,parent',
                filter: { allTranslations: true }
              }
            }
            //Request
            this.$crud.show(configName, productId, params).then(response => {
              this.orderDataItemToLocale(response.data)
              resolve(true)//Resolve
            }).catch(error => {
              this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
              this.loading = false
              reject(false)//Resolve
            })
          } else {
            resolve(true)//Resolve
          }
        })
      },
      //order data item to locale component
      orderDataItemToLocale (data) {
        let orderData = this.$clone(data)
        //Set default Parent options
        if (data.parent) this.optionsTemplate.products = this.$array.tree([data.parent])
        //Order categories
        orderData.categories.forEach((item, key) => {
          orderData.categories[key] = item.id
        })
        //Order related products
        orderData.relatedProducts.forEach((item, key) => {
          orderData.relatedProducts[key] = item.id
        })
        //Set default related products options
        if (data.relatedProducts && data.relatedProducts.length) {
          this.optionsTemplate.relatedProducts = this.$array.tree(data.relatedProducts)
        }
        this.locale.form = this.$clone(orderData)
      },
      //Create Product
      async createItem () {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.products'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
            this.actionAfterCreated(response.data.id)
          }).catch(error => {
            this.loading = false
            this.$alert.error({ message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom' })
          })
        }
      },
      //Update Product
      async updateItem () {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.products'
          this.$crud.update(configName, this.productId, this.getDataForm()).then(response => {
            this.$alert.success({ message: `${this.$tr('ui.message.recordUpdated')}` })
            this.initForm()
          }).catch(error => {
            this.loading = false
            this.$alert.error({ message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom' })
          })
        }
      },
      //Get just values not null from form
      getDataForm () {
        let response = this.locale.form
        for (var item in response) {
          let valueItem = response[item]
          if (valueItem == null || valueItem == undefined) {
            delete response[item]
          }
        }
        return response
      },
      //Action after created
      actionAfterCreated (id) {
        setTimeout(() => {
          let action = this.buttonActions.value
          switch (action) {
            case 1://redirect to index products
              this.$router.push({ name: 'qmarketplace.admin.stores.my.store.products', params: {  }})
              break
            case 2://Redirect to update this product
              this.$router.push({ name: 'qcommerce.admin.products.edit', params: { id: id } })
              this.loading = false
              break
            case 3://Reset and init form
              this.$refs.localeComponent.vReset()
              this.loading = false
              break
            case 4://Redirect to update this product and options
              this.$router.push({
                name: 'qcommerce.admin.products.edit',
                params: { id: id, editOptions: 1 },
              })
              this.loading = false
              break
          }
        }, 2000)
      },
      //Search products
      searchProducts ({ action, searchQuery, callback }) {
        if (action === 'ASYNC_SEARCH') {
          let configName = 'apiRoutes.qcommerce.products'
          let params = {//Params to request
            params: { filter: { search: searchQuery } },
          }
          //Request
          this.$crud.index(configName, params).then(response => {
            callback(null, this.$array.tree(response.data))
          }).catch(error => {
            this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
          })
        }
      },
      //Complete slug Only when is creation
      setSlug () {
        if (!this.productId) {
          let title = this.$clone(this.locale.formTemplate.name)
          title = title.split(' ').join('-').toLowerCase()
          this.locale.formTemplate.slug = this.$clone(title.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        }
      }
    }
  }
</script>

<style lang="stylus">
</style>
