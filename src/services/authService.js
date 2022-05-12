import http from './httpService';
import config from './../config.json';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(user) {
  const auth = await http.post(`${config.apiEndpoint}/auth`, user);
  localStorage.setItem(tokenKey, auth.data);
  return auth;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}
