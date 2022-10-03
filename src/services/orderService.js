import http from './httpService';
import { transactionize } from '../utils/itemizer';
import { getOrder } from './cartService';

// export async function getOrders() {
//   const orders = await http.get(`/orders`);
//   // console.log(result);
//   return orders;
// }

// export async function getOrder(id) {
//   const order = await http.get(`/orders/${id}`);
//   // console.log(result);
//   return order;
// }

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
