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

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc' />;
    return <i className='fa fa-sort-desc' />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
            scope='col'
            className='clickable'
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
