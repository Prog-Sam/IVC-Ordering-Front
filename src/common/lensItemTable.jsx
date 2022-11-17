import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const LensItemTable = ({ lensItems, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'Barcode' },
    {
      key: 'name',
      content: (lensItem) => (
        <Link to={'/lensItems/' + lensItem.id}>{lensItem.name}</Link>
      ),
      label: 'Name',
    },
    { path: 'Brand.name', label: 'Brand' },
    { path: 'LensType.name', label: 'Lens Type' },
    { path: 'IndexType.name', label: 'Index' },
    { path: 'ProductFamily.name', label: 'Product Family' },
    { path: 'LensMaterial.name', label: 'Lens Material' },
    {
      key: 'name',
      content: (lensItem) => (
        <Link
          className='btn btn-warning'
          to={'/lensItems/New?lensItemId=' + lensItem.id}
        >
          Use as Template
        </Link>
      ),
      label: 'Actions',
    },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={lensItems}
    />
  );
};

export default LensItemTable;
