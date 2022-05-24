import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const SupplyCategoryTable = ({
  supplyCategories,
  localEnums,
  sortColumn,
  onSort,
}) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (supplyCategory) => (
        <Link to={'/supplyCategories/' + supplyCategory.id}>
          {supplyCategory.name}
        </Link>
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
      data={supplyCategories}
    />
  );
};

export default SupplyCategoryTable;
