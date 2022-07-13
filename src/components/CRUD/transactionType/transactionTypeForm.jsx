import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getTransactionType,
  saveTransactionType,
  updateTransactionType,
} from '../../../services/transactionTypeService';
import { toast } from 'react-toastify';

const TransactionTypeForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(4).label('Name'),
    desc: Joi.string().required().min(1).max(30).label('Description'),
    sign: Joi.string().required().max(1).label('Sign'),
  };

  useEffect(() => {
    const transactionTypeId = props.match.params.id;
    if (transactionTypeId === 'New') return;

    async function populateTransactionType() {
      let { data } = await getTransactionType(transactionTypeId);
      setTransactionType(data);
    }

    populateTransactionType();

    if (!transactionType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveTransactionType(mapToViewModel(transactionType))
        : await updateTransactionType(mapToViewModel(transactionType));
      toast(
        `TransactionType ${transactionType.name} with the id of ${
          transactionType.id
        } has been ${isNew ? 'added.' : 'updated.'}`
      );
      props.history.push('/transactionTypes');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    transactionType,
    setTransactionType,
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
        TYPE
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderInput('desc', 'Description')}
        {renderSelect('sign', 'Sign', [
          { id: '+', name: '+' },
          { id: '-', name: '-' },
        ])}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default TransactionTypeForm;
