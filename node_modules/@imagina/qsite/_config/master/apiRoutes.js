import appConfig from 'src/config/app'

//Auto load api routes from modules available in: src/config/app.js "modules"
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

export default apiRoutes
