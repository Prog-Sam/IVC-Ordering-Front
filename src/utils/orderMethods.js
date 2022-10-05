import { saveOrder } from '../services/orderService';
import { toast } from 'react-toastify';
import _ from 'lodash';
import orderStatus from '../config/orderStatusConfig.json';
import { removeOrder } from './../services/cartService';

export async function submitForApproval(orderId) {
  toast('Submitting Order...');
  const result = await saveOrder(orderId, orderStatus.forApproval);
  const validatedResult = validateResult(result);

  if (!validatedResult.isValid) {
    toast.error(validatedResult.result.errorMessage);
    console.error(validatedResult.result);
    return false;
  }

  toast.success('Order has been submitted...');
  removeOrder(orderId);
  return result;
}

function validateResult(result) {
  const resultPaths = Object.keys(result);
  if (_.find(resultPaths, (p) => p == 'errorMessage'))
    return { isValid: false, result };
  return { isValid: true, result };
}
