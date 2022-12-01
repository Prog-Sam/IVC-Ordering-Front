import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import {
  getColorDay,
  saveColorDay,
  updateColorDay,
} from '../../../services/colorDayService';
import { toast } from 'react-toastify';

const ColorDayForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    colorName: Joi.string().required().min(1).max(20).label('Name'),
  };

  useEffect(() => {
    const colorDayId = props.match.params.id;
    if (colorDayId === 'New') return;

    async function populateColorDay() {
      let { data } = await getColorDay(colorDayId);
      setColorDay(data);
    }

    populateColorDay();

    if (!colorDay) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveColorDay(mapToViewModel(colorDay))
        : await updateColorDay(mapToViewModel(colorDay));
      toast(
        `Color ${colorDay.name} with the id of ${colorDay.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/colorDays');
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const [
    colorDay,
    setColorDay,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} COLOR
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('colorName', 'Name')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default ColorDayForm;
