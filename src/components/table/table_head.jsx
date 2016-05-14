import React, { PropTypes } from 'react';

function TableHead({ headers }) {
  if (headers.length > 0) {
    return (
      <thead>
        <tr>
          {headers.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHead.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHead;
