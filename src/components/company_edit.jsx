import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import {
  updateCompany,
  deleteCompany,
} from '../actions/action_companies';

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

  tabIndexHelper(index) {
    const { isActive } = this.props;
    if (isActive) {
      return -1;
    }
    return index;
  }

  render() {
    const { fields: { name, owner }, handleSubmit } = this.props;

    return (
      <div className="card-block">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
            <label>Name</label>
            <input
              type="text"
              className="form-control" {...name}
              tabIndex={this.tabIndexHelper(3)}
            />
            <div className="text-help">
              {name.touched ? name.error : ''}
            </div>
          </div>
          <div className={`form-group ${owner.touched && owner.invalid ? 'has-danger' : ''}`}>
            <label>Owner</label>
            <input
              type="text"
              className="form-control"
              {...owner}
              tabIndex={this.tabIndexHelper(4)}
            />
            <div className="text-help">
              {owner.touched ? owner.error : ''}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            tabIndex={this.tabIndexHelper(5)}
          >
            Update
          </button>
          <button
            type="button"
            onClick={this.handleDelete}
            className="btn btn-danger m-l-1"
            tabIndex={this.tabIndexHelper(6)}
          >
            Delete
          </button>
        </form>
      </div>
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
