import appConfig from 'src/config/app'

let pages = {
  //Home Page
    home: {
        permission: null,
        activated: true,
        path: '/home',
        name: 'app.home',
        layout: () => import('src/layouts/master'),
        page: () => import('pages/master/index.vue'),
        title: 'sidebar.pageHome',
        icon: 'fas fa-home',
        authenticated : false
    },
    nosotros: {
        permission: null,
        activated: true,
        path: '/nosotros',
        name: 'app.nosotros',
        layout: () => import('src/layouts/master'),
        page: () => import('pages/nosotros.vue'),
        title: 'Nosotros',
        icon: 'fas fa-user-friends',
        authenticated : false
    },
    busqueda: {
        permission: null,
        activated: true,
        path: '/busqueda',
        name: 'app.busqueda',
        layout: () => import('src/layouts/master'),
        page: () => import('pages/busqueda.vue'),
        title: 'busqueda',
        icon: 'far fa-envelope-open',
        authenticated : false
    },
    categoria: {
        permission: null,
        activated: true,
        path: '/categoria',
        name: 'app.categoria',
        layout: () => import('src/layouts/master'),
        page: () => import('pages/categoria.vue'),
        title: 'categoria',
        icon: 'far fa-envelope-open',
        authenticated : false
    },
    layout1: {
        permission: null,
        activated: true,
        path: '/layout1',
        name: 'app.layout1',
        layout: () => import('src/layouts/master'),
        page: () => import('pages/master/index1.vue'),
        title: 'sidebar.pageHome',
        icon: 'fas fa-home',
        authenticated : false
    },
    admin: {
        permission: null,
        activated: true,
        path: '/admin',
        name: 'app.admin',
        layout: () => import('src/layouts/admin'),
        page: () => import('pages/admin/index.vue'),
        title: 'Administrador',
        icon: 'far fa-envelope-open',
        authenticated: true
    }
}

//Add pages "not found" only when it isn't SSR mode. Always leave this as last one
if (process.env.MODE !== 'ssr') {
  pages.notFound = {
    permission: null,
    activated: true,
    path: '*',
    name: 'app.not.found',
    layout: () => import('src/layouts/blank'),
    page: () => import('src/pages/master/404'),
    title: 'sidebar.pageNotFound',
    icon: 'fas fa-chart-bar'
  }
}

//Export pages
export default pages
