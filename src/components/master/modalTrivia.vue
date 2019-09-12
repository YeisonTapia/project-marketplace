<template>
	<q-modal :content-css="{borderRadius: '20px'}" v-model="opened">
		<q-modal-layout>
			<div  class="text-right q-pa-md">
				<q-btn round  size="sm"
					color="primary"
	        		@click="onClose()"
	        		icon="fas fa-times"
	      		/>
			</div>
			<div class="layout-padding q-pt-xs">

				<div class="ratio-4-3">
                    <img :src="trivia.image">
                </div>	
				
			</div>
		</q-modal-layout>
	</q-modal>
</template>

<script>
export default {
	name: 'modalTriviaComponent',
	props: ['trivia','opened'],
	methods: {
		onClose() {
			this.opened = false;
			this.$emit('closedModal',this.opened);
		}
	}
}
</script>