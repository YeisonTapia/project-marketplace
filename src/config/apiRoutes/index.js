import appConfig from 'src/config/app'

//Auto load api routes from modules available in: src/config/app.js "modules"
//Not edit
let apiRoutes = {}
if(appConfig && appConfig.modules){
  const modules = appConfig.modules

  modules.forEach(name => {
    try {
      let routes = require(`@imagina/${name}/_config/apiRoutes`).default
      apiRoutes[name] = routes
    }catch (e) {}
  })
}

//Add extra apiRoutes
//#example: apiRoutes.<name> = require('path-api-route').default
apiRoutes.api = require('src/config/apiRoutes/api').default
apiRoutes.api = require('src/config/apiRoutes/iform').default
apiRoutes.ilocations = require('src/config/apiRoutes/ilocations').default

//Ilocations api routes
/*
apiRoutes["ilocations"]={
  urlBase : `${env('BASE_URL', 'http://localhost:8000')}/api`+'/v2/ilocations',
  version: "v2",
  provinces: `${env('BASE_URL', 'http://localhost:8000')}/api`+'/v2/ilocations'+"/provinces",
  cities: `${env('BASE_URL', 'http://localhost:8000')}/api`+'/v2/ilocations'+"/cities",
};
console.log(apiRoutes);
*/
export default apiRoutes
