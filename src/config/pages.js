import corePages from '@imagina/qsite/_config/master/pages' //Core pages [Do not remove]
import appConfig from 'src/config/app'

let responsePages = {
    ...corePages,
    page: {
        home: {
            permission: null,
            activated: true,
            path: '/',
            name: 'app.home',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/master/index.vue'),
            title: 'sidebar.pageHome',
            icon: 'fas fa-home',
            authenticated: true
        },
        nosotros: {
            permission: null,
            activated: true,
            path: '/nosotros',
            name: 'app.nosotros',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/nosotros.vue'),
            title: 'app.layout.page.about',
            icon: 'fas fa-user-friends',
            authenticated: true
        },
        busqueda: {
            permission: null,
            activated: true,
            path: '/buscar-tiendas/:search/:city/:neighborhood',
            name: 'app.busqueda',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/busqueda.vue'),
            title: 'app.layout.page.search',
            icon: 'far fa-envelope-open',
            authenticated: true
        },
        ofertas: {
            permission: null,
            activated: true,
            path: '/tiendas-en-ofertas',
            name: 'app.ofertas',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/ofertas.vue'),
            title: 'app.layout.page.storesOnOffer',
            icon: 'fas fa-store',
            authenticated: true
        },
        contacto: {
            permission: null,
            activated: true,
            path: '/contacto',
            name: 'app.contacto',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/contacto.vue'),
            title: 'app.layout.page.contact',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        problems: {
            permission: null,
            activated: true,
            path: '/pqrs',
            name: 'app.problems',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/problems.vue'),
            title: 'app.layout.page.problems',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        trivia: {
            permission: null,
            activated: true,
            path: '/trivia',
            name: 'app.trivia',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/trivia.vue'),
            title: 'app.layout.page.trivia',
            icon: 'far fa-envelope-open',
            authenticated: true
        },
        admin: {
            permission: 'marketplace.stores.mystore',
            activated: true,
            path: '/admin',
            name: 'app.admin',
            layout: () => import('src/layouts/admin'),
            page: () => import('pages/admin/index.vue'),
            title: 'app.layout.page.administrador',
            icon: 'far fa-envelope-open',
            authenticated: true
        },
        // User Orders Profile
        userOrders: {
            //permission: 'icommerce.orders.index',
            activated: true,
            path: '/account/orders',
            name: 'qcommerce.account.orders',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/qcommerce/account/orders'),
            title: 'app.layout.page.myShopping',
            icon: 'apps',
            authenticated: true
        },
        userOrder: {
            //permission: 'icommerce.orders.index',
            activated: true,
            path: '/account/orders/:id',
            name: 'qcommerce.account.order',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/qcommerce/account/show'),
            title: 'app.layout.page.myShopping',
            icon: 'apps',
            authenticated: true
        },
        // User Favorite Marketplace Profile
        userFavoriteStores: {
            //permission: 'qmarketplace.stores.manage',
            activated: true,
            path: '/account/favorite-stores',
            name: 'qmarketplace.account.favorite.stores',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/qmarketplace/account/favoriteStores'),
            title: 'app.layout.page.myFavoriteStores',
            icon: 'apps',
            authenticated: true
        },
        // User Messages Profile
        userMessages: {
            //permission: 'qform.manage',
            activated: true,
            path: '/account/messages',
            name: 'qform.account.messages',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('@imagina/qmarketplace/_layouts/admin/chat/index'),
            title: 'app.layout.page.myMessages',
            icon: 'apps',
            authenticated: true
        },
        // User Public Profile
        userPublicProfile: {
            permission: 'marketplace.stores.manage',
            activated: true,
            path: '/account/public/profile/:userId',
            name: 'quser.account.public.profile',
            layout: () => import('src/layouts/quser/public/account.vue'),
            page: () => import('src/layouts/quser/public/profile'),
            title: 'app.layout.page.profile',
            icon: 'apps',
            authenticated: true
        },
        // User Dashboard
        userDashboard:{
            //permission: 'marketplace.stores.manage',
            activated: true,
            path: '/account/dashboard',
            name: 'quser.account.profile',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/quser/index'),
            title: 'app.layout.page.userDashboard',
            icon: 'apps',
            authenticated: true
        },
        // User Notifications
        userNotifications:{
            //permission: 'marketplace.stores.manage',
            activated: true,
            path: '/account/notifications',
            name: 'quser.account.notifications',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('@imagina/qmarketplace/_layouts/admin/notification/notifications'),
            title: 'app.layout.page.notifications',
            icon: 'apps',
            authenticated: true
        },
        userLevel:{
            //permission: 'marketplace.stores.manage',
            activated: true,
            path: '/account/level',
            name: 'quser.account.level',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/quser/levels/index.vue'),
            title: 'app.layout.page.notifications',
            icon: 'apps',
            authenticated: true
        },

    }
    //Add here more responsePages...#example
    /*groupName : {
      routeName: {//Page home
        permission: null,
        activated: true,
        path: '/home',
        name: 'route.name',
        layout: () => import('path'),
        page: () => import('path'),
        title: 'route.title',
        icon: 'icon name',
        authenticated: Boolean
      }
    }*/
}

if (appConfig && appConfig.modules) {
    const modules = appConfig.modules

    // Get each config page from package
    modules.forEach(name => {
        let pageBackend = false

      //Find pageBackend
      try {
        pageBackend = require(`@imagina/${name}/_config/backendPages`).default
      } catch (e) {
      }

      responsePages[name] = pageBackend

    })
}




//======= Add or update pages
//#example: responsePages.<title-page> = <'title'>
//qblog
//admin index
responsePages.app.home.name='app.admin'
responsePages.qblog.posts.layout= () => import('src/layouts/admin')
responsePages.qblog.posts.path=  '/admin/blog/articulos/index'
responsePages.qblog.categories.layout= () => import('src/layouts/admin')
responsePages.qblog.categories.path='/admin/blog/categorias/index'
responsePages.frontqblog.index.page= () => import('src/pages/master/qblog/index')
responsePages.frontqblog.index.layout= () =>import('src/layouts/master')
/*
responsePages.frontqblog.show.page= () => import('src/pages/master/qblog/show'),
responsePages.frontqblog.show.layout= () =>import('src/layouts/master')
*/

responsePages.frontqblog.show.path='articulo/:category/:slugPost'
responsePages.frontqblog.show.page= () => import('src/pages/master/qblog/show'),
responsePages.frontqblog.show.layout= () =>import('src/layouts/master')
responsePages.frontqblog.show.path='articulo/:category/:slugPost'

//qcommerce
responsePages.qcommerce.products.layout= () => import('src/layouts/admin')
responsePages.qcommerce.products.path= '/admin/ecommerce/productos'
responsePages.qcommerce.productCreate.layout= () => import('src/layouts/admin')
responsePages.qcommerce.productCreate.path= '/admin/ecommerce/productos/create'
responsePages.qcommerce.productEdit.layout= () => import('src/layouts/admin')
responsePages.qcommerce.productEdit.path= '/ecommerce/productos/:id'
responsePages.qcommerce.categories.layout= () => import('src/layouts/admin')
responsePages.qcommerce.categories.path= '/admin/ecommerce/categorias'
responsePages.qcommerce.options.layout= () => import('src/layouts/admin')
responsePages.qcommerce.options.path= '/admin/ecommerce/optiones'
responsePages.qcommerce.optionValues.layout= () => import('src/layouts/admin')
responsePages.qcommerce.optionValues.path= '/admin/ecommerce/options-values'
responsePages.qcommerce.paymentMethods.layout= () => import('src/layouts/admin')
responsePages.qcommerce.paymentMethods.path= '/admin/ecommerce/metodo-de-pago'
responsePages.qcommerce.shippingMethods.layout= () => import('src/layouts/admin')
responsePages.qcommerce.shippingMethods.path= '/admin/ecommerce/metodos-de-envio'
responsePages.qcommerce.orders.layout= () => import('src/layouts/admin')
responsePages.qcommerce.orders.path= '/admin/ecommerce/ordenes'
responsePages.qmedia.index.layout= () => import('src/layouts/admin')
responsePages.qmedia.index.path= '/admin/media'
responsePages.qmenu.menus.layout= () => import('src/layouts/admin')
responsePages.qmenu.menus.path= '/admin/menu'
responsePages.qmenu.menusShow.layout= () => import('src/layouts/admin')
responsePages.qmenu.menusShow.path= '/admin/menus/menu/:id'
responsePages.qmenu.menuItemsCreate.layout= () => import('src/layouts/admin')
responsePages.qmenu.menuItemsCreate.path= '/admin/menus/item/:menuId'
responsePages.qmenu.menuItemsUpdate.layout= () => import('src/layouts/admin')
responsePages.qmenu.menuItemsUpdate.path= '/admin/menus/menu/:menuId/item/:id'
//responsePages.qmenu.menuitems.layout= () => import('src/layouts/admin')
//responsePages.qmenu.menuitems.path= '/admin/menu/menu-items'
responsePages.qsite.index.layout= () => import('src/layouts/admin')
responsePages.qsite.index.path= '/admin/site/index'
responsePages.qslider.index.layout= () => import('src/layouts/admin')
responsePages.qslider.index.path= '/admin/slider/index'

// QUSER
responsePages.quser.userIndex.layout= () => import('src/layouts/admin')
responsePages.quser.userIndex.path= '/admin/usuarios/index'
responsePages.quser.userDepartments.layout= () => import('src/layouts/admin')
responsePages.quser.userDepartments.path= '/admin/usuarios/departamentos'
responsePages.quser.userRoles.layout= () => import('src/layouts/admin')
responsePages.quser.userRoles.path= '/admin/usuarios/roles'
responsePages.quser.userProfile.layout= () => import('src/layouts/admin')
responsePages.quser.userProfile.path='admin/me/profile'

// QUSER FRONTEND
responsePages.frontquser.userProfile.path ='/account/me/edit'
responsePages.frontquser.userProfile.layout = () => import('src/layouts/account.vue')
responsePages.frontquser.userProfile.page = () => import('src/layouts/quser/profile')
responsePages.frontquser.login.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.login.page = () => import('src/layouts/quser/login')
responsePages.frontquser.register.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.register.page = () => import('src/layouts/quser/register')
responsePages.frontquser.logout.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.logout.page =  () => import('src/layouts/quser/logout')
responsePages.frontquser.resetPassword.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.resetPassword.page = () => import('src/layouts/quser/resetPassword')
responsePages.frontquser.resetPasswordComplete.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.resetPasswordComplete.page = () => import('src/layouts/quser/resetPasswordComplete')


// QQUIZ
responsePages.qquiz.polls.layout= () => import('src/layouts/admin')
responsePages.qquiz.polls.path= '/admin/iquiz/polls/index'
responsePages.qquiz.questions.layout= () => import('src/layouts/admin')
responsePages.qquiz.questions.path= '/admin/iquiz/questions/index/poll/:id'


// QTRIVIA
responsePages.qtrivia.trivias.layout= () => import('src/layouts/admin')
responsePages.qtrivia.trivias.path= '/admin/itrivia/trivias/index'
responsePages.qtrivia.questions.layout= () => import('src/layouts/admin')
responsePages.qtrivia.questions.path= '/admin/itrivia/questions/index/trivia/:id'
responsePages.qtrivia.rangepoints.layout= () => import('src/layouts/admin')
responsePages.qtrivia.rangepoints.path= '/admin/itrivia/rangepoints/index/trivia/:id'

// QREDEEMS
responsePages.qredeems.items.layout= () => import('src/layouts/admin')
responsePages.qredeems.items.path=  '/admin/iredeems/items/index'
responsePages.qredeems.redeems.layout= () => import('src/layouts/admin')
responsePages.qredeems.redeems.path=  '/admin/iredeems/redeems/index'

// QREDEEMS FRONTEND
responsePages.frontqredeems.userAccount.path='account/redeems/points'
responsePages.frontqredeems.userAccount.layout = () => import('src/layouts/account.vue')
responsePages.frontqredeems.userAccount.page= () => import('src/layouts/qredeems/account/index')

responsePages.frontqredeems.userPrizes.path='account/prizes'
responsePages.frontqredeems.userPrizes.layout = () => import('src/layouts/account.vue')

//QFORM
responsePages.qform.forms.layout= () => import('src/layouts/admin')
responsePages.qform.forms.path=  '/admin/forms/form'
responsePages.qform.leads.layout= () => import('src/layouts/admin')
responsePages.qform.leads.path=  '/admin/forms/leads/index'
responsePages.qform.leadsShow.layout= () => import('src/layouts/admin')
responsePages.qform.leadsShow.path=  '/admin//forms/lead/:id'
responsePages.qform.fields.layout= () => import('src/layouts/admin')
responsePages.qform.fields.path=  '/admin/forms/fields/:id',
responsePages.qform.forms.permission=  'iforms.forms.manage',
responsePages.qform.leads.permission=  'iforms.leads.manage',
//QSUBSCRIPTION
responsePages.qsubscription.products.layout= () => import('src/layouts/admin')
responsePages.qsubscription.products.path='/admin/subscriptions/products/index'
responsePages.qsubscription.productsCreate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.productsCreate.path='/admin/subscriptions/products/create'
responsePages.qsubscription.productsUpdate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.productsUpdate.path='/admin/subscriptions/products/:id'
responsePages.qsubscription.plans.layout= () => import('src/layouts/admin')
responsePages.qsubscription.plans.path='/admin/subscriptions/products/:id/plans/index'
responsePages.qsubscription.plansCreate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.plansCreate.path='/admin/subscriptions/products/:productId/plans/create'
responsePages.qsubscription.plansUpdate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.plansUpdate.path='/admin/subscriptions/products/:productId/plans/:id'
responsePages.qsubscription.features.layout= () => import('src/layouts/admin')
responsePages.qsubscription.features.path='/admin/subscriptions/products/:id/features/index'
responsePages.qsubscription.subscriptions.layout= () => import('src/layouts/admin')
responsePages.qsubscription.subscriptions.path=  '/admin/subscriptions/subscription'
responsePages.qsubscription.paymentMethods.layout= () => import('src/layouts/admin')
responsePages.qsubscription.paymentMethods.path=  '/admin/subscriptions/payment-methods'
responsePages.qsubscription.subscriptionsUpdate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.subscriptionsUpdate.path=  '/admin/subscriptions/subscription/:id'
responsePages.frontqsubscription.products.page= () => import('src/layouts/qsubscription/frontend/products/show')

//QMARKETPLACE
responsePages.qmarketplace.myStoreProductCreate.page= () => import('src/layouts/qmarketplace/admin/stores/products/form')
responsePages.qmarketplace.myStoreProductEdit.page= () => import('src/layouts/qmarketplace/admin/stores/products/form')
responsePages.qmarketplace.myStoreCategoryProducts.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.storeProductsCreate.page= () => import('src/layouts/qmarketplace/admin/stores/products/form')

//QTICKET
responsePages.qticket.tickets.layout= () => import('src/layouts/admin')

//QCHAT
responsePages.qchat.messages.path='admin/chat/messages'
responsePages.qchat.messages.layout = () => import('src/layouts/admin')

//QNOTIFICATIONS
responsePages.qnotification.notifications.path='admin/notifications'
responsePages.qnotification.notifications.layout = () => import('src/layouts/admin')

//QSLIDER
responsePages.qslider.index.layout= () => import('src/layouts/admin')
responsePages.qslider.index.path= '/admin/slider/index'
responsePages.qslider.showSlider.layout= () => import('src/layouts/admin')
responsePages.qslider.showSlider.path= '/admin/slider/show/:id'
responsePages.qslider.createSlide.layout= () => import('src/layouts/admin')
responsePages.qslider.createSlide.path= '/admin/slide/create/:sliderId'
responsePages.qslider.updateSlide.layout= () => import('src/layouts/admin')
responsePages.qslider.updateSlide.path= '/admin/slide/update/:sliderId/:id'

//Qbanners
responsePages.qbanner.index.layout= () => import('src/layouts/admin')
responsePages.qbanner.index.path= '/admin/banners/index'
responsePages.qbanner.showPosition.layout= () => import('src/layouts/admin')
responsePages.qbanner.showPosition.path= '/admin/banners/position/show/:id'
responsePages.qbanner.createBanner.layout= () => import('src/layouts/admin')
responsePages.qbanner.createBanner.path= '/admin/banners/banner/create/:sliderId'
responsePages.qbanner.updateBanner.layout= () => import('src/layouts/admin')
responsePages.qbanner.updateBanner.path= '/admin/banners/banner/update/:sliderId/:id'

export default responsePages
