import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import CartContext from '../context/cartContext';
import { getCart, removeOrder } from '../services/cartService';

const OrderActionButtons = ({ orderId, orderType, location }) => {
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
              {/* <button
                className='btn btn-warning'
                onClick={() => {
                  console.log(orderId, orderType, location);
                }}
              >
                OPEN
              </button> */}
              <Link to={`/orderItems/${orderId}`} className='btn btn-warning'>
                OPEN
              </Link>
            </td>
            <td>
              <button
                className='btn btn-danger'
                onClick={() => {
                  removeOrder(orderId);
                  return cartContext.setOrdersCount(getCart().length);
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
