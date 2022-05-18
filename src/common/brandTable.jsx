import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const BrandTable = ({ brands, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (brand) => <Link to={'/brands/' + brand.id}>{brand.name}</Link>,
      label: 'Name',
    },
    { path: 'Supplier.name', label: 'Supplier' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={brands}
    />
  );
};

export default BrandTable;
