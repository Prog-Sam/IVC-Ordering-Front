import http from './httpService';
import config from '../config.json';

export async function getLensItems() {
  const lensItems = await http.get(`${config.apiEndpoint}/lensItems`);
  // console.log(result);
  return lensItems;
}

export async function getLensItem(id) {
  const lensItem = await http.get(`${config.apiEndpoint}/lensItems/${id}`);
  // console.log(result);
  return lensItem;
}

export async function saveLensItem(lensItem) {
  let localLensItem = { ...lensItem };
  delete localLensItem['id'];

  let lensItemInDb = await http.post(
    `${config.apiEndpoint}/lensItems`,
    localLensItem
  );
  return lensItemInDb;
}

export async function updateLensItem(lensItem) {
  let localLensItem = { ...lensItem };
  delete localLensItem['id'];

  let lensItemInDb = await http.put(
    `${config.apiEndpoint}/lensItems/${lensItem.id}`,
    localLensItem
  );
  return lensItemInDb;
}
