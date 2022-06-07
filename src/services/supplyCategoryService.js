import http from './httpService';

export async function getSupplyCategories() {
  const supplyCategories = await http.get(`/supplyCategories`);
  // console.log(result);
  return supplyCategories;
}

export async function getSupplyCategory(id) {
  const supplyCategory = await http.get(`/supplyCategories/${id}`);
  // console.log(result);
  return supplyCategory;
}

export async function saveSupplyCategory(supplyCategory) {
  let localSupplyCategory = { ...supplyCategory };
  delete localSupplyCategory['id'];

  let supplyCategoryInDb = await http.post(
    `/supplyCategories`,
    localSupplyCategory
  );
  return supplyCategoryInDb;
}

export async function updateSupplyCategory(supplyCategory) {
  let localSupplyCategory = { ...supplyCategory };
  delete localSupplyCategory['id'];

  let supplyCategoryInDb = await http.put(
    `/supplyCategories/${supplyCategory.id}`,
    localSupplyCategory
  );
  return supplyCategoryInDb;
}
