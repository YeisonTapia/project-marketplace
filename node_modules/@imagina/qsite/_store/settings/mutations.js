export const RESET = (state) => {
  state.settings = [];
  state.availableLocales = [];
  state.availableThemes = [];
  state.selectedLocales = [];
  state.defaultLocale = '';
};

export function SET_SITE_SETTINGS(state, data) {
  state.settings = [...state.settings, ...data];
}

export function SET_AVAILABLE_LOCALES(state, data) {
  state.availableLocales = data;
}

export function SET_AVAILABLE_THEMES(state, data) {
  state.availableThemes = data;
}

export function SET_SELECTED_LOCALES(state) {
  //Search locale settigns
  let locales = state.settings.find(item => item.name == 'core::locales');
  locales = locales ? locales.value : [];
  //Set locales to state. sort
  state.selectedLocales = locales.sort();
}

export function SET_DEFAULT_LOCALE(state, data) {
  state.defaultLocale = data;
}


