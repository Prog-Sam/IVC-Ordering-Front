import http from './httpService';
import config from '../config.json';

export async function getLensTypes() {
  const lensTypes = await http.get(`${config.apiEndpoint}/lensTypes`);
  // console.log(result);
  return lensTypes;
}

export async function getLensType(id) {
  const lensType = await http.get(`${config.apiEndpoint}/lensTypes/${id}`);
  // console.log(result);
  return lensType;
}

export async function saveLensType(lensType) {
  let localLensType = { ...lensType };
  delete localLensType['id'];

  let lensTypeInDb = await http.post(
    `${config.apiEndpoint}/lensTypes`,
    localLensType
  );
  return lensTypeInDb;
}

export async function updateLensType(lensType) {
  let localLensType = { ...lensType };
  delete localLensType['id'];

  let lensTypeInDb = await http.put(
    `${config.apiEndpoint}/lensTypes/${lensType.id}`,
    localLensType
  );
  return lensTypeInDb;
}
