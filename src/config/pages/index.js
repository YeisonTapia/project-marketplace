import appConfig from 'src/config/app'

//Auto load api routes from modules available in: src/config/app.js "modules"
//===== Not edit
let pages = {}

if (appConfig && appConfig.modules) {
  const modules = appConfig.modules

  // Get each config page from package
  modules.forEach(name => {
    try {
      //Get pages according to app config in: src/config/app.js "isBackend"
      let backendPages=require(`@imagina/${name}/_config/backendPages`).default;
      let frontendPages=require(`@imagina/${name}/_config/frontendPages`).default;
      // let page = (appConfig.isBackend) ?
      //   require(`@imagina/${name}/_config/backendPages`).default :
      //   require(`@imagina/${name}/_config/frontendPages`).default
      pages[name] = backendPages
      pages['front'+name] = frontendPages
    } catch (e) {
    }
  })
}
console.log(pages);

pages.app = require('src/config/pages/application').default //Pages of APP
pages.qblog.posts.layout= () => import('src/layouts/admin')
pages.qblog.posts.path=  '/admin/blog/articulos/index'
pages.qblog.categories.layout= () => import('src/layouts/admin')
pages.qblog.categories.path='/admin/blog/categorias/index'
pages.qcommerce.products.layout= () => import('src/layouts/admin')
pages.qcommerce.products.path= '/admin/ecommerce/productos'
pages.qcommerce.productCreate.layout= () => import('src/layouts/admin')
pages.qcommerce.productCreate.path= '/admin/ecommerce/productos/create'
pages.qcommerce.productEdit.layout= () => import('src/layouts/admin')
pages.qcommerce.productEdit.path= '/ecommerce/productos/:id'
pages.qcommerce.categories.layout= () => import('src/layouts/admin')
pages.qcommerce.categories.path= '/admin/ecommerce/categorias'
pages.qcommerce.options.layout= () => import('src/layouts/admin')
pages.qcommerce.options.path= '/admin/ecommerce/optiones'
pages.qcommerce.optionValues.layout= () => import('src/layouts/admin')
pages.qcommerce.optionValues.path= '/admin/ecommerce/options-values'
pages.qcommerce.paymentMethods.layout= () => import('src/layouts/admin')
pages.qcommerce.paymentMethods.path= '/admin/ecommerce/metodo-de-pago'
pages.qcommerce.shippingMethods.layout= () => import('src/layouts/admin')
pages.qcommerce.shippingMethods.path= '/admin/ecommerce/metodos-de-envio'
pages.qcommerce.orders.layout= () => import('src/layouts/admin')
pages.qcommerce.orders.path= '/admin/ecommerce/ordenes'
pages.qmedia.index.layout= () => import('src/layouts/admin')
pages.qmedia.index.path= '/admin/media'
pages.qmenu.menus.layout= () => import('src/layouts/admin')
pages.qmenu.menus.path= '/admin/menu'
pages.qmenu.menusShow.layout= () => import('src/layouts/admin')
pages.qmenu.menusShow.path= '/admin/menus/menu/:id'
pages.qmenu.menuItemsCreate.layout= () => import('src/layouts/admin')
pages.qmenu.menuItemsCreate.path= '/admin/menus/item/:menuId'
pages.qmenu.menuItemsUpdate.layout= () => import('src/layouts/admin')
pages.qmenu.menuItemsUpdate.path= '/admin/menus/menu/:menuId/item/:id'
//pages.qmenu.menuitems.layout= () => import('src/layouts/admin')
//pages.qmenu.menuitems.path= '/admin/menu/menu-items'
pages.qsite.index.layout= () => import('src/layouts/admin')
pages.qsite.index.path= '/admin/site/index'
pages.qslider.index.layout= () => import('src/layouts/admin')
pages.qslider.index.path= '/admin/site/index'

// QUSER
pages.quser.userIndex.layout= () => import('src/layouts/admin')
pages.quser.userIndex.path= '/admin/usuarios/index'
pages.quser.userDepartments.layout= () => import('src/layouts/admin')
pages.quser.userDepartments.path= '/admin/usuarios/departamentos'
pages.quser.userRoles.layout= () => import('src/layouts/admin')
pages.quser.userRoles.path= '/admin/usuarios/roles'
pages.quser.userProfile.layout= () => import('src/layouts/admin')
pages.quser.userProfile.path='admin/me/profile'
/*
// QUSER FRONTEND
pages.frontquser.userProfile.path='/account/me/profile'
pages.frontquser.userProfile.containerLayout=account
pages.frontquser.userProfile.layout=require('src/layouts/quser/profile').default
pages.frontquser.login.containerLayout=frontend
pages.frontquser.login.layout=require('src/layouts/quser/login').default
pages.frontquser.logout.containerLayout=frontend
pages.frontquser.logout.layout=require('src/layouts/quser/logout').default
pages.frontquser.changePassword.containerLayout=frontend
pages.frontquser.changePassword.layout=require('src/layouts/quser/passwordChange').default
pages.frontquser.resetPassword.containerLayout=frontend
pages.frontquser.resetPassword.layout=require('src/layouts/quser/password/reset').default
pages.frontquser.resetCompleted.containerLayout=frontend
pages.frontquser.resetCompleted.layout=require('src/layouts/quser/password/completed').default
/*
// QQUIZ
pages.qquiz.polls.layout= () => import('src/layouts/admin')
pages.qquiz.polls.path= '/admin/iquiz/polls/index'
pages.qquiz.pollsCreate.layout= () => import('src/layouts/admin')
pages.qquiz.pollsCreate.path= '/admin/iquiz/polls/create'
pages.qquiz.pollsUpdate.layout= () => import('src/layouts/admin')
pages.qquiz.pollsUpdate.path= '/admin/iquiz/polls/:id'
pages.qquiz.questions.layout= () => import('src/layouts/admin')
pages.qquiz.questions.path= '/admin/iquiz/questions/index/poll/:id'

// QTRIVIA
pages.qtrivia.trivias.layout= () => import('src/layouts/admin')
pages.qtrivia.trivias.path= '/admin/itrivia/trivias/index'
pages.qtrivia.questions.layout= () => import('src/layouts/admin')
pages.qtrivia.questions.path= '/admin/itrivia/questions/index/trivia/:id'
pages.qtrivia.rangepoints.layout= () => import('src/layouts/admin')
pages.qtrivia.rangepoints.path= '/admin/itrivia/rangepoints/index/trivia/:id'

// QREDEEMS
pages.qredeems.items.layout= () => import('src/layouts/admin')
pages.qredeems.items.path=  '/admin/iredeems/items/index'
pages.qredeems.redeems.layout= () => import('src/layouts/admin')
pages.qredeems.redeems.path=  '/admin/iredeems/redeems/index'

// QREDEEMS FRONTEND
pages.frontqredeems.userAccount.path='account/points'
pages.frontqredeems.userAccount.layout=require('src/layouts/qredeems/account/index').default,
*/
//QFORM
pages.qform.forms.layout= () => import('src/layouts/admin')
pages.qform.forms.path=  '/admin/iform/form'
pages.qform.leads.layout= () => import('src/layouts/admin')
pages.qform.leads.path=  '/admin/iform/leads/index'
pages.qform.leadsShow.layout= () => import('src/layouts/admin')
pages.qform.leadsShow.path=  '/admin//iform/lead/:id'
pages.qform.fields.layout= () => import('src/layouts/admin')
pages.qform.fields.path=  '/admin/iform/fields/:id'

//QSUBSCRIPTION
pages.qsubscription.products.layout= () => import('src/layouts/admin')
pages.qsubscription.productsCreate.layout= () => import('src/layouts/admin')
pages.qsubscription.productsUpdate.layout= () => import('src/layouts/admin')
pages.qsubscription.plans.layout= () => import('src/layouts/admin')
pages.qsubscription.plansCreate.layout= () => import('src/layouts/admin')
pages.qsubscription.plansUpdate.layout= () => import('src/layouts/admin')
pages.qsubscription.features.layout= () => import('src/layouts/admin')
pages.qsubscription.featuresCreate.layout= () => import('src/layouts/admin')
pages.qsubscription.featuresUpdate.layout= () => import('src/layouts/admin')


//======= Add or update extra apiRoutes
//#example: pages.<name-page> = require('path-page').default

export default pages
