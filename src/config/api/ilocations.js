/*
* In javascript the variables are declared in camelcase but I like use snake case,
* if you want you can rename them as you want and remove the rule in .eslintrc line 35
*/
const api_url = '/v2/ilocations';


export default {
  countries: api_url + '/countries',
  provinces: api_url + '/provinces',
  cities: api_url + '/cities',
  neighborhoods: api_url + '/neighborhoods',
}
