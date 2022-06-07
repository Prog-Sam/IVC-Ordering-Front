import http from './httpService';

export async function getUsers() {
  const users = await http.get(`/userIds`);
  // console.log(result);
  return users;
}

export async function getUser(id) {
  const user = await http.get(`/userIds/${id}`);
  // console.log(result);
  return user;
}

export async function saveUser(user) {
  let localUser = { ...user };
  delete localUser['id'];

  let userInDb = await http.post(`/userIds`, localUser);
  return userInDb;
}

export async function updateUser(user) {
  let localUser = { ...user };
  delete localUser['id'];

  let userInDb = await http.put(`/userIds/${user.id}`, localUser);
  return userInDb;
}
