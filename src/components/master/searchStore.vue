<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-toolbar class="search q-px-none" v-if="success" >
        <q-btn class="btn-search q-mr-xs"
            round color="warning"  icon="search" @click="searchReedirect()" />
        <q-input
          v-model="search.text"
          dense
          color="white"
          outlined
          placeholder="Busca tu vaina aquí..."
          @keydown.enter="searchReedirect()"/>
        <q-select
          outlined
          dense
          class="select-neighborhood"
          v-model="search.neighborhood"
          :options="neighborhoodOptions"
          />
        <q-space class="q-mx-sm" />
        <q-select
          outlined
          class="select-cities"
          v-model="search.city"
          :options="cityOptions"
          >
          <template v-slot:prepend>
            <q-icon name="fas fa-globe-americas" />
          </template>
        </q-select>
      </q-toolbar>
    </div>
    <div v-else>
      <div class="search-mobile" v-if="success" >
        <q-input
        v-model="search.text" 
        rounded outlined dense
        class="q-mb-sm"
        placeholder="Busca tu vaina aquí..."
        @keydown.enter="searchReedirect()"/>

        <q-select
          rounded outlined dense
          class="select-neighborhood q-mb-sm"
          v-model="search.neighborhood"
          :options="neighborhoodOptions"
          />
 
        <q-select
          rounded outlined dense
          class="select-cities q-mb-sm"
          v-model="search.city"
          :options="cityOptions" />


          <q-btn class="btn-search full-width" color="secondary" label="Buscar" icon="search" @click="searchReedirect()" />
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
          text: '',
          neighborhood: {},
          city: {}
        },
        provinceId: 777, // Default - La Guajira
        cityOptions: [],
        neighborhoodOptions: [],

      }
    },
    mounted(){
      this.init();
    },
    methods:{

      async init(){

        await this.getCities();//

        this.success = true
      },
      // Get Cities
      getCities(){

        this.search.city = {label:"RIOHACHA",value:640,id:640}
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
      getNeighborhoods(){

        if(this.search.city.id){

          //params
          let params = {
            remember: false,
            params: {
              include: 'city',
              filter:{
                allTranslations: true,
                city:this.search.city.id
              }
            }
          };

          this.$crud.index("apiRoutes.ilocations.neighborhoods",params).then(response => {

            this.neighborhoodOptions=[];
            this.neighborhoodOptions.push({label:"Barrio",value:0,id:0});

            for(var i=0;i<response.data.length;i++){
              this.neighborhoodOptions.push({
                label:response.data[i].name,
                value:response.data[i].id,
                id:response.data[i].id
              });
            }

            this.search.neighborhood = {label:"Barrio",value:0,id:0}

          }).catch(error => {
            console.error('[ERROR - GET Neighborhoods] ', error)
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          })

        }

      },
      // Reedirect to search
      searchReedirect(){

        let cityId = this.search.city.id
        let neighborhoodId = this.search.neighborhood.id

        if(this.search.text!=null && this.search.text!=''){
          this.$router.push({
            name: 'app.busqueda',
            params: {
              text: this.search.text,
              cityId: cityId,
              neighborhoodId: neighborhoodId
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
            border 0!important
        & .q-field__native
          color $tertiary
          font-size 18px
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
            border 0!important
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
            border 0!important
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
