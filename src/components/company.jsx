import React, { PropTypes } from 'react';

const propTypes = {
  item: PropTypes.object,
  activeCompany: PropTypes.object,
  clickHandler: PropTypes.func.isRequired,
};

function Company({ item, activeCompany, clickHandler }) {
  const isActive = activeCompany != null && item.id === activeCompany.id;
  return (
    <tr className={isActive ? 'table-active' : ''} onClick={() => clickHandler(item)}>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{item.owner}</td>
    </tr>
  );
}

Company.propTypes = propTypes;

export default Company;
