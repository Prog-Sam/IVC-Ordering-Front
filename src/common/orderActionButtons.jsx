import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { submitForApproval, updateOrderStatus } from '../utils/orderMethods';
import statusConfig from '../config/orderStatusConfig.json';

import CartContext from '../context/cartContext';
import { getCart, removeOrder } from '../services/cartService';
import orderStatusConfig from '../config/orderStatusConfig.json';
import { getCurrentUser } from '../services/authService';
import { whitelisted } from './../utils/protector';
import access from '../config/accessConfig.json';

const OrderActionButtons = ({
  orderId,
  orderType,
  location,
  status = '',
  setOrders,
}) => {
  const cartContext = useContext(CartContext);
  const isApprovable = () => {
    if (status != statusConfig.forApproval) return false;
    if (!whitelisted(access.branchManagement, getCurrentUser())) return false;
    return true;
  };
  return (
    <div>
      {location == 'CART' && (
        <table>
          <tr>
            <td>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => {
                  submitForApproval(orderId);
                  return cartContext.setOrdersCount(getCart().length);
                }}
              >
                SUBMIT
              </button>
            </td>
            <td>
              <Link to={`/orderItems/${orderId}`} className='btn btn-warning'>
                OPEN
              </Link>
            </td>
            <td>
              <button
                type='button'
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
              {isApprovable() && (
                <button
                  type='button'
                  onClick={async () => {
                    const result = await updateOrderStatus(
                      orderId,
                      orderStatusConfig.approved
                    );
                    if (result.status == 200) setOrders(getCart(true));
                  }}
                  className='btn btn-success'
                >
                  APPROVE
                </button>
              )}
            </td>
            <td>
              {isApprovable() && (
                <button
                  type='button'
                  onClick={async () => {
                    const result = await updateOrderStatus(
                      orderId,
                      orderStatusConfig.rejected
                    );
                    if (result.status == 200) setOrders(getCart(true));
                  }}
                  className='btn btn-danger'
                >
                  REJECT
                </button>
              )}
            </td>
          </tr>
        </table>
      )}
    </div>
  );
};

export default OrderActionButtons;
