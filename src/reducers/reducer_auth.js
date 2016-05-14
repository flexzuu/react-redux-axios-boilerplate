import {
  LOGIN,
  LOGOUT,
} from '../actions/const';

const INITIAL_STATE = {
  isLoggedIn: false,
  info: {
    email: '',
    firstName: '',
    lastName: '',
    lang: '',
    role: '',
  },
};

function newState(state, info, isLoggedIn) {
  return { ...state, info, isLoggedIn };
}

export default function (state = INITIAL_STATE, action) {
  const isError = /.*_ERROR(.*?)$/;
  switch (action.type) {
    case `${LOGIN}_SUCCESS`:
      return newState(state, action.payload.data.user, true);
    case `${LOGIN}_ERROR`:
      return INITIAL_STATE;
    case `${LOGOUT}_SUCCESS`:
      return INITIAL_STATE;
    default:
      if (action.type.match(isError)) {
        if (action.payload.status === 401) {
          return INITIAL_STATE;
        }
      }
      return state;
  }
}
