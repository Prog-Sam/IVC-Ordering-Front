import http from './httpService';

export async function getTransactionTypes() {
  const transactionTypes = await http.get(`/transactionTypes`);
  // console.log(result);
  return transactionTypes;
}

export async function getTransactionType(id) {
  const transactionType = await http.get(`/transactionTypes/${id}`);
  // console.log(result);
  return transactionType;
}

export async function saveTransactionType(transactionType) {
  let localTransactionType = { ...transactionType };
  delete localTransactionType['id'];

  let transactionTypeInDb = await http.post(
    `/transactionTypes`,
    localTransactionType
  );
  return transactionTypeInDb;
}

export async function updateTransactionType(transactionType) {
  let localTransactionType = { ...transactionType };
  delete localTransactionType['id'];

  let transactionTypeInDb = await http.put(
    `/transactionTypes/${transactionType.id}`,
    localTransactionType
  );
  return transactionTypeInDb;
}
