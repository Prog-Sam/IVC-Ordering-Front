import http from './httpService';
import config from '../config.json';

export async function getUnits() {
  const units = await http.get(`${config.apiEndpoint}/units`);
  // console.log(result);
  return units;
}

export async function getUnit(id) {
  const unit = await http.get(`${config.apiEndpoint}/units/${id}`);
  // console.log(result);
  return unit;
}

export async function saveUnit(unit) {
  let localUnit = { ...unit };
  delete localUnit['id'];

  let unitInDb = await http.post(`${config.apiEndpoint}/units`, localUnit);
  return unitInDb;
}

export async function updateUnit(unit) {
  let localUnit = { ...unit };
  delete localUnit['id'];

  let unitInDb = await http.put(
    `${config.apiEndpoint}/units/${unit.id}`,
    localUnit
  );
  return unitInDb;
}
