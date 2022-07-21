function saveObject(key, val) {
  const jsonString = JSON.stringify(val);
  localStorage.setItem(key, jsonString);
  return val;
}

function getObject(key) {
  const jsonString = localStorage.getItem(key);
  return JSON.parse(jsonString);
}

function updateObject(key, val) {
  const jsonString = JSON.stringify(val);
  const oldVal = JSON.parse(localStorage.getItem(key));
  localStorage.setItem(key, jsonString);
  return oldVal;
}

function removeObject(key) {
  const jsonString = localStorage.getItem(key);
  localStorage.removeItem(key);
  return JSON.parse(jsonString);
}

function save(key, val) {
  localStorage.setItem(key, val);
  return val;
}

function get(key) {
  return localStorage.getItem(key);
}

function remove(key) {
  const item = localStorage.getItem(key);
  localStorage.removeItem(key);
  return item;
}

export default {
  saveObject,
  getObject,
  updateObject,
  removeObject,
  save,
  get,
  remove,
};
