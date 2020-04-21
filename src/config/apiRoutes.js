import coreApiRoutes from '@imagina/qsite/_config/master/apiRoutes' //Core ApiRoute [Do not remove]
import ilocations from 'src/config/api/ilocations'
import qmarketplace from 'src/config/api/qmarketplace'

let responseApiRoutes = {
  ...coreApiRoutes,
  ilocations:ilocations,
  marketplace:qmarketplace,
  //Add here more apiRoutes...
}
//Export apiRoutes
export default responseApiRoutes
