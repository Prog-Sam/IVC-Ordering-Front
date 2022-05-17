import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const SupplierTable = ({ suppliers, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (supplier) => (
        <Link to={'/suppliers/' + supplier.id}>{supplier.name}</Link>
      ),
      label: 'Name',
    },
    { path: 'address', label: 'Address' },
    { path: 'contactNumber', label: 'Contact Number' },
    { path: 'contactPerson', label: 'Contact Person' },
    { path: 'mobileNumber', label: 'Mobile No.' },
    { path: 'email', label: 'Email Address' },
    { path: 'Websites', label: 'Websites' },
    { path: 'costCenter', label: 'Cost Center' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={suppliers}
    />
  );
};

export default SupplierTable;
