import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const OrderItemTable = ({
  orderItems,
  localEnums,
  sortColumn,
  onSort,
  orderType,
  cartNumber,
}) => {
  const columns = [
    { path: 'itemId', label: 'ID' },
    {
      key: 'model',
      content: (orderItem) => (
        <Link to={'/orderItems/' + orderItem.id}>{orderItem.type}</Link>
      ),
      label: 'Name',
    },
    { path: 'supplyCategory', label: 'Item Type' },
    {
      path: 'itemId',
      content: (orderItem) => (
        <Link to={'/orderItems/' + orderItem.id}>{orderItem.type}</Link>
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
