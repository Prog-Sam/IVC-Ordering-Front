import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const OrderTypeTable = ({ orderTypes, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (orderType) => (
        <Link to={'/orderTypes/' + orderType.id}>{orderType.name}</Link>
      ),
      label: 'Name',
    },
    { path: 'typeDesc', label: 'Description' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={orderTypes}
    />
  );
};

export default OrderTypeTable;
