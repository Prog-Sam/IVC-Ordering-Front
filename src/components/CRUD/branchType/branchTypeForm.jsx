import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getBranchType,
  saveBranchType,
  updateBranchType,
} from '../../../services/branchTypeService';
import { toast } from 'react-toastify';

const BranchTypeForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    type: Joi.string().required().min(1).max(5).label('Name'),
    desc: Joi.string().required().min(1).max(50).label('Description'),
  };

  useEffect(() => {
    const branchTypeId = props.match.params.id;
    if (branchTypeId === 'New') return;

    async function populateBranchType() {
      let { data } = await getBranchType(branchTypeId);
      setBranchType(data);
    }

    populateBranchType();

    if (!branchType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveBranchType(mapToViewModel(branchType))
        : await updateBranchType(mapToViewModel(branchType));
      toast(
        `Branch Type ${branchType.name} with the id of ${
          branchType.id
        } has been ${isNew ? 'added.' : 'updated.'}`
      );
      props.history.push('/branchTypes');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    branchType,
    setBranchType,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} BRANCH TYPE
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('type', 'Name')}
        {renderInput('desc', 'Description')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default BranchTypeForm;
