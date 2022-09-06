import React, { useState, useEffect } from 'react';
import Select from './select';
import Input from './input';
import JOGradeDetailsTable from './joGradeDetailTable';

const GradeDetails = ({ name, orderType, gDetails }) => {
  const [grades, setGrades] = useState([]);
  const [bulkGrades, setBulkGrades] = useState([]);

  useEffect(() => {
    setGrades([
      {
        id: 'OD',
        lensParamKey: '0000000101',
        lensItemKey: '010001000101000310019002',
        cdKey: '002202',
        sph: '',
        cyl: '',
        axis: '',
        add: '',
        pd: '',
        qty: '',
      },
      {
        id: 'OS',
        lensParamKey: '0000000101',
        lensItemKey: '010001000101000310019002',
        cdKey: '002202',
        sph: '',
        cyl: '',
        axis: '',
        add: '',
        pd: '',
        qty: '',
      },
    ]);
    setBulkGrades([
      {
        id: '1',
        lensParamKey: '0000000101',
        lensItemKey: '010001000101000310019002',
        cdKey: '002202',
        sph: '',
        cyl: '',
        axis: '',
        add: '',
        pd: '',
        qty: '',
      },
      {
        id: '2',
        lensParamKey: '0000000101',
        lensItemKey: '010001000101000310019002',
        cdKey: '002202',
        sph: '',
        cyl: '',
        axis: '',
        add: '',
        pd: '',
        qty: '',
      },
      {
        id: '3',
        lensParamKey: '0000000101',
        lensItemKey: '010001000101000310019002',
        cdKey: '002202',
        sph: '',
        cyl: '',
        axis: '',
        add: '',
        pd: '',
        qty: '',
      },
    ]);
  }, []);
  return (
    <div>
      <h5>GRADE DETAILS</h5>
      <JOGradeDetailsTable gDetails={grades} />
    </div>
  );
};

export default GradeDetails;
