<template>
  <div class="triviaModal">
    <q-modal  @show="openModal()" @hide="closeModal()" :content-css="{borderRadius: '20px', minWidth: '30vw'}" v-model="trivia.opened">
        <q-modal-layout>

            <div class="text-right q-pa-md">
                <q-btn round  size="sm" color="primary" @click="closeModal()" icon="fas fa-times"/>
            </div>

            <div class="layout-padding relative-position">

                <trivia v-if="showTrivia" :trivia="trivia" :loading2="loading"  @loading2="loading = $event"
                    isModal="true" 
                    className="modaltrivia">
                </trivia>
            	
            	 <!-- msj final -->
			    <q-alert v-if="alertContent.active" :color="alertContent.color" :icon="alertContent.icon" class="q-mx-sm q-mt-xl">
			        {{alertContent.msj}}
			    </q-alert>
                  		
            </div>
                 
        </q-modal-layout>
         <q-inner-loading :visible="loading" />
    </q-modal>
  </div>
</template>
<script>
import trivia from 'src/components/master/home/trivia'
export default {
    name: 'triviaModal',
    components: {
    	trivia
  	},
    props: ['trivia'],
    data() {
	    return {
	      	lang: this.$q.i18n.lang,
	      	loading: false,
	      	success: false,
	      	showTrivia: false,
	     	checkUserIds: false,
	     	triviaUserId:[],
	     	userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
	     	alertContent:{
	          active: false,
	          color:'secondary',
	          icon:'info',
	          msj:'Ya participaste en esta trivia'
	        },     
	    }
	 },
    methods:{
    	async init(){

    		this.loading = true

    		if(this.userId!=null){
    			// Check if user has voted this trivia
	    		await this.getUserTrivia()

	    		if(this.triviaUserId.length==0){
	    			this.showTrivia = true
	    		}else{
	    			this.alertContent.active = true
	          		this.loading = false
	    		}
    		}else{
    			this.alertContent.msj = "Debes iniciar sesion"
        		this.alertContent.icon = "account_circle"
        		this.alertContent.active = true
        		this.loading = false
    		}
	    	
    	},
    	// Open Modal
	    openModal(){
	    	this.init()
	    },
	    // Close Modal
	    closeModal(){
	    	this.trivia.opened = false
	    	this.$emit('trivia',null);
	    },
	    //Get trivia User
	    getUserTrivia(){
	      return new Promise((resolve, reject) => {
	        //Params
	        let params = {
	          refresh: true,
	          params: {
	            filter: {userId:this.userId,triviaId:this.trivia.id},
	            fields: 'trivia_id'
	          }
	        }

	        this.$crud.index("apiRoutes.qtrivia.userTrivias",params).then(response => {
	          this.triviaUserId = response.data
	          resolve(true)//Resolve
	        }).catch(error => {
	          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
	          reject(false)//Resolve
	        })

	      })
	    },

    }
}
</script>
