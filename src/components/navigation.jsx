import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-fontawesome';
import { logout } from '../actions/action_auth';
import { Link, IndexLink } from 'react-router';

const propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <nav className="top-nav top-nav-dark cf" role="navigation">
        <input id="menu-toggle" className="menu-toggle" type="checkbox" />
        <label htmlFor="menu-toggle">Menu</label>
        <ul className="list-unstyled list-inline cf">
          <li>
            <button
              onClick={this.logout}
              className="button button-small button-warn"
              type="button"
            >
              <Icon name="sign-out" /> Sign Out
            </button>
          </li>
          <li>
            <IndexLink to="/" activeClassName="active">Dashboard</IndexLink>
          </li>
          <li>
            <Link to="companies" activeClassName="active">Companies</Link>
          </li>
          <li>
            <Link to="graph" activeClassName="active">Graph</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = propTypes;

function mapStateToProps(state) {
  return { user: state.auth.info };
}

export default connect(mapStateToProps, { logout })(Navigation);
