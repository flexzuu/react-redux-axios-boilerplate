import { LOGIN, LOGOUT } from './const';

export function logout() {
  return {
    type: LOGOUT,
    payload: Promise.resolve(),
  };
}

export function login(email, password) {
  return {
    type: LOGIN,
    payload: Promise.resolve({
      data: {
        user: {
          email,
          firstName: 'Firstname',
          lastName: 'Lastname',
          lang: 'en',
          role: 'ADMIN',
        },
      },
    }),
  };
}
