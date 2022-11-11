import { getCatalog } from './../services/localCatalogService';
import supplyCategoryConfig from './../config/supplyCategoryConfig.json';
import { formatJSON, destructureCdKey } from './ColorIndex';
import _ from 'lodash';

const catalog = getCatalog();

export function getOrderTypes(orderType) {
  const orderTypes = [...catalog.orderTypes];
  if (!orderType) return [];
  return isBulk(orderType)
    ? _.filter(orderTypes, (o) => o.id == 2)
    : _.filter(orderTypes, (o) => o.id != 2);
}

export function getAllOrderTypes() {
  if (!catalog) return [];
  return _.map(catalog.orderTypes, (o) => swapper(o, 'name', 'typeDesc') || []);
}

export function getOrderTypeString(id) {
  if (id == 1) return 'JOB ORDER';
  if (id == 2) return 'BULK';
  return 'SPECIAL ORDER';
}

export function getItemCategories(orderType, orderPrefix = '') {
  // console.log(orderType);
  // console.log(orderPrefix);
  const supplyCategories = catalog.supplyCategories;
  // console.log(supplyCategories);
  if (isBulk(orderType)) {
    const sc = _.filter(supplyCategories, (i) =>
      _.includes(supplyCategoryConfig[orderPrefix], i.id)
    );
    // console.log(sc);
    return _.map(sc, (s) => swapper(s, 'name', 'desc'));
  }
  return _.map(supplyCategories, (s) => swapper(s, 'name', 'desc'));
}

export function getBrands(itemCategory, orderType) {
  if (!catalog) return [];
  const stringCategory = whatCategory(itemCategory);
  if (stringCategory == 'LNCL') {
    const brIds = _.uniq(
      _.map(
        _.filter(catalog.lensItems, {
          orderTypeKey: getOrderTypeKey(orderType),
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
  if (!catalog) return [];
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

export function getNoBrandModels(itemCategoryKey, orderTypeKey) {
  if (!catalog) return [];
  const stringCategory = whatCategory(itemCategoryKey);
  if (stringCategory == 'LNCL') {
    return _.filter(catalog.lensItems, {
      orderTypeKey: getOrderTypeKey(orderTypeKey),
    });
  }
  if (stringCategory == 'FSSG') {
    const items = [...catalog.fsItems];
    const newItems = _.map(items, (i) => {
      return {
        ...i,
        name: _.find(catalog.fscsaModels, { id: i.fsModelKey })
          .modelDescription,
      };
    });
    return newItems;
  }
  const items = [...catalog.csaItems];
  return _.map(items, (i) => renamer(i, 'description', 'name'));
}

export function getModel(itemCategoryKey, orderTypeKey, itemKey) {
  const models = getNoBrandModels(itemCategoryKey, orderTypeKey);
  return _.find(models, { id: itemKey });
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
    const item = _.find(catalog.csaItems, { id: barcode });
    return item ? getColors([item.cdKey]) : [];
  }
  return [];
}

export function getColors(cdKeys = []) {
  if (cdKeys.length == 0)
    return _.map(catalog.colors, (c) => renamer(c, 'colorName', 'name'));
  return _.map(_.filter(catalog.colors, (c) => _.includes(cdKeys, c.id)));
}

export function getColorDays(lpKey) {
  const lensParam = getLensParam(lpKey);
  if (!lensParam) return [];
  const cdKeys = JSON.parse(formatJSON(lensParam.cdKeys));

  return _.map(cdKeys, (c) => {
    const destructuredKey = destructureCdKey(c);
    const color = getColor(destructuredKey.key);
    return { id: c, name: `${color.colorName} - ${destructuredKey.days} days` };
  });
}

export function getColor(id) {
  return _.find(catalog.colors, { id: id });
}

export function getLensParams(lensItemKey) {
  let lensParams = _.filter(catalog.lensParam, {
    lensItemKey: lensItemKey || '',
  });
  return _.map(lensParams, (l) => {
    return addLpName(l);
  });
}

export function getLensParam(id) {
  return _.find(catalog.lensParam, { id: id });
}

export function getFrameTypes() {
  let frameTypes = _.filter(catalog.generalEnums, { type: 1 });
  return _.map(frameTypes, (f) => {
    return renamer(f, 'desc', 'name');
  });
}

export function getFrameShapes() {
  let frameShapes = _.filter(catalog.generalEnums, { type: 0 });
  return _.map(frameShapes, (f) => {
    return renamer(f, 'desc', 'name');
  });
}

export function addNewGrade(grades) {
  let localGrades = [...grades];
  let idArray = generateIdArray(localGrades);
  let emptyGrade = {
    id: generateNewGradeId(idArray),
    sph: '',
    cyl: '',
    axis: '',
    add: '',
    pd: '',
    qty: '',
  };
  localGrades.push(emptyGrade);
  return localGrades;
}

export function generateIdArray(items) {
  return _.map(items, (i) => parseInt(i.id)) || [];
}

export function getActiveCartNumbers() {}

// Helper Methods
export function isBulk(orderType) {
  if (orderType == 'BULK') return true;
  if (orderType == 'BULK ORDER') return true;
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

export function addLpName(item) {
  const {
    minSph,
    maxSph,
    minCyl,
    maxCyl,
    minAdd,
    maxAdd,
    fitting,
    totalPower,
  } = item;
  let localItem = {
    ...item,
    ['name']: `${minSph}  ${maxSph}|${minCyl}  ${maxCyl}|${minAdd}  ${maxAdd}|${fitting}|${totalPower}`,
  };
  return localItem;
}

export function generateNewGradeId(gradeArray) {
  if (gradeArray.length < 1) return 1;
  let localGradeArray = _.sortBy([...gradeArray]);
  return localGradeArray[localGradeArray.length - 1] + 1;
}
