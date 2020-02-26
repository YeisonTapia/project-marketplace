<template>
  <q-expansion-item  v-else-if="checkItemMultiple(item)" :icon="item.icon" :key="key"
                     :label="props.translatable ? $tr(item.title) : item.title"
                     :header-class="selectedChildren(item)" :default-opened="selectedChildren(item) ? true : false"
                     :class="selectedChildren(item) ? 'expansion-selected' : ''">
   <q-menu>
      <q-list dense style="min-width: 100px">
         <q-item clickable v-close-popup>
            <q-item-section>Open...</q-item-section>
         </q-item>
         <q-item clickable v-close-popup>
            <q-item-section>New</q-item-section>
         </q-item>
         <q-separator></q-separator>
         <q-item clickable>
            <q-item-section>Preferences</q-item-section>
            <q-item-section side>
               <q-icon name="keyboard_arrow_right"></q-icon>
            </q-item-section>

            <q-menu anchor="top right" self="top left">
               <q-list>
                  <q-item
                          v-for="n in 3"
                          :key="n"
                          dense
                          clickable
                  >
                     <q-item-section>Submenu Label</q-item-section>
                     <q-item-section side>
                        <q-icon name="keyboard_arrow_right"></q-icon>
                     </q-item-section>
                     <q-menu auto-close anchor="top right" self="top left">
                        <q-list>
                           <q-item
                                   v-for="n in 3"
                                   :key="n"
                                   dense
                                   clickable
                           >
                              <q-item-section>3rd level Label</q-item-section>
                           </q-item>
                        </q-list>
                     </q-menu>
                  </q-item>
               </q-list>
            </q-menu>

         </q-item>
         <q-separator></q-separator>
         <q-item clickable v-close-popup>
            <q-item-section>Quit</q-item-section>
         </q-item>
      </q-list>

   </q-menu>

   <recursive-menu :translatable="props.translatable" :show-icons="props.showIcons"
                   :key="key" :menu="item.children"/>

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
            handler(value) {
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
               if (process.env.CLIENT) window.open(`https://${item.url}`, item.target)
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
