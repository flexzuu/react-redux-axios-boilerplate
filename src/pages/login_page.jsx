import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../actions/action_auth';
import DocumentTitle from 'react-document-title';

const propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login({ email, password }) {
    this.props.login(email, password);
  }

  validInputClass(toCheck) {
    return `form-group ${toCheck.touched && toCheck.invalid ? 'has-danger' : ''}`;
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <DocumentTitle title="Login">
        <div>
          <h3>
            Admin Dashboard
          </h3>
          <form
            className="m-t"
            role="form"
            onSubmit={handleSubmit(this.login)}
          >
            <div className={this.validInputClass(email)}>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
                {...email}
              />
            </div>
            <div className={this.validInputClass(password)}>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                {...password}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary block full-width m-b"
            >
              Login
            </button>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}
function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Enter a email';
  }

  if (!values.password) {
    errors.password = 'Enter a password';
  }

  return errors;
}

LoginPage.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'LoginPageForm',
  fields: ['email', 'password'],
  validate,
},
mapStateToProps,
{ login })(LoginPage);
