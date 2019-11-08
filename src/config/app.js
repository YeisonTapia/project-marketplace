export default {
    version: '2.0.1',
    isBackend: true, //Define if project is to admin
    //UI Languages
    languages: {
        default: 'es',
        availables: ['en-us', 'es']
    },
    //Modules
    modules: [
        'qhelper',
        'qcrud',
        'quser',
        'qblog',
        'qcommerce',
        'qplace',
        'qform',
        'qmenu',
        'qchat',
        'qmedia',
        'qslider',
        'qsite',
        'qticket',
        'qsubscription',
        'qquiz',
        'qredeems',
        'qmarketplace',
        //'qtrivias',
    ],
    //Cache
    saveCache: {
        refresh: [
            'sessionData',
            'auth.department.id',
            'auth.role.id',
            'site.default.locale',
            'impersonatorData'
        ],
        logout: [
            'offlineRequests',
            'site.default.locale',
        ]
    },
    //Reset Store
    resetStores: [
        'quserAuth/RESET'
    ]
}
