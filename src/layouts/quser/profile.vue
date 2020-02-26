<template>
   <div class="quser-profile ">

      <div v-if="success" class="quser-content">

         <div class="title-principal q-mb-xl">
            <h3 class="font-family-secondary q-mt-none q-mb-md">Completa el formulario y <span class="text-tertiary">obten 10 puntos</span>
               para obtener <span class="text-tertiary">Premios y Descuentos.</span></h3>
            <small class="q-mb-xl font-family-primary">Los datos de este formulario seran usados para adaptar las
               promociones y busquedas de tiendas a sus necesidades</small>
         </div>
         <q-form @submit="updateData" ref="formRegister" class="box relative-position" autocomplete="off"
                 @validation-error="$alert.error($tr('ui.message.formInvalid'))">
            <div class="row items-center form-general">
               <!-- Informacion Personal -->
               <q-card class="rounded-md q-mb-xl full-width">
                  <div class="q-pl-md">
                     <h3 class="title-label-profile bg-primary">
                        <div>Informacion personal</div>
                     </h3>
                  </div>
                  <q-card-section class="q-pa-xl">

                     <div class="row q-col-gutter-lg">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Firstname-->
                           <q-input class="requeried" v-model="form.firstName" stack-label
                                    :label="`${$trp('ui.form.firstName')}`"
                                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Lastname-->
                           <q-input class="requeried" v-model="form.lastName" stack-label
                                    :label="`${$trp('ui.form.lastName')}`"
                                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Username-->
                           <q-input v-model="form.fields.userName.value" stack-label :label="`Nombre de Usuario`"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Nickname-->
                           <q-input class="requeried" v-model="form.fields.nickName.value" stack-label
                                    :label="`¿Algùn apodo?`"
                                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Birthday-->
                           <q-input class="requeried" v-model="form.fields.birthday.value" mask="date"
                                    placeholder="YYYY/MM/DD" label="Fecha de Nacimiento"
                                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
                              <template v-slot:append>
                                 <q-icon name="event" color="primary" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                       <q-date v-model="form.fields.birthday.value"
                                               @input="() => $refs.qDateProxy.hide()"/>
                                    </q-popup-proxy>
                                 </q-icon>
                              </template>
                           </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Civil State-->
                           <q-select label="Estado Civil" stack-label
                                     emit-value
                                     map-options
                                     option-label="label"
                                     v-model="form.fields.civilState.value"
                                     :options="civilStateOptions"/>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- country -->
                           <q-select
                                   label="País"
                                   class="requeried"
                                   stack-label
                                   emit-value
                                   map-options
                                   option-label="label"
                                   v-model="form.fields.country.value"
                                   :options="countryOptions"
                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                   @input="getCities(form.fields.country.value,'CiO')"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--State - Province-->
                           <q-select
                                   label="Departamento"
                                   class="requeried"
                                   stack-label
                                   emit-value
                                   map-options
                                   option-label="label"
                                   v-model="form.fields.city.value"
                                   :options="cityOptions"
                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Academic Leven-->
                           <q-select label="Nivel Académico" stack-label
                                     emit-value
                                     map-options
                                     option-label="label"
                                     v-model="form.fields.academicLevel.value"
                                     :options="academicLevelOptions"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                           <!-- Sexo -->
                           <p class="caption q-mb-sm"><span class="text-primary">*</span> Sexo</p>
                           <div class="text-center">
                              <q-option-group inline left-label keep-color v-model="form.fields.sex.value"
                                              :options="sexOptions"
                                              color="primary"/>
                           </div>
                        </div>

                     </div>

                     <div class="row q-col-gutter-lg justify-end q-mt-md">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                           <!--Sons-->
                           <p class="caption q-mb-sm"> Hijos</p>
                           <div class="text-center">
                              <q-option-group inline left-label keep-color v-model="form.fields.sons.value"
                                              :options="sonsOptions"
                                              color="primary"/>
                           </div>
                        </div>
                     </div>
                     <!-- Infor Required -->
                     <div class="row q-mt-md">
                        <small class="infor-required text-primary text-weight-medium">* Campo Obligatorio</small>
                     </div>


                  </q-card-section>
               </q-card>

               <div class="q-my-md full-width"></div>

               <!-- Informacion de Contacto -->
               <q-card class="rounded-md q-mb-xl full-width">
                  <div class="q-pl-md">
                     <h3 class="title-label-profile bg-tertiary">
                        <div>Información de contacto</div>
                     </h3>
                  </div>
                  <q-card-section class="q-pa-xl">

                     <div class="row q-col-gutter-lg">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Phone-->
                           <q-input class="requeried" v-model="form.fields.cellularPhone.value" unmasked-value
                                    inputmode="numeric" mask="(###) ### - ####" :label="`${$trp('ui.form.phone')}`"
                                    :rules="[
                    val => !!val || $tr('ui.message.fieldRequired'),
                    val => !val || val.length == 10 || $tr('ui.message.fieldMinLeng',{num : 10})
                   ]"
                           />
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Email-->
                           <q-input class="requeried" v-model="form.email" :label="`${$trp('ui.form.email')}`"
                                    :rules="[
                     val => !!val || $tr('ui.message.fieldRequired'),
                     val => $helper.validateEmail(val) || $tr('ui.message.fieldEmail')
                   ]"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Country of residence ADDRESS -->
                           <q-select
                                   label="País de residencia"
                                   class="requeried"
                                   stack-label
                                   emit-value
                                   map-options
                                   option-label="label"
                                   v-model="address.countryId"
                                   :options="countryResidenceOptions"
                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                   @input="getCities(address.countryId,'CiRO')"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Department ​​of residence ADDRESS STATE -->
                           <q-select
                                   label="Departamento"
                                   class="requeried"
                                   stack-label
                                   emit-value
                                   map-options
                                   option-label="label"
                                   v-model="address.stateId"
                                   :options="cityResidenceOptions"
                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                   @input="getCities2(address.stateId)"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- City -->
                           <q-select
                                   label="Ciudad"
                                   class="requeried"
                                   stack-label
                                   emit-value
                                   map-options
                                   option-label="label"
                                   v-model="address.cityId"
                                   :options="city2ResidenceOptions"
                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Neighborhood -->
                           <q-input class="requeried" v-model="address.neighborhood" stack-label label="Barrio"
                                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                           <!--
                           <q-select label="Barrio" stack-label class="requeried"
                               emit-value
                               map-options
                               v-model="address.neighborhoodId"
                               :options="neighborhoodOptions"
                               :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                           -->
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                           <!--Address NEW ADDRESS-->
                           <q-input class="requeried" v-model="address.address1" stack-label :label="`Dirección`"
                                    :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                        </div>
                        <div class="col-12">

                           <p class="caption q-mb-xl">Como apareces en tus redes sociales</p>

                           <div class="row q-col-gutter-lg">
                              <!--Twitter-->
                              <div class="col-xs-12 col-sm-12 col-md-4">
                                 <q-input v-model="form.fields.twitter.value" stack-label :label="`Twitter`">
                                    <template v-slot:prepend>
                                       <q-icon name="fab fa-twitter" color="blue"/>
                                    </template>
                                 </q-input>
                              </div>

                              <!--Facebook-->
                              <div class="col-xs-12 col-sm-12 col-md-4">
                                 <q-input v-model="form.fields.facebook.value" stack-label :label="`Facebook`">
                                    <template v-slot:prepend>
                                       <q-icon name="fab fa-facebook" color="indigo"/>
                                    </template>
                                 </q-input>
                              </div>

                              <!--Instagram-->
                              <div class="col-xs-12 col-sm-12 col-md-4">
                                 <q-input v-model="form.fields.instagram.value" stack-label :label="`Instagram`">
                                    <template v-slot:prepend>
                                       <q-icon name="fab fa-instagram" color="primary"/>
                                    </template>
                                 </q-input>
                              </div>
                           </div>

                        </div>
                     </div>

                     <!-- Infor Required -->
                     <div class="row q-mt-md">
                        <small class="infor-required text-primary text-weight-medium">* Campo Obligatorio</small>
                     </div>

                  </q-card-section>
               </q-card>

               <div class="q-my-md full-width"></div>

               <!-- Tus Gustos -->
               <q-card class="rounded-md q-mb-xl full-width">
                  <div class="q-pl-md">
                     <h3 class="title-label-profile bg-primary">
                        <div>Tus Gustos</div>
                     </h3>
                  </div>
                  <q-card-section class="q-pa-xl">

                     <div class="row q-col-gutter-lg">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Leisure -->
                           <!--
                           <q-select label="Ocio (Gustos)" stack-label class="requeried"
                               multiple use-chips
                               v-model="form.fields.leisures.value"
                               :options="leisureOptions"
                               :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                           -->
                           <!-- Leisure -->
                           <q-select
                                   label="Ocio (Gustos)" stack-label class="requeried q-pb-xs"
                                   v-model="form.fields.leisures.value"
                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                   use-input
                                   use-chips
                                   multiple
                                   hide-dropdown-icon
                                   input-debounce="0"
                                   @new-value="createValueOcio"
                           />
                           <div class="text-caption">Despues de escribir tu gusto, presiona enter</div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Favorite Movie-->
                           <q-input v-model="form.fields.favoriteMovie.value" stack-label :label="`Pelicula Favorita`"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Favorite Serie -->
                           <q-input v-model="form.fields.favoriteSerie.value" stack-label :label="`Serie Favorita`"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Favorite Team -->
                           <q-input v-model="form.fields.favoriteTeam.value" stack-label :label="`Equipo Favorito`"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!-- Promotions -->
                           <q-select label="¿De que te gustaria recibir la promoción?" stack-label class="requeried"
                                     multiple use-chips
                                     v-model="form.fields.promotions.value"
                                     :options="promotionOptions"
                                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                        </div>
                        <div class="col-12">

                           <p class="caption q-mb-xl">Fechas importantes para ti</p>

                           <div class="row q-col-gutter-md">
                              <!--Important Date 1-->
                              <div class="col-xs-6 col-sm-6 col-md-3 q-mb-lg">
                                 <q-input v-model="form.fields.importantDate1.value" mask="date"
                                          placeholder="YYYY/MM/DD">
                                    <template v-slot:append>
                                       <q-icon name="event" color="primary" class="cursor-pointer">
                                          <q-popup-proxy ref="qDateProxy" transition-show="scale"
                                                         transition-hide="scale">
                                             <q-date v-model="form.fields.importantDate1.value"
                                                     @input="() => $refs.qDateProxy.hide()"/>
                                          </q-popup-proxy>
                                       </q-icon>
                                    </template>
                                 </q-input>
                              </div>

                              <!--Important Date Why 1-->
                              <div class="col-xs-6 col-sm-6 col-md-3 q-mb-lg">
                                 <q-input v-model="form.fields.importantDate1Why.value" stack-label
                                          :label="`¿Por que?`"/>
                              </div>

                              <!--Important Date 2-->
                              <div class="col-xs-6 col-sm-6 col-md-3 q-mb-lg">
                                 <q-input v-model="form.fields.importantDate2.value" mask="date"
                                          placeholder="YYYY/MM/DD">
                                    <template v-slot:append>
                                       <q-icon name="event" color="primary" class="cursor-pointer">
                                          <q-popup-proxy ref="qDateProxy" transition-show="scale"
                                                         transition-hide="scale">
                                             <q-date v-model="form.fields.importantDate2.value"
                                                     @input="() => $refs.qDateProxy.hide()"/>
                                          </q-popup-proxy>
                                       </q-icon>
                                    </template>
                                 </q-input>
                              </div>

                              <!--Important Date Why 2-->
                              <div class="col-xs-6 col-sm-6 col-md-3 q-mb-lg">
                                 <q-input v-model="form.fields.importantDate2Why.value" stack-label
                                          :label="`¿Por que?`"/>
                              </div>

                           </div>

                        </div>
                     </div>

                     <!-- Infor Required -->
                     <div class="row q-mt-md">
                        <small class="infor-required text-primary text-weight-medium">* Campo Obligatorio</small>
                     </div>
                  </q-card-section>
               </q-card>

               <div class="q-my-md full-width"></div>

               <!-- Como conociste la Pagina -->
               <q-card class="rounded-md q-mb-xl full-width">
                  <div class="q-pl-md">
                     <h3 class="title-label-profile  bg-tertiary">
                        <div>Como conociste la Página</div>
                     </h3>
                  </div>
                  <q-card-section class="q-pa-xl">

                     <div class="row q-col-gutter-lg">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                           <!--Radio -->
                           <div class="row items-center">
                              <div class="col">
                                 <p class="caption q-mb-none">Radio</p>
                              </div>
                              <div class="col-auto">
                                 <q-radio v-model="form.fields.meetUs.value" keep-color color="primary" val="radio"/>
                              </div>
                           </div>

                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                           <!--Redes Sociales -->
                           <div class="row items-center">
                              <div class="col">
                                 <p class="caption q-mb-none">Redes Sociales</p>
                              </div>
                              <div class="col-auto">
                                 <q-radio v-model="form.fields.meetUs.value" keep-color color="primary"
                                          val="redes sociales"/>
                              </div>
                           </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Un amigo -->
                           <div class="row items-center">
                              <div class="col">
                                 <p class="caption q-mb-none">Un amigo</p>
                              </div>
                              <div class="col-auto">
                                 <q-radio v-model="form.fields.meetUs.value" keep-color color="primary" val="amigo"/>
                              </div>
                           </div>

                           <!-- Friend Name -->
                           <q-input :disable="blockFriendReferralCode" class="label-mini" v-model="form.fields.friendReferralCode.value"
                                    label="Escribe el código de referido de tu amigo"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <!--Otros -->
                           <div class="row items-center">
                              <div class="col">
                                 <p class="caption q-mb-none">Otros</p>
                              </div>
                              <div class="col-auto">
                                 <q-radio v-model="form.fields.meetUs.value" keep-color color="primary" val="otros"/>
                              </div>
                           </div>

                           <!-- Other medio -->
                           <q-input class="label-mini" v-model="form.fields.otherMedio.value"
                                    label="Cuentanos ¿cuál fue?"/>
                        </div>
                     </div>


                  </q-card-section>
               </q-card>

               <div class="q-my-md full-width"></div>

               <!-- Seguridad -->
               <q-card class="rounded-md q-mb-xl full-width">
                  <div class="q-pl-md">
                     <h3 class="title-label-profile bg-primary">
                        <div>Seguridad <small>(cambiar contraseña)</small></div>
                     </h3>
                  </div>
                  <q-card-section class="q-pa-xl">

                     <div class="row q-col-gutter-lg">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <q-input stack-label :label="`Nueva Contraseña`" v-model="form.newPassword"
                                    :type="isPwd ? 'password' : 'text'"
                                    autocomplete="off"
                                    name="password">
                              <template v-slot:append>
                                 <q-icon
                                         :name="isPwd ? 'visibility_off' : 'visibility'"
                                         class="cursor-pointer"
                                         @click="isPwd = !isPwd"
                                 />
                              </template>
                           </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 q-mb-lg">
                           <q-input stack-label :label="`Confirmar Contraseña`" v-model="form.confirmNewPassword"
                                    :type="isPwd ? 'password' : 'text'"
                                    name="password"
                                    autocomplete="off"
                                    :rules="[ val => val == form.newPassword || $tr('ui.message.fieldCheckPassword')]">
                              <template v-slot:append>
                                 <q-icon
                                         :name="isPwd ? 'visibility_off' : 'visibility'"
                                         class="cursor-pointer"
                                         @click="isPwd = !isPwd"
                                 />
                              </template>
                           </q-input>
                        </div>
                     </div>


                  </q-card-section>
               </q-card>

               <div class="q-my-md full-width"></div>

               <q-card class="rounded-md q-mb-xl full-width">

                  <q-card-section class="q-py-xl">

                     <div class="row q-col-gutter-lg items-center">
                        <!--Policies-->
                        <div class="col-12 col-sm-9 ">
                           <q-list>
                              <q-item>
                                 <q-item-section avatar top>
                                    <q-radio v-model="form.fields.policies.value" val="policies" color="primary"/>
                                 </q-item-section>
                                 <q-item-section>
                                    <q-item-label caption>
                                       Declaro conocer las políticas de Términos y Condiciones y autorizo el tratamiento
                                       de mis datos personales en la pagina web <span class='text-primary'>Donde Esta Esa Vaina</span>
                                    </q-item-label>
                                 </q-item-section>
                              </q-item>
                           </q-list>
                        </div>

                        <!--Update button-->
                        <div class="col-12 col-sm-3">
                           <div class="text-right q-mt-sm">
                              <q-btn color="primary" :loading="loading"
                                     class="btn-arrow-send-pink"
                                     type="submit"
                                     label="Actualizar"/>
                           </div>
                        </div>
                     </div>


                  </q-card-section>
               </q-card>

               <div class="q-my-md full-width"></div>

            </div>
         </q-form>
      </div><!--End if success-->

      <!--Inner loading-->
      <inner-loading :visible="loading"/>

   </div>
</template>

<script>

   import http from "axios"

   //Plugins
   import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
   import alert from '@imagina/qhelper/_plugins/alert'

   export default {
      props: {},
      components: {},
      watch: {},
      validations() {
         return {
            form: {
               firstName: {required},
               lastName: {required},
               email: {required, email},
               newPassword: {minLength: minLength(8)},
               confirmNewPassword: {minLength: minLength(8), sameAsPassword: sameAs('newPassword')},
               fields: {
                  nickName: {
                     value: {required}
                  },
                  birthday: {
                     value: {required}
                  },
                  country: {
                     value: {required}
                  },
                  city: {
                     value: {required}
                  },
                  cellularPhone: {
                     value: {required, minLength: minLength(10)}
                  },
                  /*
                  countryResidence: {
                    value: {required}
                  },
                  cityResidence: {
                    value: {required}
                  },
                  address: {
                    value: {required}
                  },
                  */
                  leisures: {
                     value: {required}
                  },
                  promotions: {
                     value: {required}
                  },
               }
            },
            address: {
               countryId: {required},
               stateId: {required},
               cityId: {required},
               address1: {required},
               neighborhood: {required}
               //neighborhoodId:{required},
            }
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            loading: false,
            success: false,
            blockFriendReferralCode: false,
            classError: 'nada',
            form: {
               firstName: null,
               lastName: null,
               email: null,
               password: '',
               newPassword: '',
               confirmNewPassword: '',
               fields: {},
               addresses: []
            },
            address: {
               id: null,
               firstName: null,
               lastName: null,
               type: 'contact',
               address1: null,
               country: null,
               countryId: null,
               state: null,
               stateId: null,
               city: null,
               cityId: null,
               neighborhood: null,
               neighborhoodId: null
            },
            civilStateOptions: [
               {
                  label: 'Soltero',
                  value: 'soltero'
               },
               {
                  label: 'Casado',
                  value: 'casado'
               },
               {
                  label: 'Viudo',
                  value: 'viudo'
               }
            ],
            academicLevelOptions: [
               {
                  label: 'Ninguno',
                  value: 'ninguno'
               },
               {
                  label: 'Primaria',
                  value: 'primaria'
               },
               {
                  label: 'Secundaria',
                  value: 'secundaria'
               },
               {
                  label: 'Técnica',
                  value: 'tecnica'
               },
               {
                  label: 'Tecnologica',
                  value: 'tecnologica'
               },
               {
                  label: 'Univesitario',
                  value: 'univesitario'
               },
               {
                  label: 'Especialización',
                  value: 'especializacion'
               },
               {
                  label: 'Maestría',
                  value: 'maestria'
               },
               {
                  label: 'Doctorado',
                  value: 'doctorado'
               },
            ],
            countryOptions: [],
            cityOptions: [],
            countryResidenceOptions: [],
            cityResidenceOptions: [],
            city2ResidenceOptions: [],
            neighborhoodOptions: [],
            leisureOptions: [
               {
                  label: 'Gusto 1',
                  value: 'gusto1'
               },
               {
                  label: 'Gusto 2',
                  value: 'gusto2'
               },
               {
                  label: 'Gusto 3',
                  value: 'gusto3'
               },
            ],
            promotionOptions: [],
            checkPU: null,
            sexOptions: [
               {
                  label: 'Hombre',
                  value: 'hombre'
               },
               {
                  label: 'Mujer',
                  value: 'mujer'
               },
            ],
            sonsOptions: [
               {
                  label: 'Si',
                  value: 'si'
               },
               {
                  label: 'No',
                  value: 'no'
               },
            ],
            isPwd: true,
         }
      },
      computed: {
         defaultFields() {
            return [
               {name: 'mainImage', value: {}},
               {name: 'userName', value: null},
               {name: 'birthday', value: null},
               {name: 'civilState', value: null},
               {name: 'academicLevel', value: null},
               {name: 'policies', value: true},
               {name: 'nickName', value: null},
               {name: 'city', value: null},
               {name: 'country', value: null},
               {name: 'sex', value: null},
               {name: 'sons', value: null},
               {name: 'cellularPhone', value: null},
               {name: 'twitter', value: null},
               {name: 'facebook', value: null},
               {name: 'instagram', value: null},
               {name: 'leisures', value: []},
               {name: 'favoriteSerie', value: null},
               {name: 'favoriteMovie', value: null},
               {name: 'favoriteTeam', value: null},
               {name: 'promotions', value: []},
               {name: 'importantDate1', value: null},
               {name: 'importantDate1Why', value: null},
               {name: 'importantDate2', value: null},
               {name: 'importantDate2Why', value: null},
               {name: 'meetUs', value: null},
               {name: 'friendUserName', value: null},
               {name: 'friendReferralCode', value: null},
               {name: 'otherMedio', value: null},
            ]
         }
      },
      methods: {
         //init
         async init() {
            this.loading = true//Loading
            this.form.fields = this.$clone(this.defaultFields)//Set default fields
            await this.setUserData()//Set user data
            await this.getCountries()// Get countries
            // Get Provinces
            if (this.form.fields.country.value != "" && this.form.fields.country.value != null)
               await this.getCities(this.form.fields.country.value, 'CiO')
            //console.warn("Field - address country INIT: "+this.form.fields.country.value)

            // Get Provinces
            if (this.address.countryId != "" && this.address.countryId != null)
               await this.getCities(this.address.countryId, 'CiRO')

            // Get Cities
            if (this.address.stateId != "" && this.address.stateId != null)
               await this.getCities2(this.address.stateId, 'CiRO')

            // Get Promotions
            await this.getCategoriesStore()
            this.success = true//Success page
            this.loading = false//Loading

         },
         //Set user data
         async setUserData() {
            let sessionData = await this.$cache.get.item('sessionData')//Get data from storage
            let userData = this.$clone(sessionData.userData)//Get user data
            //Convert fields
            userData.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields);
            if(userData.fields.friendReferralCode!=""){
              this.blockFriendReferralCode=true
            }
            this.form.id = this.$clone(userData.id)
            this.form.activated = this.$clone(userData.activated)
            this.form.firstName = this.$clone(userData.firstName)
            this.form.lastName = this.$clone(userData.lastName)
            this.form.email = this.$clone(userData.email)
            this.form.fields = this.$helper.convertToFrontField(this.defaultFields, userData.fields)

            //Add address infor
            if (userData.addresses.length > 0) {
               for (let i = 0; i < userData.addresses.length; i++) {
                  // Get just Address Contact
                  if (userData.addresses[i].type == "contact") {

                     this.address.id = userData.addresses[i].id
                     this.address.firstName = userData.addresses[i].firstName
                     this.address.lastName = userData.addresses[i].lastName
                     this.address.type = userData.addresses[i].type
                     this.address.address1 = userData.addresses[i].address1
                     this.address.country = userData.addresses[i].country
                     this.address.countryId = parseInt(userData.addresses[i].country_id)
                     this.address.state = userData.addresses[i].state
                     this.address.stateId = parseInt(userData.addresses[i].state_id)
                     this.address.cityId = parseInt(userData.addresses[i].city_id)
                     this.address.neighborhood = userData.addresses[i].neighborhood
                     this.address.neighborhoodId = parseInt(userData.addresses[i].neighborhood_id)
                     break
                  }
               }
            }


         },
         //update data
         updateData() {

            //this.loading = true//Loading
            let data = this.$clone(this.form)//Fet form data
            data.fields = this.$helper.convertToBackField(data.fields)//Convert fields

            // Add new password
            if (data.newPassword != "" && this.checkNewPassword())
               data.password = data.newPassword
            this.address.firstName = this.form.firstName
            this.address.lastName = this.form.lastName
            // Add adress infor
            data.addresses.push(this.address)

            //console.warn(data)
            //Request
            this.$crud.update('apiRoutes.quser.users', data.id, data).then(response => {
               this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
               this.loading = false//Login
               this.checkPointsProccess() // Check points to register
               this.updateUserData()//update local userData
            }).catch(error => {
               console.error('[UPDATE PROFILE] ', error)
               this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
               this.loading = false
            })

         },
         //Update user local data
         async updateUserData() {
            let userData = this.$clone(this.form)//Get form data
            let sessionData = await this.$cache.get.item('sessionData')//Get session data
            userData.fields = this.$helper.convertToBackField(userData.fields)//Convert fields
            sessionData.userData = this.$clone(Object.assign({}, sessionData.userData, userData))//Merge with current data
            await this.$store.dispatch('quserAuth/AUTH_UPDATE')//Update session data
         },
         //Mask phone
         maskPhone() {
            this.$nextTick(() => {
               let phone = this.$clone(this.form.fields.cellularPhone.value)
               let maskedPhone = this.$helper.maskPhone(phone)
               this.form.fields.cellularPhone.value = this.$clone(maskedPhone)
            })
         },
         //Check if new password is same with confirmation
         checkNewPassword() {
            if (this.form.newPassword != this.form.confirmNewPassword) {
               this.classError = "errorInput"
               return false
            }

            this.classError = ""
            return true
         },
         // Get Countries from ilocations
         getCountries() {
            return new Promise((resolve, reject) => {

               //let apiUrl = '/countries'

               http.get(config('apiRoutes.ilocations.countries'))
                   .then(response => {
                      response.data.data.forEach(data => {
                         this.countryOptions.push({
                            label: data.name,
                            value: data.id
                         })

                         this.countryResidenceOptions = this.countryOptions

                      })
                      resolve(true);
                   })
                   .catch(error => {
                      reject(error);
                   });


            })
         },
         // Get Cities (Provinces- State) from ilocations
         getCities(countryModel, cityOptions) {
            return new Promise((resolve, reject) => {

               if (countryModel.value != undefined)
                  countryModel = countryModel.value

               //console.warn("get Cities - CountryID : "+countryModel)
               //console.warn("get Cities - CityOptions : "+cityOptions)

               //let apiUrl = '/provinces'
               let params = {
                  params: {
                     filter: {country: countryModel}
                  }
               }

               if (cityOptions == 'CiO') {
                  this.cityOptions = []
                  // Second time
                  if (this.success == true)
                     this.form.fields.city.value = null

               }

               if (cityOptions == 'CiRO') {
                  this.cityResidenceOptions = []
                  // Second time
                  if (this.success == true)
                     this.address.stateId = null

                  // Clean Cities Select
                  this.city2ResidenceOptions = []

               }


               http.get(config('apiRoutes.ilocations.provinces'), params)
                   .then(response => {
                      response.data.data.forEach(data => {

                         if (cityOptions == 'CiO') {
                            this.cityOptions.push({
                               label: data.name,
                               value: data.id
                            })
                         }
                         if (cityOptions == 'CiRO') {
                            this.cityResidenceOptions.push({
                               label: data.name,
                               value: data.id
                            })
                         }

                      })
                      resolve(true);
                   })
                   .catch(error => {
                      reject(error);
                   });
            })

         },
         // Get Cities from Ilocations
         getCities2(cityModel) {

            //console.warn(cityModel)

            this.city2ResidenceOptions = []

            if (cityModel.value != undefined)
               cityModel = cityModel.value


            let params = {
               params: {
                  filter: {province_id: cityModel}
               }
            }

            this.$crud.index("apiRoutes.ilocations.cities", params).then(response => {
               //console.warn(response)
               response.data.forEach(data => {
                  this.city2ResidenceOptions.push({
                     label: data.name,
                     value: data.id
                  })
               })
            });

         },
         // Check Points Proccess
         async checkPointsProccess() {

            let checkPointRegister = this.$store.getters['qsiteSettings/getSettingValueByName']('iredeems::points-per-register-user-completed-checkbox')

            // Check active register user points
            if (checkPointRegister) {
               let pointPerRegister = this.$store.getters['qsiteSettings/getSettingValueByName']('iredeems::points-per-register-user-completed')
               if (pointPerRegister > 0) {

                  await this.getPointsRegister().catch(error => {
                  })
                  // User hasn't points for register
                  if (this.checkPU.length == 0) {
                     this.savePointsRegister(pointPerRegister)
                  }

               }
            }

         },
         // Get if the user has points per register
         getPointsRegister() {
            return new Promise((resolve, reject) => {

               //Params
               let params = {
                  params: {
                     filter: {
                        userId: this.form.id,
                        type: 'user-register-completed'
                     }
                  }
               }

               this.$crud.index("apiRoutes.qredeems.points", params).then(response => {

                  this.checkPU = response.data
                  resolve(true)//Resolve

               }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

                  reject(false)//Resolve
               })
            })
         },
         // Save Points
         savePointsRegister(pointPerRegister) {

            let data = {
               user_id: this.form.id,
               pointable_id: this.form.id,
               pointable_type: 'Modules\\User\\Entities\\Sentinel\\User',
               type: 'user-register-completed',
               points: pointPerRegister,
               description: 'Puntos por completar registro'
            }

            this.$crud.create('apiRoutes.qredeems.points', data).then(response => {
               //console.warn("SAVE IREDEEMS - POINTS PER REGISTER")
            }).catch(error => {
               console.error('[CREATE IREDEEMS - POINTS PER REGISTER COMPLETED] ', error)
               this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            })

         },
         // Create Value Ocio
         createValueOcio(val, done) {
            done(val, 'add-unique')
         },
         // Get Categories Store Like Promotions
         getCategoriesStore() {
            return new Promise((resolve, reject) => {

               /*
               let params = {
                 refresh: true,
                 params: {
                   filter: {allTranslations: true}
                 }
               }
               */

               this.$crud.index("apiRoutes.qmarketplace.category").then(response => {

                  response.data.forEach(data => {
                     this.promotionOptions.push({
                        label: data.title,
                        value: data.id
                     })
                  })

                  resolve(true)//Resolve

               }).catch(error => {
                 // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  console.error("ERROR - GET CATEGORIES STORE")
                  reject(false)//Resolve
               })
            })
         }


      }
   }

</script>

<style lang="stylus">
   .quser-profile
      .title-principal
         margin-bottom 65px

         h3
            font-size 25px
            line-height 30px
            color #4D4D4D

         small
            font-size 15px
         @media screen and (max-width: $breakpoint-sm)
            h3
               font-size 20px

      .title-label-profile
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

      .text-h6
         line-height 1.5rem
         color $secondary
         @media screen and (max-width: $breakpoint-sm)
            line-height 1rem
            font-sie 1rem
            margin-top 10px
            margin-bottom 20px

      .q-field__label
         color #444
         font-size 23px
         padding-bottom 60px

      .requeried
         .q-field__label:before
            color $primary
            content '* '

      .label-mini
         .q-field__label
            font-size 16px
            padding-bottom 20px
            color #888

      .btn-arrow-send-pink:after
         right 90px
</style>
