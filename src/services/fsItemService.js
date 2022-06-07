import http from './httpService';

export async function getFsItems() {
  const fsItems = await http.get(`/fsItems`);
  // console.log(result);
  return fsItems;
}

export async function getFsItem(id) {
  const fsItem = await http.get(`/fsItems/${id}`);
  // console.log(result);
  return fsItem;
}

export async function saveFsItem(fsItem) {
  let localFsItem = { ...fsItem };
  delete localFsItem['id'];

  let fsItemInDb = await http.post(`/fsItems`, localFsItem);
  return fsItemInDb;
}

export async function updateFsItem(fsItem) {
  let localFsItem = { ...fsItem };
  delete localFsItem['id'];

  let fsItemInDb = await http.put(`/fsItems/${fsItem.id}`, localFsItem);
  return fsItemInDb;
}
