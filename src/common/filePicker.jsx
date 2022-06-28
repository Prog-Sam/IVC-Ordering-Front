import { setBreadcrumbCallback } from 'raven-js';
import React, { Fragment, useState } from 'react';
import { saveFile } from '../services/fileService';

const FilePicker = ({ name, label, error, value, ...rest }) => {
  const [driveUrl, setDriveUrl] = useState('https://drive.google.com/file/d/');
  const [file, setFile] = useState(null);
  const [currentValue, setCurrentValue] = useState('');

  const urlAppender = (url) => {
    let localValue = currentValue == '' ? url : `${currentValue};${url}`;
    setCurrentValue(localValue);
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('fileUpload', file.data);
        const res = await saveFile(formData);
        setFile(null);
        urlAppender(driveUrl + res.data.response.data.id);
      } catch (ex) {
        console.log(ex);
      }
      return;
    }
    console.log('No file selected');
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const localFile = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setFile(localFile);
      console.log('hasFile');
      return;
    }
    console.log('no file');
    setFile(null);
  };

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
            id={`fileUpload`}
            name={`fileUpload`}
            type='file'
            onChange={handleFileChange}
            className='form-control d-flex align-items-left'
          />
        </div>
        <div>
          <button
            type='button'
            className='btn btn-primary d-flex align-items-left'
            name={name}
            onClick={handleSubmit}
          >
            Upload Image
          </button>
        </div>
        <div>
          <h6 className='d-flex align-items-left' name={name}>
            Links: {currentValue}
          </h6>
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default FilePicker;
