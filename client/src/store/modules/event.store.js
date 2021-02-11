import { eventService } from '../../services'

// initial state
const state = () => ({
  events: [],
  event: {},
  eventTypes: [],
  fileURL: '',
  fileInfo: [],
  error: {}
})

// actions
const actions = {
  getEvents({ commit }) {
    return eventService.getEvents()
      .then(
        events => {
          commit('getSuccess', events)
        },
        error => {
          commit('getFailure', error)
        }
      );
  },
  createEvent({ commit }, event) {
    return eventService.createEvent(event)
      .then(
        event => {
          commit('createSuccess', event)
        },
        error => {
          commit('createFailure', error)
        }
      );
  },
  updateEvent({ commit }, event) {
    return eventService.updateEvents(event)
      .then(
        event => {
          commit('updateSuccess', event)
        },
        error => {
          commit('updateFailure', error)
        }
      );
  },
  deleteEvent({ commit }, event) {
    return eventService.deleteEvent(event)
      .then(
        event => {
          commit('deleteSuccess', event)
        },
        error => {
          commit('deleteFailure', error)
        }
      );
  },
  getEventTypes({ commit }) {
    return eventService.getEventTypes()
      .then(
        eventTypes => {
          commit('getTypesSuccess', eventTypes)
        },
        error => {
          commit('getTypesFailure', error)
        }
      );
  },
  getFile({ commit }, fileName) {
    return eventService.getFile(fileName)
      .then(
        fileURL => {
          commit('getFileSuccess', fileURL)
        },
        error => {
          commit('getFileFailure', error)
        }
      );
  },
  getFileInfo({ commit }, id) {
    return eventService.getFileInfo(id)
      .then(
        fileInfo => {
          commit('getFileInfoSuccess', fileInfo)
        },
        error => {
          commit('getFileInfoFailure', error)
        }
      );
  },
  deleteFileInfo({ commit }, id) {
    return eventService.deleteFileInfo(id)
      .then(
        fileInfo => {
          commit('fileInfoDeleteSuccess', fileInfo)
        },
        error => {
          commit('fileInfoDeleteFailure', error)
        }
      );
  },
}

// mutations
const mutations = {
  getSuccess(state, events) {
    state.events = events
  },
  getFailure(state, error) {
    state.error = error
  },
  createSuccess(state, event) {
    state.event = event
  },
  createFailure(state, error) {
    state.error = error
  },
  updateSuccess(state, event) {
    state.event = event
  },
  updateFailure(state, error) {
    state.error = error
  },
  deleteSuccess(state, event) {
    state.event = event
  },
  deleteFailure(state, error) {
    state.error = error
  },
  getTypesSuccess(state, eventTypes) {
    state.eventTypes = eventTypes
  },
  getTypesFailure(state, error) {
    state.error = error
  },
  getFileSuccess(state, fileURL) {
    state.fileURL = fileURL
  },
  getFileFailure(state, error) {
    state.error = error
  },
  getFileInfoSuccess(state, fileInfo) {
    state.fileInfo = fileInfo
  },
  getFileInfoFailure(state, error) {
    state.error = error
  },
  fileInfoDeleteSuccess(state, fileInfo) {
    state.fileInfo = fileInfo
  },
  fileInfoDeleteFailure(state, error) {
    state.error = error
  },
}

const getters = {
  eventsWithResources: state => {
    let er = []
    state.events.forEach((event, i) => {
      er.push({
        id:event.id,
        resourceId: event.userId,
        title:event.title,
        start: event.start,
        end: event.end,
        backgroundColor: event.eventType.color,
        fullEventObject: event
      })
    });
    return er;
  },
  fileURL: state => {
    return state.fileURL;
  },
  fileInfo: state => {
    return state.fileInfo;
  },
  eventTypes: state => {
    return state.eventTypes;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
