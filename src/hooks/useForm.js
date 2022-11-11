import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import _ from 'lodash';
import Input from './../common/input';
import Select from '../common/select';
import ColorDaySelector from '../common/colorDaySelector';
import RxField from '../common/rxField';
import FilePicker from '../common/filePicker';
import { handleColor } from '../utils/ColorIndex';
import {
  getSelectedOption,
  getSelectOptions,
} from '../utils/reactSelectOption';
import { mapToSchema } from '../utils/itemizer';

const useForm = (
  schema,
  submitCallback,
  itemInDb = {},
  subscriberSchema = {}
) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [subscribers, setSubscribers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setSubscribers(subscriberSchema);
    if (itemInDb) {
      setState({ ...itemInDb });
      return;
    }
    setState({});
  }, []);

  const checkSubscribers = (name, value, pendingState) => {
    let localState = { ...pendingState };

    if (subscribers.length > 0) {
      for (const subscriber of subscribers) {
        subscriber.keys[name] = value || '';
        subscriber.value = subscriber.getValue(subscriber.keys);
        localState[subscriber.path] = subscriber.value;
      }
    }
    setState({ ...pendingState, ...localState });
  };

  const mapToViewModel = (data) => {
    return mapToSchema(data, schema);
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(mapToViewModel(state), schema, options);
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

    setIsDisabled(true);
    submitCallback();
    setIsDisabled(false);
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

  const handleRxChange = ({ pre, post }, name) => {
    const rxNumber = `${pre.value || ''}${post}`;
    setState({
      ...state,
      [name]: rxNumber,
      [`objectVal${name}`]: pre,
    });

    const localErrors = { ...errors };
    const errorMessage = validateProperty({ name: name, value: rxNumber });
    if (errorMessage) localErrors[name] = errorMessage;
    else delete localErrors[name];
    setErrors(localErrors);
  };

  const handleSelectChange = ({ value, label }, { name }) => {
    let pendingState = {
      ...state,
      [name]: value,
      ['objectVal-' + name]: { label, value },
    };
    checkSubscribers(name, label, pendingState);

    const localErrors = { ...errors };
    const errorMessage = validateProperty({ value, name });
    if (errorMessage) localErrors[name] = errorMessage;
    else delete localErrors[name];

    setErrors(localErrors);
  };

  const handleColorSelect = (name, sign, value = {}) => {
    let localState = { ...state };
    let newColors = handleColor(
      sign,
      JSON.parse(localState[name] || '[]'),
      value
    );
    localState[name] = JSON.stringify(newColors);
    setState({ ...localState });
  };

  const handleUpload = (url, name) => {
    console.log('handleUpload Called');
    setState({ ...state, [name]: url });
  };

  const renderButton = (label, isDisabled = false) => {
    return (
      <button
        disabled={validate() || isDisabled}
        className='btn btn-primary d-flex align-items-left'
      >
        {label}
      </button>
    );
  };

  const renderInput = (name, label, type = 'text', readOnly = false) => {
    return (
      <Input
        name={name}
        label={label}
        onChange={handleChange}
        value={state[name] || ''}
        type={type}
        readOnly={readOnly}
        error={errors[name]}
      />
    );
  };

  const renderLabel = (name, label) => {
    return (
      <h4 className='d-flex align-items-left'>
        {name}: {label}
      </h4>
    );
  };

  const renderSelect = (name, label, options, isDisabled = false) => {
    return (
      <Select
        name={name}
        label={label}
        options={getSelectOptions(options)}
        isDisabled={isDisabled}
        error={errors[name]}
        value={getSelectOptions(options).filter(
          (option) => option.value === state[name]
        )}
        onChange={handleSelectChange}
      />
    );
  };

  const renderRxField = (name, label) => {
    return (
      <RxField
        name={name}
        label={label}
        // options={getSelectOptions(options)}
        error={errors[name]}
        orderType={state.orderType}
        // value={getSelectOptions(options).filter(
        //   (option) => option.value === state[name]
        // )}
        onChange={handleRxChange}
      />
    );
  };

  const renderColorDaySelector = (name, label, options, isDisabled = false) => {
    return (
      <ColorDaySelector
        name={name}
        label={label}
        options={getSelectOptions(options)}
        isDisabled={isDisabled}
        error={errors[name]}
        value={state[name]}
        onChange={handleSelectChange}
        handleColorSelect={handleColorSelect}
      />
    );
  };

  const renderFilePicker = (name, label) => {
    return (
      <FilePicker
        name={name}
        label={label}
        error={errors[name]}
        value={state[name]}
        handleUpload={handleUpload}
      />
    );
  };
  return [
    state,
    setState,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
    renderColorDaySelector,
    renderRxField,
    renderFilePicker,
  ];
};

export default useForm;
