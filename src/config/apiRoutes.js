import coreApiRoutes from '@imagina/qsite/_config/master/apiRoutes' //Core ApiRoute [Do not remove]
import ilocations from 'src/config/api/ilocations'
import ianalytics from 'src/config/api/ianalytics'

let responseApiRoutes = {
  ...coreApiRoutes,
  ilocations:ilocations,
  ianalytics:ianalytics
  //Add here more apiRoutes...
}
//Export apiRoutes
export default responseApiRoutes
