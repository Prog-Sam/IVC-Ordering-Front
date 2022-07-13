import React from 'react';
import { Link } from 'react-router-dom';

const ItemSettings = () => {
  return (
    <div>
      <h1>ITEMS SETTINGS</h1>
      <div>
        <h3>GENERAL</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/brands'>BRANDS</Link>
          </li>
          <li className='list-group-item'>
            <Link to='/colordays' className='list-group-item'>
              COLORS
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/suppliers' className='list-group-item'>
              SUPPLIERS
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/supplycategories' className='list-group-item'>
              SUPPLY CATEGORIES
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>LENS</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/indextypes'>INDEX TYPES</Link>
          </li>
          <li className='list-group-item'>
            <Link to='/lensitems' className='list-group-item'>
              LENS ITEMS
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/lensmaterials' className='list-group-item'>
              LENS MATERIALS
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/lensparams' className='list-group-item'>
              LENS PARAMETERS
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/lenstypes' className='list-group-item'>
              LENS TYPES
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/productfamilies' className='list-group-item'>
              PRODUCT FAMILIES
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>NON-LENS</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/csaitems' className='list-group-item'>
              CSA ITEMS
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/fsitems' className='list-group-item'>
              FS ITEMS
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/fscsamodels' className='list-group-item'>
              FSCSA MODELS
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ItemSettings;
