import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import { getBranches } from './../../../services/branchService';
import { getUser, saveUser, updateUser } from './../../../services/userService';
import { toast } from 'react-toastify';

const UserForm = (props) => {
  const [branches, setBranches] = useState([]);

  const localEnums = {
    status: [
      { id: 0, name: 'TEMPORARY' },
      { id: 1, name: 'ACTIVE' },
      { id: 2, name: 'DISABLED' },
    ],
    access: [
      { id: '0', name: 'DEVELOPER' },
      { id: '1', name: 'OIC' },
      { id: '2', name: 'ASSISTANT OIC' },
      { id: '3', name: 'MANAGEMENT' },
      { id: '4', name: 'OPTOMETRIST' },
      { id: '5', name: 'ENCODER' },
      { id: '6', name: 'SALES' },
    ],
  };

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(2).label('Name'),
    branchKey: Joi.number().required().label('Branch Key'),
    access: Joi.string().required().max(15).label('Access'),
    username: Joi.string().required().min(6).label('Username'),
    password: Joi.string().required().min(6).label('Password'),
    status: Joi.number().required().label('Status'),
  };

  useEffect(() => {
    async function populateBranches() {
      let { data } = await getBranches();
      setBranches(data);
    }

    populateBranches();

    const userId = props.match.params.id;
    if (userId === 'New') return;

    async function populateUser() {
      let { data } = await getUser(userId);
      setUser(data);
    }
    populateUser();

    if (!user) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveUser(mapToViewModel(user))
        : await updateUser(mapToViewModel(user));
      toast(
        `User ${user.name} with the id of ${user.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/users');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    user,
    setUser,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} USER
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderSelect('branchKey', 'Branch', branches)}
        {renderSelect('access', 'Access', localEnums.access)}
        {renderInput('username', 'Username')}
        {renderInput('password', 'Password', 'password')}
        {renderSelect('status', 'Status', localEnums.status)}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default UserForm;
