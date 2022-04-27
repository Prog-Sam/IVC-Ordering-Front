import React from 'react';
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

  const [values, handleSubmit, renderButton, renderInput] = useForm(
    schema,
    doSubmit
  );

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {renderInput('username', 'Username')}
        {renderInput('password', 'Password', 'password')}
        {renderButton('Login')};
      </form>
    </div>
  );
};

export default LoginForm;
