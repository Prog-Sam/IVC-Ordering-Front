import http from './httpService';

export async function getFSCSAModels() {
  const fscsaModels = await http.get(`/fscsaModels`);
  // console.log(result);
  return fscsaModels;
}

export async function getFSCSAModel(id) {
  const fscsaModel = await http.get(`/fscsaModels/${id}`);
  // console.log(result);
  return fscsaModel;
}

export async function saveFSCSAModel(fscsaModel) {
  let localFSCSAModel = { ...fscsaModel };
  delete localFSCSAModel['id'];

  let fscsaModelInDb = await http.post(`/fscsaModels`, localFSCSAModel);
  return fscsaModelInDb;
}

export async function updateFSCSAModel(fscsaModel) {
  let localFSCSAModel = { ...fscsaModel };
  delete localFSCSAModel['id'];

  let fscsaModelInDb = await http.put(
    `/fscsaModels/${fscsaModel.id}`,
    localFSCSAModel
  );
  return fscsaModelInDb;
}
