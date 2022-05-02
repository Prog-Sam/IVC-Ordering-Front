import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, sortColumn, onSort, localEnums, data }) => {
  return (
    <table className='table justify-content'>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} localEnums={localEnums} columns={columns} />
    </table>
  );
};

export default Table;
