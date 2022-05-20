import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import {
  getOrderType,
  saveOrderType,
  updateOrderType,
} from '../services/orderTypeService';
import { toast } from 'react-toastify';

const OrderTypeForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(2).label('Name'),
    typeDesc: Joi.string().required().min(1).max(20).label('Description'),
  };

  useEffect(() => {
    const orderTypeId = props.match.params.id;
    if (orderTypeId === 'New') return;

    async function populateOrderType() {
      let { data } = await getOrderType(orderTypeId);
      setOrderType(data);
    }

    populateOrderType();

    if (!orderType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveOrderType(mapToViewModel(orderType))
        : await updateOrderType(mapToViewModel(orderType));
      toast(
        `OrderType ${orderType.name} with the id of ${orderType.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/orderTypes');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    orderType,
    setOrderType,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} ORDER TYPE
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderInput('typeDesc', 'Description')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default OrderTypeForm;
