import httpService from './httpService';
import store from '../utils/store';
import _ from 'lodash';
import { generateOrderId } from '../utils/idGenerator';

const cartKey = 'cart';
const tempCartKey = 'temp-cart';

export function storeCart(cart, temp = false) {
  store.saveObject(temp ? tempCartKey : cartKey, cart);
  return 'Cart Stored';
}

export function getCart(temp = false) {
  return store.getObject(temp ? tempCartKey : cartKey);
}

export function removeCart(temp = false) {
  store.removeObject(temp ? tempCartKey : cartKey);
  return 'Cart Removed';
}

export function addOrder(order, temp = false) {
  const cart = getCart(temp);
  let localOrder = { ...order };
  localOrder['id'] = generateOrderId();
  let newCart = [...cart, localOrder];
  store.saveObject(temp ? tempCartKey : cartKey, newCart);
  return localOrder;
}

export function getOrder(id, temp = false) {
  const cart = getCart(temp);
  const order = _.find(cart, { id: id });
  return order;
}

export function getOrderWithCn(cartNumber, temp = false) {
  const cart = getCart(temp);
  const order = _.find(cart, { cartNumber: cartNumber });
  return order;
}

export function removeOrder(id, temp = false) {
  const cart = getCart(temp);
  const newCart = _.filter(cart, (o) => o.id != id);
  store.saveObject(cartKey, newCart);
  return newCart;
}

// export function updateOrder(order, temp = false) {
//   const cart = getCart(temp);
//   const orderOnCart = _.find(cart, {
//     id: order.id,
//   });
//   let newCart = removeOrder(order.id, temp);
//   newCart.push(order);
//   store.saveObject(temp ? tempCartKey : cartKey, newCart);
//   return order;
// }

export function updateOrder(order, temp = false) {
  let cart = getCart(temp);
  const index = _.findIndex(cart, {
    id: order.id,
  });
  cart.splice(index, 1, order);
  store.saveObject(temp ? tempCartKey : cartKey, cart);
  return order;
}

export async function isDuplicate(order, branchId, temp = false, dbOnly = false) {
  const cart = getCart(temp);
  const orderOnCart = _.find(cart, {
    orderType: order.orderType,
    cartNumber: order.cartNumber,
  });

  console.log(order);

  const ordersInDb = await getOrderFromDb(order, branchId);

  const orderInDb = await _.find(ordersInDb, {
    cartNumber: order.cartNumber,
  });

  if (orderInDb) return { ...orderInDb, location: 'DATABASE' };
  if ((orderOnCart) && (!dbOnly)) return { ...orderOnCart, location: 'CART' };
  return false;
}

export async function getOrderFromDb(order, branchId) {
  const { data: ordersInDb } = await httpService.get(
    `/orders/?branchId=${branchId}`
  );

  return ordersInDb;
}

export function getOrdersCount(temp = false) {
  return getCart(temp).length || 0;
}
