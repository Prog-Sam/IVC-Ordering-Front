import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import {
  getProductFamily,
  saveProductFamily,
  updateProductFamily,
} from '../services/productFamilyService';
import { toast } from 'react-toastify';

const ProductFamilyForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().empty('').max(50).label('Name'),
    desc: Joi.string().required().min(1).max(100).label('Description'),
  };

  useEffect(() => {
    const productFamilyId = props.match.params.id;
    if (productFamilyId === 'New') return;

    async function populateProductFamily() {
      let { data } = await getProductFamily(productFamilyId);
      setProductFamily(data);
    }

    populateProductFamily();

    if (!productFamily) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveProductFamily(mapToViewModel(productFamily))
        : await updateProductFamily(mapToViewModel(productFamily));
      toast(
        `ProductFamily ${productFamily.name} with the id of ${
          productFamily.id
        } has been ${isNew ? 'added.' : 'updated.'}`
      );
      props.history.push('/productFamilies');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    productFamily,
    setProductFamily,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} PRODUCT FAMILY
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderInput('desc', 'Description')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default ProductFamilyForm;
