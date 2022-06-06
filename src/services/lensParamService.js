import http from './httpService';
import config from '../config.json';

export async function getLensParams() {
  const lensParams = await http.get(`${config.apiEndpoint}/lensParams`);
  // console.log(result);
  return lensParams;
}

export async function getLensParam(id) {
  const lensParam = await http.get(`${config.apiEndpoint}/lensParams/${id}`);
  // console.log(result);
  return lensParam;
}

export async function saveLensParam(lensParam) {
  let localLensParam = { ...lensParam };
  delete localLensParam['id'];

  let lensParamInDb = await http.post(
    `${config.apiEndpoint}/lensParams`,
    localLensParam
  );
  return lensParamInDb;
}

export async function updateLensParam(lensParam) {
  let localLensParam = { ...lensParam };
  delete localLensParam['id'];

  let lensParamInDb = await http.put(
    `${config.apiEndpoint}/lensParams/${lensParam.id}`,
    localLensParam
  );
  return lensParamInDb;
}
