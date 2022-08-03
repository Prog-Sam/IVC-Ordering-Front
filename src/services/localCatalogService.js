import http from './httpService';
import store from '../utils/store';

const catalogKey = 'localCatalog';

export async function getLocalCatalog() {
  const localCatalog = await http.get(`/localCatalog`);
  return localCatalog;
}

export function storeCatalog(catalog) {
  store.saveObject(catalogKey, catalog);
  return 'Catalog Stored';
}

export function getCatalog() {
  return store.getObject(catalogKey);
}

export function removeCatalog() {
  store.removeObject(catalogKey);
  return 'Catalog Removed';
}
