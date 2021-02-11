import { handleResponse, authHeaders } from '../helpers'
import moment from 'moment'

export const eventService = {
  createEvent,
  getEvents,
  updateEvents,
  deleteEvent,
  getEventTypes,
  getFile,
  getFileInfo,
  deleteFileInfo,
};

function getEvents() {
  const requestOptions = {
    method: 'GET',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/event', requestOptions)
    .then(handleResponse)
    .then(response => {
      const format = "YYYY-MM-DD"
      response.forEach(element => {
        element.start = moment(element.start).format(format);
        element.end = moment(element.end).format(format);
      });
      return response;
    });
}

function createEvent(event) {
  let token = JSON.parse(localStorage.getItem('token'));
  let formData = new FormData();
  if (event.files){
    for (var i = 0; i < event.files.length; i++) {
      var file = event.files[i];
      formData.append('files', file);
    }
  }
  formData.append('title', event.title);
  formData.append('start', event.start);
  formData.append('end', event.end);
  formData.append('eventTypeId', event.eventTypeId);
  formData.append('userId', event.userId);
  const requestOptions = {
    method: 'POST',
    headers: {'Authorization': 'Bearer ' + token},
    body: formData
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/event', requestOptions)
    .then(handleResponse)
    .then((response) => {
       return response
    });
}

function updateEvents(event) {
  let token = JSON.parse(localStorage.getItem('token'));
  let formData = new FormData();
  if (event.files){
    for (var i = 0; i < event.files.length; i++) {
      var file = event.files[i];
      formData.append('files', file);
    }
  }
  formData.append('title', event.title);
  formData.append('start', event.start);
  formData.append('end', event.end);
  formData.append('eventTypeId', event.eventTypeId);
  formData.append('userId', event.userId);
  const requestOptions = {
    method: 'PUT',
    headers: {'Authorization': 'Bearer ' + token},
    body: formData
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/event/'+event.id, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response
    });
}

function deleteEvent(event) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/event/'+event.id, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response
    });
}

function getEventTypes() {
  const requestOptions = {
    method: 'GET',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/event-type', requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function getFileInfo(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/fileInfo/' + id, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function deleteFileInfo(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/fileInfo/'+ id, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response
    });
}

function getFile(fileName) {
  const requestOptions = {
    method: 'GET',
    headers: authHeaders(),
  };
  return fetch( process.env.VUE_APP_API_URL + '/api/file/' + fileName, requestOptions)
    .then(response => {
      var file = new Blob([response.data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL)
      return fileURL
    });
}
