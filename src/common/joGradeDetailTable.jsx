import React from 'react';
import RSelect from 'react-select';

const JOGradeDetailsTable = ({ gradeOptions, gDetails, handleGradeChange }) => {
  const handleSelectChange = (opt, field, id) => {
    handleGradeChange(opt, field, id);
  };
  const handleInputChange = (value, field, id) => {
    handleGradeChange(value, field, id);
  };
  return (
    <table className='table'>
      <thead>
        <tr>
          <th style={{ width: '10%' }}>{'[POSSITION]'}</th>
          <th style={{ width: '15%' }}>SPH</th>
          <th style={{ width: '15%' }}>CYL</th>
          <th style={{ width: '15%' }}>AXIS</th>
          <th style={{ width: '15%' }}>ADD</th>
          <th style={{ width: '15%' }}>PD</th>
          <th style={{ width: '15%' }}>QTY</th>
        </tr>
      </thead>
      <tbody>
        {gDetails.map((g) => (
          <tr>
            <td>{g.id}</td>
            <td>
              {/* <input
                id={'sph'}
                name={'sph'}
                className='form-control d-flex align-items-left'
              /> */}
              <RSelect
                options={gradeOptions.sph}
                name={'sph'}
                inputId={'sph'}
                onChange={(opt) => handleSelectChange(opt, 'sph', g.id)}
                value={g.sph}
              />
            </td>
            <td>
              <RSelect
                options={gradeOptions.cyl}
                name={'cyl'}
                inputId={'cyl'}
                onChange={(opt) => handleSelectChange(opt, 'cyl', g.id)}
                value={g.cyl}
              />
            </td>
            <td>
              <RSelect
                options={gradeOptions.axis}
                name={'axis'}
                inputId={'axis'}
                onChange={(opt) => handleSelectChange(opt, 'axis', g.id)}
                value={g.axis}
              />
            </td>
            <td>
              <RSelect
                options={gradeOptions.add}
                name={'add'}
                inputId={'add'}
                onChange={(opt) => handleSelectChange(opt, 'add', g.id)}
                value={g.add}
              />
            </td>
            <td>
              <input
                id={'pd'}
                name={'pd'}
                className='form-control d-flex align-items-left'
                onChange={(e) => handleInputChange(e.target.value, 'pd', g.id)}
                value={g.pd}
              />
            </td>
            <td>
              <input
                id={'qty'}
                name={'qty'}
                className='form-control d-flex align-items-left'
                onChange={(e) => handleInputChange(e.target.value, 'qty', g.id)}
                value={g.qty}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JOGradeDetailsTable;
