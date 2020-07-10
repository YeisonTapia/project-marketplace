<template>
	<div class="page page-nosotros">
		<div class="bg-fondo q-px-sm py-xl">
			<div class="q-container q-pb-lg">
				<div class="row">
					<div class="col-12 my-xl">
						<img class="full-width" src="statics/img/nosotros.jpg" alt="nosotros">
					</div>
					<div class="col-xs-12 col-sm-12 col-md-3 text-center q-py-md">
						<h4 class="title text-secondary font-family-secondary q-my-sm">Nosotros</h4>
						<img class="q-hide q-md-show" style="margin: 0 auto;" src="statics/img/arrow-right-pink.png" alt="nosotros">
					</div>
					<div class="col-xs-12 col-sm-12 col-md-9 text-justify">
						<p class="text-weight-medium">Somos dos jóvenes soñadores que un día común y corriente mientras jugábamos un partido de futbol en FIFA 2015 en PlayStation queríamos pedir un domicilio de comida, pero no teníamos un número de contacto ni sabíamos de un buen lugar para comprarla. Al vernos en esta situación nos preguntamos: ¿Qué tal si hubiera una página web dedicada a la búsqueda y localización de todos los negocios de Riohacha, sin discriminación alguna? Fue así como nació la idea de dondeestaesavaina.com. Una  página web dedicada a usuarios que buscan información y localización de las empresas formales e informales y negocios de barrio de la ciudad de Riohacha, para adquirir productos y/o servicios de las mismas, quienes se ven beneficiadas con un reconocimiento y publicidad online, lo cual ayudara en el aumento de sus ventas.</p>
					</div>
				</div>
			</div>
		</div>
		<div class="q-container q-px-sm">
			<div class="row">
				<div class="col-12">
					<h3 class="title-label-primary text-center">
						<div>Términos y condiciones</div>
					</h3>
					<p class="q-pa-xl text-justify">
						{{text}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "termsAndConditions",
	  data(){
      return {
        text: this.$store.getters['qsiteSettings/getSettingValueByName']('marketplace::terms-and-Conditions')
      }
	  }
  }
</script>

<style scoped>

</style>
