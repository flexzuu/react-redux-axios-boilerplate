import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import LoginPage from './login_page';
import NavigationBar from '../components/navigation_bar';
import Sidebar from '../components/sidebar';

const propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
class PageContainer extends Component {
  renderChildren() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <NavigationBar />
          <div className="container-fluid">
            <div className="row">
              <Sidebar />
              <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                {this.props.children}
              </div>
            </div>
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
