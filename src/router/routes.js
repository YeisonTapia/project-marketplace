import Route from 'vue-routisan'
import configMiddleware from 'src/router/middlewares/config'

//Create all routes from pages
const pages = config('pages')//Get pages from config

//Redirect
Route.redirect('/', pages.app.home.path);

for (var nameGroupPage in pages) {
  let groupPages = pages[nameGroupPage]//Get group pages
  //Loop group pages
  if (Object.keys(groupPages).length) {
    for (var namePage in groupPages) {
      let page = groupPages[namePage]//Get page
      let middlewares = (page.middleware ? page.middleware : [])
      middlewares.push(configMiddleware) //Set middleware config

      if (page.activated) {//Check if page is activated
        //Create Route
        Route.view('/', page.containerLayout)
          .children(() => {
            Route.view(page.path, page.layout).options({
              name: page.name,
              meta: {
                permission: (page.permission ? page.permission : null),
                title : page.title,
                icon : page.icon
              },
              guard: middlewares,
              props: (route) => {
                let propsData = page.props ? page.props : {}
                propsData.parentId = route.params.parentId || null
                return propsData
              },
            });
          })
      }
    }
  }
}

export default Route.all()
