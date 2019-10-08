<template>
     <div class="listMenuSide">
       <q-list separator link no-border class="q-pa-none">

          <q-item class="q-px-none" v-for="(item, id) in menu" :key="id" > 
            <q-collapsible :icon="item.icon" :label="item.title"  v-if="item.children">
        
                <q-item  v-for="(a, index) in item.children" :key="index" @click="redirectTo(a)">
                  <q-item-side :icon="a.icon" />
                  <q-item-main  :label="a.title" />
                </q-item>
     
            </q-collapsible>
            <q-item @click="redirectTo(item)" v-else>
                <q-item-side :icon="item.icon" />
                <q-item-main :label="item.title" />
            </q-item>
          </q-item>
        </q-list>
    </div>
</template>

<script>
  export default {
    name: 'menuSide',
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

  .listMenuSide
    
    border-top 1px solid #e0e0e0 !important
    .q-icon
      font-size 16px
      padding 0 10px
      color #444444

    .q-collapsible
      width 100%
      font-size 14px!important
      .q-item-side-left
        font-size 16px
        padding-right 10px
        color #444444
      .q-item-label
        font-size 14px
        padding-left 10px

    .q-collapsible-inner
      a, .q-collapsible
        border-top none !important
        color #444444
          
      .q-collapsible-sub-item
        &:hover
          color #444444
        .q-item
          padding 10px
          border 0
        .q-item.router-link-active
          padding 10px
          border 0
          background $light !important
          color $tertiary !important
          i
            color $tertiary
          &:hover
            background $light !important
            color $tertiary !important
        .q-item-side-left
          padding-left 15px   
          

    .collapsible-active
      background $tertiary!important
      color #fff !important
      .icon-collapsible
        transition .5s
        color #ffffff !important
        font-weight bold
      .q-collapsible-sub-item
        background #fff!important
        color #444444
        
    .router-link-active
      transition .5s
      background $tertiary
      color #ffffff
      .q-item-side-left
        i 
          color #ffffff 
      .q-icon
        transition .5s

    .q-btn
      padding 0

    .q-item.router-link-active, .q-item-link:hover
      background none  

    .q-focus-helper
      display none      
      background none   

    .q-item
      &:hover
        background $tertiary!important
        color #ffffff
        i 
          color #ffffff  
</style>