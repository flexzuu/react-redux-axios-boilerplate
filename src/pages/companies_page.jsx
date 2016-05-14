import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCompanies, selectCompany, toggleCreateCompany } from '../actions/action_companies';
import Companies from '../components/companies';
import CompanyEdit from '../components/company_edit';
import CompanyAdd from '../components/company_add';
import DocumentTitle from 'react-document-title';
import Card from '../components/card';

const propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  current: PropTypes.object,
  fetchCompanies: PropTypes.func.isRequired,
  selectCompany: PropTypes.func.isRequired,
  toggleCreateCompany: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

class CompaniesPage extends Component {
  constructor(props) {
    super(props);

    this.companyClickHandler = this.companyClickHandler.bind(this);
    this.toggleCreateCompany = this.toggleCreateCompany.bind(this);
    this.refreshCompanies = this.refreshCompanies.bind(this);
  }

  componentWillMount() {
    this.props.fetchCompanies()
    .then(({ value }) => {
      this.props.selectCompany(value.data[0]);
    });
  }

  toggleCreateCompany() {
    this.props.toggleCreateCompany();
  }

  companyClickHandler(company) {
    this.props.selectCompany(company);
  }

  refreshCompanies() {
    this.props.fetchCompanies();
  }

  tabIndexHelper(index) {
    const { isActive } = this.props;
    if (isActive) {
      return -1;
    }
    return index;
  }

  renderEditInsert() {
    if (this.props.current === null) {
      return (
        <div className="card-block">
          <p className="card-text">
            No company selected...
          </p>
        </div>
      );
    }
    return (<CompanyEdit />);
  }

  renderTools() {
    return (
      <a
        className="dropdown-toggle"
        data-toggle="dropdown"
        href="#"
      >
        <i className="fa fa-wrench" />
      </a>
    );
  }

  render() {
    return (
      <DocumentTitle title="Company">
        <div>
          <CompanyAdd />
          <div className="row">
            <div className="col-sm-6">
              <Card
                title="Companies"
                tools={
                  <p>
                    <button
                      onClick={this.toggleCreateCompany}
                      className="btn btn-sm btn-primary"
                      tabIndex={this.tabIndexHelper(2)}
                      type="button"
                    >
                      <i className="fa fa-plus" />
                    </button>
                    <button
                      className="btn btn-sm btn-secondary m-l-1"
                      onClick={this.refreshCompanies}
                      tabIndex={this.tabIndexHelper(1)}
                      type="button"
                    >
                      <i className="fa fa-refresh" />
                    </button>
                  </p>
                }
              >
                <Companies
                  companies={this.props.companies}
                  companyClickHandler={this.companyClickHandler}
                  activeCompany={this.props.current}
                />
              </Card>
            </div>
            <div className="col-sm-6">
              <Card
                title="Edit Companies"
              >
                {this.renderEditInsert()}
              </Card>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

CompaniesPage.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isActive: state.companies.isCreating,
    companies: state.companies.all,
    current: state.companies.current,
  };
}

export default connect(
  mapStateToProps,
  { fetchCompanies, selectCompany, toggleCreateCompany }
)(CompaniesPage);
