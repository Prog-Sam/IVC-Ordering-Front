import http from './httpService';

export async function getSuppliers() {
  const suppliers = await http.get(`/suppliers`);
  // console.log(result);
  return suppliers;
}

export async function getSupplier(id) {
  const supplier = await http.get(`/suppliers/${id}`);
  // console.log(result);
  return supplier;
}

export async function saveSupplier(supplier) {
  let localSupplier = { ...supplier };
  delete localSupplier['id'];

  let supplierInDb = await http.post(`/suppliers`, localSupplier);
  return supplierInDb;
}

export async function updateSupplier(supplier) {
  let localSupplier = { ...supplier };
  delete localSupplier['id'];

  let supplierInDb = await http.put(`/suppliers/${supplier.id}`, localSupplier);
  return supplierInDb;
}
