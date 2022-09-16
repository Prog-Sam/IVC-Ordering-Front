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
import { getCurrentUser } from '../services/authService';
import { generateOrderItemId } from '../utils/idGenerator';
import GradeDetails from './../common/gradeDetails';
import catDep from '../config/catalogDependencies.json';

const useCatalogForm = (
  schema,
  submitCallback,
  itemInDb = {},
  subscriberSchema = {}
) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    setSubscribers(subscriberSchema);
    if (itemInDb.id) {
      setState({
        ...itemInDb,
      });
      return;
    }
    setState({
      fromBranchKey: 177,
      toBranchKey: getCurrentUser().branchKey,
      userIdKey: getCurrentUser().id,
      typeName: 'PO',
      id: generateOrderItemId(),
      grades: [
        {
          id: 'OD',
          sph: '',
          cyl: '',
          axis: '',
          add: '',
          pd: '',
          qty: '',
        },
        {
          id: 'OS',
          sph: '',
          cyl: '',
          axis: '',
          add: '',
          pd: '',
          qty: '',
        },
      ],
    });
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

    localState = { ...updateDependence(pendingState, name) };

    setState({ ...pendingState, ...localState });
  };

  const updateDependence = (sentState, name) => {
    let localState = { ...sentState };
    const dependencies = !state.orderTypeKey
      ? { ...catDep['default'] }
      : { ...catDep[state.orderTypeKey.toString()] };

    let dependencyArray = dependencies[name];
    if (!dependencyArray) return sentState;
    for (let d of dependencyArray) {
      localState = { ...localState, [d.name]: d.value };
    }

    return localState;
  };

  const mapToViewModel = (data) => {
    let paths = Object.keys(schema);
    return _.pick(data, [...paths]);
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

  const handleGradeChange = (value, field, id) => {
    let index = _.findIndex(state.grades, { id: id });
    let grade = { ...state.grades[index], [field]: value };
    let localGrades = [...state['grades']];
    localGrades.splice(index, 1, grade);
    let localState = { ...state, ['grades']: localGrades };
    setState(localState);
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

  const renderGradeDetails = (name, orderType) => {
    return (
      <GradeDetails
        name={name}
        orderType={orderType}
        lpKey={state.lensParamKey}
        gDetails={state[name]}
        handleGradeChange={handleGradeChange}
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
    renderGradeDetails,
  ];
};

export default useCatalogForm;
