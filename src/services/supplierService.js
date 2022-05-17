import http from './httpService';
import config from '../config.json';

export async function getSuppliers() {
  const suppliers = await http.get(`${config.apiEndpoint}/suppliers`);
  // console.log(result);
  return suppliers;
}

export async function getSupplier(id) {
  const supplier = await http.get(`${config.apiEndpoint}/suppliers/${id}`);
  // console.log(result);
  return supplier;
}

export async function saveSupplier(supplier) {
  let localSupplier = { ...supplier };
  delete localSupplier['id'];

  let supplierInDb = await http.post(
    `${config.apiEndpoint}/suppliers`,
    localSupplier
  );
  return supplierInDb;
}

export async function updateSupplier(supplier) {
  let localSupplier = { ...supplier };
  delete localSupplier['id'];

  let supplierInDb = await http.put(
    `${config.apiEndpoint}/suppliers/${supplier.id}`,
    localSupplier
  );
  return supplierInDb;
}
