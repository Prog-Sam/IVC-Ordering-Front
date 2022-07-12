import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const TransactionSeriesTable = ({
  transactionSeriess,
  localEnums,
  sortColumn,
  onSort,
}) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'branchDetailKey',
      content: (transactionSeries) => (
        <Link to={'/transactionSeries/' + transactionSeries.id}>
          {transactionSeries.BranchDetail.name}
        </Link>
      ),
      label: 'Branch',
    },
    { path: 'TransactionType.name', label: 'Transaction Type' },
    { path: 'from', label: 'From' },
    { path: 'to', label: 'To' },
    { path: 'current', label: 'Current' },
    { path: 'status', label: 'Status' },
  ];
  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={transactionSeriess}
    />
  );
};

export default TransactionSeriesTable;
