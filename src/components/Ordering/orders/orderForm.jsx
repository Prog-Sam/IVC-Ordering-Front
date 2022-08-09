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
      { id: 'NON-BULK', name: 'NON-BULK' },
    ],
  };
  let isNew = props.match.params.id === 'New';
  const schema = {
    id: Joi.number().label('ID'),
    orderType: Joi.string().required().label('ORDER TYPE'),
    cartNumber: Joi.string().required().min(1).max(20).label('RX/BO/SO NUMBER'),
    url: Joi.string().required().label('GOOGLE DRIVE URL'),
  };

  const cartContext = useContext(CartContext);

  useEffect(() => {
    const orderId = props.match.params.id;
    if (orderId === 'New') return;

    function populateOrder() {
      let orderInDb = getOrder(orderId);
      setOrder(orderInDb);
    }

    populateOrder();
    if (!order) return props.history.replace('/not-found');

    return console.log('disconnect Store');
  }, []);

  const doSubmit = async () => {
    // try {
    //   const isNew = props.match.params.id === 'New';
    //   const result = isNew
    //     ? await addOrder(mapToViewModel(order))
    //     : await updateOrder(mapToViewModel(order));
    //   toast(
    //     `Order ${order.name} with the id of ${order.id} has been ${
    //       isNew ? 'added.' : 'updated.'
    //     }`
    //   );
    //   props.history.push('/orders');
    // } catch (e) {
    //   console.error(e);
    //   toast(e);
    // }

    try {
      const isNew = props.match.params.id === 'New';
      const duplicated = await isDuplicate(order, getCurrentUser().branchKey);
      if (duplicated) {
        toast.error(
          `RX/SO/BO Number already exists on the ${duplicated.location}`
        );
        return;
      }
      let localOrder = { ...order, items: [] };
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
        {renderRxField('cartNumber', 'RX/BO/SO Number')}
        {renderFilePicker('url', 'Google Drive URL')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default OrderForm;
