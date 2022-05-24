import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const LensMaterialTable = ({
  lensMaterials,
  localEnums,
  sortColumn,
  onSort,
}) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (lensMaterial) => (
        <Link to={'/lensMaterials/' + lensMaterial.id}>
          {lensMaterial.name}
        </Link>
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
      data={lensMaterials}
    />
  );
};

export default LensMaterialTable;
