import http from './httpService';

export async function getCsaItems() {
  const csaItems = await http.get(`/csaItems`);
  // console.log(result);
  return csaItems;
}

export async function getCsaItem(id) {
  const csaItem = await http.get(`/csaItems/${id}`);
  // console.log(result);
  return csaItem;
}

export async function saveCsaItem(csaItem) {
  let localCsaItem = { ...csaItem };
  delete localCsaItem['id'];

  let csaItemInDb = await http.post(`/csaItems`, localCsaItem);
  return csaItemInDb;
}

export async function updateCsaItem(csaItem) {
  let localCsaItem = { ...csaItem };
  delete localCsaItem['id'];

  let csaItemInDb = await http.put(`/csaItems/${csaItem.id}`, localCsaItem);
  return csaItemInDb;
}
