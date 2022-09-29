import { saveOrder } from '../services/orderService';
import { toast } from 'react-toastify';
import _ from 'lodash';

export function submitForApproval(orderId) {
  const result = saveOrder(orderId);
  toast('Submitting Order...');
}

function validateResult(result) {}
