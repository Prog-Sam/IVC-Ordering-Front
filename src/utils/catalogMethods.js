import { getCatalog } from './../services/localCatalogService';
import supplyCategoryConfig from './../config/supplyCategoryConfig.json';
import { getColorName } from './ColorIndex';
import _ from 'lodash';

const catalog = getCatalog();

export function getOrderTypes(orderType) {
  const orderTypes = [...catalog.orderTypes];
  if (!orderType) return [];
  return isBulk(orderType)
    ? _.filter(orderTypes, (o) => o.id == 2)
    : _.filter(orderTypes, (o) => o.id != 2);
}

export function getItemCategories(orderType, orderPrefix = '') {
  const supplyCategories = catalog.supplyCategories;
  if (isBulk(orderType)) {
    const sc = _.filter(supplyCategories, (i) =>
      _.includes(supplyCategoryConfig[orderPrefix], i.id)
    );

    return _.map(sc, (s) => swapper(s, 'name', 'desc'));
  }
  return _.map(supplyCategories, (s) => swapper(s, 'name', 'desc'));
}

export function getBrands(itemCategory, orderType) {
  //   return catalog.brands;
  const stringCategory = whatCategory(itemCategory);
  if (stringCategory == 'LNCL') {
    const brIds = _.uniq(
      _.map(
        _.filter(catalog.lensItems, {
          orderTypeKey: orderType,
          supplyCategoryKey: itemCategory,
        }),
        (i) => i.brandKey
      )
    );

    return _.filter(catalog.brands, (i) => _.includes(brIds, i.id));
  }
  if (stringCategory == 'FSSG') {
    const brIds = _.uniq(
      _.map(
        _.filter(catalog.fsItems, { supplyCategoryKey: itemCategory }),
        (i) => i.brandKey
      )
    );
    return _.filter(catalog.brands, (i) => _.includes(brIds, i.id));
  }
  if (stringCategory == 'SA') {
    const brIds = _.uniq(
      _.map(
        _.filter(catalog.csaItems, { scKey: itemCategory }),
        (i) => i.brandKey
      )
    );
    return _.filter(catalog.brands, (i) => _.includes(brIds, i.id));
  }
  return catalog.brands;
}

export function getModels(itemCategoryKey, orderTypeKey, brandKey) {
  const stringCategory = whatCategory(itemCategoryKey);
  if (stringCategory == 'LNCL') {
    return _.filter(catalog.lensItems, {
      orderTypeKey: getOrderTypeKey(orderTypeKey),
      brandKey: brandKey,
    });
  }
  if (stringCategory == 'FSSG') {
    const items = _.filter(catalog.fsItems, { brandKey: brandKey });
    const newItems = _.map(items, (i) => {
      return {
        ...i,
        name: _.find(catalog.fscsaModels, { id: i.fsModelKey })
          .modelDescription,
      };
    });
    return newItems;
  }
  const items = _.filter(catalog.csaItems, { brandKey: brandKey });
  return _.map(items, (i) => renamer(i, 'description', 'name'));
}

export function getColorsFromBarcode(barcode, itemCategoryKey) {
  const stringCategory = whatCategory(itemCategoryKey);
  if (stringCategory == 'LNCL') {
    const item = _.find(catalog.lensParam, { id: barcode });
    return item ? getColorDays(item.cdKeys) : [];
  }
  if (stringCategory == 'FSSG') {
    const item = _.find(catalog.fsItems, { id: barcode });
    return item ? getColors([item.cdKey]) : [];
  }
  if (stringCategory == 'SA') {
    console.log('SA Called');
    const item = _.find(catalog.csaItems, { id: barcode });
    console.log(item);
    return item ? getColors([item.cdKey]) : [];
  }
  return [];
}

export function getColors(cdKeys = []) {
  if (cdKeys.length == 0)
    return _.map(catalog.colors, (c) => renamer(c, 'colorName', 'name'));
  return _.map(_.filter(catalog.colors, (c) => _.includes(cdKeys, c.id)));
}

export function getColorDays(cdKeys) {}

export function getColor(id) {
  return _.filter(catalog.colors, { id: id });
}

export function getActiveCartNumbers() {}

// Helper Methods
export function isBulk(orderType) {
  if (orderType == 'BULK') return true;
  if (orderType == 2) return true;
  return false;
}

export function getOrderTypeKey(orderType) {
  if (orderType == '3') return 3;
  return 1;
}

export function whatCategory(supplyCategory) {
  if (supplyCategory == 1 || supplyCategory == 2) return 'LNCL';
  if (supplyCategory == 3 || supplyCategory == 4) return 'FSSG';
  if (supplyCategory == 5 || supplyCategory == 6) return 'SA';
  return 'NONE';
}

export function swapper(item, from, to) {
  return { ...item, [from]: item[to], [to]: item[from] };
}

export function renamer(item, from, to) {
  let localItem = { ...item, [to]: item[from] };
  delete localItem[from];
  return localItem;
}