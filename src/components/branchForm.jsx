import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getBranchType, getBranchTypes } from '../services/branchTypeService';
import { getMall, getMalls } from '../services/mallService';
import {
  getBranch,
  saveBranch,
  updateBranch,
} from './../services/branchService';
import { toast } from 'react-toastify';

const BranchForm = (props) => {
  const [malls, setMalls] = useState([]);
  const [branchTypes, setBranchTypes] = useState([]);
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(3).label('Name'),
    branchTypeKey: Joi.number().required().label('Branch Type'),
    mallKey: Joi.number().required().label('Mall'),
    address1: Joi.string().required().label('Address 1'),
    address2: Joi.string().required().label('Address 2'),
    emailAddress: Joi.string().email().required().label('Email Address'),
  };

  useEffect(() => {
    async function populateMalls() {
      let { data } = await getMalls();
      setMalls(data);
    }

    async function populateBranchTypes() {
      let { data } = await getBranchTypes();
      setBranchTypes(data);
    }
    populateBranchTypes();
    populateMalls();

    const branchId = props.match.params.id;
    if (branchId === 'New') return;

    async function populateBranch() {
      let { data } = await getBranch(branchId);
      setBranch(data);
    }

    populateBranch();

    if (!branch) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveBranch(mapToViewModel(branch))
        : await updateBranch(mapToViewModel(branch));
      toast(
        `Branch ${branch.name} with the id of ${branch.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/branches');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    branch,
    setBranch,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} BRANCH
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderSelect('branchTypeKey', 'Branch Type', branchTypes)}
        {renderSelect('mallKey', 'Mall', malls)}
        {renderInput('address1', 'Address 1')}
        {renderInput('address2', 'Address 2')}
        {renderInput('emailAddress', 'Email')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default BranchForm;
