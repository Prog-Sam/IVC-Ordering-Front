import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getLensType,
  saveLensType,
  updateLensType,
} from '../../../services/lensTypeService';
import { toast } from 'react-toastify';

const LensTypeForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(10).label('Name'),
    desc: Joi.string().required().min(1).max(30).label('Description'),
  };

  useEffect(() => {
    const lensTypeId = props.match.params.id;
    if (lensTypeId === 'New') return;

    async function populateLensType() {
      let { data } = await getLensType(lensTypeId);
      setLensType(data);
    }

    populateLensType();

    if (!lensType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveLensType(mapToViewModel(lensType))
        : await updateLensType(mapToViewModel(lensType));
      toast(
        `LensType ${lensType.name} with the id of ${lensType.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/lensTypes');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    lensType,
    setLensType,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} LENS TYPE
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

export default LensTypeForm;
