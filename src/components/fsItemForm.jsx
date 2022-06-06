import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getFsItem, saveFsItem, updateFsItem } from '../services/fsItemService';
import { getOrderTypes } from '../services/orderTypeService';
import { getBrands } from '../services/brandService';
import { getFSCSAModels } from '../services/fscsaModelService';
import { getColorDays } from '../services/colorDayService';
import { getSupplyCategories } from '../services/supplyCategoryService';
import { toast } from 'react-toastify';

const FsItemForm = (props) => {
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
    fsModelKey: Joi.number().required().label('Model'),
    cdKey: Joi.number().required().label('Color'),
    supplyCategoryKey: Joi.number().required().label('Supply Category'),
    width: Joi.number().required().label('Width'),
    height: Joi.number().required().label('Height'),
    bridge: Joi.number().required().label('Bridge'),
    templeArms: Joi.number().required().label('Temple Arms'),
  };

  useEffect(() => {
    const fsItemId = props.match.params.id;

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

    isNew = fsItemId === 'New';
    if (isNew) return;

    async function populateFsItem() {
      let { data } = await getFsItem(fsItemId);
      setFsItem(data);
    }

    populateFsItem();

    if (!fsItem) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveFsItem(mapToViewModel(fsItem))
        : await updateFsItem(mapToViewModel(fsItem));
      toast(
        `FsItem ${fsItem.name} with the id of ${fsItem.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/fsItems');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    fsItem,
    setFsItem,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} FRAME
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderSelect('orderTypeKey', 'Order Type', orderTypes, !isNew)}
        {renderSelect('brandKey', 'Brand', brands, !isNew)}
        {renderSelect('fsModelKey', 'Model', fsModels, !isNew)}
        {renderSelect('cdKey', 'Color', colorDays, !isNew)}
        {renderSelect(
          'supplyCategoryKey',
          'Supply Category',
          supplyCategories,
          !isNew
        )}
        {renderInput('width', 'Width')}
        {renderInput('height', 'Height')}
        {renderInput('bridge', 'Bridge')}
        {renderInput('templeArms', 'Temple Arms')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default FsItemForm;
