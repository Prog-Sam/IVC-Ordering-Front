import _ from 'lodash';
import {
  generateGradeObject,
  generateGradeString,
  generateSoObject,
  generateSoString,
} from './gradeMethods';
import { isLens } from './../services/orderItemService';
import { isBulk } from './catalogMethods';

export function transactionize(order, status) {
  if (order.items.length == 0) return false;
  const pathArray = ['cartNumber', 'id', 'items', 'url', 'orderType'];

  let { cartNumber, id, items, url, orderType } = mapToPathArray(
    order,
    pathArray
  );

  let newOrder = {
    branchId: items[0].toBranchKey,
    isBulk: orderType == 'BULK' ? true : false,
    rxNumber: cartNumber,
    items: [...transactionizeItems(items, orderType, url, status)],
  };

  return newOrder;
}

export function transactionizeItems(items, orderType, url, status) {
  let result = [];
  if (orderType == 'BULK') {
    for (let item of items) {
      if (isLens(item.supplyCategoryKey)) {
        const gradeDetails = generateGradeDetailObjectArray(
          cleanGrades(item.grades)
        );
        const cdKey = isLens(item.supplyCategoryKey)
          ? parseInt(item.cdKey.slice(0, -2))
          : item.cdKey;
        const soDetails = generateSoString(item.soDetails);
        for (let g of gradeDetails) {
          let localItem = fitToTransactionItemTemplate(
            item,
            g.odDetails,
            g.osDetails,
            soDetails,
            cdKey,
            url,
            status
          );
          result.push(localItem);
        }
      }
    }
  }

  for (let item of items) {
    if (orderType == 'BULK' && isLens(item.supplyCategoryKey)) continue;
    const odDetails = generateGradeString(_.find(item.grades, { id: 'OD' }));
    const osDetails = generateGradeString(_.find(item.grades, { id: 'OS' }));
    const cdKey = isLens(item.supplyCategoryKey)
      ? parseInt(item.cdKey.slice(0, -2))
      : item.cdKey;
    const soDetails = generateSoString(item.soDetails);
    let localItem = fitToTransactionItemTemplate(
      item,
      odDetails,
      osDetails,
      soDetails,
      cdKey,
      url,
      status
    );
    result.push(localItem);
  }

  return result;
}

export function orderize(transactions) {}

export function localizeOrder(order) {
  let result = [];

  if (isBulk(order.orderType) && isLens(order.items[0].supplyCategoryKey)) {
  }

  for (let i of order.items) {
    let localItem = {
      ...i,
      ['grades']: [
        generateGradeObject(i.odDetails, 'OD'),
        generateGradeObject(i.osDetails, 'OS'),
      ],
      ['soDetails']: { ...generateSoObject(i.soDetails) },
    };
    result.push(localItem);
  }

  console.log(result);
  return result;
}

function fitToTransactionItemTemplate(
  item,
  odDetails,
  osDetails,
  soDetails,
  cdKey,
  url,
  status
) {
  return {
    additionalInstruction: item.additionalInstruction || '',
    cdKey,
    fromBranchKey: item.fromBranchKey,
    itemKey: item.itemKey,
    lensParamKey: item.lensParamKey || '',
    nonLensQty: item.nonLensQty || '0',
    nonLensUnitName: item.nonLensUnitName || '',
    odDetails,
    orderTypeKey: item.orderTypeKey,
    osDetails,
    pxName: item.pxName || '',
    rxNumber: item.rxNumber,
    size: item.size || 0,
    soDetails,
    status,
    supplyCategoryKey: item.supplyCategoryKey,
    toBranchKey: item.toBranchKey,
    typeName: item.typeName,
    userIdKey: item.userIdKey,
    attachmentUrl: url,
    itemDescription: item.itemDescription || '',
  };
}

export function generateGradeDetailObjectArray(grades) {
  let result = [];
  for (let i = 0; i < grades.length; i += 2) {
    result.push({
      odDetails: generateGradeString(grades[i]),
      osDetails: generateGradeString(grades[i + 1]),
    });
  }
  return result;
}

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

export function cleanGrades(data) {
  const items = _.filter(data, (u) => u.qty != '' || u.qty != '0');
  return items;
}
