import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const IndexTypeTable = ({ indexTypes, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (indexType) => (
        <Link to={'/indexTypes/' + indexType.id}>{indexType.name}</Link>
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
      data={indexTypes}
    />
  );
};

export default IndexTypeTable;
