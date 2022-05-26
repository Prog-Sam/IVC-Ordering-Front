import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const ColorDayTable = ({ colorDays, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'colorName',
      content: (colorDay) => (
        <Link to={'/colorDays/' + colorDay.id}>{colorDay.colorName}</Link>
      ),
      label: 'Name',
    },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={colorDays}
    />
  );
};

export default ColorDayTable;
