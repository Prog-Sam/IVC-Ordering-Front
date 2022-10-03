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
  isBulk,
  getColorsFromBarcode,
  getColorDays,
  getLensParam,
} from '../../../utils/catalogMethods';
import { toast } from 'react-toastify';
import { getAllOrderTypes } from '../../../utils/catalogMethods';
import { isDuplicate, isLens } from './../../../services/orderItemService';
import { getLensParams } from './../../../utils/catalogMethods';
import {
  validateGrade,
  getTotalQty,
  validateSo,
} from './../../../utils/gradeMethods';

const OrderItemForm = (props) => {
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
      let data = await getItem(orderId, orderItemId);
      setOrderItem(data);
    }

    populateOrderItem();

    if (!orderItem) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    const lp = getLensParam(orderItem.lensParamKey);
    const validationMode = orderItem.orderTypeKey == 2 ? 'strict' : 'normal';

    try {
      if (!orderItem.cdKey || orderItem.cdKey == '') {
        toast.error('Please Select Color');
        return;
      }

      if (!isLens(orderItem.supplyCategoryKey)) {
        if (isNew) {
          saveOrderItem(order.id, orderItem);
          console.log(isDuplicate(order.id, orderItem.itemDescription));
          toast('Item Added to Cart...');
        }
        if (!isNew) {
          updateOrderItem(order.id, orderItem);
          toast('Item Updated...');
        }
      }
      if (isLens(orderItem.supplyCategoryKey)) {
        for (let i of orderItem.grades) {
          let item = validateGrade(i, lp.totalPower, validationMode);
          delete item['id'];
          let keys = Object.keys(item);
          if (keys.length == 0) continue;
          for (let k of keys) {
            toast.error(item[k]);
          }
          return;
        }

        if (getTotalQty(orderItem.grades) == 0) {
          toast.error(`Atleast one(1) quantity of item is needed.`);
          return;
        }

        if (orderItem.orderTypeKey == 1) {
          if (!orderItem.pxName || orderItem.pxName == '') {
            toast.error('Please provide Patient Name');
            return;
          }
          if (isNew) {
            saveOrderItem(order.id, orderItem);
            toast('Item Added to Cart...');
          }
          if (!isNew) {
            updateOrderItem(order.id, orderItem);
            toast('Item Updated...');
          }
        }
        if (orderItem.orderTypeKey == 3) {
          if (!orderItem.pxName || orderItem.pxName == '') {
            toast.error('Please provide Patient Name');
            return;
          }

          let item = validateSo(orderItem.soDetails);
          let keys = Object.keys(item);
          if (keys.length != 0) {
            for (let k of keys) {
              toast.error(item[k]);
            }
            return;
          }

          if (isNew) {
            saveOrderItem(order.id, orderItem);
            toast('Item Added to Cart...');
          }
          if (!isNew) {
            updateOrderItem(order.id, orderItem);
            toast('Item Updated...');
          }
        }
        if (orderItem.orderTypeKey == 2) {
          if (isNew) {
            saveOrderItem(order.id, orderItem);
            toast('Item Added to Cart...');
          }
          if (!isNew) {
            updateOrderItem(order.id, orderItem);
            toast('Item Updated...');
          }
        }
      }
      if (propId != 'New')
        props.history.push('/orderItems/' + propId.split('|')[0]);
      props.history.push('/orderItems/' + order.id);
    } catch (e) {
      console.error(e);
      toast.error(
        'Something went wrong with the cart. Please Contact IT Dept.'
      );
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
    renderColorDaySelector,
    renderRxField,
    renderFilePicker,
    renderGradeDetails,
    renderSoDetails,
  ] = useCatalogForm(schema, doSubmit);

  useEffect(() => {
    async function populateOrder() {
      setOrder((await getOrderWithCn(orderItem.rxNumber)) || {});
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
      console.log(orderItem);
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
      <h1 className='d-flex align-items-left'>CATALOG</h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('Google Drive URL', order.url || 'NONE')}
        {renderSelect(
          'rxNumber',
          'RX/SO/BO Number',
          getActiveCartNumbers(),
          !isNew
        )}
        {renderSelect('orderTypeKey', 'Order Type', getAllOrderTypes(), true)}
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
            : getItemCategories(order.orderType),
          !isNew
        )}
        {renderSelect(
          'brandKey',
          'Brand',
          getBrands(orderItem.supplyCategoryKey, orderItem.orderTypeKey),
          !isNew
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
        {!isLens(orderItem.supplyCategoryKey) &&
          renderSelect(
            'cdKey',
            'Color',
            getColorsFromBarcode(orderItem.itemKey, orderItem.supplyCategoryKey)
          )}
        {!isLens(orderItem.supplyCategoryKey) &&
          renderInput('nonLensQty', 'Non Lens Quantity')}
        {!isLens(orderItem.supplyCategoryKey) &&
          renderInput('additionalInstruction', 'Additional Instruction')}
        {/* Add here Middle Part */}
        {isLens(orderItem.supplyCategoryKey) &&
          renderSelect(
            'lensParamKey',
            'Lens Parameters [SPH|CYL|ADD|FITTING|TOTAL POWER]',
            getLensParams(orderItem.itemKey)
          )}
        {isLens(orderItem.supplyCategoryKey) &&
          orderItem.lensParamKey &&
          renderSelect(
            'cdKey',
            'Color - Days',
            getColorDays(orderItem.lensParamKey)
          )}
        {isLens(orderItem.supplyCategoryKey) &&
          renderGradeDetails('grades', orderItem.orderTypeKey)}
        {isLens(orderItem.supplyCategoryKey) &&
          orderItem.orderTypeKey == 3 &&
          renderSoDetails('soDetails')}
        {order.orderType &&
          order.orderType != 'BULK' &&
          renderInput('pxName', 'Patient Name')}
        {renderButton(isNew ? 'Add to Cart' : 'Update Item')}
      </form>
    </div>
  );
};

export default OrderItemForm;
