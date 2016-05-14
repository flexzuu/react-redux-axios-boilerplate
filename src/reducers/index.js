import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import CompaniesReducer from './reducer_companies';
import OverviewReducer from './reducer_overview';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  companies: CompaniesReducer,
  overview: OverviewReducer,
  auth: AuthReducer,
});

export default rootReducer;
