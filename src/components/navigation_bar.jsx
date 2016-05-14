import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-fontawesome';
import { logout } from '../actions/action_auth';
import { Link } from 'react-router';
const propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-dark navbar-fixed-top bg-inverse">
        <Link className="navbar-brand" to="/">
          {this.props.user.email}
        </Link>
        <form className="form-inline pull-xs-right">
          <button
            onClick={this.logout}
            className="btn btn-warning-outline"
            type="button"
          >
            <Icon name="sign-out" /> Sign Out
          </button>
        </form>
      </nav>
    );
  }
}

NavigationBar.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.info,
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(NavigationBar);
