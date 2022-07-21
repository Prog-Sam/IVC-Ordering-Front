import http from './httpService';

export async function getLocalCatalog() {
  const localCatalog = await http.get(`/localCatalog`);
  return localCatalog;
}
