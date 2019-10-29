<template>
	<q-modal :content-css="{borderRadius: '20px'}"  minimized v-model="opened">
		<q-modal-layout class="text-center bg-degradado">

			<div class="layout-padding">
				<div class="q-mb-lg">
					<img :src="logo" style="height:150px;">
				</div>

				<div class="bg-white q-pa-md shadow-2 rounded-lg q-mb-lg" >
					<div class="q-title text-primary">REGISTRATE COMO USUARIO</div>
					<div class="q-caption">Ganaras puntos, premios, regalos y muchas sorpresas</div>
				</div>

				<div class="bg-white q-pa-md shadow-2 rounded-lg q-mb-lg" >
					<div class="q-title text-primary">CREA TU TIENDA VIRTUAL</div>
					<div class="q-caption">Registra tu negocio o empresa local y muestralo al mundo entero</div>
				</div>

				<div class="bg-white q-pa-md shadow-2 rounded-lg q-mb-lg" >
					<div class="q-title text-primary">ENTRA SIN REGISTRARTE</div>
					<div class="q-caption">No tendras beneficios no sorpresas</div>
				</div>

				<div class="q-body-1 q-mb-lg text-white">¿Ya estás registrado?</div>	

				
				<q-btn label="Entra aquí" :to="{name : 'auth.login'}" text-color="white" outline style="border-left:0;border-right:0; border-radius:0;" />


			</div>
		</q-modal-layout>
	</q-modal>
</template>

<script>
export default {
	name: 'modalInicialComponent',
	props: ['opened'],
	data () {
		return {
			logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo2').path,
		}
	}
}
</script>