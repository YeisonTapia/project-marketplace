<template>
     <div class="desktopMenu">
       <q-list separator link no-border class="q-pa-none">
        
          <q-item v-for="(item, index) in menu" :key="index" > 
             
            <q-btn-dropdown flat no-caps :icon="item.icon" :label="item.title" v-if="item.children">

                <q-list class="submenu border-0 q-pa-none bg-light" v-for="(i, index) in item.children" :key="index">
                  <q-collapsible :icon="i.icon" :label="i.title"  v-if="i.children">
                    <div>
                      <p>{{item.title}}</p>
                      <q-item v-for="(a, index) in i.children" :key="index">
                        <q-item-main :label="a.title" @click="redirectTo(a)" />
                      </q-item>
                    </div>
                  </q-collapsible>
                  <q-item @click="redirectTo(i)" v-else>
                      <q-item-side :icon="i.icon" />
                      <q-item-main :label="i.title" />
                  </q-item>
                </q-list>

            </q-btn-dropdown>
            <q-btn :icon="item.icon" flat no-caps :label="item.title" @click="redirectTo(item)" v-else/>

          </q-item>
        </q-list>
    </div>
</template>

<script>
  export default {
    name: 'menuComponent',
    props: {
      className:{
        default: 'single'
      },
      menu: {
        default:false
      }
    },
    methods:{
      redirectTo(item){
        if (item.linkType == 'external' && !item.children){
          window.open(`https://${item.url}`,item.target);
        }
        this.$router.push({name: item.name})
      }
    }
  }
</script>
<style lang="stylus">
  @import "~variables";

  .desktopMenu
    -webkit-transform skew(10deg)
    transform skew(10deg)
    border-radius 10px
    padding 10px 15px
    margin -14px 0 10px 0
    background-color $warning
    font-size 20px
    position relative
    > .q-list
      -webkit-transform  skew(-10deg)
      transform skew(-10deg)     
      display -ms-flexbox
      display flex
      -ms-flex-wrap wrap
      flex-wrap wrap
      margin 0
      list-style none
      padding 0 
      > .q-item
        -ms-flex 1 1 auto
        flex 1 1 auto
        cursor pointer  
        position relative
        padding 0 
        min-height 35px
        & .q-btn
          color $secondary
          padding 4px 10px
          position relative
        & :hover 
          color $tertiary
        & .q-btn:hover
            &:before
              content ''
              background-image url('/assets/img/menu-hover.png')
              position absolute
              width 100%
              height 10px
              background-repeat no-repeat
              bottom -3px
              left 0
              right 0
              background-position center
    .q-item.router-link-active, .q-item-link:hover
      background none  
    .q-focus-helper
      display none
      background none  

    .q-list-separator > .q-item-division + .q-item-division, .q-item-division + .q-item-separator,
    .q-list-link > .q-item:hover, .q-item-link:hover 
      border-top 0 !important 
      background none

</style>