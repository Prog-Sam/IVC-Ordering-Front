import React, { useEffect, useContext } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getOrder,
  addOrder,
  updateOrder,
  isDuplicate,
  getCart,
  getOrdersCount,
} from '../../../services/cartService';
import { getCurrentUser } from './../../../services/authService';
import { toast } from 'react-toastify';
import CartContext from './../../../context/cartContext';

const OrderForm = (props) => {
  const localEnums = {
    orderType: [
      { id: 'BULK', name: 'BULK' },
      { id: 'JOB ORDER', name: 'JOB ORDER' },
      { id: 'SPECIAL ORDER', name: 'SPECIAL ORDER' },
    ],
  };
  let isNew = props.match.params.id === 'New';
  const schema = {
    id: Joi.string().label('ID'),
    orderType: Joi.string().required().label('ORDER TYPE'),
    cartNumber: Joi.string().required().min(1).max(20).label('RX/BO/SO NUMBER'),
    url: Joi.string().required().label('GOOGLE DRIVE URL'),
  };

  const cartContext = useContext(CartContext);

  useEffect(() => {
    const orderId = props.match.params.id;
    if (orderId === 'New') return;

    async function populateOrder() {
      let orderInDb = await getOrder(orderId);
      setOrder(orderInDb);
    }

    populateOrder();
    if (!order) return props.history.replace('/not-found');

    return console.log('disconnect Store');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const duplicated = await isDuplicate(
        addNonBulkRxPrefix(order),
        getCurrentUser().branchKey
      );
      if (duplicated && isNew) {
        toast.error(
          `RX/SO/BO Number already exists on the ${duplicated.location}`
        );
        return;
      }
      if (isNew && order.orderType == 'BULK') {
        if (order.objectValcartNumber.value == '') {
          toast.error('Please Add Bulk Order Prefix for BO Number.');
          return;
        }
        if (order.cartNumber.length < 2) {
          toast.error('Please Add Bulk Order Suffix for BO Number.');
        }
      }
      let localOrder = { ...addNonBulkRxPrefix(order), items: [] };

      const result = isNew
        ? await addOrder(localOrder)
        : await updateOrder(localOrder);

      toast(`Order Has been added to Cart`);
      cartContext.setOrdersCount(getOrdersCount());
      props.history.push('/orders');
    } catch (e) {
      console.error(e);
      toast.error('Order Failed');
    }
  };

  function addNonBulkRxPrefix(order) {
    let localOrder = { ...order };
    if (order.orderType == 'JOB ORDER')
      localOrder.cartNumber = 'J' + order.cartNumber;
    if (order.orderType == 'SPECIAL ORDER')
      localOrder.cartNumber = 'S' + order.cartNumber;
    return localOrder;
  }

  const [
    order,
    setOrder,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
    renderColorDaySelector,
    renderRxField,
    renderFilePicker,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'NEW' : 'UPDATE'} ORDER
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderSelect('orderType', 'Order Type', localEnums.orderType, !isNew)}
        {!isNew && renderInput('cartNumber', 'RX/BO/SO Number', 'text', !isNew)}
        {isNew && renderRxField('cartNumber', 'RX/BO/SO Number')}
        {renderFilePicker('url', 'Google Drive URL')}
        {renderButton(isNew ? 'Submit' : 'Update')}
      </form>
    </div>
  );
};

export default OrderForm;
