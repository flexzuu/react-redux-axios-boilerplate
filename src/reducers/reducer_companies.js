import {
  FETCH_COMPANIES,
  SELECT_COMPANY,
  TOGGLE_CREATE_COMPANY,
  UPDATE_COMPANY,
  ADD_COMPANY,
  REMOVE_COMPANY,
} from '../actions/const';

const INITIAL_STATE = { all: [], current: null, isCreating: false };

function setCompanies(state, action) {
  const all = action.payload.data;
  return { ...state, all };
}

function updateCompanyResolved(state, action) {
  // TODO: throw error if id is not found!
  const index = state.all.findIndex((company) => company.id === action.payload.data.id);
  const all = [
    ...state.all.slice(0, index),
    action.payload.data,
    ...state.all.slice(index + 1),
  ];
  return { ...state, all };
}

function addCompanyResolved(state, action) {
  const all = [
    ...state.all,
    action.payload.data,
  ];
  return { ...state, all, isCreating: false };
}

function removeCompanyResolved(state, action) {
  // TODO: throw error if id is not found!
  const index = state.all.findIndex((company) => company.id === action.meta.id);
  const all = [
    ...state.all.slice(0, index),
    ...state.all.slice(index + 1),
  ];
  const current = all[0];
  return { ...state, all, current };
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${FETCH_COMPANIES}_SUCCESS`:
      return setCompanies(state, action);
    case SELECT_COMPANY:
      return { ...state, current: action.payload.data };
    case `${UPDATE_COMPANY}_SUCCESS`:
      return updateCompanyResolved(state, action);
    case `${ADD_COMPANY}_SUCCESS`:
      return addCompanyResolved(state, action);
    case TOGGLE_CREATE_COMPANY:
      return { ...state, isCreating: !state.isCreating };
    case `${REMOVE_COMPANY}_SUCCESS`:
      return removeCompanyResolved(state, action);
    default:
      return state;
  }
}
