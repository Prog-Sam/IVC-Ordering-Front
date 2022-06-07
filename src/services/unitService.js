import http from './httpService';

export async function getUnits() {
  const units = await http.get(`/units`);
  // console.log(result);
  return units;
}

export async function getUnit(id) {
  const unit = await http.get(`/units/${id}`);
  // console.log(result);
  return unit;
}

export async function saveUnit(unit) {
  let localUnit = { ...unit };
  delete localUnit['id'];

  let unitInDb = await http.post(`/units`, localUnit);
  return unitInDb;
}

export async function updateUnit(unit) {
  let localUnit = { ...unit };
  delete localUnit['id'];

  let unitInDb = await http.put(`/units/${unit.id}`, localUnit);
  return unitInDb;
}
