import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getUnit, saveUnit, updateUnit } from '../services/unitService';
import { toast } from 'react-toastify';

const UnitForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(3).label('Name'),
    desc: Joi.string().required().min(1).max(20).label('Description'),
  };

  useEffect(() => {
    const unitId = props.match.params.id;
    if (unitId === 'New') return;

    async function populateUnit() {
      let { data } = await getUnit(unitId);
      setUnit(data);
    }

    populateUnit();

    if (!unit) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveUnit(mapToViewModel(unit))
        : await updateUnit(mapToViewModel(unit));
      toast(
        `Unit ${unit.name} with the id of ${unit.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/units');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    unit,
    setUnit,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} UNIT
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

export default UnitForm;
