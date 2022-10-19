import React from 'react';
import RSelect from 'react-select';

const BulkGradeDetailTable = ({
  gradeOptions,
  gDetails,
  handleGradeChange,
  handleDelete,
  isDisabled,
  supplyCategory,
}) => {
  const handleSelectChange = (opt, field, id) => {
    handleGradeChange(opt.value, field, id);
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
          <th style={{ width: '15%' }}>
            {supplyCategory == 2 ? 'ADD' : 'BASE CURVE'}
          </th>
          <th style={{ width: '15%' }}>
            {supplyCategory == 2 ? 'PD' : 'DIAMETER'}
          </th>
          <th style={{ width: '15%' }}>QTY</th>
          {!isDisabled && <th style={{ width: '15%' }}>ACTION</th>}
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
                value={gradeOptions.sph.filter(
                  (option) => option.value === g.sph
                )}
                defaultvalue={{ label: '', value: '' }}
                isDisabled={isDisabled}
              />
            </td>
            <td>
              <RSelect
                options={gradeOptions.cyl}
                name={'cyl'}
                inputId={'cyl'}
                onChange={(opt) => handleSelectChange(opt, 'cyl', g.id)}
                value={gradeOptions.cyl.filter(
                  (option) => option.value === g.cyl
                )}
                defaultvalue={{ label: '', value: '' }}
                isDisabled={isDisabled}
              />
            </td>
            <td>
              <RSelect
                options={gradeOptions.axis}
                name={'axis'}
                inputId={'axis'}
                onChange={(opt) => handleSelectChange(opt, 'axis', g.id)}
                value={
                  gradeOptions.axis.filter(
                    (option) => option.value === g.axis
                  ) || []
                }
                defaultvalue={{ label: '', value: '' }}
                isDisabled={isDisabled}
              />
            </td>
            <td>
              {supplyCategory == 2 && (
                <RSelect
                  options={gradeOptions.add}
                  name={'add'}
                  inputId={'add'}
                  onChange={(opt) => handleSelectChange(opt, 'add', g.id)}
                  value={gradeOptions.add.filter(
                    (option) => option.value === g.add
                  )}
                  defaultvalue={{ label: '', value: '' }}
                  isDisabled={isDisabled}
                />
              )}
              {supplyCategory == 1 && (
                <input
                  type={'number'}
                  id={'add'}
                  name={'add'}
                  className='form-control d-flex align-items-left'
                  onChange={(e) =>
                    handleInputChange(e.target.value, 'add', g.id)
                  }
                  value={g.add}
                  readOnly={isDisabled}
                />
              )}
            </td>
            <td>
              <input
                type={'number'}
                id={'pd'}
                name={'pd'}
                className='form-control d-flex align-items-left'
                onChange={(e) => handleInputChange(e.target.value, 'pd', g.id)}
                value={g.pd}
                readOnly={isDisabled}
              />
            </td>
            <td>
              <input
                type={'number'}
                id={'qty'}
                name={'qty'}
                className='form-control d-flex align-items-left'
                onChange={(e) => handleInputChange(e.target.value, 'qty', g.id)}
                value={g.qty}
                readOnly={isDisabled}
              />
            </td>
            {!isDisabled && (
              <td>
                <button
                  id={'qty'}
                  type='button'
                  name={'qty'}
                  className='form-control d-flex align-items-left btn btn-danger'
                  onClick={() => handleDelete(g.id)}
                  disabled={isDisabled}
                >
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BulkGradeDetailTable;
