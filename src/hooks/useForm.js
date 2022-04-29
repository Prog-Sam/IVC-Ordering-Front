import { useState } from 'react';
import Input from './../common/input';
import Joi from 'joi-browser';

const useForm = (schema, submitCallback, itemInDb = {}) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(state, schema, options);
    if (!error) return null;

    const localErrors = {};
    for (let item of error.details) localErrors[item.path[0]] = item.message;

    return localErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const localSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, localSchema);

    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    submitCallback();
  };

  const handleChange = (e) => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.value });

    const localErrors = { ...errors };
    const errorMessage = validateProperty(e.target);
    if (errorMessage) localErrors[e.target.name] = errorMessage;
    else delete localErrors[e.target.name];

    setErrors(localErrors);
  };

  const renderButton = (label) => {
    return (
      <button
        disabled={validate()}
        className='btn btn-primary d-flex align-items-left'
      >
        {label}
      </button>
    );
  };

  const renderInput = (name, label, type = 'text') => {
    return (
      <Input
        name={name}
        label={label}
        onChange={handleChange}
        value={state[name] || ''}
        type={type}
        error={errors[name]}
      />
    );
  };

  return [state, handleSubmit, renderButton, renderInput];
};

export default useForm;
