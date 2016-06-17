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
    return `form-input form-element
      ${toCheck.touched && toCheck.invalid
      ? 'input-invalid' : 'input-valid'}`;
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <DocumentTitle title="Login">
        <form onSubmit={handleSubmit(this.login)}>
          <fieldset>
            <legend>
              Login
            </legend>
            <div className="form-element">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className={this.validInputClass(email)}
                required
                {...email}
              />
            </div>
            <div className="form-element">
              <label htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                className={this.validInputClass(password)}
                required
                {...password}
              />
            </div>
            <button
              type="submit"
              className="button button-primary"
            >Login</button>
          </fieldset>
        </form>
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
