import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import { removeItem, getItems } from '../services/orderItemService';
import { getNameById } from '../utils/itemizer';
import { getItemCategories, isBulk } from '../utils/catalogMethods';

const OrderItemTable = ({
  orderItems,
  localEnums,
  sortColumn,
  onSort,
  orderType,
  orderId,
  setOrderItems,
}) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'supplyCategoryKey',
      content: (orderItem) =>
        getNameById(
          orderItem.supplyCategoryKey,
          getItemCategories(
            isBulk(orderItem.orderTypeKey) ? 1 : orderItem.orderTypeKey
          )
        ),
      label: 'Item Category',
    },
    {
      key: 'model',
      content: (orderItem) => (
        <Link to={'/catalog/' + `${orderId}|${orderItem.id}`}>
          {orderItem['objectVal-itemKey'].label}
        </Link>
      ),
      label: 'Item Name',
    },
    {
      path: 'id',
      content: (orderItem) => (
        <div>
          <Link
            className='btn btn-warning'
            to={'/catalog/New?lensItemId=' + `${orderId}|${orderItem.id}`}
            style={{ 'margin-right': '10px' }}
          >
            Use as Template
          </Link>

          <button
            className='btn btn-danger'
            onClick={() => {
              removeItem(orderId, orderItem.id);
              setOrderItems(getItems(orderId));
            }}
          >
            DELETE
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={orderItems}
    />
  );
};

export default OrderItemTable;
