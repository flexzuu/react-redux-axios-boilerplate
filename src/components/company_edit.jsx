import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import {
  updateCompany,
  deleteCompany,
} from '../actions/action_companies';
import Container from './container';
import Cell from './cell';
const propTypes = {
  updateCompany: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

class CompanyEdit extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  onSubmit(updatedData) {
    const { current: { id } } = this.props;
    this.props.updateCompany(id, updatedData);
  }

  handleDelete() {
    const { current: { id } } = this.props;
    this.props.deleteCompany(id);
  }

  validInputClass(toCheck) {
    return `form-input form-element
      ${toCheck.touched && toCheck.invalid
      ? 'input-invalid' : 'input-valid'}`;
  }

  render() {
    const { fields: { name, owner }, handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
        style={{
          marginTop: '-15px',
        }}
      >
        <fieldset>
          <legend>
            Edit Company Info
          </legend>
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
          <Container>
            <Cell>
              <button
                style={{ width: '100%' }}
                type="submit"
                className="button button-primary"
              >
                Update
              </button>
            </Cell>
            <Cell>
              <button
                style={{ width: '100%' }}
                type="button"
                onClick={this.handleDelete}
                className="button button-warn"
              >
                Delete
              </button>
            </Cell>
          </Container>
        </fieldset>
      </form>
    );
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

CompanyEdit.propTypes = propTypes;

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'CompanyEditForm',
  fields: ['name', 'owner'],
  validate,
},
state => ({ // mapStateToProps
  initialValues: state.companies.current,
  current: state.companies.current,
  isActive: state.companies.isCreating,
  //companyId: state.companies.current.id // will pull state into form's initialValues
}),
{ updateCompany, deleteCompany })(CompanyEdit);
