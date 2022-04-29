import React from 'react';

//columns: array
//sortColumn: object
//onSort: function
const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const localSortColumn = { ...sortColumn };
    if (localSortColumn.path === path)
      localSortColumn.order = localSortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      localSortColumn.path = path;
      localSortColumn.order = 'asc';
    }

    onSort(localSortColumn);
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
            scope='col'
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
