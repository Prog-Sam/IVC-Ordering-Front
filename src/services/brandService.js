import http from './httpService';
import config from '../config.json';

export async function getBrands() {
  const brands = await http.get(`${config.apiEndpoint}/brands`);
  // console.log(result);
  return brands;
}

export async function getBrand(id) {
  const brand = await http.get(`${config.apiEndpoint}/brands/${id}`);
  // console.log(result);
  return brand;
}

export async function saveBrand(brand) {
  let localBrand = { ...brand };
  delete localBrand['id'];

  let brandInDb = await http.post(`${config.apiEndpoint}/brands`, localBrand);
  return brandInDb;
}

export async function updateBrand(brand) {
  let localBrand = { ...brand };
  delete localBrand['id'];

  let brandInDb = await http.put(
    `${config.apiEndpoint}/brands/${brand.id}`,
    localBrand
  );
  return brandInDb;
}
