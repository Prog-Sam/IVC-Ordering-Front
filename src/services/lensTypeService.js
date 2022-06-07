import http from './httpService';

export async function getLensTypes() {
  const lensTypes = await http.get(`/lensTypes`);
  // console.log(result);
  return lensTypes;
}

export async function getLensType(id) {
  const lensType = await http.get(`/lensTypes/${id}`);
  // console.log(result);
  return lensType;
}

export async function saveLensType(lensType) {
  let localLensType = { ...lensType };
  delete localLensType['id'];

  let lensTypeInDb = await http.post(`/lensTypes`, localLensType);
  return lensTypeInDb;
}

export async function updateLensType(lensType) {
  let localLensType = { ...lensType };
  delete localLensType['id'];

  let lensTypeInDb = await http.put(`/lensTypes/${lensType.id}`, localLensType);
  return lensTypeInDb;
}
