import appConfig from 'src/config/app'
import admin from 'src/layouts/admin/admin'
import frontend from 'src/layouts/master.vue'
import account from 'src/layouts/account.vue'

//Auto load api routes from modules available in: src/config/app.js "modules"
//===== Not edit
let pages = {}

if (appConfig && appConfig.modules) {
  const modules = appConfig.modules

  
  modules.forEach(name => {
    try {
      //Get pages according to app config in: src/config/app.js "isBackend"
      let page = require(`@imagina/${name}/_config/backendPages`).default;
      pages[name] = page;
    ;
    } catch (e) {}
  })
    modules.forEach(name => {
        try {
            let front=require(`@imagina/${name}/_config/frontendPages`).default;
            pages['front'+name] = front;
        } catch (e) {}
    })

}

console.warn(pages)

pages.app = require('src/config/pages/application').default //Pages of APP
pages.qblog.posts.containerLayout=admin
pages.qblog.posts.path=  '/admin/blog/articulos/index'
pages.qblog.categories.containerLayout=admin
pages.qblog.categories.path='/admin/blog/categorias/index'
pages.qcommerce.products.containerLayout=admin
pages.qcommerce.products.path= '/admin/ecommerce/productos'
pages.qcommerce.productCreate.containerLayout=admin
pages.qcommerce.productCreate.path= '/admin/ecommerce/productos/create'
pages.qcommerce.productEdit.containerLayout=admin
pages.qcommerce.productEdit.path= '/ecommerce/productos/:id'
pages.qcommerce.categories.containerLayout=admin
pages.qcommerce.categories.path= '/admin/ecommerce/categorias'
pages.qcommerce.options.containerLayout=admin
pages.qcommerce.options.path= '/admin/ecommerce/optiones'
pages.qcommerce.optionValues.containerLayout=admin
pages.qcommerce.optionValues.path= '/admin/ecommerce/options-values'
pages.qcommerce.paymentMethods.containerLayout=admin
pages.qcommerce.paymentMethods.path= '/admin/ecommerce/metodo-de-pago'
pages.qcommerce.shippingMethods.containerLayout=admin
pages.qcommerce.shippingMethods.path= '/admin/ecommerce/metodos-de-envio'
//pages.qcommerce.orders.containerLayout=admin
//pages.qcommerce.orders.path= '/admin/ecommerce/ordenes'
pages.qmedia.index.containerLayout=admin
pages.qmedia.index.path= '/admin/media'
//pages.qmenu.menus.containerLayout=admin
//pages.qmenu.menus.path= '/admin/menu'
//pages.qmenu.menuitems.containerLayout=admin
//pages.qmenu.menuitems.path= '/admin/menu/menu-items'
pages.qsite.index.containerLayout=admin
pages.qsite.index.path= '/admin/site/index'
pages.qslider.index.containerLayout=admin
pages.qslider.index.path= '/admin/site/index'

pages.quser.userIndex.containerLayout=admin
pages.quser.userIndex.path= '/admin/usuarios/index'
pages.quser.userDepartments.containerLayout=admin
pages.quser.userDepartments.path= '/admin/usuarios/departamentos'
pages.quser.userRoles.containerLayout=admin
pages.quser.userRoles.path= '/admin/usuarios/roles'
pages.quser.userProfile.containerLayout=admin
pages.quser.userProfile.path='admin/me/profile'
pages.quser.login.layout=require('@imagina/quser/_layouts/login').default

pages.frontquser.userProfile.path='/account/me/profile'
pages.frontquser.userProfile.containerLayout=account
pages.frontquser.userProfile.layout=require('src/layouts/quser/profile').default

pages.frontqquiz.test.path='account/iquiz/test' // Testing Route Frontend Account Iquiz

pages.qquiz.polls.containerLayout=admin
pages.qquiz.polls.path= '/admin/iquiz/polls/index'
pages.qquiz.pollsCreate.containerLayout=admin
pages.qquiz.pollsCreate.path= '/admin/iquiz/polls/create'
pages.qquiz.pollsUpdate.containerLayout=admin
pages.qquiz.pollsUpdate.path= '/admin/iquiz/polls/:id'
pages.qquiz.questions.containerLayout=admin
pages.qquiz.questions.path= '/admin/iquiz/questions/index/poll/:id'
pages.qtrivia.trivias.containerLayout=admin
pages.qtrivia.trivias.path= '/admin/itrivia/trivias/index'
pages.qtrivia.questions.containerLayout=admin
pages.qtrivia.questions.path= '/admin/itrivia/questions/index/trivia/:id'
pages.qtrivia.rangepoints.containerLayout=admin
pages.qtrivia.rangepoints.path= '/admin/itrivia/rangepoints/index/trivia/:id'


//======= Add or update extra apiRoutes
//#example: pages.<name-page> = require('path-page').default

export default pages
