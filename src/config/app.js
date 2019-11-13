import coreApp from '@imagina/qsite/_config/master/app'

export default {
    ...coreApp,
    isBackend: false, //Define if project is to admin
    loadPageBackend: true,
    //Add more configs, or update from coreAPP
    modules:[
        ...coreApp.modules,
        'qticket',
        'qsubscription',
        'qquiz',
        'qtrivia',
        'qredeems',
        'qmarketplace',
    ]

}
