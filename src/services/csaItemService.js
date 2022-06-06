import http from './httpService';
import config from '../config.json';

export async function getCsaItems() {
  const csaItems = await http.get(`${config.apiEndpoint}/csaItems`);
  // console.log(result);
  return csaItems;
}

export async function getCsaItem(id) {
  const csaItem = await http.get(`${config.apiEndpoint}/csaItems/${id}`);
  // console.log(result);
  return csaItem;
}

export async function saveCsaItem(csaItem) {
  let localCsaItem = { ...csaItem };
  delete localCsaItem['id'];

  let csaItemInDb = await http.post(
    `${config.apiEndpoint}/csaItems`,
    localCsaItem
  );
  return csaItemInDb;
}

export async function updateCsaItem(csaItem) {
  let localCsaItem = { ...csaItem };
  delete localCsaItem['id'];

  let csaItemInDb = await http.put(
    `${config.apiEndpoint}/csaItems/${csaItem.id}`,
    localCsaItem
  );
  return csaItemInDb;
}
