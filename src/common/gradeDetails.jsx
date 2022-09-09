import React, { useState, useEffect } from 'react';
import JOGradeDetailsTable from './joGradeDetailTable';
import { getGradeOptions } from './../utils/gradeOptionsGenerator';

const GradeDetails = ({
  name,
  orderType,
  lpKey,
  handleGradeChange,
  gDetails,
}) => {
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
      {orderType == 1 && (
        <div>
          <h5>GRADE DETAILS</h5>
          <JOGradeDetailsTable
            name={name}
            gradeOptions={getGradeOptions(lpKey)}
            handleGradeChange={handleGradeChange}
            gDetails={gDetails}
          />
        </div>
      )}
    </div>
  );
};

export default GradeDetails;
