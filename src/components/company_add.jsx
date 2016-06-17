import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { toggleCreateCompany, addCompany } from '../actions/action_companies';
import Container from './container';
import Cell from './cell';

const propTypes = {
  toggleCreateCompany: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

class CompanyAdd extends Component {
  constructor(props) {
    super(props);

    this.style = {
      display: 'block',
      backgroundColor: 'rgba(66, 66, 66, 0.8)',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  onSubmit(addData) {
    this.props.addCompany(addData);
  }

  toggleVisibility() {
    this.props.toggleCreateCompany();
  }

  validInputClass(toCheck) {
    return `form-input form-element
      ${toCheck.touched && toCheck.invalid
      ? 'input-invalid' : 'input-valid'}`;
  }

  render() {
    const { fields: { name, owner }, handleSubmit } = this.props;
    if (this.props.isActive) {
      return (
        <div>
          <div className="overlay" />
          <div className='modal'>
            <div className='modal-head cf'>
              <h3 className='modal-title'>Add Company</h3>
              <button
                onClick={this.toggleVisibility}
                className='modal-close button button-unstyled'
              >×</button>
            </div>
            <div className='modal-body'>
              <form id="companyAddForm" onSubmit={handleSubmit(this.onSubmit)}>
                <div className="form-element">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className={this.validInputClass(name)}
                    required
                    {...name}
                  />
                </div>
                <div className="form-element">
                  <label htmlFor="owner">
                    Owner
                  </label>
                  <input
                    type="text"
                    id="owner"
                    placeholder="Owner"
                    className={this.validInputClass(owner)}
                    required
                    {...owner}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type="submit" className='button' form="companyAddForm">Add</button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a name';
  }

  if (!values.owner) {
    errors.owner = 'Enter a owner';
  }

  return errors;
}

CompanyAdd.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isActive: state.companies.isCreating,
  };
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'CompanyAddForm',
  fields: ['name', 'owner'],
  validate,
},
mapStateToProps,
{ toggleCreateCompany, addCompany })(CompanyAdd);
