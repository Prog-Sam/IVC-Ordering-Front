import React from 'react';
import { Link } from 'react-router-dom';

const BranchSettings = () => {
  return (
    <div>
      <h1>BRANCHES SETTINGS</h1>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to='/branches'>BRANCHES</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/branchtypes'>BRANCH TYPES</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/transactionSeries'>TRANSACTION SERIES</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/malls'>MALLS</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/suppliers'>SUPPLIERS</Link>
        </li>
      </ul>
    </div>
  );
};

export default BranchSettings;
