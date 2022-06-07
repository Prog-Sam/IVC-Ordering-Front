import React, { Fragment, useState } from 'react';
import RSelect from 'react-select';
import { formatter } from './../utils/formatter';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ColorDaySelector = ({
  name,
  label,
  options,
  error,
  handleSelectChange,
  handleColorSelect,
  ...rest
}) => {
  const [color, setColor] = useState('');
  const [day, setDay] = useState('');
  return (
    <Fragment>
      <div className='form-group'>
        <div>
          <label className='d-flex align-items-left' htmlFor={name}>
            {label}
          </label>
        </div>
        <input
          {...rest}
          id={name}
          name={name}
          readOnly='readOnly'
          placeholder='Color + Days'
          className='form-control d-flex align-items-left'
        />
        <div>
          <table className='table justify-content'>
            <tr>
              <td>
                <RSelect
                  options={options}
                  name={name + 'color'}
                  inputId={name + 'color'}
                  onChange={(e) => {
                    setColor(e);
                  }}
                  value={color}
                />
              </td>
              <td>
                <input
                  id={name + 'day'}
                  name={name + 'day'}
                  placeholder='Days'
                  className='form-control d-flex align-items-left'
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                  value={day}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type='button'
                  className='btn btn-primary d-flex align-items-left'
                  onClick={() => {
                    if (color.label && day.toString()) {
                      handleColorSelect(
                        name,
                        '+',
                        color.label + formatter(day, '00')
                      );
                      setColor({});
                      setDay('');
                      return;
                    }
                    toast.error('Please do not leave Color or day empty.');
                  }}
                >
                  Add Color+Day
                </button>
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-danger d-flex align-items-left'
                  onClick={() => {
                    setColor({});
                    setDay('');
                    handleColorSelect(name, '-');
                  }}
                >
                  Remove Color+Day
                </button>
              </td>
            </tr>
          </table>
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default ColorDaySelector;
