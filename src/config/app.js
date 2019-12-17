import coreApp from '@imagina/qsite/_config/master/app'

export default {
    ...coreApp,
    isBackend: false, //Define if project is to admin
    loadPageBackend: true,
    //Add more configs, or update from coreAPP
    modules: [
        ...coreApp.modules,
        'qticket',
        'qsubscription',
        'qmarketplace',
        'qquiz',
        'qtrivia',
        'qredeems',
        'qticket',
        'qchat',
        'qnotification'
    ],
    saveCache: {
        refresh: [
            ...coreApp.saveCache.refresh,
            'marketplace.store.selected'
        ],
        logout: [
            ...coreApp.saveCache.logout
        ]
    },
    resetStores:[
        ...coreApp.resetStores,
        'qmarketplaceStores/RESET'
    ]


}
