import {
  FETCH_OVERVIEW,
} from '../actions/const';

const INITIAL_STATE = {
  users: 0,
  usersActive: 0,
  companies: 0,
  companiesActive: 0,
};

function fetch(state, action) {
  return action.payload.data;
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${FETCH_OVERVIEW}_SUCCESS`:
      return fetch(state, action);
    case `${FETCH_OVERVIEW}_ERROR`:
      return state;
    default:
      return state;
  }
}
