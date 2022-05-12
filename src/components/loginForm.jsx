import React, { useContext } from 'react';
import Joi from 'joi-browser';
import jwtDecode from 'jwt-decode';
import useForm from './../hooks/useForm';
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import UserContext from './../context/userContext';

const LoginForm = (props) => {
  const schema = {
    username: Joi.string().required().min(3).label('Username'),
    password: Joi.string().required().label('Password'),
  };

  const userContext = useContext(UserContext);

  const doSubmit = async () => {
    try {
      const { data: jwt } = await login(values);
      userContext.setCurrentUser(jwtDecode(jwt));
      props.history.push('/');

      toast('Login Successful!');
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400)
        toast.error('Login Failed...');
    }
  };

  const [values, setValues, handleSubmit, renderButton, renderInput] = useForm(
    schema,
    doSubmit
  );

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {renderInput('username', 'Username')}
        {renderInput('password', 'Password', 'password')}
        {renderButton('Login')}
      </form>
    </div>
  );
};

export default LoginForm;
