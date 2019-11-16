<template>
  <q-card flat  class="card-top bg-light full-width full-height">
    <div class="text-center">
      <img class="img-title" src="/statics/img/top-companies.png">
    </div>
    <q-card-section>
      <div class="text-h6 text-primary font-family-secondary">Mejores Empresas</div>
      <ol>
        <li v-for="item of list">{{item.name}}</li>
      </ol>
    </q-card-section>
  </q-card>
</template>
<script>
  export default {
    name: 'TopCompaniesComponent',
    data () {
        return {
            list: [
                {
                    name: 'Hotel Arimaca'
                },
                {
                    name: 'Heladería Y Pizzería Esencia'
                },
                {
                    name: 'American´s Pizza'
                },
                {
                    name: 'Laly’s Arts Shop'
                },
                {
                    name: 'Laly’s Arts Shop'
                }
            ]
        }
    }
  }
</script>
<style lang="stylus">
.card-top
  border-radius 10px
  & .img-title
      object-fit contain
      width  auto
      margin: -12px  auto 0
      height 80px
  & .q-card__section
      padding 10px 25px 15px 25px
      & ol 
        list-style none
        counter-reset my-awesome-counter
        padding-left 5px
        font-size 17px
        li 
          counter-increment my-awesome-counter
          margin-bottom 20px
          display flex
          &:before 
            content counter(my-awesome-counter)
            color $primary
            margin-right 8px
            font-family 'Carter One'
            top 0
            position relative
</style>
