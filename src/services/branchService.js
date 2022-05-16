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

export async function saveBranch(branch) {
  let localBranch = { ...branch };
  delete localBranch['id'];

  let branchInDb = await http.post(
    `${config.apiEndpoint}/branchDetails`,
    localBranch
  );
  return branchInDb;
}

export async function updateBranch(branch) {
  let localBranch = { ...branch };
  delete localBranch['id'];

  let branchInDb = await http.put(
    `${config.apiEndpoint}/branchDetails/${branch.id}`,
    localBranch
  );
  return branchInDb;
}
