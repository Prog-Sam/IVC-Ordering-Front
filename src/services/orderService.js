import http from './httpService';
import { transactionize } from '../utils/itemizer';
import { getOrder } from './cartService';
import { getCurrentUser } from './authService';

export async function getOrdersFromDb(query = '') {
  const orders = await http.get(
    `/orders/?branchId=${getCurrentUser().branchKey}${query}`
  );
  // console.log(orders);
  return orders;
}

export async function getOrderFromDb(id, query = '') {
  const order = await http.get(
    `/orders/${id}?branchId=${getCurrentUser().branchKey}${query}`
  );
  // console.log(result);
  return order;
}

export async function saveOrder(orderId, status) {
  // let localOrder = { ...order };
  //   delete localOrder['id'];

  //   let orderInDb = await http.post(`/orders`, localOrder);
  //   return orderInDb;

  const order = getOrder(orderId);

  let localOrder = transactionize(order, status);

  if (!localOrder)
    return { errorMessage: `Cannot Submit empty order!`, status: 400 };

  let orderInDb = await http.post('/orders', localOrder);

  return orderInDb;
}

// export async function updateOrder(order) {
//   let localOrder = { ...order };
//   delete localOrder['id'];

//   let orderInDb = await http.put(`/orders/${order.id}`, localOrder);
//   return orderInDb;
// }
