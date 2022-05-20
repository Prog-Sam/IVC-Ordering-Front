import http from './httpService';
import config from '../config.json';

export async function getOrderTypes() {
  const orderTypes = await http.get(`${config.apiEndpoint}/orderTypes`);
  // console.log(result);
  return orderTypes;
}

export async function getOrderType(id) {
  const orderType = await http.get(`${config.apiEndpoint}/orderTypes/${id}`);
  // console.log(result);
  return orderType;
}

export async function saveOrderType(orderType) {
  let localOrderType = { ...orderType };
  delete localOrderType['id'];

  let orderTypeInDb = await http.post(
    `${config.apiEndpoint}/orderTypes`,
    localOrderType
  );
  return orderTypeInDb;
}

export async function updateOrderType(orderType) {
  let localOrderType = { ...orderType };
  delete localOrderType['id'];

  let orderTypeInDb = await http.put(
    `${config.apiEndpoint}/orderTypes/${orderType.id}`,
    localOrderType
  );
  return orderTypeInDb;
}
