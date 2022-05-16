import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const BranchTable = ({ branches, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (branch) => (
        <Link to={'/branches/' + branch.id}>{branch.name}</Link>
      ),
      label: 'Name',
    },
    { path: 'address1', label: 'Address 1' },
    { path: 'address2', label: 'Address 2' },
    { path: 'emailAddress', label: 'Eamil Address' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={branches}
    />
  );
};

export default BranchTable;
