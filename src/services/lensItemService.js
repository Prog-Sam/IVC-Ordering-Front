import http from './httpService';

export async function getLensItems() {
  const lensItems = await http.get(`/lensItems`);
  // console.log(result);
  return lensItems;
}

export async function getLensItem(id, eager = false) {
  const url = eager ? `/lensItems/${id}?eager=true` : `/lensItems/${id}`;
  const lensItem = await http.get(url);
  return lensItem;
}

export async function saveLensItem(lensItem) {
  let localLensItem = { ...lensItem };
  delete localLensItem['id'];

  let lensItemInDb = await http.post(`/lensItems`, localLensItem);
  return lensItemInDb;
}

export async function updateLensItem(lensItem) {
  let localLensItem = { ...lensItem };
  delete localLensItem['id'];

  let lensItemInDb = await http.put(`/lensItems/${lensItem.id}`, localLensItem);
  return lensItemInDb;
}
