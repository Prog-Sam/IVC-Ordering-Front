import http from './httpService';

export async function getTransactionSeriess() {
  const transactionSeriess = await http.get(`/transactionSeries`);
  // console.log(result);
  return transactionSeriess;
}

export async function getTransactionSeries(id) {
  const transactionSeries = await http.get(`/transactionSeries/${id}`);
  // console.log(result);
  return transactionSeries;
}

export async function saveTransactionSeries(transactionSeries) {
  let localTransactionSeries = { ...transactionSeries };
  delete localTransactionSeries['id'];

  let transactionSeriesInDb = await http.post(
    `/transactionSeries`,
    localTransactionSeries
  );
  return transactionSeriesInDb;
}

export async function updateTransactionSeries(transactionSeries) {
  let localTransactionSeries = { ...transactionSeries };
  delete localTransactionSeries['id'];

  let transactionSeriesInDb = await http.put(
    `/transactionSeries/${transactionSeries.id}`,
    localTransactionSeries
  );
  return transactionSeriesInDb;
}
