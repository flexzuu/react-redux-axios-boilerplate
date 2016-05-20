import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function TableBody({ data, row }) {
  if (data.length > 0) {
    return (
      <ReactCSSTransitionGroup
        component="tbody"
        transitionName={{
          enter: 'flipInX',
          leave: 'flipOutX',
          appear: 'flipInX',
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={250}
        transitionAppear
        transitionAppearTimeout={1000}
      >
        {data.map((item) => (
          <row.type
            {...row.props}
            item={item}
            key={item.key}
          >
            {row.children}
          </row.type>
        ))}
      </ReactCSSTransitionGroup>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.node.isRequired,
};

export default TableBody;
