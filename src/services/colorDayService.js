import http from './httpService';
import config from '../config.json';

export async function getColorDays() {
  const colorDays = await http.get(`${config.apiEndpoint}/colorDays`);
  // console.log(result);
  return colorDays;
}

export async function getColorDay(id) {
  const colorDay = await http.get(`${config.apiEndpoint}/colorDays/${id}`);
  // console.log(result);
  return colorDay;
}

export async function saveColorDay(colorDay) {
  let localColorDay = { ...colorDay };
  delete localColorDay['id'];

  let colorDayInDb = await http.post(
    `${config.apiEndpoint}/colorDays`,
    localColorDay
  );
  return colorDayInDb;
}

export async function updateColorDay(colorDay) {
  let localColorDay = { ...colorDay };
  delete localColorDay['id'];

  let colorDayInDb = await http.put(
    `${config.apiEndpoint}/colorDays/${colorDay.id}`,
    localColorDay
  );
  return colorDayInDb;
}
