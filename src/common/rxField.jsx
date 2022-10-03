import React, { Fragment, useState, useEffect } from 'react';
import RSelect from 'react-select';
import {
  getSelectedOption,
  getSelectOptions,
} from '../utils/reactSelectOption';

const RxField = ({ name, label, error, orderType, onChange, ...rest }) => {
  const [prefix, setPrefix] = useState({ id: '', value: '' });
  const [postfix, setPostfix] = useState('');
  const [options, setOptions] = useState([
    { id: 'A', name: 'A' },
    { id: 'B', name: 'B' },
    { id: 'C', name: 'C' },
    { id: 'D', name: 'D' },
    { id: 'E', name: 'E' },
    { id: 'F', name: 'F' },
  ]);

  const appendRx = (pre, post) => {
    if (orderType != 'BULK') return post;
    return pre ? `${pre.value}${post}` : post;
  };

  const returnRawValue = (pre, post) => {
    if (orderType != 'BULK') return { pre: '', post: post };
    return pre ? { pre: pre, post: post } : { pre: '', post: post };
  };

  const checkBulkPrefix = (orderType) => {
    if (orderType == 'BULK') {
      if (!prefix) return false;
      if (!postfix) return false;
    }
    return true;
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
                <td style={{ width: '10%' }}>
                  <RSelect
                    options={getSelectOptions(options)}
                    name={name}
                    inputId={name}
                    value={prefix}
                    className='form-control d-flex align-items-left'
                    onChange={(opt) => {
                      setPrefix(opt);
                      return onChange(returnRawValue(opt, postfix), name);
                    }} // Start Here
                    {...rest}
                  />
                </td>
                <td style={{ width: '90%' }}>
                  <input
                    {...rest}
                    id={name}
                    name={name}
                    value={postfix}
                    // onChange={(e) => onChange(e, name)}
                    onChange={(e) => {
                      setPostfix(e.target.value);
                      return onChange(
                        returnRawValue(prefix, e.target.value),
                        name
                      );
                    }}
                    className='form-control d-flex align-items-left'
                  />
                </td>
              </tr>
            </table>
          </div>
        ) : (
          <div>
            <tr>
              <td style={{ width: '10%' }}>
                {orderType && <h5>{orderType == 'JOB ORDER' ? 'J' : 'S'}</h5>}
              </td>
              <td style={{ width: '90%' }}>
                <input
                  {...rest}
                  type='number'
                  id={name}
                  name={name}
                  value={postfix}
                  onChange={(e) => {
                    setPrefix({ id: '', value: '' });
                    setPostfix(e.target.value);
                    return onChange(
                      returnRawValue(prefix, e.target.value),
                      name
                    );
                  }}
                  className='form-control d-flex align-items-left'
                />
              </td>
            </tr>
          </div>
        )}
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default RxField;
