import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Container({ children }) {
  return (
    <div className="grid-flex-container">
      {children}
    </div>
  );
}

Container.propTypes = propTypes;

export default Container;
