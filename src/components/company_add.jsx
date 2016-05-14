import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { toggleCreateCompany, addCompany } from '../actions/action_companies';

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

  render() {
    const { fields: { name, owner }, handleSubmit } = this.props;
    if (this.props.isActive) {
      return (
        <div
          style={this.style}
          className="modal"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.toggleVisibility}
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Add Company
                </h4>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control" {...name}
                      autoFocus="autofocus"
                      tabIndex="1"
                    />
                    <div className="text-help">
                      {name.touched ? name.error : ''}
                    </div>
                  </div>
                  <div
                    className={`form-group ${owner.touched && owner.invalid ? 'has-danger' : ''}`}
                  >
                    <label>Owner</label>
                    <input
                      type="text"
                      className="form-control" {...owner}
                      tabIndex="2"
                    />
                    <div className="text-help">
                      {owner.touched ? owner.error : ''}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" tabIndex="3">Add</button>
                </form>
              </div>
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
