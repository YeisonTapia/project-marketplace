<template>
    <q-dialog  @show="openModal()" @hide="closeModal()" v-model="trivia.opened">
        <q-layout class="bg-white triviaModal">

            <q-header class="bg-primary">
	          <q-toolbar>
	            <q-btn flat v-close-popup round dense @click="closeModal()" icon="close" />
	          </q-toolbar>
	        </q-header>

            <q-page-container>
				<q-page padding>
	                <trivia v-if="showTrivia" :trivia="trivia" :loading2="loading"  @loading2="loading = $event"
	                    isModal="true"
	                    className="modaltrivia">
	                </trivia>

	            	 <!-- msj final -->
				    <div v-if="alertContent.active" :color="alertContent.color" :icon="alertContent.icon" class="q-mx-sm q-mt-xl">
				        {{alertContent.msj}}
				    </div>
                </q-page>
            </q-page-container>

        </q-layout>
         <q-inner-loading :visible="loading" />
    </q-dialog>
</template>
<script>
import trivia from 'src/components/themes/trivia'
export default {
    name: 'triviaModal',
    components: {
    	trivia
  	},
    props: ['trivia'],
    data() {
	    return {
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
	          //refresh: true,
	          params: {
	            filter: {userId:this.userId,triviaId:this.trivia.id},
	            fields: 'trivia_id'
	          }
	        }

	        this.$crud.index("apiRoutes.qtrivia.userTrivias",params).then(response => {
	          this.triviaUserId = response.data
	          resolve(true)//Resolve
	        }).catch(error => {
				  console.error('[GET USER TRIVIAS] ', error);
	          //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
	          reject(false)//Resolve
	        })

	      })
	    },

    }
}
</script>
