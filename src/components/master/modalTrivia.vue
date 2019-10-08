<template>
	<q-modal class="modaltrivia" :content-css="{borderRadius: '20px', minHeight: '80vh'}" v-model="opened">
		<q-modal-layout>
			<div  class="text-right q-pa-md">
				<q-btn round  size="sm"
					color="primary"
	        		@click="onClose()"
	        		icon="fas fa-times"
	      		/>
			</div>
			<div class="layout-padding q-px-xs q-pt-none">

				<q-stepper ref="stepper" v-model="currentStep" class="no-shadow">
				  <!-- Step: -->
				  <q-step :name="index" :order="index" :title="question.title" v-for="(question, index) in trivia.questions" :key="index">

					<div class="text-primary text-center q-mb-md">{{question.title}}</div>
					<div class="ratio-16-9">
				        <img :src="trivia.image">
				    </div>	
				    <div class="q-py-md card-trivia">
				    	 <q-option-group
				        v-model="question.answer"
						type="radio"
				        :options="question.options"
				        color="primary"
				      />
				    </div>

				    <div class="q-pb-lg" v-if="index != trivia.questions.length - 1">

						<div class="row items-center">
							<div class="col-sm-6 text-center">
								<q-icon name="fas fa-share-alt"/>
							    <div>Conexion</div>
							</div>
							<div class="col-sm-6">
				    			<div class="text-primary text-right" style="cursor:pointer;" @click="$refs.stepper.next()">
							    	<div>Siguiente</div>
							    	<img src="assets/img/arrow-right-blue.png" style="width:25px;">
								</div>
							</div>
						</div>

				    </div>

				    <div class="q-pb-lg" v-else>
						<div class="row items-center">
							<div class="col-sm-6 text-center">
								<q-icon name="fas fa-share-alt"/>
							    <div>Conexion</div>
							</div>
							<div class="col-sm-6 text-right">
				    			<q-btn 
									color="primary"
					        		@click="onCloseSend()"
					        		label="Enviar"
			      				/>
							</div>
						</div>

				    </div>
				  </q-step>
				</q-stepper>


			</div>
		</q-modal-layout>
	</q-modal>
</template>

<script>
export default {
	name: 'modalTriviaComponent',
	props: ['trivia','opened'],
	data () {
	    return {
	      currentStep: 0
	    }
	},
	methods: {
		onClose() {
			this.$emit('closedModal',false);
		},
		onCloseSend() {
			/* Enviar los datos de la trivia*/
			this.currentStep=0;
			this.$emit('closedModal',false);
		}
	}
}
</script>
<style lang="stylus">
.modaltrivia
	.q-stepper-header
		display none
	.q-stepper-step-inner
		padding-top 0!important
</style>