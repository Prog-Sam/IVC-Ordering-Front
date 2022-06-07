import http from './httpService';

export async function getColorDays() {
  const colorDays = await http.get(`/colorDays`);
  // console.log(result);
  return colorDays;
}

export async function getColorDay(id) {
  const colorDay = await http.get(`/colorDays/${id}`);
  // console.log(result);
  return colorDay;
}

export async function saveColorDay(colorDay) {
  let localColorDay = { ...colorDay };
  delete localColorDay['id'];

  let colorDayInDb = await http.post(`/colorDays`, localColorDay);
  return colorDayInDb;
}

export async function updateColorDay(colorDay) {
  let localColorDay = { ...colorDay };
  delete localColorDay['id'];

  let colorDayInDb = await http.put(`/colorDays/${colorDay.id}`, localColorDay);
  return colorDayInDb;
}
