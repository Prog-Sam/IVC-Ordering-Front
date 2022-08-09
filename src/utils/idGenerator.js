import moment from 'moment';

export function generateOrderId() {
  return `o${moment().format('YYYYMMDDHHmmss').toString()}`;
}

export function generateOrderItemId() {
  return `i${moment().format('YYYYMMDDHHmmss').toString()}`;
}
