import http from './httpService';
import config from '../config.json';

export async function getFsItems() {
  const fsItems = await http.get(`${config.apiEndpoint}/fsItems`);
  // console.log(result);
  return fsItems;
}

export async function getFsItem(id) {
  const fsItem = await http.get(`${config.apiEndpoint}/fsItems/${id}`);
  // console.log(result);
  return fsItem;
}

export async function saveFsItem(fsItem) {
  let localFsItem = { ...fsItem };
  delete localFsItem['id'];

  let fsItemInDb = await http.post(
    `${config.apiEndpoint}/fsItems`,
    localFsItem
  );
  return fsItemInDb;
}

export async function updateFsItem(fsItem) {
  let localFsItem = { ...fsItem };
  delete localFsItem['id'];

  let fsItemInDb = await http.put(
    `${config.apiEndpoint}/fsItems/${fsItem.id}`,
    localFsItem
  );
  return fsItemInDb;
}
