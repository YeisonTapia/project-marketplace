<template>
    <ul :class="className">
      <li v-for="(item, index) in menu" :key="index" @click="redirectTo(item)" class="q-px-lg">
        <q-icon :name=" item.icon"/> {{ item.title }} <q-icon name="arrow_drop_down" v-if="item.children" />
        <menuComponent :menu="item.children" v-if="item.children" className="dropdown"/>
      </li>
    </ul>
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

<style >
  a {
    text-decoration: none;
  }
  
  nav {

  }
</style>
