<template>
   <div>
      <div v-if="$q.platform.is.desktop">
         <q-toolbar class="search q-px-none" v-if="success">
            <q-btn class="btn-search q-mr-xs"
                   round color="warning" icon="search" @click="searchReedirect()"/>
            <q-input
                    v-model="search.text"
                    dense
                    color="white"
                    outlined
                    clearable
                    placeholder="Busca tu vaina aquí..."
                    @keydown.enter="searchReedirect()"/>
            <q-select
                    outlined
                    dense
                    class="select-neighborhood"
                    v-model="search.neighborhood"
                    :options="neigOption"
                    @filter="(val, update)=>update(()=>{neigOption = $helper.filterOptions(val,neighborhoodOptions,search.neighborhood)})"
                    clearable
                    use-input
                    label="Barrio"
            />
            <q-space class="q-mx-sm"/>
            <q-select
                    outlined
                    class="select-cities"
                    v-model="search.city"
                    :options="cityOptions"
            >
               <template v-slot:prepend>
                  <q-icon name="fas fa-globe-americas"/>
               </template>
            </q-select>
         </q-toolbar>
      </div>
      <div v-else>
         <div class="search-mobile" v-if="success">
            <q-input
                    v-model="search.text"
                    rounded outlined dense
                    clearable
                    class="q-mb-sm"
                    placeholder="Busca tu vaina aquí..."
                    @keydown.enter="searchReedirect()"/>

            <q-select
                    rounded
                    outlined
                    dense
                    clearable
                    class="select-neighborhood q-mb-sm"
                    v-model="search.neighborhood"
                    :options="neighborhoodOptions"
            />

            <q-select
                    rounded
                    outlined
                    dense
                    clearable
                    class="select-cities q-mb-sm"
                    v-model="search.city"
                    :options="cityOptions"/>


            <q-btn class="btn-search full-width" color="secondary" label="Buscar" icon="search"
                   @click="searchReedirect()"/>
         </div>
      </div>
   </div>


</template>
<script>
   export default {
      name: 'searchStoreComponent',
      data() {
         return {
            loading: false,
            success: false,
            search: {
               text: null,
               neighborhood: null,
               city: "RIOHACHA",
            },
            provinceId: 777, // Default - La Guajira
            cityOptions: [],
            neighborhoodOptions: [],
            neigOption:[]

         }
      },
      mounted() {
         this.init();
      },
      methods: {

         async init() {

            await this.getCities();//

            this.success = true
         },
         // Get Cities
         getCities() {
            this.cityOptions = [{label: "RIOHACHA", value: 640, id: 640}]
           this.search.city={label: "RIOHACHA", value: 640, id: 640}
            this.getNeighborhoods()

            /* Funcional - No eliminar - Comentado por ahora
            let params = {
                remember: false,
                params: {
                  include: '',
                  filter:{
                    allTranslations: true,
                    province_id: this.provinceId
                  }
                }
            };//params

            this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
                this.cityOptions=[];
                this.cityOptions.push({label:"Seleccione",value:0,id:0});
                for(var i=0;i<response.data.length;i++){
                  this.cityOptions.push({
                    label:response.data[i].name,
                    value:response.data[i].id,
                    id:response.data[i].id});
                }

                this.search.city = {label:"Seleccione",value:0,id:0}
            }).catch(error => {
              console.error('[ERROR - GET CITIES] ', error)
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            })
            */

         },
         // Get Neighborhoods
         getNeighborhoods() {

            if (this.search.city) {
               //params
               let params = {
                  params: {
                     include: 'city',
                     filter: {
                        allTranslations: true,
                        city: this.search.city.id
                     }
                  }
               };
               this.$crud.index("apiRoutes.ilocations.neighborhoods", params).then(response => {
                  this.neighborhoodOptions = this.$array.select(response.data, {label: 'name', id: 'id'});

               }).catch(error => {
                  console.error('[ERROR - GET Neighborhoods] ', error)
                  //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               })

            }

         },
         // Reedirect to search
         searchReedirect() {
            if (this.search.text || this.search.city || this.search.neighborhood) {
              let city=0
              let neighborhood=0
               if (this.search.city){
                  city = this.search.city.label
               }
               if(!this.search.text){
                  this.search.text='all'
               }

               if (this.search.neighborhood){
                 neighborhood = this.search.neighborhood.label
               }

               console.warn('PARMETROS DE BUSQUEDA', this.search.text, city, neighborhood)
              this.$router.push({
                  name: 'app.busqueda',
                params: {
                     search: this.search.text,
                     city: city,
                     neighborhood: neighborhood
                  }
               })
            }

         }

      }


   }
</script>
<style lang="stylus">
   #masterHeaderAdmin, #masterHeader
      .header-desktop
         .search
            .select-neighborhood
               & .q-icon
                  color $tertiary

               .q-field__control
                  color transparent
                  background-color #ffffff
                  border-radius 0 20px 20px 0

                  &:before
                     border 0 !important

               & .q-field__native
                  color $tertiary
                  font-size 18px
               .q-select__input
                  max-width 50px

            .btn-search
               font-size 20px
               margin-right -10px
               z-index 9

               & .q-icon
                  font-size 30px

            .q-input
               margin-right 2px

               & .q-field__control
                  border-radius 0
                  padding-left 15px
                  background-color #ffffff

                  &:before
                     border 0 !important

               & .q-field__native
                  color $primary
                  font-size 18px

                  &::-webkit-input-placeholder
                     color $primary !important

                  &::-moz-placeholder
                     opacity 1
                     color $primary !important

                  &:-moz-placeholder
                     color $primary !important

                  &:-ms-input-placeholder
                     color $primary !important

            .select-cities
               font-size 20px

               .q-field__control
                  color transparent

                  &:before
                     border 0 !important

               & .q-field__native
                  color #FFFFFF

               & .q-icon
                  color $warning

   .search-mobile
      .select-neighborhood, .select-cities, .q-input
         .q-field__control
            color transparent
            background-color #ffffff

</style>
