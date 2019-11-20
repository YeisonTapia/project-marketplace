export default async ({app, router, store, Vue}) => {
  await store.dispatch('qmarketplaceStores/GET_USER_STORES')
  await store.dispatch('qmarketplaceStores/SET_STORE')
}
