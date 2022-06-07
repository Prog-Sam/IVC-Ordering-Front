import http from './httpService';

import { getStringifyColorId, getStringifyName } from '../utils/ColorIndex';
import { getColorDays } from './colorDayService';
import _ from 'lodash';
import ColorDay from './../components/colorDay';

export async function getLensParams() {
  const color = await getColorDays();
  const { data } = await http.get(`/lensParams`);
  let localData = [];
  _.forEach(data, (item) => {
    let localItem = { ...item };
    localItem.cdKeys = getStringifyName(item['cdKeys'], color.data);
    localData.push(localItem);
  });
  return { data: localData };
}

export async function getLensParam(id) {
  const lensParam = await http.get(`/lensParams/${id}`);
  const colorDays = await getColorDays();
  let localLensParam = { ...lensParam };

  localLensParam.data.cdKeys = getStringifyName(
    lensParam.data.cdKeys,
    colorDays.data
  );
  return localLensParam;
}

export async function saveLensParam(lensParam, colorDays) {
  let localLensParam = { ...lensParam };
  delete localLensParam['id'];

  localLensParam.cdKeys = getStringifyColorId(
    localLensParam.cdKeys,
    colorDays
  ).replace(/"/g, '');

  let lensParamInDb = await http.post(`/lensParams`, localLensParam);
  return lensParamInDb;
}

export async function updateLensParam(lensParam, colorDays) {
  let localLensParam = { ...lensParam };
  delete localLensParam['id'];

  localLensParam.cdKeys = getStringifyColorId(
    localLensParam.cdKeys,
    colorDays
  ).replace(/"/g, '');

  let lensParamInDb = await http.put(
    `/lensParams/${lensParam.id}`,
    localLensParam
  );
  return lensParamInDb;
}
