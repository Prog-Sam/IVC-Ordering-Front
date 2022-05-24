import http from './httpService';
import config from '../config.json';

export async function getProductFamilies() {
  const productFamilies = await http.get(
    `${config.apiEndpoint}/productFamilies`
  );
  // console.log(result);
  return productFamilies;
}

export async function getProductFamily(id) {
  const productFamily = await http.get(
    `${config.apiEndpoint}/productFamilies/${id}`
  );
  // console.log(result);
  return productFamily;
}

export async function saveProductFamily(productFamily) {
  let localProductFamily = { ...productFamily };
  delete localProductFamily['id'];

  let productFamilyInDb = await http.post(
    `${config.apiEndpoint}/productFamilies`,
    localProductFamily
  );
  return productFamilyInDb;
}

export async function updateProductFamily(productFamily) {
  let localProductFamily = { ...productFamily };
  delete localProductFamily['id'];

  let productFamilyInDb = await http.put(
    `${config.apiEndpoint}/productFamilies/${productFamily.id}`,
    localProductFamily
  );
  return productFamilyInDb;
}
