import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const UnitTable = ({ units, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (unit) => <Link to={'/units/' + unit.id}>{unit.name}</Link>,
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
      data={units}
    />
  );
};

export default UnitTable;
