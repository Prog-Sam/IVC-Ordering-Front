import http from './httpService';

export async function getMalls() {
  const malls = await http.get(`/malls`);
  // console.log(result);
  return malls;
}

export async function getMall(id) {
  const mall = await http.get(`/malls/${id}`);
  // console.log(result);
  return mall;
}

export async function saveMall(mall) {
  let localMall = { ...mall };
  delete localMall['id'];

  let mallInDb = await http.post(`/malls`, localMall);
  return mallInDb;
}

export async function updateMall(mall) {
  let localMall = { ...mall };
  delete localMall['id'];

  let mallInDb = await http.put(`/malls/${mall.id}`, localMall);
  return mallInDb;
}
