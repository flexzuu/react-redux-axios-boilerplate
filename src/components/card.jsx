import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  tools: PropTypes.node,
};

function Card({ title, children, tools }) {
  return (

    <div className="card">
      <div className="card-block">
        <h4 className="card-title">
          {title}
        </h4>
        <div className="tool">{tools}</div>
      </div>
      <div className="card-block">
        {children}
      </div>
    </div>
  );
}

Card.propTypes = propTypes;

export default Card;
