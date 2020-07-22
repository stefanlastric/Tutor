import React from 'react';

const Table = (props) => {
  const { headers, data, options } = props;
  return (
    <table className='table'>
      <thead className='table_header'>
        <tr className='table_header_row'>
          {headers.map((header, index) => (
            <th key={index}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row, index) => (
            <tr key={index}>
              {headers.map((header, index) => (
                <td key={index} className={`${header.greened && 'greened'}`}>
                  <span
                    className={`table_row_data ${
                      header.greened && 'greened_data'
                    } `}
                  >
                    {options &&
                    options.customComponents &&
                    options.customComponents[header.key]
                      ? options.customComponents[header.key].component(row)
                      : row[header.key]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
