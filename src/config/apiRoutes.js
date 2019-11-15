import coreApiRoutes from '@imagina/qsite/_config/master/apiRoutes' //Core ApiRoute [Do not remove]
import ilocations from 'src/config/api/ilocations'

let responseApiRoutes = {
  ...coreApiRoutes,
  ilocations:ilocations
  //Add here more apiRoutes...
}
console.log('api routes');
console.log(responseApiRoutes);
//Export apiRoutes
export default responseApiRoutes
