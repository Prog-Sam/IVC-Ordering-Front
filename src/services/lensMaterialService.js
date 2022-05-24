import http from './httpService';
import config from '../config.json';

export async function getLensMaterials() {
  const lensMaterials = await http.get(`${config.apiEndpoint}/lensMaterials`);
  // console.log(result);
  return lensMaterials;
}

export async function getLensMaterial(id) {
  const lensMaterial = await http.get(
    `${config.apiEndpoint}/lensMaterials/${id}`
  );
  // console.log(result);
  return lensMaterial;
}

export async function saveLensMaterial(lensMaterial) {
  let localLensMaterial = { ...lensMaterial };
  delete localLensMaterial['id'];

  let lensMaterialInDb = await http.post(
    `${config.apiEndpoint}/lensMaterials`,
    localLensMaterial
  );
  return lensMaterialInDb;
}

export async function updateLensMaterial(lensMaterial) {
  let localLensMaterial = { ...lensMaterial };
  delete localLensMaterial['id'];

  let lensMaterialInDb = await http.put(
    `${config.apiEndpoint}/lensMaterials/${lensMaterial.id}`,
    localLensMaterial
  );
  return lensMaterialInDb;
}
