const languagesAvailables = config('app.languages.availables')
const modules = config('app.modules')

//Auto load locales from modules available in: src/config/app.js "modules"
//Not edit
let languages = {}

languagesAvailables.forEach(lang => {
  languages[lang] = {} //Initialize languages
  //Load languages from modules
  modules.forEach(name => {
    try {
      let locale = require(`@imagina/${name}/_i18n/${lang}/index`).default
      languages[lang][name] = locale
    } catch (e) {
    }
  })

  //Load core languages... and languajes from project
  try {
    let core = require(`@imagina/qsite/_i18n/master/${lang}/index`).default
    let locale = require(`src/i18n/${lang}/index`).default
    languages[lang] = {...languages[lang], ...core}
    languages[lang]['app'] = {...languages[lang]['app'], ...locale}
  } catch (e) {
  }
})

export default languages //Export languages
