import cache from '@imagina/qhelper/_plugins/cache'
import axios from 'axios'
import config from '@imagina/qsite/_config/master/index'
import crud from '@imagina/qcrud/_services/baseService'
import {colors, AddressbarColor} from 'quasar'
import Quasar from 'quasar'

export const GET_SITE_SETTINGS = ({commit, dispatch, state}) => {
  return new Promise((resolve, reject) => {
    let params = {refresh: true}
    let configName = 'apiRoutes.qsite.siteSettings'
    crud.index(configName, params).then(async response => {
      let data = response.data
      commit('SET_SITE_SETTINGS', data.siteSettings)
      commit('SET_AVAILABLE_LOCALES', data.availableLocales)
      commit('SET_AVAILABLE_THEMES', data.availableThemes)
      commit('SET_DEFAULT_LOCALE', data.defaultLocale)
      commit('SET_SELECTED_LOCALES')

      resolve(true)
    }).catch(error => {
      console.error('Error Store getting site settings', error)
      reject(error)
    })
  })
}

export const SET_SITE_COLORS = ({state, commit, dispatch}) => {
  if (process.env.CLIENT) {
    let settings = state.settings
    let dataColors = {}

    for (let i in settings) {
      let name = settings[i].name.split('::')
      dataColors[name[1]] = settings[i].path ? settings[i].path : settings[i].plainValue
    }

    if (dataColors.brandPrimary) {
      AddressbarColor.set(dataColors.brandPrimary)
      colors.setBrand('primary', dataColors.brandPrimary)
    } else {
      colors.setBrand('primary', '#027be3')
    }

    if (dataColors.brandSecondary) {
      colors.setBrand('secondary', dataColors.brandSecondary)
    } else {
      colors.setBrand('secondary', '#26a69a')
    }

    if (dataColors.brandWarning) {
      colors.setBrand('warning', dataColors.brandWarning)
    } else {
      colors.setBrand('warning', '#f2c037')
    }

    if (dataColors.brandLight) {
      colors.setBrand('light', dataColors.brandLight)
    } else {
      colors.setBrand('light', '#bdbdbd')
    }

    if (dataColors.brandDark) {
      colors.setBrand('dark', dataColors.brandDark)
    } else {
      colors.setBrand('dark', '#424242')
    }

    if (dataColors.brandInfo) {
      colors.setBrand('info', dataColors.brandInfo)
    } else {
      colors.setBrand('info', '#31ccec')
    }

    if (dataColors.brandFaded) {
      colors.setBrand('faded', dataColors.brandFaded)
    } else {
      colors.setBrand('faded', '#777')
    }

    if (dataColors.brandPositive) {
      colors.setBrand('positive', dataColors.brandPositive)
    } else {
      colors.setBrand('positive', '#21ba45')
    }

    if (dataColors.brandNegative) {
      colors.setBrand('negative', dataColors.brandNegative)
    } else {
      colors.setBrand('negative', '#db2828')
    }

    if (dataColors.brandTertiary) {
      colors.setBrand('tertiary', dataColors.brandTertiary)
    } else {
      colors.setBrand('tertiary', '#555')
    }
  }
}

export const SET_LOCALE = ({commit, dispatch, state}, params = {locale: false, vue: false}) => {
  return new Promise(async resolve => {
    let locale = params.locale
    let currentLocale = locale
    let Vue = params.vue

    //find locale in sotrage, store or first from selected locales
    if (!locale) {
      locale = await cache.get.item('site.default.locale')
      if (!locale) locale = state.defaultLocale
      if (!locale && state.selectedLocales.length) locale = state.selectedLocales[0]
      currentLocale = locale
    }

    //Set in storage
    await cache.set('site.default.locale', locale)

    //Set in store
    commit('SET_DEFAULT_LOCALE', locale)

    //Set in axios how default params
    axios.defaults.params.setting.locale = locale

    //Set default language to Quasar
    locale = (locale == 'en') ? 'en-us' : locale.toLowerCase()
    import(`quasar/lang/${locale}`).then(lang => {
      Quasar.lang.set(lang.default)
    })

    //Set default language to i18n
    import(`@imagina/qsite/_i18n/master/index`).then(({default: messages}) => {
      try {
        Vue.i18n.locale = locale
        Vue.i18n.setLocaleMessage(locale, messages[locale])
      } catch (e) {

      }

      try {
        Vue.$i18n.locale = locale
        Vue.$i18n.setLocaleMessage(locale, messages[locale])
      } catch (e) {

      }
    })

    await dispatch('app/REFRESH_PAGE', null, {root: true})
    //Change language in URL
    if (Vue.$route)
      Vue.$router.push({
        name: Vue.$route.name,
        query: {...Vue.$route.query, lang: currentLocale}
      })
    resolve(true)
  })
}
