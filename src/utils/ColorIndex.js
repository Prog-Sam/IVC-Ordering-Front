import _ from 'lodash';
import { formatter } from './formatter';
import { toast } from 'react-toastify';

export function getColorName(code, colors) {
  const colorCode = code.slice(0, 4);
  const days = code.slice(4, 6);
  const color = _.find(colors, { id: Number(colorCode) }).colorName;
  return color + days;
}

export function getColorId(name, colors) {
  const colorName = name.slice(0, -2);
  const days = name.slice(colorName.length, name.length);
  const colorCode = _.find(colors, { colorName: colorName }).id;
  return formatter(colorCode.toString(), '0000') + days;
}

export function getStringifyName(cdKeys, colors) {
  const stringKeys = JSON.parse(formatJSON(cdKeys));
  let stringNames = [];
  for (let key of stringKeys) {
    stringNames.push(getColorName(key, colors));
  }
  return JSON.stringify(stringNames);
}

function formatJSON(cdKeys) {
  if (!cdKeys.includes(',')) {
    return `["${cdKeys.slice(1, 7)}"]`;
  }
  let cdKeyArray = cdKeys.replace('[', '').replace(']', '').split(',');
  let newString = '';
  for (let item of cdKeyArray) {
    newString += `"${item}",`;
  }
  return `[${newString}]`.replace(',]', ']');
}

export function getStringifyColorId(cdNames, colors) {
  const stringNames = JSON.parse(cdNames);
  let stringKeys = [];
  for (let name of stringNames) {
    stringKeys.push(getColorId(name, colors));
  }
  return JSON.stringify(stringKeys);
}

export function handleColor(sign, list, colorDay = {}) {
  let localList = list;
  if (sign === '-') {
    if (localList.length > 0) {
      localList.pop();
      toast.error('Item has been Removed');
      return localList;
    }
    toast.error('No items to remove!');
    return localList;
  }

  if (localList.length == 20) {
    toast.error('Item List already full');
    return localList;
  }
  if (!duplicateColor(colorDay, list)) {
    localList.push(colorDay);
    toast('Item has been Added');
    return localList;
  }
  toast.error('Item already in the list');
  return localList;
}

function duplicateColor(colorDay, list) {
  return _.includes(list, colorDay);
}
