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
import {
  getItemCategories,
  getBrands,
  getModels,
  isBulk,
  getColorsFromBarcode,
  getColorDays,
} from '../../../utils/catalogMethods';
import { toast } from 'react-toastify';
import { getOrderTypes } from '../../../utils/catalogMethods';
import { isDuplicate } from './../../../services/orderItemService';
import { getLensParams } from './../../../utils/catalogMethods';

const OrderItemForm = (props) => {
  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const localEnums = {};

  const schema = {
    typeName: Joi.string().required().min(1).max(4).label('Transaction Type'),
    fromBranchKey: Joi.number().required().label('Origin Branch'),
    toBranchKey: Joi.number().required().label('Destination Branch'),
    userIdKey: Joi.number().required().label('User Id'),
    orderTypeKey: Joi.number().required().label('Order Type'),
    rxNumber: Joi.string().required().min(1).max(20).label('RX/SO/BO Number'),
    supplyCategoryKey: Joi.number().required().label('Item Category'),
    itemKey: Joi.string().required().label('Model'),
  };

  useEffect(() => {
    const orderItemId = props.match.params.id;
    console.log(orderItemId);
    if (orderItemId === 'New') {
      setItems([
        {
          id: 'OD',
          lensParamKey: '',
          lensItemKey: '',
          cdKey: '',
          sph: '',
          cyl: '',
          axis: '',
          add: '',
          pd: '',
          qty: '',
        },
        {
          id: 'OS',
          lensParamKey: '',
          lensItemKey: '',
          cdKey: '',
          sph: '',
          cyl: '',
          axis: '',
          add: '',
          pd: '',
          qty: '',
        },
      ]);
    }

    // async function populateOrderItem() {
    //   let { data } = await getOrderItem(orderItemId);
    //   setOrderItem(data);
    // }

    // populateOrderItem();

    if (!orderItem) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    // try {
    //   const isNew = props.match.params.id === 'New';
    //   const result = isNew
    //     ? await saveOrderItem(mapToViewModel(orderItem))
    //     : await updateOrderItem(mapToViewModel(orderItem));
    //   toast(
    //     `OrderItem ${orderItem.name} with the id of ${orderItem.id} has been ${
    //       isNew ? 'added.' : 'updated.'
    //     }`
    //   );
    //   props.history.push('/orderItems');
    // } catch (e) {
    //   console.error(e);
    //   toast(e);
    // }
    console.log(orderItem);

    if (orderItem.supplyCategoryKey != 1 && orderItem.supplyCategoryKey != 2) {
      // saveOrderItem(order.id, orderItem);
      console.log(isDuplicate(order.id, orderItem.itemDescription));
      toast('Item Added to Cart...');
    }
    return console.log('Lens');
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
    renderColorDaySelector,
    renderRxField,
    renderFilePicker,
    renderGradeDetails,
  ] = useCatalogForm(schema, doSubmit);

  useEffect(() => {
    async function populateOrder() {
      setOrder((await getOrderWithCn(orderItem.rxNumber)) || {});
    }
    populateOrder();
    console.log(orderItem);
  }, [orderItem]);

  return (
    <div>
      <h1 className='d-flex align-items-left'>CATALOG</h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('Google Drive URL', order.url || 'NONE')}
        {renderSelect('rxNumber', 'RX/SO/BO Number', getActiveCartNumbers())}
        {renderSelect(
          'orderTypeKey',
          'Order Type',
          getOrderTypes(order.orderType)
        )}
        {renderSelect(
          'supplyCategoryKey',
          'Item Category',
          !order.orderType
            ? []
            : order.orderType == 'BULK'
            ? getItemCategories(
                order.orderType,
                order.objectValcartNumber.value
              )
            : getItemCategories(order.orderType)
        )}
        {renderSelect(
          'brandKey',
          'Brand',
          getBrands(orderItem.supplyCategoryKey, orderItem.orderTypeKey)
        )}
        {renderSelect(
          'itemKey',
          'Model',
          getModels(
            orderItem.supplyCategoryKey,
            orderItem.orderTypeKey,
            orderItem.brandKey
          )
        )}
        {renderInput('itemDescription', 'Item Description')}
        {orderItem.supplyCategoryKey != 1 &&
          orderItem.supplyCategoryKey != 2 &&
          renderSelect(
            'cdKey',
            'Color',
            getColorsFromBarcode(orderItem.itemKey, orderItem.supplyCategoryKey)
          )}
        {orderItem.supplyCategoryKey != 1 &&
          orderItem.supplyCategoryKey != 2 &&
          renderInput('nonLensQty', 'Non Lens Quantity')}
        {orderItem.supplyCategoryKey != 1 &&
          orderItem.supplyCategoryKey != 2 &&
          renderInput('additionalInstruction', 'Additional Instruction')}
        {/* Add here Middle Part */}
        {renderSelect(
          'lensParamKey',
          'Lens Parameters [SPH|CYL|ADD|FITTING|TOTAL POWER]',
          getLensParams(orderItem.itemKey)
        )}
        {orderItem.lensParamKey &&
          renderSelect(
            'colorDay',
            'Color - Day',
            getColorDays(orderItem.lensParamKey)
          )}
        {renderGradeDetails('grades', orderItem.orderTypeKey)}
        {order.orderType &&
          order.orderType != 'BULK' &&
          renderInput('pxName', 'Patient Name')}
        {renderButton('Add to Cart')}
      </form>
    </div>
  );
};

export default OrderItemForm;
