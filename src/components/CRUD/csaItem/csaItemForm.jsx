import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getCsaItem,
  saveCsaItem,
  updateCsaItem,
} from '../../../services/csaItemService';
import { getOrderTypes } from '../../../services/orderTypeService';
import { getBrands } from '../../../services/brandService';
import { getFSCSAModels } from '../../../services/fscsaModelService';
import { getColorDays } from '../../../services/colorDayService';
import { getSupplyCategories } from '../../../services/supplyCategoryService';
import { toast } from 'react-toastify';

const CsaItemForm = (props) => {
  const [orderTypes, setOrderTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fsModels, setFsModels] = useState([]);
  const [colorDays, setColorDays] = useState([]);
  const [supplyCategories, setSupplyCategories] = useState([]);

  const localEnums = {};
  let isNew = props.match.params.id === 'New';

  const schema = {
    id: Joi.number().label('Lens Code'),
    orderTypeKey: Joi.number().required().label('Order Type'),
    brandKey: Joi.number().required().label('Brand'),
    csaModelKey: Joi.number().required().label('Model'),
    cdKey: Joi.number().required().label('Color'),
    scKey: Joi.number().required().label('Supply Category'),
    description: Joi.string().required().min(1).max(100).label('Description'),
  };

  useEffect(() => {
    const csaItemId = props.match.params.id;

    async function populateOrderTypes() {
      let { data } = await getOrderTypes();
      setOrderTypes(data);
    }
    async function populateBrands() {
      let { data } = await getBrands();
      setBrands(data);
    }
    async function populateFSCSAModels() {
      let { data } = await getFSCSAModels();
      setFsModels(data);
    }
    async function populateCdKeys() {
      let { data } = await getColorDays();
      setColorDays(data);
    }
    async function populateSupplyCategories() {
      let { data } = await getSupplyCategories();
      setSupplyCategories(data);
    }

    populateOrderTypes();
    populateBrands();
    populateFSCSAModels();
    populateCdKeys();
    populateSupplyCategories();

    isNew = csaItemId === 'New';
    if (isNew) return;

    async function populateCsaItem() {
      let { data } = await getCsaItem(csaItemId);
      setCsaItem(data);
    }

    populateCsaItem();

    if (!csaItem) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveCsaItem(mapToViewModel(csaItem))
        : await updateCsaItem(mapToViewModel(csaItem));
      toast(
        `CsaItem ${csaItem.name} with the id of ${csaItem.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/csaItems');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    csaItem,
    setCsaItem,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} CSA
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('CSA Code', props.match.params.id)}
        {renderSelect('orderTypeKey', 'Order Type', orderTypes, !isNew)}
        {renderSelect('brandKey', 'Brand', brands, !isNew)}
        {renderSelect('csaModelKey', 'Model', fsModels, !isNew)}
        {renderSelect('cdKey', 'Color', colorDays, !isNew)}
        {renderSelect('scKey', 'Supply Category', supplyCategories, !isNew)}
        {renderInput('description', 'Description')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default CsaItemForm;
