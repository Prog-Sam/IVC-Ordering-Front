import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import { removeItem, getItems } from '../services/orderItemService';

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
    { path: 'objectVal-supplyCategoryKey.label', label: 'Item Type' },
    {
      key: 'model',
      content: (orderItem) => (
        <Link to={'/orderItems/' + orderItem.id}>
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
