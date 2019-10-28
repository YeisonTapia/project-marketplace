export default {
  version: '1.0.1',
  isBackend : false, //Define if project is to admin
  //UI Languages
  languages : {
    default : 'es',
    availables : ['en-us', 'es']
  },
  //Modules
  modules : [
    'qhelper',
    'qcrud',
    'quser',
    'qblog',
    'qcommerce',
    'qplace',
    'qmenu',
    'qmedia',
    'qslider',
    'qsite',
    'qsubscription',
    'qquiz',
    'qtrivia',
    'qmarketplace',
    'qform',
  ],
  //Storage
  saveStorage : {
    refresh : [
      'sessionData',
      'offlineRequests',
      'notifications',
      'auth.department.id',
      'auth.role.id',
      'redirect.to.from.login',
      'site.default.locale',
      'dataAddress',
      'impersonatorData'
    ],
    logout : [
      'offlineRequests',
      'site.default.locale',
    ]
  }
}
