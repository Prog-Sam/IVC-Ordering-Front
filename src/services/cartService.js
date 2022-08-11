import httpService from './httpService';
import store from '../utils/store';
import _ from 'lodash';
import { generateOrderId } from '../utils/idGenerator';

const cartKey = 'cart';

export function storeCart(cart) {
  store.saveObject(cartKey, cart);
  return 'Cart Stored';
}

export function getCart() {
  return store.getObject(cartKey);
}

export function removeCart() {
  store.removeObject(cartKey);
  return 'Cart Removed';
}

export function addOrder(order) {
  const cart = getCart();
  let localOrder = { ...order };
  localOrder['id'] = generateOrderId();
  // let order = _.find(cart, { orderType: orderType, cartNumber: cartNumber });
  let newCart = [...cart, localOrder];
  store.saveObject(cartKey, newCart);
  return localOrder;
}

export function getOrder(id) {
  const cart = getCart();
  const order = _.find(cart, { id: id });
  return order;
}

export function removeOrder(id) {
  const cart = getCart();
  //   const order = _.find(cart, { orderType: orderType, cartNumber: cartNumber });
  const newCart = _.filter(cart, (o) => o.id != id);
  store.saveObject(cartKey, newCart);
  // console.log(newCart);
  return newCart;
}

export function updateOrder(order) {
  const cart = getCart();
  const orderOnCart = _.find(cart, {
    id: order.id,
  });
  let newCart = removeOrder(order.id);
  newCart.push(order);
  store.saveObject(cartKey, newCart);
  return order;
}

export async function isDuplicate(order, branchId) {
  const cart = getCart();
  const orderOnCart = _.find(cart, {
    orderType: order.orderType,
    cartNumber: order.cartNumber,
  });

  const ordersInDb = await getOrderFromDb(order, branchId);

  const orderInDb = await _.find(ordersInDb, {
    cartNumber: order.cartNumber,
  });

  if (orderInDb) return { ...orderInDb, location: 'DATABASE' };
  if (orderOnCart) return { ...orderOnCart, location: 'CART' };
  return false;
}

export async function getOrderFromDb(order, branchId) {
  const { data: ordersInDb } = await httpService.get(
    `/orders/?branchId=${branchId}&negativeStatus=REJECTED`
  );

  return ordersInDb;
}

export function getOrdersCount() {
  return getCart().length || 0;
}
