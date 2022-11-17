import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const LensParamTable = ({ lensParams, localEnums, sortColumn, onSort }) => {
  const columns = [
    {
      key: 'name',
      content: (lensParam) => (
        <Link
          className='btn btn-warning'
          to={'/lensParams/New?lensParamId=' + lensParam.id}
        >
          Use as Template
        </Link>
      ),
      label: 'Actions',
    },
    { path: 'id', label: 'Parameter Key' },
    {
      key: 'LensItem.name',
      content: (lensParam) => (
        <Link to={'/lensParams/' + lensParam.id}>
          {lensParam.LensItem.name}
        </Link>
      ),
      label: 'Name',
    },
    { path: 'lensItemKey', label: 'Barcode' },
    { path: 'maxSph', label: 'Max-SPH' },
    { path: 'minSph', label: 'Min-SPH' },
    { path: 'maxCyl', label: 'Max-CYL' },
    { path: 'minCyl', label: 'Min-CYL' },
    { path: 'maxAdd', label: 'Max-Add' },
    { path: 'minAdd', label: 'Min-Add' },
    { path: 'totalPower', label: 'TP' },
    { path: 'desc', label: 'Description' },
    { path: 'fitting', label: 'Fitting' },
    { path: 'cdKeys', label: 'CD-Keys' },
    { path: 'rules', label: 'Rules' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={lensParams}
    />
  );
};

export default LensParamTable;
