import { handleResponse, authHeaders } from '../helpers'

export const userService = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getRoles,
};

function createUser(user) {
  const requestOptions = {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(user)
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/user', requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function getUsers() {
  const requestOptions = {
    method: 'GET',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/user', requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function updateUser(user) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(user)
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/user/'+user.id, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function deleteUser(user) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify(user)
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/user/'+user.id, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function getRoles() {
  const requestOptions = {
    method: 'GET',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/role', requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}
