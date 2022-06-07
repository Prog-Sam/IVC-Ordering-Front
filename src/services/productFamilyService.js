import http from './httpService';

export async function getProductFamilies() {
  const productFamilies = await http.get(`/productFamilies`);
  // console.log(result);
  return productFamilies;
}

export async function getProductFamily(id) {
  const productFamily = await http.get(`/productFamilies/${id}`);
  // console.log(result);
  return productFamily;
}

export async function saveProductFamily(productFamily) {
  let localProductFamily = { ...productFamily };
  delete localProductFamily['id'];

  let productFamilyInDb = await http.post(
    `/productFamilies`,
    localProductFamily
  );
  return productFamilyInDb;
}

export async function updateProductFamily(productFamily) {
  let localProductFamily = { ...productFamily };
  delete localProductFamily['id'];

  let productFamilyInDb = await http.put(
    `/productFamilies/${productFamily.id}`,
    localProductFamily
  );
  return productFamilyInDb;
}
