import React, { useState, useEffect } from 'react';
import NonBulkGradeDetailTable from './nonBulkGradeDetailTable';
import BulkGradeDetailTable from './bulkGradeDetailTable';
import { getGradeOptions } from './../utils/gradeOptionsGenerator';

const GradeDetails = ({
  name,
  orderType,
  lpKey,
  handleGradeChange,
  gDetails = [],
  handleDelete,
  handleAddGrade,
  isDisabled,
}) => {
  return (
    <div>
      {(orderType == 1 || orderType == 3) && (
        <div>
          <h5>GRADE DETAILS</h5>
          <NonBulkGradeDetailTable
            name={name}
            gradeOptions={getGradeOptions(lpKey)}
            handleGradeChange={handleGradeChange}
            gDetails={gDetails}
            isDisabled={isDisabled}
          />
        </div>
      )}
      {orderType == 2 && (
        <div>
          <h5>GRADE DETAILS</h5>
          <BulkGradeDetailTable
            name={name}
            gradeOptions={getGradeOptions(lpKey)}
            handleGradeChange={handleGradeChange}
            gDetails={gDetails}
            handleDelete={handleDelete}
            isDisabled={isDisabled}
          />
          <button
            type='button'
            className='btn btn-success'
            style={{ marginBottom: '20px' }}
            onClick={handleAddGrade}
            disabled={isDisabled}
          >
            Add Grade
          </button>
        </div>
      )}
    </div>
  );
};

export default GradeDetails;
