import coreApiRoutes from '@imagina/qsite/_config/master/apiRoutes' //Core ApiRoute [Do not remove]
import ilocations from 'src/config/api/ilocations'
import qmarketplace from 'src/config/api/qmarketplace'
import icomments from 'src/config/api/icomments'

let responseApiRoutes = {
  ...coreApiRoutes,
  ilocations:ilocations,
  marketplace:qmarketplace,
  icomments:icomments,
  //Add here more apiRoutes...
}
//Export apiRoutes
export default responseApiRoutes
