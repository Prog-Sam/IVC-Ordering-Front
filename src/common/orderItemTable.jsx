import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import { removeItem, getItems } from '../services/orderItemService';
import { getNameById } from '../utils/itemizer';
import { getItemCategories } from '../utils/catalogMethods';

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
          getItemCategories(orderItem.orderType)
        ),
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
        <button
          className='btn btn-danger'
          onClick={() => {
            removeItem(orderId, orderItem.id);
            setOrderItems(getItems(orderId));
          }}
        >
          DELETE
        </button>
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
