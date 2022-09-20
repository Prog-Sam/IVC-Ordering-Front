import httpService from './httpService';
import store from '../utils/store';
import _ from 'lodash';
import { generateOrderId, generateOrderItemId } from '../utils/idGenerator';
import { getCart, getOrder, updateOrder } from './cartService';
import { isGradeDuplicate } from '../utils/gradeMethods';

const cartKey = 'cart';

export function getItems(id) {
  const order = getOrder(id);
  return order.items || [];
}

export function getItem(orderId, itemId) {
  const orderItems = getItems(orderId);
  return _.find(orderItems, { id: itemId }) || null;
}

export function saveOrderItem(orderId, item) {
  let order = getOrder(orderId);
  const localItem = { ...item, id: generateOrderItemId() };
  order.items.push(localItem);
  updateOrder(order);
  return order.items;
}

export function updateOrderItem(orderId, item) {
  let order = getOrder(orderId);
  const localItem = { ...item, id: generateOrderItemId() };
  let newOrderItems = removeItem(orderId, item.id);
  order.items = { ...newOrderItems, localItem };
  updateOrder(order);
  return order.items;
}

export function removeItem(orderId, itemId) {
  let order = getOrder(orderId);
  let updatedItems = _.filter(order.items, (i) => i.id != itemId);
  order.items = { ...updatedItems };
  updateOrder(order);
  return order.items;
}

export function getActiveCartNumbers() {
  const cart = getCart();
  return _.map(cart, (o) => {
    return { id: o.cartNumber, name: o.cartNumber };
  });
}

export function isDuplicate(orderId, itemId) {
  console.log(getItem(orderId, itemId));
  if (getItem(orderId, itemId)) return true;
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
