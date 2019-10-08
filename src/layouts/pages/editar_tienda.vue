<template>
  <q-page class="bg-fondo-q store-page layout-padding">

      <div class="q-container" style="padding-top: 40px;">
        <div class="row gutter-md">
          <div class="col-12">

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-actions  align="end" no-caps class="q-pa-lg">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions>

              <q-card-main class="q-px-xl q-pb-xl form-general">

                <div class="q-headline text-primary q-mb-xs">Tienda Waffee</div>
                <div class="q-subheading text-secondary">
                  Completa la configuración de tu tienda, ¡es muy fácil!
                </div>
                <div class="q-my-lg line-grey w-100"></div>


                <div class="row gutter-lg">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
           
                    <q-field class="q-mb-lg">
                      <p class="caption q-mb-md">Agregar Logo 
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question" >
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <div class="images ratio-4-3">
                        <img class="rounded-md" :src="company.logo" alt="default">

                        <div class="absolute-bottom-right">
                          <q-btn class="rounded-sm btn" color="primary" icon="fas fa-camera"/>
                        </div>
                      </div>
                    </q-field>

                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                     <q-field class="q-mb-lg">
                        <p class="caption q-mb-md">Agregar imagenes para slider 
                          <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                        </p>

                        <div class="images" style="position:relative;">
                          <q-carousel
                            color="white"
                            quick-nav
                            class="img-ratio-4-3"
                          >

                            <q-carousel-slide class="rounded-md" v-for="(s,index) in company.slider" :key="index" :img-src="s.image" />

                          </q-carousel>
                          <div class="absolute-bottom-right">
                            <q-btn class="rounded-sm btn q-mr-sm" color="primary" icon="fas fa-edit"/>
                            <q-btn class="rounded-sm btn" color="primary" icon="fas fa-trash"/>
                          </div>
                        </div>                   

                      </q-field>
                  </div> 
                </div>

                <div class="q-mt-lg q-mb-xl line-grey w-100"></div>

                <div class="row gutter-lg">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Nombre de tu empresa 
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="company.name" placeholder="WAFFEE" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Slogan
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="company.slogan" placeholder="Lorem Ipsum" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Descripción de la empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-editor v-model="company.description" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Dirección de la empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.address" placeholder="Lorem Ipsum"        
                        :before="[{ icon: 'fas fa-map-marker-alt'}]" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Url mapa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.map" placeholder="google maps"  />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Horario de atención
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.shedule" placeholder="Lunes - Sabado 7am - 6pm"        
                        :before="[{ icon: 'far fa-clock'}]" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Enlace de youtube
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input  v-model="company.youtube" placeholder="youtube.com"  />
                    </q-field>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-xs">Categoría
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>

                      <q-select multiple v-model="company.category" :options="categoryOptions" />
                    </q-field>

                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Barrio
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-select v-model="company.neighborhood" :options="sectorOptions" />
                    </q-field>

                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Cuidad
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-select v-model="company.city" :options="cityOptions" />
                    </q-field>
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Correo electrónico
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="company.email" placeholder="info@lorem.com"        
                        :before="[{ icon: 'fas fa-envelope'}]" />
                    </q-field>
                    <q-field class="q-mb-lg">
                        <p class="caption q-mb-md">Galeria de la empresa
                          <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                        </p>

                        <div class="images" style="position:relative;">
                          <q-carousel
                            color="white"
                            quick-nav
                            class="img-ratio-4-3"
                          >
                            <q-carousel-slide class="rounded-md" v-for="(s,index) in company.gallery" :key="index" :img-src="s.image" />
                          </q-carousel>
                          <div class="absolute-bottom-right">
                            <q-btn class="rounded-sm btn q-mr-sm" color="primary" icon="fas fa-edit"/>
                            <q-btn class="rounded-sm btn" color="primary" icon="fas fa-trash"/>
                          </div>
                        </div>                   
                      </q-field>      

                  </div>
                </div>


              </q-card-main>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-main class="q-px-xl form-general">

                <q-field class="q-my-lg">
                  <p class="caption q-mb-lg">Redes sociales de tu tienda
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Some text as content of Tooltip
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                      <div v-for="(item,index) in company.social_networks" :key="index">
                        <div class="row items-center q-mb-md">
                          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                            <q-checkbox v-model="item.active"> 
                              <q-icon class="q-mx-md" :color="item.color" :name="item.icon" />  {{item.name}}: 
                            </q-checkbox>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                            <q-input v-model="item.url" placeholder="@lorem_ipsom" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </q-field>
              </q-card-main>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-xl">
              <q-card-main class="q-px-xl form-general">

                <q-field class="q-my-lg">

                  <p class="caption q-mb-lg">¿Que metodos de pago aceptas?
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Some text as content of Tooltip
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div v-for="(item,index) in company.payment_methods" :key="index">
                    <div class="row items-center q-py-md border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="item.active"> 
                          <span class="q-px-sm">{{item.name}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="faded" name="fas fa-edit" size="md" />
                      </div>
                    </div>
                  </div>

                </q-field>
              </q-card-main>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-lg">
              <q-card-main class="q-px-xl form-general">

                <q-field class="q-my-lg">

                  <p class="caption q-mb-lg">¿Cuales son los medotos de envío?
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Some text as content of Tooltip
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div v-for="(item,index) in company.shipping_methods" :key="index">
                    <div class="row items-center q-py-md border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="item.active"> 
                          <span class="q-px-sm">{{item.name}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="faded" name="fas fa-edit" size="md" />
                      </div>
                    </div>
                  </div>

                  
                </q-field>
              </q-card-main>
            </q-card>

          </div>

          <div class="col-12 text-right">
              <q-field class="q-mb-xl">
                <q-btn class="bg-primary text-white btn-arrow-send-pink">Actualizar</q-btn>
              </q-field>
          </div>


          <div class="col-12">
            <h3 class="text-center q-my-xl">Diseño</h3>
          </div>

          <div class="col-12">
            
            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-actions  align="end" no-caps class="q-pa-lg">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions>

              <q-card-main class="q-px-xl q-pb-xl form-general">
                <div class="q-headline text-primary q-mb-xs">Eligue tu tema</div>
                <div class="q-subheading text-secondary">
                  Completa la configuración de tu tienda, ¡es muy fácil!
                </div>
                <div class="q-my-lg line-grey w-100"></div>

                <div class="row gutter-md justify-center">
                  <div @click="theme.image = t.image" class="col-xs-12 col-sm-12 col-md-6 col-lg-5 q-mb-md cursor-pointer" v-for="(t,index) in themes_option" :key="index">
                    <div class="ratio-1 line-grey">
                      <img :src="t.image">
                    </div>
                    <div class="q-pa-md" :class="[theme.image == t.image ? 'bg-secondary text-light' : 'bg-light text-secondary']">
                       Tienda #{{index+1}}
                    </div>
                  </div>  
                </div>

                <div class="q-my-lg line-grey w-100"></div>
                
                <div class="q-headline text-primary q-mb-xs">Personaliza ti sitio web</div>
                <div class="q-subheading text-secondary q-mb-lg">
                  Elige los colores de acuerdo a la imagen de tu empresa
                </div>
                
                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Primario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <div @click="showingPrimary = true"  class="q-pa-md line-grey text-center" :style="{ 'background-color': theme.primary }">
                      {{theme.primary}}

                      <q-popover v-model="showingPrimary" anchor="bottom right" self="bottom left">
                        <q-tabs align="justify">
                          <q-tab default  slot="title" name="tab-1" label="HEX" :style="{ 'background-color': theme.primary }"/>
                          <q-tab  slot="title" name="tab-2" label="RGB" :style="{ 'background-color': theme.primary }"/>
                          <q-tab-pane name="tab-1" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.primary }">
                                {{theme.primary}}
                              </div>
                              <q-color-picker v-model="theme.primary" format-model="hex" />
                          </q-tab-pane>
                          <q-tab-pane name="tab-2" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.primary }">
                                {{theme.primary}}
                              </div>
                              <q-color-picker v-model="theme.primary" format-model="rgb" />
                          </q-tab-pane>
                        </q-tabs>
                      </q-popover>
                    </div>
                  </div>
                </div>
                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Secondario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <div @click="showingSecondary = true" class="q-pa-md line-grey text-center line" :style="{ 'background-color': theme.secondary }">
                      {{theme.secondary}}

                      <q-popover v-model="showingSecondary" anchor="bottom right" self="bottom left">
                        <q-tabs align="justify">
                          <q-tab default  slot="title" name="tab-1" label="HEX" :style="{ 'background-color': theme.secondary }"/>
                          <q-tab  slot="title" name="tab-2" label="RGB" :style="{ 'background-color': theme.secondary }"/>
                          <q-tab-pane name="tab-1" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.secondary }">
                                {{theme.secondary}}
                              </div>
                              <q-color-picker v-model="theme.secondary" format-model="hex" />
                          </q-tab-pane>
                          <q-tab-pane name="tab-2" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.secondary }">
                                {{theme.secondary}}
                              </div>
                              <q-color-picker v-model="theme.secondary" format-model="rgb" />
                          </q-tab-pane>
                        </q-tabs>
                      </q-popover>
                    </div>
                  </div>
                </div>
                <div class="row gutter-sm items-center  q-mb-sm">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Fondo</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <div @click="showingBackground = true" class="q-pa-md line-grey text-center" :style="{ 'background-color': theme.background }">
                      {{theme.background}}

                      <q-popover v-model="showingBackground" anchor="bottom right" self="bottom left">
                        <q-tabs align="justify">
                          <q-tab default  slot="title" name="tab-1" label="HEX" :style="{ 'background-color': theme.background }"/>
                          <q-tab  slot="title" name="tab-2" label="RGB" :style="{ 'background-color': theme.background }"/>
                          <q-tab-pane name="tab-1" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.background }">
                                {{theme.background}}
                              </div>
                              <q-color-picker v-model="theme.background" format-model="hex" />
                          </q-tab-pane>
                          <q-tab-pane name="tab-2" class="q-pa-none" style="min-width: 80px;">
                              <div class="text-center q-pa-md" :style="{ 'background-color': theme.background }">
                                {{theme.background}}
                              </div>
                              <q-color-picker v-model="theme.background" format-model="rgb" />
                          </q-tab-pane>
                        </q-tabs>
                      </q-popover>
                    </div>
                  </div>
                </div>

              </q-card-main>
            </q-card>

            <h5 class="text-primary q-ma-lg">Crear Producto</h5>

            <q-card  class="rounded-md bg-white w-100 q-my-xl">

              <q-card-main class="q-px-xl  q-py-none form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 card-border-right">

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Nombre de producto</p>
                      <q-input v-model="product.name" placeholder="Lorem Ipsum" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Descripción corta</p>
                      <q-input v-model="product.summary" placeholder="Lorem Ipsum" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Descripción completa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-editor v-model="product.description" />
                    </q-field>

                    <p class="caption q-mb-md">Imagen 
                      <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question" >
                        <q-tooltip>
                          Some text as content of Tooltip
                        </q-tooltip>
                      </q-btn>
                    </p>
                    <div class="row gutter-sm">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <q-field class="q-mb-xl">
                          <div class="images ratio-4-3">
                            <img class="rounded-md" :src="product.image" alt="default">

                            <div class="absolute-bottom-right">
                              <q-btn class="rounded-sm btn" color="primary" icon="fas fa-camera"/>
                            </div>
                          </div>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                         <q-field class="q-mb-xl">
                            <div class="images" style="position:relative;">
                              <q-carousel
                                color="white"
                                quick-nav
                                class="img-ratio-4-3"
                              >

                                <q-carousel-slide class="rounded-md" v-for="(s,index) in product.gallery" :key="index" :img-src="s.image" />

                              </q-carousel>
                              <div class="absolute-bottom-right">
                                <q-btn class="rounded-sm btn q-mr-sm" color="primary" icon="fas fa-edit"/>
                                <q-btn class="rounded-sm btn" color="primary" icon="fas fa-trash"/>
                              </div>
                            </div>                   

                          </q-field>
                      </div> 
                    </div>

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Video
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input v-model="product.video" placeholder="Lorem Ipsum"  />
                    </q-field>

                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-4">
                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Estado</p>
                      <q-select v-model="product.status" :options="statusOptions" />
                    </q-field>

                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Categoria Principal</p>
                      <q-select v-model="product.category" :options="categoryOptions" />
                    </q-field>

                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Categoria </p>
                      <q-search
                          v-model="searchModel"
                          placeholder="Buscar categorías"
                          icon="search"
                          inverted-light
                          color="white"
                          hide-underline  no-parent-field
                          class="border">
                        </q-search>
                    </q-field>


                  </div>
                </div>


              </q-card-main>
            </q-card>

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-main class="q-px-xl q-py-xl form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Precio</p>
                      <q-input  helper="Helper" count="10" prefix="$" v-model="product.price" placeholder="000.00" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Cantidad</p>
                      <q-input v-model="product.quantity" placeholder="1" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Peso</p>
                       <q-input v-model="product.weight" placeholder="1" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Longitud</p>
                       <q-input v-model="product.length" placeholder="1" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Anchura</p>
                       <q-input v-model="product.width" placeholder="1" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Altura</p>
                       <q-input v-model="product.height" placeholder="1" />
                    </q-field>
                  </div>


                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Referencia</p>
                       <q-input v-model="product.reference" placeholder="" />
                    </q-field>

                    <q-field  class="q-mb-xl">
                      <q-toggle v-model="product.stock" color="primary" label="Stock" />
                    </q-field>

                    <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Orden minima</p>
                      <q-input v-model="product.order_min" placeholder="1" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Puntos</p>
                       <q-input v-model="product.points" placeholder="1" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <div class="row gutter-sm">
                        <div class="col-auto">
                           <q-checkbox v-model="product.active_home"></q-checkbox>
                        </div>
                        <div class="col">
                          <p class="caption q-mb-none">Agregar producto a la página inicial de "Donde esta tu vaina" </p>
                          <p><small class="text-primary">Disponibles (2)</small></p>
                        </div>
                      </div>
                    </q-field>

                    <q-card-actions no-caps class="q-pa-lg">
                      <q-btn class="rounded-sm q-px-md" size="lg" no-caps color="primary" label="Opción de Producto"/>
                    </q-card-actions>

                  </div>
                </div>

              </q-card-main>
            </q-card>

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-main class="q-px-xl q-py-xl form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-12">
                    <p class="caption q-mb-sm">Editar SEO
                      <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                        <q-tooltip>
                          Some text as content of Tooltip
                        </q-tooltip>
                      </q-btn>
                    </p>
                  </div>
                </div>

              </q-card-main>
            </q-card>

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-main class="q-px-xl q-py-xl form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-12">
                    <p class="caption q-mb-sm">Relacionados
                      <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                        <q-tooltip>
                          Some text as content of Tooltip
                        </q-tooltip>
                      </q-btn>
                    </p>
                  </div>
                </div>
                
              </q-card-main>
            </q-card>

          </div>

        </div>
      </div>

      <q-layout-drawer behavior="desktop"  v-model="drawer">
        <div class="q-pa-md text-center">Simulando ventana lateral</div>
      </q-layout-drawer>

      <q-page-sticky class="q-ma-md" expand position="bottom-right">
        <q-btn
          @click="drawer = !drawer"
          round
          dense
          color="primary"
          icon="menu"
        />
      </q-page-sticky>



  </q-page>
</template>
<script>
export default {
  name: 'PageTienda',
  data() {
    return {
      lang: this.$q.i18n.lang,
      drawer: true,
      company: {
        name:'',
        slogan: '',
        description: '',
        address: '',
        map: '',
        schedule: '',
        youtube: '',
        city: '',
        neighborhood: '',
        email: '',
        logo: '/assets/img/fondo.jpg',
        category: '',
        slider: [
          {image:'/assets/img/fondo.jpg'},{image:'/assets/img/fondo.jpg'}
        ],
        gallery: [
          {image:'/assets/img/fondo.jpg'},{image:'/assets/img/fondo.jpg'},{image:'/assets/img/fondo.jpg'}
        ],
        payment_methods: [
          {
            name: 'Contraentrega',
            active: false
          },
          {
            name: 'Paypal',
            active: false
          },
          {
            name: 'Entrega de Tienda',
            active: false
          },
          {
            name: 'PayU',
            active: false
          }
        ],
        shipping_methods: [
          {
            name: 'Recoger en Tienda',
            active: false
          },
          {
            name: 'Servicio a Domicilio',
            active: false
          },
          {
            name: 'A convenir',
            active: false
          }
        ],
        social_networks: [
          {
            icon: 'fab fa-twitter',
            name: 'twitter',
            color: 'blue-4',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-facebook',
            name: 'facebook',
            color: 'indigo',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-instagram',
            name: 'instagram',
            color: 'primary',
            url: '',
            active: false
          }
        ]
      },
      showingPrimary: false,
      showingSecondary: false,
      showingBackground: false,
      searchModel: '',
      sectorOptions: [
        {
          label: 'Barrios',
          value: '1'
        },
        {
          label: 'Barrioswert',
          value: '2'
        }
      ],
      cityOptions: [
        {
          label: 'Rioacha',
          value: '1'
        },
        {
          label: 'Playaacha',
          value: '2'
        },
        {
          label: 'Lagoacha',
          value: '3'
        }
      ],
      categoryOptions: [
        {
          label: 'Comida', 
          value: '1',
          children: [
            { label: 'Restaurantes', value: '2' },
            { label: 'Comidas rápidas', value: '2' },
            { label: 'Panaderías', value: '2' }
          ]
        },
        {
          label: 'Good service (disabled node)', 
          value: '2',
          children: [
            { label: 'Prompt attention', value: '2' },
            { label: 'Professional waiter', value: '2' }
          ]
        },
        {
          label: 'Pleasant surroundings', 
          value: '2',
          children: [
            { label: 'Happy atmosphere', value: '2' },
            { label: 'Good table presentation', value: '2' },
            { label: 'Pleasing decor', value: '2' }
          ]
        }        
      ],
      statusOptions: [
        {
          label: 'Habilitado',
          value: '1'
        },
        {
          label: 'Inhabilitado',
          value: '2'
        }
      ],
      theme: {
        image: '/assets/img/product.jpg',
        primary: '#4CAF50',
        secondary: '#E91E63',
        background: '#FFFFFF'
      },
      themes_option: [
        {
          image: '/assets/img/product.jpg'
        },
        {
          image: '/assets/img/pregunta.jpg'
        }
      ],
      product: {
        name: '',
        summary: '',
        description: '',
        image: '/assets/img/fondo.jpg',
        gallery: [
          {image:'/assets/img/fondo.jpg'},{image:'/assets/img/fondo.jpg'}
        ],
        status:'',
        category: '',
        categories:[],
        price: 0,
        stock: false,
        length: 0,
        quantity: 0,
        weight: 0,
        reference: '',
        order_min: 0,
        width: 0,
        height: 0,
        points: 0,
        active_home: false
      }
    }
  },
  methods: {}
}
</script>
<style lang="stylus">
@import "~variables"
.store-page
  .images
    .absolute-bottom-right
      bottom -5px 
      right -5px
      .btn
        width 40px
        height 40px
  .q-carousel-quick-nav
    background transparent
  .border-bottom-gray
    border-bottom 1px solid #E1E1E1  
  .btn-arrow-send-pink:after 
    right 92px

  .card-border-right
    border-right 3px solid #E1E1E1  
    padding-right 32px
    @media screen and (max-width: $breakpoint-md)
        border-right 0
        padding-right 0
  .border
    border 1px solid #E1E1E1
    box-shadow none !important
    border-radius 5px       
  

</style>