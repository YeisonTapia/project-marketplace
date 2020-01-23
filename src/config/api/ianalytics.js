/*
* In javascript the variables are declared in camelcase but I like use snake case,
* if you want you can rename them as you want and remove the rule in .eslintrc line 35
*/
const api_url = 'ianalytics/v1';


export default {
  analytics: api_url + '/analytics',
  marketplace: api_url + '/marketplace',
}
