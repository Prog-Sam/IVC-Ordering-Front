import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getLensParam,
  saveLensParam,
  updateLensParam,
} from '../../../services/lensParamService';
import { getColorDays } from '../../../services/colorDayService';
import { getLensItems } from '../../../services/lensItemService';
import { toast } from 'react-toastify';

const LensParamForm = (props) => {
  const [colorDays, setColorDays] = useState([]);
  const [lensItems, setLensItems] = useState([]);
  const localEnums = {};

  const schema = {
    id: Joi.string().max(10).label('Parameter Code'),
    lensItemKey: Joi.string().required().max(24).label('Lens Item'),
    maxSph: Joi.number().precision(2).required().label('Max SPH'),
    minSph: Joi.number().precision(2).required().label('Min SPH'),
    maxCyl: Joi.number().precision(2).required().label('Max CYL'),
    minCyl: Joi.number().precision(2).required().label('Min CYL'),
    maxAdd: Joi.number().precision(2).required().label('Max Add'),
    minAdd: Joi.number().precision(2).required().label('Min Add'),
    totalPower: Joi.number().precision(2).required().label('Total Power'),
    desc: Joi.string().allow('').min(1).max(150).label('Description'),
    fitting: Joi.number().required().label('Fitting'),
    cdKeys: Joi.string().required().label('Colors and Days'),
    rules: Joi.string().default('').allow('').max(1000).label('Rules'),
  };

  useEffect(() => {
    async function populateColorDays() {
      let { data } = await getColorDays();
      setColorDays(data);
    }

    async function populateLensItems() {
      let { data } = await getLensItems();
      setLensItems(data);
    }

    populateLensItems();
    populateColorDays();

    const lensParamId = props.match.params.id;
    if (lensParamId === 'New') return;

    async function populateLensParam() {
      let { data } = await getLensParam(lensParamId, colorDays);
      setLensParam(data);
    }

    populateLensParam();

    if (!lensParam) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveLensParam(mapToViewModel(lensParam), colorDays)
        : await updateLensParam(mapToViewModel(lensParam), colorDays);
      toast(
        `LensParam ${lensParam.name} with the id of ${lensParam.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/lensParams');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    lensParam,
    setLensParam,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
    renderColorDaySelector,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} LENS PARAMETER
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('PARAMETER CODE', props.match.params.id)}
        {renderSelect('lensItemKey', 'Lens Item', lensItems)}
        {renderInput('maxSph', 'Max SPH')}
        {renderInput('minSph', 'Min SPH')}
        {renderInput('maxCyl', 'Max CYL')}
        {renderInput('minCyl', 'Min CYL')}
        {renderInput('maxAdd', 'Max ADD')}
        {renderInput('minAdd', 'Min ADD')}
        {renderInput('totalPower', 'Total Power')}
        {renderInput('desc', 'Description')}
        {renderInput('fitting', 'Fitting')}
        {renderInput('rules', 'Rules')}
        {renderColorDaySelector('cdKeys', 'Colors and Days', colorDays)}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default LensParamForm;
