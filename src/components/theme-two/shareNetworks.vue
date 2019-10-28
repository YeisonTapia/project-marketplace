<template>
  <q-list class="q-mb-lg border-0">
    <q-list-header class="bg-secondary text-white rounded-sm q-mb-sm text-center">
      <q-icon name="share" />
      COMPARTIR
    </q-list-header>
    <q-item>
      <q-item-side icon="fab fa-facebook" />
      <q-item-main label="Facebook" />
    </q-item>
    <q-item-separator />
    <q-item>
      <q-item-side icon="fab fa-twitter" />
      <q-item-main label="Twitter" />
    </q-item>
    <q-item-separator />
    <q-item>
      <q-item-side icon="fab fa-instagram" />
      <q-item-main label="Instagram" />
    </q-item>
  </q-list>
</template>
<script>
export default {
  name: 'ShareNetworksComponent',
}
</script>
