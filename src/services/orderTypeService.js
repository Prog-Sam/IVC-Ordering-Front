import http from './httpService';

export async function getOrderTypes() {
  const orderTypes = await http.get(`/orderTypes`);
  // console.log(result);
  return orderTypes;
}

export async function getOrderType(id) {
  const orderType = await http.get(`/orderTypes/${id}`);
  // console.log(result);
  return orderType;
}

export async function saveOrderType(orderType) {
  let localOrderType = { ...orderType };
  delete localOrderType['id'];

  let orderTypeInDb = await http.post(`/orderTypes`, localOrderType);
  return orderTypeInDb;
}

export async function updateOrderType(orderType) {
  let localOrderType = { ...orderType };
  delete localOrderType['id'];

  let orderTypeInDb = await http.put(
    `/orderTypes/${orderType.id}`,
    localOrderType
  );
  return orderTypeInDb;
}
