import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useCatalogForm from '../../../hooks/useCatalogForm';
import {
  getOrderItem,
  saveOrderItem,
  updateOrderItem,
  getActiveCartNumbers,
  getItem,
} from '../../../services/orderItemService';
import { getOrderWithCn } from '../../../services/cartService';
import {
  getItemCategories,
  getBrands,
  getModels,
  getColors,
} from '../../../utils/catalogMethods';
import { toast } from 'react-toastify';
import { getAllOrderTypes } from '../../../utils/catalogMethods';
import { isLens } from './../../../services/orderItemService';
import { getLensParams } from './../../../utils/catalogMethods';
import { Link } from 'react-router-dom';

const StatusItemForm = (props) => {
  const [order, setOrder] = useState({});
  const localEnums = {};
  const propId = props.match.params.id;
  let orderId = '';
  let orderItemId = '';
  let isNew = propId == 'New';

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
    if (propId === 'New') return;
    orderId = propId.split('|')[0];
    orderItemId = propId.split('|')[1];

    async function populateOrderItem() {
      let data = await getItem(orderId, orderItemId, true);
      setOrderItem(data);
    }

    populateOrderItem();

    if (!orderItem) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    console.log(orderItem);
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
    renderSoDetails,
  ] = useCatalogForm(schema, doSubmit, {}, {}, true);

  useEffect(() => {
    async function populateOrder() {
      setOrder((await getOrderWithCn(orderItem.rxNumber, true)) || {});
    }
    populateOrder();
  }, [orderItem]);

  useEffect(() => {
    const initialGrade =
      orderItem.orderTypeKey != 2
        ? [
            {
              id: 'OD',
              sph: '',
              cyl: '',
              axis: '',
              add: '',
              pd: '',
              qty: '',
            },
            {
              id: 'OS',
              sph: '',
              cyl: '',
              axis: '',
              add: '',
              pd: '',
              qty: '',
            },
          ]
        : [];

    if (propId == 'New' && isLens(orderItem.supplyCategoryKey)) {
      setOrderItem({ ...orderItem, ['grades']: initialGrade });
    }
  }, [orderItem.orderTypeKey]);

  // useEffect(() => {
  //   let localOrderTypeKey = 0;
  //   if (order.orderType == 'BULK') localOrderTypeKey = 2;
  //   if (order.orderType == 'JOB ORDER') localOrderTypeKey = 1;
  //   if (order.orderType == 'SPECIAL ORDER') localOrderTypeKey = 3;

  //   setOrderItem({ ...orderItem, ['orderTypeKey']: localOrderTypeKey });
  //   console.log('Here');
  // }, [orderItem.rxNumber]);

  return (
    <div>
      <h1 className='d-flex align-items-left'>ITEM VIEWER</h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('Google Drive URL', order.url || 'NONE')}
        {renderSelect(
          'rxNumber',
          'RX/SO/BO Number',
          getActiveCartNumbers(true),
          !isNew
        )}
        {renderSelect('orderTypeKey', 'Order Type', getAllOrderTypes(), true)}
        {renderSelect(
          'supplyCategoryKey',
          'Item Category',
          getItemCategories(1),
          true
        )}
        {renderSelect(
          'brandKey',
          'Brand',
          getBrands(orderItem.supplyCategoryKey, orderItem.orderTypeKey),
          TextTrackCueList
        )}
        {renderSelect(
          'itemKey',
          'Model',
          getModels(
            orderItem.supplyCategoryKey,
            orderItem.orderTypeKey,
            orderItem.brandKey
          ),
          true
        )}
        {renderInput('itemDescription', 'Item Description', 'text', true)}
        {renderSelect('cdKey', 'Color', getColors([]), true)}
        {!isLens(orderItem.supplyCategoryKey) &&
          renderInput('nonLensQty', 'Non Lens Quantity', 'text', true)}
        {/* Add here Middle Part */}
        {isLens(orderItem.supplyCategoryKey) &&
          renderSelect(
            'lensParamKey',
            'Lens Parameters [SPH|CYL|ADD|FITTING|TOTAL POWER]',
            getLensParams(orderItem.itemKey),
            true
          )}
        {isLens(orderItem.supplyCategoryKey) &&
          renderGradeDetails('grades', orderItem.orderTypeKey, true)}
        {orderItem.supplyCategoryKey == 2 &&
          orderItem.orderTypeKey == 3 &&
          renderSoDetails('soDetails', true)}
        {renderInput(
          'additionalInstruction',
          'Additional Instruction',
          'text',
          true
        )}
        {order.orderType &&
          order.orderType != 'BULK' &&
          order.orderType != 2 &&
          renderInput('pxName', 'Patient Name', 'text', true)}
        <Link
          className='btn btn-warning'
          to={'/statusItems/' + propId.split('|')[0]}
        >
          CLOSE
        </Link>
        {/* {renderButton('Submit')} */}
      </form>
    </div>
  );
};

export default StatusItemForm;
