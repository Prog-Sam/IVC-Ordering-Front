import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _, { trim } from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getLensItem,
  saveLensItem,
  updateLensItem,
} from '../../../services/lensItemService';
import { getOrderTypes } from '../../../services/orderTypeService';
import { getBrands } from '../../../services/brandService';
import { getLensTypes } from '../../../services/lensTypeService';
import { getIndexTypes } from '../../../services/indexTypeService';
import { getProductFamilies } from '../../../services/productFamilyService';
import { getSupplyCategories } from '../../../services/supplyCategoryService';
import { getLensMaterials } from '../../../services/lensMaterialService';
import { toast } from 'react-toastify';

const LensItemForm = (props) => {
  const [orderTypes, setOrderTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [lensTypes, setLensTypes] = useState([]);
  const [indexTypes, setIndexTypes] = useState([]);
  const [productFamilies, setProductFamilies] = useState([]);
  const [supplyCategories, setSupplyCategories] = useState([]);
  const [lensMaterials, setLensMaterials] = useState([]);

  const localEnums = {};
  let isNew = props.match.params.id === 'New';

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(300).label('Name'),
    orderTypeKey: Joi.number().required().label('Order Type'),
    brandKey: Joi.number().required().label('Brand'),
    typeKey: Joi.number().required().label('Lens Type'),
    indexTypeKey: Joi.number().required().label('Index'),
    productFamilyKey: Joi.number().required().label('Product Family'),
    supplyCategoryKey: Joi.number().required().label('Supply Category'),
    materialKey: Joi.number().required().label('Lens Material'),
  };

  const subscriberSchema = [
    {
      path: 'name',
      keys: {
        brandKey: '',
        orderTypeKey: '',
        typeKey: '',
        indexTypeKey: '',
        productFamilyKey: '',
        materialKey: '',
        supplyCategoryKey: '',
      },
      value: '',
      getValue: function (keys) {
        return trim(
          `${keys.brandKey + ' '}${keys.orderTypeKey + ' '}${
            keys.typeKey + ' '
          }${keys.indexTypeKey + ' '}${
            keys.productFamilyKey.length === 0 || !keys.productFamilyKey.trim()
              ? ''
              : keys.productFamilyKey + ' '
          }${
            keys.materialKey.length === 0 || !keys.materialKey.trim()
              ? ''
              : keys.materialKey + ' '
          }${keys.supplyCategoryKey}`
        );
      },
    },
  ];

  useEffect(() => {
    const lensItemId = props.match.params.id;

    async function populateOrderTypes() {
      let { data } = await getOrderTypes();
      setOrderTypes(data);
    }
    async function populateBrands() {
      let { data } = await getBrands();
      setBrands(data);
    }
    async function populateLensTypes() {
      let { data } = await getLensTypes();
      setLensTypes(data);
    }
    async function populateIndexTypes() {
      let { data } = await getIndexTypes();
      setIndexTypes(data);
    }
    async function populateProductFamilies() {
      let { data } = await getProductFamilies();
      const sorted = _.orderBy(data, ['name'], ['asc']);
      setProductFamilies(sorted);
    }
    async function populateSupplyCategories() {
      let { data } = await getSupplyCategories();
      setSupplyCategories(data);
    }
    async function populateLensMaterials() {
      let { data } = await getLensMaterials();
      const sorted = _.orderBy(data, ['name'], ['asc']);
      setLensMaterials(sorted);
    }

    populateOrderTypes();
    populateBrands();
    populateLensTypes();
    populateIndexTypes();
    populateProductFamilies();
    populateSupplyCategories();
    populateLensMaterials();

    isNew = lensItemId === 'New';
    if (isNew) return;

    async function populateLensItem() {
      let { data } = await getLensItem(lensItemId);
      setLensItem(data);
    }

    populateLensItem();

    if (!lensItem) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveLensItem(mapToViewModel(lensItem))
        : await updateLensItem(mapToViewModel(lensItem));
      toast(
        `LensItem ${lensItem.name} with the id of ${lensItem.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/lensItems');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    lensItem,
    setLensItem,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ] = useForm(schema, doSubmit, {}, subscriberSchema);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} LENS ITEM
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name', 'text', 'readonly')}
        {renderSelect('orderTypeKey', 'Order Type', orderTypes, !isNew)}
        {renderSelect('brandKey', 'Brand', brands, !isNew)}
        {renderSelect('typeKey', 'Lens Type', lensTypes, !isNew)}
        {renderSelect('indexTypeKey', 'Index', indexTypes, !isNew)}
        {renderSelect(
          'productFamilyKey',
          'Product Family',
          productFamilies,
          !isNew
        )}
        {renderSelect(
          'supplyCategoryKey',
          'Supply Category',
          supplyCategories,
          !isNew
        )}
        {renderSelect('materialKey', 'Lens Material', lensMaterials, !isNew)}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default LensItemForm;
