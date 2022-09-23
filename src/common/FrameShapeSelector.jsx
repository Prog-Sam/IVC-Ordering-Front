import React, { useState, useEffect } from 'react';
import RSelect from 'react-select';
import ImageButton from './imageButton';

const FrameShapeSelector = ({ name, frameShapes, handleClick, ...rest }) => {
  return (
    <div
      className='row'
      style={{ userSelect: 'auto', paddingTop: '20px', paddingBottom: '20px' }}
    >
      <div className='col-md-12' style={{ userSelect: 'auto' }}>
        <div style={{ userSelect: 'auto' }}>
          <div className='form-group' style={{ userSelect: 'auto' }}>
            <div className='row' style={{ userSelect: 'auto' }}>
              <div className='col-md-6' style={{ userSelect: 'auto' }}>
                <RSelect
                  options={frameShapes}
                  name={name}
                  inputId={name}
                  isDisabled={true}
                  {...rest}
                />
              </div>
            </div>
            <div className='row' style={{ userSelect: 'auto' }}>
              {frameShapes.map((f) => (
                <ImageButton
                  name={name}
                  imageSource={require(`../images/${f.label}.jpg`)}
                  handleClick={handleClick}
                  label={f.label}
                  value={f.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameShapeSelector;
