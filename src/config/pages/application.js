//Layout container
import master from 'src/layouts/master'
import config from 'src/layouts/config'
import notFound from 'src/layouts/404'
import admin from 'src/layouts/admin/admin'
//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	//Home Page
	home: {
		permission: null,
		activated: true,
		path: '/inicio',
		name: 'app.home',
		layout: require('src/layouts/index').default,
		containerLayout: master,
		title: 'sidebar.pageHome',
		icon: 'fas fa-home',

	},
	nosotros: {
		permission: null,
		activated: true,
		path: '/nosotros',
		name: 'app.nosotros',
		layout: require('src/layouts/pages/nosotros').default,
		containerLayout: master,
		title: 'Nosotros',
		icon: 'fas fa-users'
	},
	contacto: {
		permission: null,
		activated: true,
		path: '/contacto',
		name: 'app.contacto',
		layout: require('src/layouts/pages/contacto').default,
		containerLayout: master,
		title: 'Contacto',
		icon: 'far fa-envelope-open'
	},
	categoria: {
		permission: null,
		activated: true,
		path: '/categoria',
		name: 'app.categoria',
		layout: require('src/layouts/pages/categoria').default,
		containerLayout: master,
		title: 'Categoria',
		icon: 'far fa-envelope-open'
	},
	busqueda: {
		permission: null,
		activated: true,
		path: '/busqueda',
		name: 'app.busqueda',
		layout: require('src/layouts/pages/busqueda').default,
		containerLayout: master,
		title: 'Busqueda',
		icon: 'far fa-envelope-open'
	},
	trivia: {
		permission: null,
		activated: true,
		path: '/trivia',
		name: 'app.trivia',
		layout: require('src/layouts/pages/trivia').default,
		containerLayout: master,
		title: 'Trivia',
		icon: 'far fa-envelope-open'
	},
    admin: {
        permission: null,
        activated: true,
        path: '/admin',
        name: 'app.admin',
        layout: require('src/layouts/admin/index').default,
        containerLayout: admin,
        title: 'Admintrador',
        icon: 'far fa-envelope-open',
        middleware: [auth]
    },
	//Config Page
	config: {
		permission: null,
		activated: true,
		path: '/config',
		name: 'app.config',
		layout: require('src/layouts/app/config').default,
		containerLayout: config,
		title: 'sidebar.pageConfig',
		icon: 'fas fa-home',
	},
	//Not found Page
	notFound: {
		permission: null,
		activated: true,
		path: '*',
		name: 'app.not.found',
		layout: null,
		containerLayout: notFound,
		title: 'sidebar.pageNotFound',
		icon: 'fas fa-chart-bar'
	},
}
