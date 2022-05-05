import React, { Fragment } from 'react';
import RSelect from 'react-select';

const Select = ({
  name,
  label,
  options,
  error,
  handleSelectChange,
  ...rest
}) => {
  return (
    <Fragment>
      <div className='form-group'>
        <div>
          <label className='d-flex align-items-left' htmlFor={name}>
            {label}
          </label>
        </div>
        <div>
          <RSelect
            options={options}
            name={name}
            inputId={name}
            onChange={(opt) => handleSelectChange(opt, name)}
            {...rest}
          />
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default Select;
