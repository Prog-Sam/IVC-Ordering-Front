import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const UserTable = ({ users, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (user) => <Link to={'/users/' + user.id}>{user.name}</Link>,
      label: 'Name',
    },
    { path: 'BranchDetail.name', label: 'Branch' },
    { path: 'username', label: 'Username' },
    { path: 'access', label: 'Access' },
    { path: 'status', label: 'Status' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={users}
    />
  );
};

export default UserTable;
