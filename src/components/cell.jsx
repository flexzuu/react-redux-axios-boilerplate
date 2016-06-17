import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Cell({ children }) {
  return (
    <div className="grid-flex-cell">
      {children}
    </div>
  );
}

Cell.propTypes = propTypes;

export default Cell;
