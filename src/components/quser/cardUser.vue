<template>
	<q-card class="card-user">
	    <q-img src="statics/img/fondo.jpg" />
	    <q-card-section class="text-center">
	      <q-avatar size="100px">
	        <img :src="card.info.mediumImage">
	      </q-avatar>
	      <div class="text-h6 ellipsis">{{card.info.fullName}}</div>
	      <div class="text-subtitle2 text-grey ellipsis"><q-icon name="place" color="primary" />  Lugar</div>
	      <q-rating v-model="card.stars" :max="5" size="20px" />
	      <div class="q-mt-md">
	        <q-chip color="tertiary" text-color="white">Bookmark</q-chip>
	        <q-chip color="tertiary" text-color="white">Bookmark</q-chip>
	        <q-chip color="tertiary" text-color="white">Bookmark</q-chip>
	      </div>
	      <div class="q-my-md">
	        <q-btn color="primary" class="q-mx-sm">View Profile</q-btn>
	      	<q-btn color="primary" class="q-mx-sm">Send Info</q-btn>
	      </div>
	      <div class="text-subtitle2 text-grey">Small plates, salads & sandwiches in an intimate setting.</div>
	    </q-card-section>
	    <q-separator />

	    <q-card-actions align="around">
	      <q-btn icon="phone" label="Puntos" stack flat />
	      <q-btn icon="phone" label="Stacked" stack flat />
	      <q-btn icon="phone" label="Stacked" stack flat />
	    </q-card-actions>
	</q-card>
</template>
<script>
export default {
    name: 'CardUserComponent',
    props: ['card'],
    data() {
	    return {     
	    }
	 },
    methods:{}
}
</script>

<style lang="stylus">
.card-user
	.q-img
		height 150px
	.q-card__section
		margin-top -50px	
</style>
