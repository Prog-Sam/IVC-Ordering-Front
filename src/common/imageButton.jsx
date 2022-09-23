import React, { useState, useEffect } from 'react';

const ImageButton = ({ name, imageSource, handleClick, label, value }) => {
  return (
    <div className='col-m-3' style={{ padding: '10px', userSelect: 'auto' }}>
      <button
        name={name}
        key={name}
        type='button'
        onClick={() => {
          handleClick({ label, value }, name);
        }}
        style={{ userSelect: 'auto' }}
      >
        <img
          src={imageSource}
          alt
          style={{ width: '300px', height: '290px', userSelect: 'auto' }}
        />
      </button>
    </div>
  );
};

export default ImageButton;
