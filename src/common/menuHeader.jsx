import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';
import { showIf } from '../utils/protector';
import { getCurrentUser } from '../services/authService';

const MenuHeader = ({ path, header, buttonLabel, searchQuery, onSearch }) => {
  return (
    <Fragment>
      <h1 className='d-flex align-items-left'>{header}</h1>
      <div className='d-flex align-items-left'>
        {showIf(
          <Link
            to={`/${path}/New`}
            className='btn btn-primary'
            style={{ marginBottom: 20 }}
          >
            New {buttonLabel}
          </Link>,
          getCurrentUser(),
          [0, 6, 7]
        )}
      </div>
      <SearchBox value={searchQuery} onChange={onSearch} />
    </Fragment>
  );
};

export default MenuHeader;
