import http from './httpService';
import config from './../config.json';

export async function getBranchTypes() {
  const branches = await http.get(`${config.apiEndpoint}/branchTypes`);
  return branches;
}

export async function getBranchType(id) {
  const branchType = await http.get(`${config.apiEndpoint}/branchTypes/${id}`);
  return branchType;
}

export async function saveBranchType(branchType) {
  let localBranchType = { ...branchType };
  delete localBranchType['id'];

  let branchTypeInDb = await http.post(
    `${config.apiEndpoint}/branchTypes`,
    localBranchType
  );
  return branchTypeInDb;
}

export async function updateBranchType(branchType) {
  let localBranchType = { ...branchType };
  delete localBranchType['id'];

  let branchTypeInDb = await http.put(
    `${config.apiEndpoint}/branchTypes/${branchType.id}`,
    localBranchType
  );
  return branchTypeInDb;
}
