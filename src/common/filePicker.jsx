import React, { Fragment, useState } from 'react';
import { saveFile } from '../services/fileService';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const FilePicker = ({ name, label, error, value, handleUpload, ...rest }) => {
  const [driveUrl, setDriveUrl] = useState('https://drive.google.com/file/d/');
  const [file, setFile] = useState(null);
  const [currentValue, setCurrentValue] = useState('');

  const urlAppender = (url) => {
    let localValue = value == '' || !value ? url : `${value};${url}`;
    // setCurrentValue(localValue);
    handleUpload(localValue, name);
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        toast('Uploading File...');
        const formData = new FormData();
        formData.append('fileUpload', file.data);
        const res = await saveFile(formData);
        setFile(null);
        urlAppender(driveUrl + res.data.response.data.id);
        toast('File Uploaded Successfully');
      } catch (ex) {
        toast.error(ex);
      }
      return;
    }
    toast.error('No file selected');
  };

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const compressedFile = await compressImageFile(e);
      const localFile = {
        preview: URL.createObjectURL(compressedFile),
        data: compressedFile,
      };
      setFile(localFile);
      console.log('hasFile');
      return;
    }
    console.log('no file');
    setFile(null);
  };

  const compressImageFile = async (e) => {
    const imageFile = e.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }

    try {
      return await imageCompression(imageFile, options);
    } catch (error) {
      console.log(error);
    }

  }

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
            Links: {value}
          </h6>
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default FilePicker;
