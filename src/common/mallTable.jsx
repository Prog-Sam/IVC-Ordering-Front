import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const MallTable = ({ malls, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'type',
      content: (mall) => <Link to={'/malls/' + mall.id}>{mall.type}</Link>,
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
      data={malls}
    />
  );
};

export default MallTable;
