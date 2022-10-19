import _ from 'lodash';
import {
  generateGradeObject,
  generateGradeString,
  generateSoObject,
  generateSoString,
} from './gradeMethods';
import { isLens } from './../services/orderItemService';
import {
  generateNewGradeId,
  getNoBrandModels,
  isBulk,
  getModel,
  generateIdArray,
} from './catalogMethods';

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
    const orderItemArray = extractOrderItems(order.items);
    for (let orderItem of orderItemArray) {
      let idArray = _.map(result, (g) => parseInt(g.id)) || [];
      const items = _.filter(order.items, { ...orderItem });
      let localItem = {
        ...items[0],
        ['id']: generateNewGradeId(idArray),
        ['soDetails']: { ...generateSoObject(orderItem.soDetails) },
        ['grades']: generateBulkGradeObjects(items),
        ['brandKey']: getModel(
          items[0].supplyCategoryKey,
          items[0].orderTypeKey,
          items[0].itemKey
        ).brandKey,
      };
      result.push(localItem);
    }
    return { ...order, ['items']: result };
  }

  for (let i of order.items) {
    let idArray = _.map(result, (g) => parseInt(g.id)) || [];
    let localItem = {
      ...i,
      ['id']: generateNewGradeId(idArray),
      ['grades']: [
        generateGradeObject(i.odDetails, 'OD'),
        generateGradeObject(i.osDetails, 'OS'),
      ],
      ['soDetails']: { ...generateSoObject(i.soDetails) },
      ['brandKey']: getModel(i.supplyCategoryKey, i.orderTypeKey, i.itemKey)
        .brandKey,
    };
    result.push(localItem);
  }

  return { ...order, ['items']: result };
}

export function localizeOrders(orders) {
  return _.map(orders, (o) => localizeOrder(o));
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

export function extractOrderItems(items) {
  return _.uniqWith(
    _.map(items, (i) => ({
      itemKey: i.itemKey,
      itemDescription: i.itemDescription,
      lensParamKey: i.lensParamKey,
      cdKey: i.cdKey,
      additionalInstruction: i.additionalInstruction,
    })),
    _.isEqual
  );
}

export function generateBulkGradeObjects(grades) {
  let result = [];
  const gradeStringArray = _.map(grades, (i) => ({
    odDetails: i.odDetails,
    osDetails: i.osDetails,
  }));
  for (let i of gradeStringArray) {
    if (i.odDetails != '0|0|0|0|0|0' && i.odDetails != '|||||') {
      result.push(
        generateGradeObject(
          i.odDetails,
          generateNewGradeId(generateIdArray(result))
        )
      );
    }
    if (i.osDetails != '0|0|0|0|0|0' && i.osDetails != '|||||') {
      result.push(
        generateGradeObject(
          i.osDetails,
          generateNewGradeId(generateIdArray(result))
        )
      );
    }
  }
  return result;
}
