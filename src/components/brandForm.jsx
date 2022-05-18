import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getBrand, saveBrand, updateBrand } from '../services/brandService';
import { toast } from 'react-toastify';
import { getSuppliers } from '../services/supplierService';

const BrandForm = (props) => {
  const localEnums = {};
  const [suppliers, setSupplers] = useState([]);

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(20).label('Name'),
    supplierKey: Joi.number().required().label('Supplier'),
  };

  useEffect(() => {
    const brandId = props.match.params.id;

    async function populateSuppliers() {
      let { data } = await getSuppliers();
      setSupplers(data);
    }
    populateSuppliers();

    if (brandId === 'New') return;

    async function populateBrand() {
      let { data } = await getBrand(brandId);
      setBrand(data);
    }

    populateBrand();

    if (!brand) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveBrand(mapToViewModel(brand))
        : await updateBrand(mapToViewModel(brand));
      toast(
        `Brand ${brand.name} with the id of ${brand.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/brands');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    brand,
    setBrand,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} BRAND
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderSelect('supplierKey', 'Supplier', suppliers)}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default BrandForm;
