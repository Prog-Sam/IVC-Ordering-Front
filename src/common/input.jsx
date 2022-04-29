import React, { Fragment } from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <Fragment>
      <div className='form-group'>
        <div>
          <label className='d-flex align-items-left' htmlFor={name}>
            {label}
          </label>
        </div>
        <div>
          <input
            {...rest}
            id={name}
            name={name}
            className='form-control d-flex align-items-left'
          />
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default Input;
