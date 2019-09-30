<template>
  <q-card flat  class="card-top bg-light w-100 h-100">
    <div class="text-center">
      <img class="img-title" src="/assets/img/top-companies.png">
    </div>
    <q-card-main>
      <h2 class="text-primary font-family-secondary">Mejores Empresas</h2>
      <ol>
        <li v-for="item of list">{{item.name}}</li>
      </ol>
    </q-card-main>
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
  & .q-card-main
    padding 10px 25px 15px 25px
    font-family 'Trebuchet MS'
    & h2
      font-size 20px
      margin-bottom 30px 
    & ol 
      list-style none
      counter-reset my-awesome-counter
      padding-left 5px
      font-size 17px
      li 
        counter-increment my-awesome-counter
        margin-bottom 20px
        &:before 
          content counter(my-awesome-counter)
          color #FD2D5E
          margin-right 6px
          font-family 'Carter One'
</style>
