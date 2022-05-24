import http from './httpService';
import config from '../config.json';

export async function getSupplyCategories() {
  const supplyCategories = await http.get(
    `${config.apiEndpoint}/supplyCategories`
  );
  // console.log(result);
  return supplyCategories;
}

export async function getSupplyCategory(id) {
  const supplyCategory = await http.get(
    `${config.apiEndpoint}/supplyCategories/${id}`
  );
  // console.log(result);
  return supplyCategory;
}

export async function saveSupplyCategory(supplyCategory) {
  let localSupplyCategory = { ...supplyCategory };
  delete localSupplyCategory['id'];

  let supplyCategoryInDb = await http.post(
    `${config.apiEndpoint}/supplyCategories`,
    localSupplyCategory
  );
  return supplyCategoryInDb;
}

export async function updateSupplyCategory(supplyCategory) {
  let localSupplyCategory = { ...supplyCategory };
  delete localSupplyCategory['id'];

  let supplyCategoryInDb = await http.put(
    `${config.apiEndpoint}/supplyCategories/${supplyCategory.id}`,
    localSupplyCategory
  );
  return supplyCategoryInDb;
}
