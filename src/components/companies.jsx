import React, { PropTypes } from 'react';

import Table from './table';
import Company from './company';

const propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  companyClickHandler: PropTypes.func,
  activeCompany: PropTypes.object,
};

function Companies({ companies, companyClickHandler, activeCompany }) {
  const data = companies.map((company) => ({ ...company, key: company.id }));
  if (companies.length > 0) {
    return (
      <Table
        data={data}
        headers={['ID', 'Name', 'Owner']}
        className="table-with-hover"
      >
        <Company activeCompany={activeCompany} clickHandler={companyClickHandler} />
      </Table>
    );
  }
  return (
    <p>
      No companies found...
    </p>
  );
}

Companies.propTypes = propTypes;

export default Companies;
