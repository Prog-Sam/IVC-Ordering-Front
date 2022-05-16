import http from './httpService';
import config from '../config.json';

export async function getMalls() {
  const malls = await http.get(`${config.apiEndpoint}/malls`);
  // console.log(result);
  return malls;
}

export async function getMall(id) {
  const mall = await http.get(`${config.apiEndpoint}/malls/${id}`);
  // console.log(result);
  return mall;
}

export async function saveMall(mall) {
  let localMall = { ...mall };
  delete localMall['id'];

  let mallInDb = await http.post(`${config.apiEndpoint}/malls`, localMall);
  return mallInDb;
}

export async function updateMall(mall) {
  let localMall = { ...mall };
  delete localMall['id'];

  let mallInDb = await http.put(
    `${config.apiEndpoint}/malls/${mall.id}`,
    localMall
  );
  return mallInDb;
}
