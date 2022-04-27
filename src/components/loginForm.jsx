import React from 'react';
import Input from './../common/input';
import Joi from 'joi-browser';
import useForm from './../hooks/useForm';

const LoginForm = () => {
  const schema = {
    username: Joi.string().required().min(3).label('Username'),
    password: Joi.string().required().label('Password'),
  };

  const doSubmit = () => {
    // call server
    console.log(values);
  };

  const [values, handleChange, handleSubmit, errors, validate] = useForm(
    schema,
    doSubmit
  );

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name='username'
          label='Username'
          onChange={handleChange}
          value={values.username || ''}
          type='text'
          error={errors.username}
        />
        <Input
          name='password'
          label='Password'
          onChange={handleChange}
          value={values.password || ''}
          type='password'
          error={errors.password}
        />
        <button disabled={validate()} className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
