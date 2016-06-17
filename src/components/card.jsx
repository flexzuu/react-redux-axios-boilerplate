import React, { PropTypes } from 'react';
import Cell from './cell';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  tools: PropTypes.node,
};

function Card({ title, children, tools }) {
  return (
    <Cell>
      <div className="card">
        <div>
          <h4>
            {title}
          </h4>
          <div className="tool">{tools}</div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </Cell>
  );
}

Card.propTypes = propTypes;

export default Card;
