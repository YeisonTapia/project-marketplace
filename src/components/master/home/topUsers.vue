<template>
  <q-card flat  class="card-top-users bg-primary text-light w-100 h-100">
    <div class="text-center">
      <img class="img-title" src="/assets/img/copa.png">
    </div>
    <q-card-main>
      <h2 class="q-mb-0 font-family-secondary">Usuarios Destacados</h2>
      <ul>
        <li v-for="item of list">{{item.name}}</li>
      </ul>
    </q-card-main>
  </q-card>
</template>
<script>
  export default {
    name: 'TopUsersComponent',
    data () {
        return {
            list: [
                {
                    name: 'Aenean Ornare Non'
                },
                {
                    name: 'Aenean Ornare Non'
                },
                {
                    name: 'Aenean Ornare Non'
                },
                {
                    name: 'Aenean Ornare Non'
                },
                {
                    name: 'Aenean Ornare Non'
                }
            ]
        }
    }
  }
</script>
<style lang="stylus">
.card-top-users
  border-radius 10px
  & .img-title
    object-fit contain
    width  auto
    margin: -25px  auto 12px
    height 80px
  & .q-card-main
    padding 10px 25px 15px 25px
    font-family 'Trebuchet MS'
    & h2
      font-size 20px
      margin-bottom 30px
    & ul 
        list-style none
        padding-left 5px
        font-size 17px
        li 
          margin-bottom 20px
          &:before 
            margin-right 6px
            content '\f005'
            color: #F7C837
            font-family 'fontawesome'
</style>
