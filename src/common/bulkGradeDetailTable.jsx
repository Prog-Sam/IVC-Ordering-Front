import React from 'react';
import RSelect from 'react-select';

const BulkGradeDetailTable = ({
  gradeOptions,
  gDetails,
  handleGradeChange,
  handleDelete,
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
          <th style={{ width: '15%' }}>ADD</th>
          <th style={{ width: '15%' }}>PD</th>
          <th style={{ width: '15%' }}>QTY</th>
          <th style={{ width: '15%' }}>ACTION</th>
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
              />
            </td>
            <td>
              <RSelect
                options={gradeOptions.add}
                name={'add'}
                inputId={'add'}
                onChange={(opt) => handleSelectChange(opt, 'add', g.id)}
                value={gradeOptions.add.filter(
                  (option) => option.value === g.add
                )}
                defaultvalue={{ label: '', value: '' }}
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
            <td>
              <button
                id={'qty'}
                type='button'
                name={'qty'}
                className='form-control d-flex align-items-left btn btn-danger'
                onClick={() => handleDelete(g.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BulkGradeDetailTable;
