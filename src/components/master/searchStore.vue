<template>
    <q-toolbar class="search q-px-none">
      <q-btn class="btn-search q-mr-xs" 
          round color="warning"  icon="search" @click="searchStore()" />
      <q-input v-model="search.text" dense color="white" outlined 
          placeholder="Busca tu vaina aquí..."/>   
      <q-select outlined dense class="select-neighborhood"
                v-model="search.neighborhood" :options="neighborhoodOptions" />
      <q-space class="q-mx-sm" />
      <q-select outlined class="select-cities" v-model="search.city" :options="cityOptions">
        <template v-slot:prepend>
          <q-icon name="fas fa-globe-americas" />
        </template>
      </q-select>
    </q-toolbar>
</template>
<script>
export default {
    name: 'searchStoreComponent',
    data() {
      return {
        search: {
          text: '',
          neighborhood: 'Barrios',
          city: 'Rioacha'
        },
        neighborhoodOptions: [ 'Barrios','Barrios','Barrioswert' ],
        cityOptions: [ 'Rioacha','Playaacha','Lagoacha'],
      }
    },
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