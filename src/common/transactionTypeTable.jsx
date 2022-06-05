import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const TransactionTypeTable = ({
  transactionTypes,
  localEnums,
  sortColumn,
  onSort,
}) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (transactionType) => (
        <Link to={'/transactionTypes/' + transactionType.id}>
          {transactionType.name}
        </Link>
      ),
      label: 'Name',
    },
    { path: 'desc', label: 'Description' },
    { path: 'sign', label: 'Sign' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={transactionTypes}
    />
  );
};

export default TransactionTypeTable;
