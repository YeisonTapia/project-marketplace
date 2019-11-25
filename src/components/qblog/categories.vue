<template>
  <q-card class="q-mb-xl">
    <q-card-section class="text-secondary font-family-secondary">
      <h5 class="q-my-none q-mx-lg">Categorías</h5>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-sm">

      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-caret-right" />
          </q-item-section>

          <q-item-section>Moda</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-caret-right" />
          </q-item-section>

          <q-item-section>Moda</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-caret-right" />
          </q-item-section>

          <q-item-section>Moda</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>    
<script>
export default {
    name: 'CategoriesBlogComponent'
}
</script>
<style lang="stylus"> 
</style> 