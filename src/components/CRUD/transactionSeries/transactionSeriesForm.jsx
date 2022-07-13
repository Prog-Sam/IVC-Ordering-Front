import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getTransactionSeries,
  saveTransactionSeries,
  updateTransactionSeries,
} from '../../../services/transactionSeriesService';
import { getTransactionTypes } from '../../../services/transactionTypeService';
import { getBranches } from '../../../services/branchService';
import { toast } from 'react-toastify';

const TransactionSeriesForm = (props) => {
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [status, setStatus] = useState([
    { name: 'ACTIVE', id: true },
    { name: 'INACTIVE', id: false },
  ]);

  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    typeKey: Joi.number().required().label('Transaction Type'),
    branchDetailKey: Joi.number().required().label('Branch'),
    from: Joi.number().label('From'),
    to: Joi.number().label('To'),
    current: Joi.number().label('Current'),
    status: Joi.boolean().label('Status'),
  };

  useEffect(() => {
    async function populateTransactionTypes() {
      let { data } = await getTransactionTypes();
      setTransactionTypes(data);
    }
    async function populateBranches() {
      let { data } = await getBranches();
      setBranches(data);
    }

    populateTransactionTypes();
    populateBranches();

    const transactionSeriesId = props.match.params.id;
    if (transactionSeriesId === 'New') return;

    async function populateTransactionSeries() {
      let { data } = await getTransactionSeries(transactionSeriesId);
      setTransactionSeries(data);
    }

    populateTransactionSeries();

    if (!transactionSeries) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveTransactionSeries(mapToViewModel(transactionSeries))
        : await updateTransactionSeries(mapToViewModel(transactionSeries));
      toast(
        `TransactionSeries ${transactionSeries.name} with the id of ${
          transactionSeries.id
        } has been ${isNew ? 'added.' : 'updated.'}`
      );
      props.history.push('/transactionSeries');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    transactionSeries,
    setTransactionSeries,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} TRANSACTION
        SERIES
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderSelect('typeKey', 'Transaction Type', transactionTypes)}
        {renderSelect('branchDetailKey', 'Branch', branches)}
        {renderInput('from', 'From')}
        {renderInput('to', 'To')}
        {renderInput('current', 'Current')}
        {renderSelect('status', 'Status', status)}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default TransactionSeriesForm;
