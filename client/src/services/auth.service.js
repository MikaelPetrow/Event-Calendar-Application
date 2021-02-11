import { handleResponse, authHeaders } from '../helpers'

export const authService = {
  login,
  logout,
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/auth/signin', requestOptions)
    .then(handleResponse)
    .then(response => {
      if (response.token) {
        localStorage.setItem('token', JSON.stringify(response.token));
      }
      return response.user;
    })
}

function logout() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/auth/signout', requestOptions)
    .then(handleResponse)
    .then(response => {
      localStorage.removeItem('token');
      return response;
    });
}
