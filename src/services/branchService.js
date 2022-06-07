import http from './httpService';

export async function getBranches() {
  const branches = await http.get(`/branchDetails`);
  // console.log(result);
  return branches;
}

export async function getBranch(id) {
  const branch = await http.get(`/branchDetails/${id}`);
  // console.log(result);
  return branch;
}

export async function saveBranch(branch) {
  let localBranch = { ...branch };
  delete localBranch['id'];

  let branchInDb = await http.post(`/branchDetails`, localBranch);
  return branchInDb;
}

export async function updateBranch(branch) {
  let localBranch = { ...branch };
  delete localBranch['id'];

  let branchInDb = await http.put(`/branchDetails/${branch.id}`, localBranch);
  return branchInDb;
}
