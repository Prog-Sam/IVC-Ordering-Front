import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getIndexType,
  saveIndexType,
  updateIndexType,
} from '../../../services/indexTypeService';
import { toast } from 'react-toastify';

const IndexTypeForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.number().required().max(20).label('Name'),
    desc: Joi.string().required().min(1).max(50).label('Description'),
  };

  useEffect(() => {
    const indexTypeId = props.match.params.id;
    if (indexTypeId === 'New') return;

    async function populateIndexType() {
      let { data } = await getIndexType(indexTypeId);
      setIndexType(data);
    }

    populateIndexType();

    if (!indexType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveIndexType(mapToViewModel(indexType))
        : await updateIndexType(mapToViewModel(indexType));
      toast(
        `IndexType ${indexType.name} with the id of ${indexType.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/indexTypes');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    indexType,
    setIndexType,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} INDEX TYPE
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

export default IndexTypeForm;
