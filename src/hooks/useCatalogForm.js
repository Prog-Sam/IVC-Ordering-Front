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
import SoDetails from './../common/soDetail';
import { addNewGrade } from './../utils/catalogMethods';
import { mapToSchema } from '../utils/itemizer';
import { getOrderWithCn } from '../services/cartService';

const useCatalogForm = (
  schema,
  submitCallback,
  itemInDb = {},
  subscriberSchema = {},
  temp = false
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
      orderTypeKey: 2,
    });
  }, []);

  useEffect(() => {
    const order = getOrderWithCn(state.rxNumber, temp) || {};
    let localOrderTypeKey = 0;

    if (order.orderType == 'BULK') localOrderTypeKey = 2;
    if (order.orderType == 'JOB ORDER') localOrderTypeKey = 1;
    if (order.orderType == 'SPECIAL ORDER') localOrderTypeKey = 3;
    if (order.orderType == 2) localOrderTypeKey = 2;
    if (order.orderType == 1) localOrderTypeKey = 1;
    if (order.orderType == 3) localOrderTypeKey = 3;
    if (itemInDb.id) {
      setState({ ...itemInDb, ['orderTypeKey']: localOrderTypeKey });
      return;
    }

    if (!state.rxNumber) {
      setState({
        fromBranchKey: 177,
        toBranchKey: getCurrentUser().branchKey,
        userIdKey: getCurrentUser().id,
        typeName: 'PO',
        id: generateOrderItemId(),
        orderTypeKey: localOrderTypeKey,
      });
      return;
    }

    setState({ ...state, ['orderTypeKey']: localOrderTypeKey });
  }, [state.rxNumber]);

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
    return mapToSchema(data, schema);
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(mapToViewModel(state), schema, options);
    if (!error) return null;

    const localErrors = {};
    for (let item of error.details) localErrors[item.path[0]] = item.message;

    // console.log(localErrors);
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

  const handleGradeDelete = (id) => {
    let index = _.findIndex(state.grades, { id: id });
    let localGrades = [...state['grades']];
    localGrades.splice(index, 1);
    let localState = { ...state, ['grades']: localGrades };
    setState(localState);
  };

  const handleAddGrade = () => {
    let localGrades = addNewGrade([...state['grades']]);
    let localState = { ...state, ['grades']: localGrades };
    setState(localState);
  };

  const handleSoChange = (value, field) => {
    let soDetail = { ...state.soDetails, [field]: value };
    let localState = { ...state, ['soDetails']: soDetail };
    setState(localState);
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

  const renderGradeDetails = (name, orderType, isDisabled = false) => {
    return (
      <GradeDetails
        name={name}
        orderType={orderType}
        lpKey={state.lensParamKey}
        gDetails={state[name]}
        handleGradeChange={handleGradeChange}
        handleDelete={handleGradeDelete}
        handleAddGrade={handleAddGrade}
        isDisabled={isDisabled}
        supplyCategory={state.supplyCategoryKey}
      />
    );
  };

  const renderSoDetails = (name, isDisabled = false) => {
    return (
      <SoDetails
        name={name}
        soDetails={state[name]}
        handleSoChange={handleSoChange}
        isDisabled={isDisabled}
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
    renderSoDetails,
  ];
};

export default useCatalogForm;
