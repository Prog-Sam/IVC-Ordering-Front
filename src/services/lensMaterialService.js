import http from './httpService';

export async function getLensMaterials() {
  const lensMaterials = await http.get(`/lensMaterials`);
  // console.log(result);
  return lensMaterials;
}

export async function getLensMaterial(id) {
  const lensMaterial = await http.get(`/lensMaterials/${id}`);
  // console.log(result);
  return lensMaterial;
}

export async function saveLensMaterial(lensMaterial) {
  let localLensMaterial = { ...lensMaterial };
  delete localLensMaterial['id'];

  let lensMaterialInDb = await http.post(`/lensMaterials`, localLensMaterial);
  return lensMaterialInDb;
}

export async function updateLensMaterial(lensMaterial) {
  let localLensMaterial = { ...lensMaterial };
  delete localLensMaterial['id'];

  let lensMaterialInDb = await http.put(
    `/lensMaterials/${lensMaterial.id}`,
    localLensMaterial
  );
  return lensMaterialInDb;
}
