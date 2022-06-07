import http from './httpService';

export async function getBrands() {
  const brands = await http.get(`/brands`);
  // console.log(result);
  return brands;
}

export async function getBrand(id) {
  const brand = await http.get(`/brands/${id}`);
  // console.log(result);
  return brand;
}

export async function saveBrand(brand) {
  let localBrand = { ...brand };
  delete localBrand['id'];

  let brandInDb = await http.post(`/brands`, localBrand);
  return brandInDb;
}

export async function updateBrand(brand) {
  let localBrand = { ...brand };
  delete localBrand['id'];

  let brandInDb = await http.put(`/brands/${brand.id}`, localBrand);
  return brandInDb;
}
