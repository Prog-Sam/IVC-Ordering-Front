import _ from 'lodash';

export function getOnly(items, status) {
  return _.filter(items, (i) => {
    status: status;
  });
}

export function toggleStatus(item) {
  const toggled = !item.status;
  return { ...item, ['status']: toggled };
}
