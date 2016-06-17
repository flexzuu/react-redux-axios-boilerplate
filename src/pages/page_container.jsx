import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import LoginPage from './login_page';
import Navigation from '../components/navigation';

const propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
class PageContainer extends Component {
  renderChildren() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <Navigation />
          <div className="container">
            {this.props.children}
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <LoginPage />
      </div>
    );
  }

  render() {
    return (
      <DocumentTitle title="Prototype">
        {this.renderChildren()}
      </DocumentTitle>
    );
  }
}

PageContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(
  mapStateToProps,
  { }
)(PageContainer);
