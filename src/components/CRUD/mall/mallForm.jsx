import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import { getMall, saveMall, updateMall } from '../../../services/mallService';
import { toast } from 'react-toastify';

const MallForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    type: Joi.string().required().min(1).max(20).label('Name'),
    typeDesc: Joi.string().required().min(1).max(50).label('Description'),
  };

  useEffect(() => {
    const mallId = props.match.params.id;
    if (mallId === 'New') return;

    async function populateMall() {
      let { data } = await getMall(mallId);
      setMall(data);
    }

    populateMall();

    if (!mall) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveMall(mapToViewModel(mall))
        : await updateMall(mapToViewModel(mall));
      toast(
        `Mall ${mall.name} with the id of ${mall.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/malls');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    mall,
    setMall,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} MALL
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('type', 'Name')}
        {renderInput('typeDesc', 'Description')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default MallForm;
