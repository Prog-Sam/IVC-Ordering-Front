import React, { Fragment, useState, useEffect } from 'react';
import RSelect from 'react-select';
import {
  getSelectedOption,
  getSelectOptions,
} from '../utils/reactSelectOption';

const RxField = ({ name, label, error, orderType, onChange, ...rest }) => {
  const [prefix, setPrefix] = useState({ id: '', value: '' });
  const [postfix, setPostfix] = useState('');
  const options = [
    { id: 'A', name: 'A' },
    { id: 'B', name: 'B' },
    { id: 'C', name: 'C' },
    { id: 'D', name: 'D' },
    { id: 'E', name: 'E' },
    { id: 'F', name: 'F' },
  ];

  const appendRx = (pre, post) => {
    if (orderType != 'BULK') return post;
    return pre ? `${pre.value}${post}` : post;
  };

  // if (orderType != 'BULK') setPrefix({ id: '', value: '' });

  return (
    <Fragment>
      <div className='form-group'>
        <div>
          <label className='d-flex align-items-left' htmlFor={name}>
            {label}
          </label>
        </div>
        {orderType == 'BULK' ? (
          <div>
            <table className='justify-content'>
              <tr>
                <td>
                  <RSelect
                    options={getSelectOptions(options)}
                    name={name}
                    inputId={name}
                    value={prefix}
                    className='form-control d-flex align-items-left'
                    onChange={(opt) => {
                      setPrefix(opt);
                      return onChange(appendRx(opt, postfix), name);
                    }} // Start Here
                    {...rest}
                  />
                </td>
                <td>
                  <input
                    {...rest}
                    id={name}
                    name={name}
                    value={postfix}
                    // onChange={(e) => onChange(e, name)}
                    onChange={(e) => {
                      setPostfix(e.target.value);
                      return onChange(appendRx(prefix, e.target.value), name);
                    }}
                    className='form-control d-flex align-items-left'
                  />
                </td>
              </tr>
            </table>
          </div>
        ) : (
          <div>
            <input
              {...rest}
              id={name}
              name={name}
              value={postfix}
              onChange={(e) => {
                setPrefix({ id: '', value: '' });
                setPostfix(e.target.value);
                return onChange(appendRx(prefix, e.target.value), name);
              }}
              className='form-control d-flex align-items-left'
            />
          </div>
        )}
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default RxField;