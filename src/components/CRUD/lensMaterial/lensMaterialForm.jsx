import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getLensMaterial,
  saveLensMaterial,
  updateLensMaterial,
} from '../../../services/lensMaterialService';
import { toast } from 'react-toastify';

const LensMaterialForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).max(150).label('Name'),
  };

  useEffect(() => {
    const lensMaterialId = props.match.params.id;
    if (lensMaterialId === 'New') return;

    async function populateLensMaterial() {
      let { data } = await getLensMaterial(lensMaterialId);
      setLensMaterial(data);
    }

    populateLensMaterial();

    if (!lensMaterial) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveLensMaterial(mapToViewModel(lensMaterial))
        : await updateLensMaterial(mapToViewModel(lensMaterial));
      toast(
        `LensMaterial ${lensMaterial.name} with the id of ${
          lensMaterial.id
        } has been ${isNew ? 'added.' : 'updated.'}`
      );
      props.history.push('/lensMaterials');
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const [
    lensMaterial,
    setLensMaterial,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} LENS MATERIAL
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default LensMaterialForm;
