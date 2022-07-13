import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getSupplier,
  saveSupplier,
  updateSupplier,
} from '../../../services/supplierService';
import { toast } from 'react-toastify';

const SupplierForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(100).label('Name'),
    address: Joi.string().required().min(1).max(200).label('Address'),
    contactNumber: Joi.string().max(150).label('Contact No.'),
    contactPerson: Joi.string().max(155).label('Contact Person'),
    mobileNumber: Joi.string().max(200).label('Mobile Number'),
    email: Joi.string().required().email().max(300).label('Email'),
    websites: Joi.string().max(150).label('Websites'),
    costCenter: Joi.string().required().min(1).max(20).label('Cost Center'),
  };

  useEffect(() => {
    const supplierId = props.match.params.id;
    if (supplierId === 'New') return;

    async function populateSupplier() {
      let { data } = await getSupplier(supplierId);
      setSupplier(data);
    }

    populateSupplier();

    if (!supplier) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveSupplier(mapToViewModel(supplier))
        : await updateSupplier(mapToViewModel(supplier));
      toast(
        `Supplier ${supplier.name} with the id of ${supplier.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/suppliers');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    supplier,
    setSupplier,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} SUPPLIER
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderInput('address', 'Address')}
        {renderInput('contactNumber', 'Contact No.')}
        {renderInput('contactPerson', 'Contact Person')}
        {renderInput('mobileNumber', 'Mobile No.')}
        {renderInput('email', 'Email')}
        {renderInput('websites', 'Websites')}
        {renderInput('costCenter', 'Cost Center')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default SupplierForm;
