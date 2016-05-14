import React, { PropTypes } from 'react';

function Captation({ text }) {
  if (text) {
    return (
      <caption>
        {text}
      </caption>
    );
  }
  return null;
}

Captation.propTypes = {
  text: PropTypes.string,
};

export default Captation;
