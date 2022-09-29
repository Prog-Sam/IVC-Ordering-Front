import _ from 'lodash';

export function transactionize(order) {}

export function orderize(transactions) {}

export function getNameById(id, items) {
  let item = _.find(items, { id });
  return item.name;
}

export function mapToSchema(data, schema) {
  let paths = Object.keys(schema);
  return mapToPathArray(data, paths);
}

export function mapToPathArray(data, pathArray) {
  return _.pick(data, [...pathArray]);
}
