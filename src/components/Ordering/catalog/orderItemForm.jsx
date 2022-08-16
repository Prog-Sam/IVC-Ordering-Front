import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useCatalogForm from '../../../hooks/useCatalogForm';
import {
  getOrderItem,
  saveOrderItem,
  updateOrderItem,
  getActiveCartNumbers,
} from '../../../services/orderItemService';
import { getOrderWithCn } from '../../../services/cartService';
// import { getActiveCartNumbers } from '../../../utils/catalogMethods';
import { toast } from 'react-toastify';
import { getOrderTypes } from '../../../utils/catalogMethods';

const OrderItemForm = (props) => {
  const [order, setOrder] = useState({});
  const localEnums = {};

  const schema = {
    typeName: Joi.string().required().min(1).max(4).label('Transaction Type'),
    fromBranchKey: Joi.number().required().label('Origin Branch'),
    toBranchKey: Joi.number().required().label('Destination Branch'),
    userIdKey: Joi.number().required().label('User Id'),
    orderTypeKey: Joi.number().required().label('Order Type'),
    rxNumber: Joi.string().required().min(1).max(20).label('RX/SO/BO Number'),
    supplyCategory: Joi.number().required().label('Item Category'),
    itemKey: Joi.string().required().label('Model'),
  };

  // useEffect(() => {
  //   const orderItemId = props.match.params.id;
  //   if (orderItemId === 'New') return;

  //   // async function populateOrderItem() {
  //   //   let { data } = await getOrderItem(orderItemId);
  //   //   setOrderItem(data);
  //   // }

  //   // populateOrderItem();

  //   if (!orderItem) return props.history.replace('/not-found');

  //   return console.log('disconnect Server');
  // }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveOrderItem(mapToViewModel(orderItem))
        : await updateOrderItem(mapToViewModel(orderItem));
      toast(
        `OrderItem ${orderItem.name} with the id of ${orderItem.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/orderItems');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    orderItem,
    setOrderItem,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ] = useCatalogForm(schema, doSubmit);

  useEffect(() => {
    async function populateOrder() {
      setOrder(getOrderWithCn(orderItem.rxNumber) || {});
    }
    populateOrder();
  }, [orderItem]);

  return (
    <div>
      <h1 className='d-flex align-items-left'>CATALOG</h1>
      <form onSubmit={handleSubmit}>
        {renderSelect('rxNumber', 'RX/SO/BO Number', getActiveCartNumbers())}
        {renderSelect(
          'orderType',
          'Order Type',
          getOrderTypes(order.orderType)
        )}
        {renderSelect(
          'supplyCategoryKey',
          'Item Category',
          getActiveCartNumbers()
        )}
        {renderSelect('brandKey', 'Brand', getActiveCartNumbers())}
        {renderSelect('itemKey', 'Model', getActiveCartNumbers())}
      </form>
    </div>
  );
};

export default OrderItemForm;
