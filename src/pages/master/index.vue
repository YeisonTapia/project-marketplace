<template>
   <q-page class="">
      <full-width-gallery system-name="principal"/>
      <top></top>
      <featured-stores></featured-stores>

      <div class="q-container banner q-py-xl text-center">
			<qbanner systemName="home-tiendas-destacadas" height="auto"/>
      </div>
      <interest-stores></interest-stores>
      <div class="q-container banner q-py-xl text-center">
			<qbanner systemName="home-tiendas-de-tu-interes" height="auto"/>
      </div>
      <independents-stores></independents-stores>
      <virtual-directory></virtual-directory>
      <div class="q-container banner q-py-xl text-center">
			<qbanner systemName="home-directorio-virtual" height="auto"/>
      </div>
      <featured-products></featured-products>

      <q-dialog v-model="showBenefitsModal" persistent>
        <q-card v-if="levelData">
          <q-card-section class="row items-center">
            <div class="q-container">
              <div class="row">

                <div class="col-12">
                  <div class="text-h5 text-primary q-mb-md font-family-secondary">Has ascendido al nivel: {{levelData.name}}</div>
                </div>

                <div class="col-12">
                  <p class="caption">
                    <q-avatar icon="style" color="primary" text-color="white" />
                    <span class="q-ml-sm">Se han habilitado nuevos beneficios por los que puedes optar:</span>
                  </p>
                </div>

                <div class="col-12">
                  <q-select
                  class="q-mb-md"
                  :options="levelData.benefits"
                  @input="val => { showBene() }"
                  v-model="benefitsUser"
                  emit-value
                  multiple
                  map-options
                  option-label="name"
                  option-value="id"
                  placeholder=""
                  />
                </div>

              </div>
            </div>

          </q-card-section>

          <q-card-actions align="right">
            <q-btn :loading="loading" flat label="Confirmar" @click="saveBenefits()" color="primary" />
          </q-card-actions>
        </q-card>
      </q-dialog>

   </q-page>
</template>

<style lang="stylus">

</style>

<script>
   import fullWidthGallery from 'src/components/qslider/qcarousel'
   import top from 'src/components/themes/top'
   import featuredStores from 'src/components/themes/featuredStores'
   import interestStores from 'src/components/themes/interestStores'
   import independentsStores from 'src/components/themes/independentsStores'
   import virtualDirectory from 'src/components/themes/virtualDirectory'
   import featuredProducts from 'src/components/themes/featuredProducts'
   import qbanner from '@imagina/qbanner/_components/frontend/qbanner'

   export default {
      name: 'PageIndex',
      components: {
         fullWidthGallery,
         top,
         featuredStores,
         interestStores,
         independentsStores,
         virtualDirectory,
         featuredProducts,
         qbanner
      },
      data(){
        return{
          loading:false,
          showBenefitsModal:false,
          levelData:null,
          benefitsUser:[]
        }
      },
      mounted(){
        console.log('mounted home asdada');//
        console.log(this.$store.state.quserAuth);
        if(this.$store.state.quserAuth.userId){
          console.log('entre en autenticado home');
          if(this.$store.state.quserAuth.userData.levelCompleted==0){
            console.log('entre en level completedd');
            this.getBenefits();

          }
        }
      },
      methods:{
        saveBenefits(){
          this.loadind=true;
          for(var i=0;i<this.$store.state.quserAuth.userData.benefits.length;i++){
            this.benefitsUser.push(this.$store.state.quserAuth.userData.benefits[i].id);
          }//for
          let data={
            id:this.$store.state.quserAuth.userId,
            activated:1,
            levelCompleted:1
          };
          data.benefits=this.benefitsUser;
          this.$crud.update('apiRoutes.quser.users', this.$store.state.quserAuth.userId, data).then(response => {
             this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
             this.loading = false//Login
             this.showBenefitsModal = false
          }).catch(error => {
             console.error('[UPDATE PROFILE] ', error)
             this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
             this.loading = false
          })
        },
        showBene(){
          console.log(this.benefitsUser);
        },
        getBenefits(){
          //Params
          let params = {
            refresh: true,
            params: {
              include: 'benefits',
              filter: {
                allTranslations: true,
              }
            }
          }

          //Request
          this.$crud.show("apiRoutes.qmarketplace.level",this.$store.state.quserAuth.userData.levelId,params).then(response => {
            this.levelData=response.data;
            console.log('level data');
            console.log(response.data);
            this.showBenefitsModal=true;
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          })
        }
      }
   }
</script>
