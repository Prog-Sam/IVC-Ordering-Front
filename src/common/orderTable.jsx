import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import OrderActionButtons from './orderActionButtons';
import { getAllOrderTypes } from '../utils/catalogMethods';

const OrderTable = ({
  orders,
  localEnums,
  sortColumn,
  onSort,
  location = 'CART',
  setOrders,
}) => {
  const cartColumns = [
    { path: 'id', label: 'ID' },
    { path: 'orderType', label: 'ORDER TYPE' },
    {
      key: 'cartNumber',
      content: (order) => (
        <Link to={'/orders/' + order.id}>{order.cartNumber}</Link>
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
          orderId={order.id}
          location={location}
        />
      ),
      label: 'ACTIONS'
    },
  ];

  const statusColumns = [
    { path: 'id', label: 'Transaction Number' },
    {
      key: 'orderType',
      label: 'ORDER TYPE',
      content: (order) =>
        _.find(getAllOrderTypes(), { id: order.orderType }).name,
    },
    {
      key: 'cartNumber',
      content: (order) => (
        <Link to={'/statusItems/' + order.id}>{order.cartNumber}</Link>
      ),
      label: 'RX/BO/SO NUMBER',
    },
    { path: 'url', label: 'GDRIVE URL' },
    // {
    //   key: 'items',
    //   content: (order) => order.items.length || 0,
    //   label: 'ITEMS',
    // },
    {
      path: 'status',
      label: 'STATUS',
    },
    {
      key: 'cartNumber',
      content: (order) => (
        <OrderActionButtons
          orderType={order.orderType}
          orderId={order.id}
          location={location}
          status={order.status}
          setOrders={setOrders}
        />
      ),
      label: 'ACTIONS'
    },
  ];

  const columns = location == 'CART' ? [...cartColumns] : [...statusColumns];

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
