import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const LensTypeTable = ({ lensTypes, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (lensType) => (
        <Link to={'/lensTypes/' + lensType.id}>{lensType.name}</Link>
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
      data={lensTypes}
    />
  );
};

export default LensTypeTable;
