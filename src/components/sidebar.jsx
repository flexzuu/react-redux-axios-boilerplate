import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

const propTypes = {
  currentPath: PropTypes.string.isRequired,
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.checkActive = this.checkActive.bind(this);
  }

  checkActive(paths) {
    let active = '';
    if (_.includes(paths, this.props.currentPath)) {
      active = 'active';
    }
    return active;
  }

  render() {
    return (

      <div className="col-sm-3 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
          <li className={this.checkActive(['/'])}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={this.checkActive(['companies'])}>
            <Link to="companies">Companies</Link>
          </li>
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    currentPath: state.routing.locationBeforeTransitions.pathname,
  };
}

export default connect(
  mapStateToProps,
  { }
)(Sidebar);
