import http from './httpService';

export async function getIndexTypes() {
  const indexTypes = await http.get(`/indexTypes`);
  // console.log(result);
  return indexTypes;
}

export async function getIndexType(id) {
  const indexType = await http.get(`/indexTypes/${id}`);
  // console.log(result);
  return indexType;
}

export async function saveIndexType(indexType) {
  let localIndexType = { ...indexType };
  delete localIndexType['id'];

  let indexTypeInDb = await http.post(`/indexTypes`, localIndexType);
  return indexTypeInDb;
}

export async function updateIndexType(indexType) {
  let localIndexType = { ...indexType };
  delete localIndexType['id'];

  let indexTypeInDb = await http.put(
    `/indexTypes/${indexType.id}`,
    localIndexType
  );
  return indexTypeInDb;
}
