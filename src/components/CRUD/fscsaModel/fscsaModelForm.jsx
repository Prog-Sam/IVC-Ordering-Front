import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getFSCSAModel,
  saveFSCSAModel,
  updateFSCSAModel,
} from '../../../services/fscsaModelService';
import { toast } from 'react-toastify';

const FSCSAModelForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    modelName: Joi.string().required().min(1).max(40).label('Name'),
    modelDescription: Joi.string()
      .required()
      .min(1)
      .max(100)
      .label('Description'),
  };

  useEffect(() => {
    const fscsaModelId = props.match.params.id;
    if (fscsaModelId === 'New') return;

    async function populateFSCSAModel() {
      let { data } = await getFSCSAModel(fscsaModelId);
      setFSCSAModel(data);
    }

    populateFSCSAModel();

    if (!fscsaModel) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveFSCSAModel(mapToViewModel(fscsaModel))
        : await updateFSCSAModel(mapToViewModel(fscsaModel));
      toast(
        `FSCSAModel ${fscsaModel.name} with the id of ${
          fscsaModel.id
        } has been ${isNew ? 'added.' : 'updated.'}`
      );
      props.history.push('/fscsaModels');
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const [
    fscsaModel,
    setFSCSAModel,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} FS CS A MODEL
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('modelName', 'Name')}
        {renderInput('modelDescription', 'Description')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default FSCSAModelForm;
