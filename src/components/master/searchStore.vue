<template>
  <q-toolbar class="search q-px-none">
    <q-btn class="btn-search q-mr-xs"
    round color="warning"  icon="search" @click="searchStore()" />
    <q-input v-model="search.text" dense color="white" outlined
    placeholder="Busca tu vaina aquí..."/>

    <!-- <q-select outlined dense class="select-neighborhood"
    v-model="search.neighborhood" :options="neighborhoodOptions" /> -->

    <tree-select
    :clearable="false"
    :append-to-body="true"
    class="q-mb-md"
    :options="search.neighborhoods"
    value-consists-of="BRANCH_PRIORITY"
    v-model="search.neighborhoodId"
    placeholder=""
    />

    <q-space class="q-mx-sm" />

    <tree-select
    :clearable="false"
    :append-to-body="true"
    class="q-mb-md"
    :options="search.cities"
    value-consists-of="BRANCH_PRIORITY"
    @input="val => { getNeighborhoods() }"
    v-model="search.cityId"
    placeholder=""
    />

    <!-- <q-select outlined class="select-cities" v-model="search.city" :options="cityOptions">
    <template v-slot:prepend>
    <q-icon name="fas fa-globe-americas" />
  </template>
</q-select> -->
</q-toolbar>
</template>
<script>
export default {
  name: 'searchStoreComponent',
  data() {
    return {
      search: {
        text: '',
        provinceId:777,
        cities:[],
        neighborhoods:[],
        cityId:0,
        neighborhoodId:0,
        neighborhood: 'Barrios',
        city: 'Rioacha'
      },
      neighborhoodOptions: [ 'Barrios','Barrios','Barrioswert' ],
      cityOptions: [ 'Rioacha','Playaacha','Lagoacha'],
    }
  },
  mounted(){
    this.getCities();
  },
  methods:{
    searchStore(){
      if(!this.search.neighborhoodId){
        this.$alert.error({message: "Debes seleccionar un barrio", pos: 'bottom'})
      }else{
        let params = {
          refresh: true,
          params: {
            include: '',
            filter: {allTranslations: true},
            filter:{
              neighborhoods:[this.search.neighborhoodId]
            }
          }
        }
        //Request
        this.$crud.index("apiRoutes.qmarketplace.store", params).then(response => {
          console.log('stores');
          console.log(response.data);
        });
      }//else
    },
    getCities(){
      if(this.search.provinceId){
        let params = {
          remember: false,
          params: {
            include: '',
            filter:{
              allTranslations: true,
              province_id:this.search.provinceId
            }
          }
        };//params
        this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
          this.search.cities=[];
          this.search.cities.push({label:"Selecciona una ciudad",value:0,id:0});
          for(var i=0;i<response.data.length;i++){
            this.search.cities.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
          }
        });
      }
    },
    getNeighborhoods(){
      if(this.search.cityId){
        let params = {
          remember: false,
          params: {
            include: '',
            filter:{
              allTranslations: true,
              city:this.search.cityId
            }
          }
        };//params
        this.$crud.index("apiRoutes.ilocations.neighborhoods",params).then(response => {
          this.search.neighborhoods=[];
          this.search.neighborhoods.push({label:"Selecciona un barrio",value:0,id:0});
          for(var i=0;i<response.data.length;i++){
            this.search.neighborhoods.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
          }
        });
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
</style>
