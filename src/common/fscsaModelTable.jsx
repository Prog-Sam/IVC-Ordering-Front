import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const FSCSAModelTable = ({ fscsaModels, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'modelName',
      content: (fscsaModel) => (
        <Link to={'/fscsaModels/' + fscsaModel.id}>{fscsaModel.modelName}</Link>
      ),
      label: 'Name',
    },
    { path: 'modelDescription', label: 'Description' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={fscsaModels}
    />
  );
};

export default FSCSAModelTable;
