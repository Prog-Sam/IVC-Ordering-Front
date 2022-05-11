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

export async function saveUser(user) {
  let localUser = { ...user };
  delete localUser['id'];

  let userInDb = await http.post(`${config.apiEndpoint}/userIds`, localUser);
  return userInDb;
}

export async function updateUser(user) {
  let localUser = { ...user };
  delete localUser['id'];

  let userInDb = await http.put(
    `${config.apiEndpoint}/userIds/${user.id}`,
    localUser
  );
  return userInDb;
}
