import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import OrderActionButtons from './orderActionButtons';

const OrderTable = ({ orders, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'orderType', label: 'ORDER TYPE' },
    {
      key: 'cartNumber',
      content: (order) => (
        <Link to={'/orders/' + order.cartNumber + '?' + order.orderType}>
          {order.cartNumber}
        </Link>
      ),
      label: 'RX/BO/SO NUMBER',
    },
    { path: 'url', label: 'GDRIVE URL' },
    {
      key: 'items',
      content: (order) => order.items.length || 0,
      label: 'ITEMS',
    },
    {
      key: 'cartNumber',
      content: (order) => (
        <OrderActionButtons
          orderType={order.orderType}
          cartNumber={order.cartNumber}
          location={'CART'}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={orders}
    />
  );
};

export default OrderTable;
