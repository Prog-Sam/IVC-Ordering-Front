import http from './httpService';
import jwtDecode from 'jwt-decode';
import store from '../utils/store';
import { getLocalCatalog, storeCatalog } from './localCatalogService';

const tokenKey = 'token';
const catalogKey = 'localCatalog';
const cartKey = 'cart';

http.setJwt(getJwt());

export async function login(user) {
  const auth = await http.post(`/auth`, user);
  store.save(tokenKey, auth.data);
  await populateLocalCatalog();
  return auth;
}

export function getJwt() {
  try {
    return store.get(tokenKey);
  } catch (er) {
    console.log(er);
  }
}

export function logout() {
  store.remove(tokenKey);
  store.remove(catalogKey);
  store.remove(cartKey);
}

export function getCurrentUser() {
  try {
    const jwt = store.get(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

async function populateLocalCatalog() {
  const { data } = await getLocalCatalog();
  storeCatalog(data);
}
