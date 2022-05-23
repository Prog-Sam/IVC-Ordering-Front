import http from './httpService';
import config from '../config.json';

export async function getIndexTypes() {
  const indexTypes = await http.get(`${config.apiEndpoint}/indexTypes`);
  // console.log(result);
  return indexTypes;
}

export async function getIndexType(id) {
  const indexType = await http.get(`${config.apiEndpoint}/indexTypes/${id}`);
  // console.log(result);
  return indexType;
}

export async function saveIndexType(indexType) {
  let localIndexType = { ...indexType };
  delete localIndexType['id'];

  let indexTypeInDb = await http.post(
    `${config.apiEndpoint}/indexTypes`,
    localIndexType
  );
  return indexTypeInDb;
}

export async function updateIndexType(indexType) {
  let localIndexType = { ...indexType };
  delete localIndexType['id'];

  let indexTypeInDb = await http.put(
    `${config.apiEndpoint}/indexTypes/${indexType.id}`,
    localIndexType
  );
  return indexTypeInDb;
}
