import React, { useState, useEffect } from 'react';
import RSelect from 'react-select';
import { getFrameShapes, getFrameTypes } from '../utils/catalogMethods';
import { getSelectOptions } from './../utils/reactSelectOption';
import FrameShapeSelector from './FrameShapeSelector';

const SoDetails = ({
  name,
  handleSoChange,
  soDetails = {
    horizontal: '',
    vertical: '',
    bridge: '',
    frameType: '',
    frameShape: '',
  },
  isDisabled,
}) => {
  const handleSelectChange = (opt, field) => {
    handleSoChange(opt.value, field);
  };
  const handleInputChange = (value, field) => {
    handleSoChange(value, field);
  };
  const handleClick = (opt, field) => {
    handleSoChange(opt.value, field);
  };
  //   useEffect(() => {
  //   }, []);
  return (
    <div>
      <h4>SO Details</h4>
      <div className='row' style={{ userSelect: 'auto' }}>
        <div className='col-md-4' style={{ userSelect: 'auto' }}>
          <label className='d-flex align-items-left' htmlFor={'horizontal'}>
            {'Horizontal'}
          </label>
          <input
            type={'number'}
            id={'horizontal'}
            name={'horizontal'}
            className='form-control d-flex align-items-left'
            onChange={(e) => handleInputChange(e.target.value, 'horizontal')}
            value={soDetails.horizontal || ''}
            readOnly={isDisabled}
          />
        </div>
        <div className='col-md-4' style={{ userSelect: 'auto' }}>
          <label className='d-flex align-items-left' htmlFor={'vertical'}>
            {'Vertical'}
          </label>
          <input
            type={'number'}
            id={'vertical'}
            name={'vertical'}
            className='form-control d-flex align-items-left'
            onChange={(e) => handleInputChange(e.target.value, 'vertical')}
            value={soDetails.vertical || ''}
            readOnly={isDisabled}
          />
        </div>
        <div className='col-md-4' style={{ userSelect: 'auto' }}>
          <label className='d-flex align-items-left' htmlFor={'bridge'}>
            {'Bridge'}
          </label>
          <input
            type={'number'}
            id={'bridge'}
            name={'bridge'}
            className='form-control d-flex align-items-left'
            onChange={(e) => handleInputChange(e.target.value, 'bridge')}
            value={soDetails.bridge || ''}
            readOnly={isDisabled}
          />
        </div>
      </div>
      <div className='row' style={{ userSelect: 'auto' }}>
        <div className='col-md-4' style={{ userSelect: 'auto' }}>
          <label className='d-flex align-items-left' htmlFor={'frameType'}>
            {'Frame Type'}
          </label>
          <RSelect
            options={getSelectOptions(getFrameTypes())}
            name={'frameType'}
            inputId={'frameType'}
            onChange={(opt) => handleSelectChange(opt, 'frameType')}
            value={getSelectOptions(getFrameTypes()).filter(
              (option) => option.value === soDetails.frameType
            )}
            defaultvalue={{ label: '', value: '' }}
            isDisabled={isDisabled}
          />
        </div>
      </div>
      <FrameShapeSelector
        name={'frameShape'}
        handleClick={(opt) => handleClick(opt, 'frameShape')}
        frameShapes={getSelectOptions(getFrameShapes())}
        value={getSelectOptions(getFrameShapes()).filter(
          (option) => option.value === soDetails.frameShape
        )}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default SoDetails;
