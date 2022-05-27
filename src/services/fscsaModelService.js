import http from './httpService';
import config from '../config.json';

export async function getFSCSAModels() {
  const fscsaModels = await http.get(`${config.apiEndpoint}/fscsaModels`);
  // console.log(result);
  return fscsaModels;
}

export async function getFSCSAModel(id) {
  const fscsaModel = await http.get(`${config.apiEndpoint}/fscsaModels/${id}`);
  // console.log(result);
  return fscsaModel;
}

export async function saveFSCSAModel(fscsaModel) {
  let localFSCSAModel = { ...fscsaModel };
  delete localFSCSAModel['id'];

  let fscsaModelInDb = await http.post(
    `${config.apiEndpoint}/fscsaModels`,
    localFSCSAModel
  );
  return fscsaModelInDb;
}

export async function updateFSCSAModel(fscsaModel) {
  let localFSCSAModel = { ...fscsaModel };
  delete localFSCSAModel['id'];

  let fscsaModelInDb = await http.put(
    `${config.apiEndpoint}/fscsaModels/${fscsaModel.id}`,
    localFSCSAModel
  );
  return fscsaModelInDb;
}
