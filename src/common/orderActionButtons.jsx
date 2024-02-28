import React, { useContext, useState } from 'react';
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
  const [isDisabled, setIsDisabled] = useState(false);
  const cartContext = useContext(CartContext);
  const isApprovable = () => {
    if (status != statusConfig.forApproval) return false;
    if (!whitelisted(access.branchManagement, getCurrentUser())) return false;
    return true;
  };
  const isReceivable = () => {
    if (status == statusConfig.received) return true;
    if (status == statusConfig.processing) return true;
    if (status == statusConfig.dispatched) return true;
    if (status == statusConfig.pickedUp) return true;
    return false;
  }
  return (
    <div>
      {location == 'CART' && (
        <div className='row'>
          <div className='col-m pr-2'>
            <button
              type='button'
              disabled={isDisabled}
              className='btn btn-primary'
              onClick={async () => {
                setIsDisabled(true);
                const result = await submitForApproval(orderId);
                if (!result) setIsDisabled(false);
                return cartContext.setOrdersCount(getCart().length);
              }}
            >
              SUBMIT
            </button>
          </div>
          <div className='col-m pr-2'>
            <Link to={`/orderItems/${orderId}`} className='btn btn-warning'>
              OPEN
            </Link>
          </div>
          <div className='col-m pr-2'>
            <button
              disabled={isDisabled}
              type='button'
              className='btn btn-danger'
              onClick={() => {
                setIsDisabled(true);
                removeOrder(orderId);
                setIsDisabled(false);
                return cartContext.setOrdersCount(getCart().length);
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      )}
      {location == 'STATUS' && (
        <div className='row'>
          <div className='col-m pr-2'>
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
          </div>
          <div className='col-m'>
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
          </div>
          <div className='col-s'>
            {isReceivable() && (
              <button
                type='button'
                onClick={async () => {
                  const result = await updateOrderStatus(
                    orderId,
                    orderStatusConfig.closed
                  );
                  if (result.status == 200) setOrders(getCart(true));
                }}
                className='btn btn-warning'
              >
                RECEIVE ORDER
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderActionButtons;
