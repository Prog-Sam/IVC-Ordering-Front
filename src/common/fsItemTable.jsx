import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const FsItemTable = ({ fsItems, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'Frame Code' },
    {
      key: 'name',
      content: (fsItem) => (
        <Link
          to={'/fsItems/' + fsItem.id}
        >{`${fsItem.Brand.name} ${fsItem.FscsaModel.modelName}`}</Link>
      ),
      label: 'Name',
    },
    { path: 'Brand.name', label: 'Brand' },
    { path: 'ColorDay.colorName', label: 'Color' },
    { path: 'width', label: 'Width' },
    { path: 'height', label: 'Height' },
    { path: 'bridge', label: 'Bridge' },
    { path: 'templeArms', label: 'Temple Arms' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={fsItems}
    />
  );
};

export default FsItemTable;
