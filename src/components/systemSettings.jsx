import React from 'react';
import { Link } from 'react-router-dom';

const SystemSettings = () => {
  return (
    <div>
      <h1>SYSTEM SETTINGS</h1>
      <ul className='list-group'>
        <li to='/ordertypes' className='list-group-item'>
          <Link to='/ordertypes'>ORDER TYPES</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/transactiontypes'>TRANSACTION TYPES</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/units'>UNITS</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/users'>USERS</Link>
        </li>
      </ul>
    </div>
  );
};

export default SystemSettings;
