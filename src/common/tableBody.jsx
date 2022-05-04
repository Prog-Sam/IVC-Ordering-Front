import React from 'react';
import _ from 'lodash';

const TableBody = ({ data, columns, localEnums }) => {
  const visualizeId = (id, itemType) => {
    if (!_.has(localEnums, itemType)) return id;
    let item = _.find(localEnums[itemType], { id });
    return item ? item.value : id;
  };

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return visualizeId(_.get(item, column.path), column.path);
  };

  const createDataKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={createDataKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
