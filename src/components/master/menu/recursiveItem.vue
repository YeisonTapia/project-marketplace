<template>
  <div>
    <div id="listMenu">
      <q-no-ssr v-for="(item,key) in props.menu" :key="key" :class="`content-item ${inLine ? 'inline-block' : ''}`">
        <q-separator v-if="!inLine"/>
        <!--Single Item-->
        <q-item v-close-popup :class="getClassItem(item)" v-if="checkItemSingle(item)"
                @click.native="redirectTo(item)" clickable :key="key">
          <q-item-section v-if="item.icon && props.showIcons" avatar>
            <q-icon :name="item.icon"/>
          </q-item-section>
          <q-item-section> {{props.translatable ? $tr(item.title) : item.title}}</q-item-section>
        </q-item>

        <!-- Dropdwon Item -->




          <!--Recursive item-->

          <recursive-menu  :translatable="props.translatable" :show-icons="props.showIcons"
                          :key="key" :menu="item.children"/>
        </q-expansion-item>
      </q-no-ssr>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'recursiveMenu',
    components: {},
    props: {
      menu: {default: false},
      showIcons: {type: Boolean, default: true},
      translatable: {type: Boolean, default: true},
      inLine: {type: Boolean, default: false}
    },
    watch: {
      menu: {
        handler (value) {
          this.init()
        },
        deep: true
      }
    },

    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        props: {}
      }
    },
    methods: {
      //init
      init() {
        this.props = this.$clone(this.$props)
        setTimeout(() => {
          this.checkCollapsibles()
        }, 300)
      },
      //Validate if should load single-item
      checkItemSingle(item) {
        let response = true
        if (!item.activated) response = false
        if (item.children) response = false
        if (!item.name) response = false
        if (item.permission && !this.$auth.hasAccess(item.permission)) response = false
        return response//Response
      },
      //Validate if should load multi-item
      checkItemMultiple(item) {
        let response = true
        if (!item.children) response = false
        if (item.children && !item.children.length) response = false
        if (item.permission && !this.$auth.hasAccess(item.permission)) response = false
        return response//Response
      },
      //Validate if should load all multi-item
      checkCollapsibles() {
        let collapsibles = this.$el.getElementsByClassName('q-expansion-item')
        for (let group of collapsibles) {
          let items = group.getElementsByClassName('single-item')
          if (!items.length) group.style.display = 'none'
        }
      },
      //Redirect to route of pages
      redirectTo(item) {
        if (item.linkType && (item.linkType == 'external')) {
          if(process.env.CLIENT)  window.open(`https://${item.url}`, item.target)
        } else {
          this.$router.push({name: item.name, params: item.params || {}})
        }
      },
      //Validate if children of multi-item is selected
      selectedChildren(item) {
        let response = ''//Defualt response
        //If has children's
        if (item.children) {
          let routeName = this.$route.name
          let isSelectedChildren = item.children.find(item => item.name == routeName)
          if (isSelectedChildren) response = ' item-is-active'
        }
        return response //Response
      },
      //Validate if item is same of current page
      getClassItem(item) {
        let response = 'single-item'
        if (this.$route.name == item.name) {
          if (JSON.stringify(this.$route.params) == JSON.stringify(item.params || {})) {
            response += ' item-is-active'
          }
        }
        return response
      }
    }
  }
</script>
<style lang="stylus">
</style>
