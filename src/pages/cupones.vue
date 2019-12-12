<template>
   <q-page class="bg-fondo store-page cupones">
      <div class="q-py-xl">
        <div class="q-container">
          <div class="row">
            <div class="col-12">
              <div class="text-h5 text-primary q-mb-md font-family-secondary">Crear Cupón</div>
            </div>
            <div class="col-12 form-general">

              <q-card class="rounded-md bg-white q-mb-xl">

                <q-card-section class="q-pa-lg">
                  <p class="text-primary float-right cursor-pointer">Generar código</p>
                  <p class="caption q-mb-md">Código de descuento
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                      <q-tooltip>
                        Some text as content of Tooltip
                      </q-tooltip>
                    </q-btn>
                  </p>
                  
                  <q-input color="primary" class="codigo" outlined placeholder="lorep ipsom" />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">

                  <p class="caption q-mb-md">Tipos</p>

                   <q-option-group
                      keep-color
                      color="primary"
                      :options="optionsTipos"
                      type="radio"
                      v-model="tipo"
                    />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Valor</p>
                  <p class="text-subtitle1">valor de descuento</p>

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      <q-input outlined color="tertiary" class="valor" suffix="%">
                      </q-input>
                    </div>
                  </div>
                
                </q-card-section>
                <q-separator />
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Se aplica a</p>

                  <q-option-group
                    keep-color
                    color="primary"
                    :options="optionsAplica"
                    type="radio"
                    v-model="aplica"
                  />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Requerimientos mínimos</p>
                  <q-option-group
                    keep-color
                    color="primary"
                    :options="optionsRequerimiento"
                    type="radio"
                    v-model="requerimientos"
                  />
                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Elegibilidad del cliente</p>
                  <q-option-group
                    keep-color
                    color="primary"
                    :options="optionsElegibilidad"
                    type="radio"
                    v-model="elegibilidad"
                  />
                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Límites de uso</p>
                  <q-option-group
                    keep-color
                    color="primary"
                    :options="optionsLimite"
                    type="checkbox"
                    v-model="limite"
                  />
                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-mt-lg q-mb-xl">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Periodo de duración</p>

                  <div class="row q-col-gutter-md periodo">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      <p class="text-subtitle1 q-mb-xs">Fecha de inicio</p>
                      <q-input outlined color="tertiary">
                        <template v-slot:prepend>
                          <q-icon name="far fa-calendar" color="primary" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      <p class="text-subtitle1 q-mb-xs">Hora de inicio</p>
                      <q-input outlined color="tertiary">
                        <template v-slot:prepend>
                          <q-icon name="far fa-clock" color="primary" />
                        </template>
                      </q-input>
                    </div>
                  </div>

                   <q-checkbox class="q-my-md" v-model="val"  label="Fijar una fecha de finalización" color="primary" />


                </q-card-section>
              </q-card>

              <div class="text-right">
                 <q-btn class="bg-primary text-white btn-arrow-send-pink"
                          color="primary" label="Actualizar"
                        />
              </div>
             


            </div>

          </div>
      </div>    
    </div>
   </q-page>
</template>

<script>
   export default {
      name: "CuponesPage",
      data () {
        return {
          tipo: null,
          aplica:null,
          requerimiento: null,
          elegibilidad: null,
          limite: [''],
          val: null,
          optionsTipos: [
            { label: 'Porcentaje', value: '1' },
            { label: 'Cantidad Fija', value: '2'},
            { label: 'Envios gratos', value: '3'},
            { label: 'Compra X, obten Y', value: '4'},
          ],
          optionsAplica: [
            { label: 'Pedido completo', value: '1' },
            { label: 'Colecciones específicas',  value: '2'},
            { label: 'Productos especificos',  value: '3'}
          ],
          optionsRequerimiento: [
            { label: 'Ninguno', value: '1' },
            { label: 'Monto mínimo de compra',  value: '2'},
            { label: 'Cantidad mínima de artículos',  value: '3'}
          ],
          optionsElegibilidad: [
            { label: 'Todos', value: '1' },
            { label: 'Grupos especificos de clientes',  value: '2'},
            { label: 'Clientes especificos',  value: '3'}
          ],
          optionsLimite: [
            { label: 'Limitar el número de veces que se puede usar este descuento en total', value: '1' },
            { label: 'Limitar a un uso por cliente',  value: '2'}
          ]
        }
      }
   }
</script>
<style lang="stylus">
.cupones 
  .codigo
    .q-field__control
      border-radius 20px
      padding-left 20px
      padding-right 20px
      &:before
        border 1px solid $tertiary
  .valor
    .q-field__control
      border-radius 20px
      padding-left 20px
      padding-right 20px
      &:before
        border 1px solid $tertiary
    .q-field__suffix    
      background-color $tertiary  
      color #fff
      font-size 20px
      font-weight bold
      padding-left 20px
      padding-right 20px
      border-top-right-radius 20px
      border-bottom-right-radius 20px
      margin-right -20px
  .periodo
    .q-field__control
      border-radius 20px
      padding-left 20px
      padding-right 20px
      &:before
        border 1px solid $tertiary
</style>