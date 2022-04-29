import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import useForm from '../hooks/useForm';
import Branches from './../service/branches.json';

const UserForm = (props) => {
  const [branches, setBranches] = useState([]);
  const schema = {
    id: Joi.string().label('ID'),
    name: Joi.string().required().min(3).label('Name'),
    branchKey: Joi.string().required().label('Branch Key'),
    access: Joi.number().required().label('Access'),
    username: Joi.string().required().min(6).label('Username'),
    password: Joi.string().required().min(6).label('Password'),
  };

  useEffect(() => {
    const branchesInDb = Branches;
    setBranches(branchesInDb);

    const userId = props.match.params.id;
    if (userId === 'new') return;

    const user = { id: userId };
    if (!user) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = () => {
    // call server
    console.log(values);
  };

  const [values, handleSubmit, renderButton, renderInput] = useForm(
    schema,
    doSubmit
  );

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        REGISTER OR UPDATE USER{props.match.params.id}
      </h1>
      <form onSubmit={handleSubmit}>
        {renderInput('name', 'Name')}
        {renderInput('branchKey', 'Branch Key')}
        {renderInput('access', 'Access')}
        {renderInput('username', 'Username')}
        {renderInput('password', 'Password', 'password')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default UserForm;
