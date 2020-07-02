const moduleName = 'imenu';
const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const urlBase = `${baseApiUrl}/${moduleName}`;

export default {
  urlBase : urlBase,
  menus: `${urlBase}/menu`,
  menuItems: `${urlBase}/menuitem`,
  menuItemsOrdener: `${urlBase}/menuitem/ordener`,
}
