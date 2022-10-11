import httpService from './httpService';
import store from '../utils/store';
import _ from 'lodash';
import { generateOrderId, generateOrderItemId } from '../utils/idGenerator';
import { getCart, getOrder, updateOrder } from './cartService';
import { isGradeDuplicate } from '../utils/gradeMethods';

const cartKey = 'cart';
const tempCartKey = 'temp-cart';

export function getItems(id, temp = false) {
  const order = getOrder(id, temp);
  return order.items || [];
}

export function getItem(orderId, itemId, temp = false) {
  const orderItems = getItems(orderId, temp);
  return _.find(orderItems, { id: itemId }) || null;
}

export function saveOrderItem(orderId, item, temp = false) {
  let order = getOrder(orderId, temp);
  const localItem = { ...item, id: generateOrderItemId() };
  order.items.push(localItem);
  updateOrder(order, temp);
  return order.items;
}

export function updateOrderItem(orderId, item, temp = false) {
  let order = getOrder(orderId, temp);
  let orderItems = [...order.items];
  const index = _.findIndex(order.items, { id: item.id });
  orderItems.splice(index, 1, item);
  // const localItem = { ...item };
  // let newOrderItems = removeItem(orderId, item.id);
  order.items = [...orderItems];
  updateOrder(order, temp);
  // console.log(orderItems);
  return order.items;
}

export function removeItem(orderId, itemId, temp = false) {
  let order = getOrder(orderId, temp);
  let updatedItems = _.filter(order.items, (i) => i.id != itemId);
  order.items = [...updatedItems];
  updateOrder(order, temp);
  return order.items;
}

export function getActiveCartNumbers(temp = false) {
  const cart = getCart(temp);
  return _.map(cart, (o) => {
    return { id: o.cartNumber, name: o.cartNumber };
  });
}

export function isDuplicate(orderId, itemId, temp = false) {
  console.log(getItem(orderId, itemId, temp));
  if (getItem(orderId, itemId, temp)) return true;
  return false;
}

export function isSimilar(item1, item2) {
  if (item1.rxNumber != item2.rxNumber) return false;
  if (item1.orderTypeKey != item2.orderTypeKey) return false;
  if (item1.supplyCategoryKey != item2.supplyCategoryKey) return false;
  if (item1.brandKey != item2.brandKey) return false;
  if (item1.itemKey != item2.itemKey) return false;
  if (item1.itemDescription != item2.itemDescription) return false;
  if (item1.cdKey != item2.cdKey) return false;
  if (item1.additionalInstruction != item2.additionalInstruction) return false;
  if (item1.pxName != item2.pxName) return false;
  if (!isGradeDuplicate(item1.grade, item2.grade)) return false;
  return true;
}

export function isLens(supplyCategory) {
  if (!supplyCategory) return false;
  if (supplyCategory <= 2) return true;
  return false;
}
