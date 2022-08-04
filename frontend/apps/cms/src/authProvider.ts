import { AuthProvider } from 'react-admin';

export interface Options {
  obtainAuthTokenUrl?: string;
}

function jwtTokenAuthProvider(options: Options = {}): AuthProvider {
  const opts = {
    obtainAuthTokenUrl: '/api/token/',
    ...options,
  };
  return {
    login: async ({ username, password }) => {
      const request = new Request(opts.obtainAuthTokenUrl, {
        method: 'POST',
        body: JSON.stringify({ email: username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      return fetch(request)
        .then(async (response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error((await response.json()).detail);
          }
        })
        .then((user) => localStorage.setItem('user', JSON.stringify(user)));
    },
    logout: () => {
      localStorage.removeItem('user');
      return Promise.resolve();
    },
    checkAuth: () =>
      localStorage.getItem('user') ? Promise.resolve() : Promise.reject(),
    checkError: (error) => {
      const status = error.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('user');
        return Promise.reject();
      }
      return Promise.resolve();
    },
    getPermissions: () => {
      const user = getUser();
      return Promise.resolve(user ? user.permissions : []);
    },
  };
}

export function getAccessToken() {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user).access;
  return undefined;
}
export function getRefreshToken() {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user).refresh;
  return undefined;
}
export function getUser() {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  return undefined;
}

export default jwtTokenAuthProvider;
