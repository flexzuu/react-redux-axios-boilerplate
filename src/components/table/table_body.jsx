import React, { PropTypes } from 'react';

function TableBody({ data, row }) {
  if (data.length > 0) {
    return (
      <tbody>
        {data.map((item) => (
          <row.type {...row.props} item={item} key={item.key}> {row.children} </row.type>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.node.isRequired,
};

export default TableBody;
