import http from './httpService';
import config from './../config.json';

export async function getBranches() {
  const branches = await http.get(`${config.apiEndpoint}/branchDetails`);
  // console.log(result);
  return branches;
}

export async function getBranch(id) {
  const branch = await http.get(`${config.apiEndpoint}/branchDetails/${id}`);
  // console.log(result);
  return branch;
}
