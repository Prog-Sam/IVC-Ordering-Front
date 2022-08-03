import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import CartContext from '../context/cartContext';
import { getCart, removeOrder } from '../services/cartService';

const OrderActionButtons = ({ orderType, cartNumber, location }) => {
  const cartContext = useContext(CartContext);
  console.log(orderType);
  return (
    <div>
      {location == 'CART' && (
        <table>
          <tr>
            <td>
              <button
                className='btn btn-primary'
                onClick={() => {
                  console.log(orderType);
                }}
              >
                SUBMIT
              </button>
            </td>
            <td>
              <button className='btn btn-warning'>TRUNCATE</button>
            </td>
            <td>
              <button
                className='btn btn-danger'
                onClick={() => {
                  removeOrder(orderType, cartNumber);
                  return cartContext.setOrdersCount(getCart().length - 1);
                }}
              >
                DELETE
              </button>
            </td>
          </tr>
        </table>
      )}
      {location == 'STATUS' && (
        <table>
          <tr>
            <td>
              <button className='btn btn-primary'>APPROVE</button>
            </td>
            <td>
              <button className='btn btn-warning'>REJECT</button>
            </td>
          </tr>
        </table>
      )}
    </div>
  );
};

export default OrderActionButtons;
