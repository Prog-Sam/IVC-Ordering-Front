import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
// import { removeItem, getItems } from '../services/orderItemService';
import { getNameById } from '../utils/itemizer';
import { getItemCategories } from '../utils/catalogMethods';
import { getModels, isBulk } from './../utils/catalogMethods';

const StatusItemTable = ({
  statusItems,
  localEnums,
  sortColumn,
  onSort,
  orderType,
  orderId,
  setStatusItems,
}) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'supplyCategoryKey',
      content: (orderItem) =>
        getNameById(
          orderItem.supplyCategoryKey,
          getItemCategories(
            isBulk(orderItem.orderTypeKey) ? 1 : orderItem.orderTypeKey
          )
        ),
      label: 'Item Category',
    },
    {
      key: 'model',
      content: (orderItem) => (
        <Link to={'/catalogView/' + `${orderId}|${orderItem.id}`}>
          {getNameById(
            orderItem['itemKey'],
            getModels(
              orderItem.supplyCategoryKey,
              orderItem.orderTypeKey,
              orderItem.brandKey
            )
          )}
        </Link>
      ),
      label: 'Item Name',
    },
    // {
    //   path: 'id',
    //   content: (orderItem) => (
    //     <button
    //       className='btn btn-danger'
    //       onClick={() => {
    //         removeItem(orderId, orderItem.id);
    //         setStatusItems(getItems(orderId));
    //       }}
    //     >
    //       DELETE
    //     </button>
    //   ),
    // },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={statusItems}
    />
  );
};

export default StatusItemTable;
