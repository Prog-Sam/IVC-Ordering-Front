import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const CsaItemTable = ({ csaItems, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'CSA Code' },
    {
      key: 'name',
      content: (csaItem) => (
        <Link
          to={'/csaItems/' + csaItem.id}
        >{`${csaItem.Brand.name} ${csaItem.FscsaModel.modelName}`}</Link>
      ),
      label: 'Name',
    },
    { path: 'Brand.name', label: 'Brand' },
    { path: 'ColorDay.colorName', label: 'Color' },
    { path: 'description', label: 'Description' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={csaItems}
    />
  );
};

export default CsaItemTable;
