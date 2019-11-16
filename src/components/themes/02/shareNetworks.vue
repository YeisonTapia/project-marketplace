<template>
  <q-list class="q-mb-lg border-0">
    <q-item class="bg-secondary text-white rounded-sm q-mb-sm text-center">
      <q-item-section avatar>
        <q-icon color="white" name="share" />
      </q-item-section>
      <q-item-section class="q-py-md">COMPARTIR</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="primary" name="fab fa-facebook" />
      </q-item-section class="q-py-md">
      <q-item-section class="q-py-md">Facebook</q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="primary" name="fab fa-twitter" />
      </q-item-section>
      <q-item-section class="q-py-md">Twitter</q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="primary" name="fab fa-instagram" />
      </q-item-section>
      <q-item-section class="q-py-md">Instagram</q-item-section>
    </q-item>
    <q-separator />
  </q-list>
</template>
<script>
export default {
  name: 'ShareNetworksComponent',
}
</script>
