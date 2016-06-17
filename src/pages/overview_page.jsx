import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchOverview } from '../actions/action_overview';
import DocumentTitle from 'react-document-title';
import Logger from '../utils/logger';
import { percent } from '../utils/formatting';
import Card from '../components/card';

const propTypes = {
  overview: PropTypes.object,
  fetchOverview: PropTypes.func.isRequired,
};

class OverviewPage extends Component {
  constructor(props) {
    super(props);
    this.logger = new Logger('OverviewPage');
    this.refresh = this.refresh.bind(this);
    this.chartstyle = {
      cutoutPercentage: 45, // This is 0 for Pie charts
      animation: {
        easing: 'easeOutBounce',
        steps: 100,
        rotate: true,
        scale: false,
      },
      responsive: true,
      circumference: Math.PI,
      rotation: 1.0 * Math.PI,
    };
  }

  componentWillMount() {
    this.refresh();
  }

  getChartData(active, inActive, activeTitle, inActiveTitle) {
    return {
      labels: [
        `${activeTitle}`,
        `${inActiveTitle}`,
      ],
      datasets: [
        {
          data: [active, inActive - active],
          backgroundColor: [
            '#5bc0de',
            '#f0ad4e',
          ],
          hoverBackgroundColor: [
            '#5bc0de',
            '#f0ad4e',
          ],
        }],
    };
  }

  refresh() {
    this.props.fetchOverview().catch((reason) => {
      const error = {
        status: reason.action.payload.status,
        statusText: reason.action.payload.statusText,
        serverError: reason.action.payload.data.error,
      };
      this.logger.error(error);
    });
  }

  render() {
    const { overview } = this.props;
    return (
      <DocumentTitle title="Overview">
        <div>
          <h1 className="page-header">Dashboard</h1>
          <div className="row">
            <div className="col-xs-6 col-sm-6">
              <Card
                title="Users"
                tools={
                  <p>
                    <button
                      className="btn btn-sm btn-circle btn-secondary"
                      onClick={this.refresh}
                      type="button"
                    >
                      <i className="fa fa-refresh" />
                    </button>
                  </p>
                }
              >
                Active users: {percent(overview.usersActive, overview.users, 2)}
              </Card>
            </div>
            <div className="col-xs-6 col-sm-6">
              <Card
                title="Users"
                tools={
                  <p>
                    <button
                      className="btn btn-sm btn-circle btn-secondary"
                      onClick={this.refresh}
                      type="button"
                    >
                      <i className="fa fa-refresh" />
                    </button>
                  </p>
                }
              >
              Active companies: {percent(overview.companiesActive, overview.companies, 2)}
              </Card>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

OverviewPage.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    overview: state.overview,
  };
}

export default connect(
  mapStateToProps,
  { fetchOverview }
)(OverviewPage);
