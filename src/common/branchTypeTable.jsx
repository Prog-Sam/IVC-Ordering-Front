import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const BranchTypeTable = ({ branchTypes, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'type',
      content: (branchType) => (
        <Link to={'/branchTypes/' + branchType.id}>{branchType.type}</Link>
      ),
      label: 'Name',
    },
    { path: 'desc', label: 'Description' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={branchTypes}
    />
  );
};

export default BranchTypeTable;
