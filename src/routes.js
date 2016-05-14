import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PageContainer from './pages/page_container';
import CompaniesPage from './pages/companies_page';
import OverviewPage from './pages/overview_page';
import PageNotFound from './pages/not_found_page';

export default (
  <Route path="/" component={PageContainer}>
    <IndexRoute component={OverviewPage} />
    <Route path="companies" component={CompaniesPage} />
    <Route path="*" component={PageNotFound} />
  </Route>
);
