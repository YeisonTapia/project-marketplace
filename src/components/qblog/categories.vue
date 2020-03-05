<template>
  <q-card class="q-mb-xl">
    <q-card-section class="text-secondary font-family-secondary">
      <h5 class="q-my-none q-mx-lg">Categorías</h5>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-sm">

      <q-list>
        <q-item clickable v-ripple v-for="category in categories" :key="category.id"  :to="{name : 'qblog.index', params : {category:category.slug}}">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-caret-right" />
          </q-item-section>
          <q-item-section>{{category.title}}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
    name: 'CategoriesBlogComponent',
  data() {
    return {
      loading: false,
      categories:null,
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      let params = {
        params: {
          filter: {},
        }
      }
      this.$crud.index("apiRoutes.qblog.categories", params).then(response => {
        this.categories=response.data;
        this.loading = false
      }).catch(error => {
        console.error('[GET CATEGORIES] ', error);
        //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        this.loading = false
      })
    },
  }
}
</script>
<style lang="stylus">
</style>
