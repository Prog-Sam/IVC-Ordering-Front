import { saveOrder } from '../services/orderService';
import { toast } from 'react-toastify';
import _ from 'lodash';
import orderStatus from '../config/orderStatusConfig.json';
import { removeOrder, updateOrder, getOrder, isDuplicate } from './../services/cartService';
import { updateOrder as updateDbOrder } from '../services/orderService';
import { getCurrentUser } from '../services/authService';

export async function submitForApproval(orderId) {
  toast('Submitting Order...');

  const duplicated = await isDuplicate(
    getOrder(orderId),
    getCurrentUser().branchKey,
    false,
    true
  );
  if(!duplicated){
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
  toast.error('Order Number Exists in the database.')
  return false;
}

export async function updateOrderStatus(txNumber, status) {
  toast('Updating Status...');
  const result = await updateDbOrder(txNumber, { status: status });

  if (result.status == 200) {
    const orderFromDb = getOrder(txNumber, true);

    let localOrder = {
      ...orderFromDb,
      ['items']: updateItemsStatus(orderFromDb.items, status),
      ['status']: status,
    };
    updateOrder(localOrder, true);
    toast.success(`Order Status updated...`);
  }
  if (result.status != 200) {
    toast.error(`Status Update failed...`);
    console.error(result);
  }
  return result;
}

function validateResult(result) {
  const resultPaths = Object.keys(result);
  if (_.find(resultPaths, (p) => p == 'errorMessage'))
    return { isValid: false, result };
  return { isValid: true, result };
}

function updateItemsStatus(items, status) {
  return _.map(items, (i) => {
    return { ...i, ['status']: status };
  });
}

  function addNonBulkRxPrefix(order) {
    let localOrder = { ...order };
    if (order.orderType == 'JOB ORDER')
      localOrder.cartNumber = 'J' + order.cartNumber;
    if (order.orderType == 'SPECIAL ORDER')
      localOrder.cartNumber = 'S' + order.cartNumber;
    return localOrder;
  }