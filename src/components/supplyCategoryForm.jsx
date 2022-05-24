import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import {
  getSupplyCategory,
  saveSupplyCategory,
  updateSupplyCategory,
} from '../services/supplyCategoryService';
import { toast } from 'react-toastify';

const SupplyCategoryForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(4).label('Name'),
    desc: Joi.string().required().min(1).max(20).label('Description'),
  };

  useEffect(() => {
    const supplyCategoryId = props.match.params.id;
    if (supplyCategoryId === 'New') return;

    async function populateSupplyCategory() {
      let { data } = await getSupplyCategory(supplyCategoryId);
      setSupplyCategory(data);
    }

    populateSupplyCategory();

    if (!supplyCategory) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveSupplyCategory(mapToViewModel(supplyCategory))
        : await updateSupplyCategory(mapToViewModel(supplyCategory));
      toast(
        `SupplyCategory ${supplyCategory.name} with the id of ${
          supplyCategory.id
        } has been ${isNew ? 'added.' : 'updated.'}`
      );
      props.history.push('/supplyCategories');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    supplyCategory,
    setSupplyCategory,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} SUPPLY
        CATEGORY
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

export default SupplyCategoryForm;
