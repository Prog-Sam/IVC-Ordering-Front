import http from './httpService';
import config from '../config.json';

export async function getTransactionTypes() {
  const transactionTypes = await http.get(
    `${config.apiEndpoint}/transactionTypes`
  );
  // console.log(result);
  return transactionTypes;
}

export async function getTransactionType(id) {
  const transactionType = await http.get(
    `${config.apiEndpoint}/transactionTypes/${id}`
  );
  // console.log(result);
  return transactionType;
}

export async function saveTransactionType(transactionType) {
  let localTransactionType = { ...transactionType };
  delete localTransactionType['id'];

  let transactionTypeInDb = await http.post(
    `${config.apiEndpoint}/transactionTypes`,
    localTransactionType
  );
  return transactionTypeInDb;
}

export async function updateTransactionType(transactionType) {
  let localTransactionType = { ...transactionType };
  delete localTransactionType['id'];

  let transactionTypeInDb = await http.put(
    `${config.apiEndpoint}/transactionTypes/${transactionType.id}`,
    localTransactionType
  );
  return transactionTypeInDb;
}
