import http from './httpService';
import config from './../config.json';

export async function getUsers() {
  const users = await http.get(`${config.apiEndpoint}/userIds`);
  // console.log(result);
  return users;
}

export async function getUser(id) {
  const user = await http.get(`${config.apiEndpoint}/userIds/${id}`);
  // console.log(result);
  return user;
}
