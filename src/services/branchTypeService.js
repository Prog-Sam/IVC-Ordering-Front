import http from './httpService';

export async function getBranchTypes() {
  const branches = await http.get(`/branchTypes`);
  return branches;
}

export async function getBranchType(id) {
  const branchType = await http.get(`/branchTypes/${id}`);
  return branchType;
}

export async function saveBranchType(branchType) {
  let localBranchType = { ...branchType };
  delete localBranchType['id'];

  let branchTypeInDb = await http.post(`/branchTypes`, localBranchType);
  return branchTypeInDb;
}

export async function updateBranchType(branchType) {
  let localBranchType = { ...branchType };
  delete localBranchType['id'];

  let branchTypeInDb = await http.put(
    `/branchTypes/${branchType.id}`,
    localBranchType
  );
  return branchTypeInDb;
}
