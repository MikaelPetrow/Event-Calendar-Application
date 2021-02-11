import { userService } from '../../services'

// initial state
const state = () => ({
  users: [],
  user: {},
  roles: [],
  error: {}
})

// actions
const actions = {
  getUsers({ commit }) {
    userService.getUsers()
      .then(
        users => {
          commit('getSuccess', users)
        },
        error => {
          commit('getFailure', error)
        }
      );
  },
  createUser({ commit }, user) {
    return userService.createUser(user)
      .then(
        user => {
          commit('createSuccess', user)
        },
        error => {
          commit('createFailure', error)
        }
      );
  },
  updateUser({ commit }, user) {
    return userService.updateUser(user)
      .then(
        user => {
          commit('updateSuccess', user)
        },
        error => {
          commit('updateFailure', error)
        }
      );
  },
  deleteUser({ commit }, user) {
    userService.deleteUser(user)
      .then(
        user => {
          commit('deleteSuccess', user)
        },
        error => {
          commit('deleteFailure', error)
        }
      );
  },
  getRoles({ commit }) {
    userService.getRoles()
      .then(
        roles => {
          commit('getRolesSuccess', roles)
        },
        error => {
          commit('getRolesFailure', error)
        }
      );
  },
}

// mutations
const mutations = {
  getSuccess(state, users) {
    state.users = users;
  },
  getFailure(state, error) {
    state.error = error;
  },
  createSuccess(state, user) {
    state.user = user;
  },
  createFailure(state, error) {
    state.error = error;
  },
  updateSuccess(state, user) {
    state.user = user;
  },
  updateFailure(state, error) {
    state.error = error;
  },
  deleteSuccess(state, user) {
    state.user = user;
  },
  deleteFailure(state, error) {
    state.error = error;
  },
  getRolesSuccess(state, roles) {
    state.roles = roles;
  },
  getRolesFailure(state, error) {
    state.error = error;
  },
}


const getters = {
  userResources: state => {
    let ur = []
    state.users.forEach((user, i) => {
      ur.push({
        id:user.id,
        title:user.firstname + ' ' + user.lastname,
        visible:user.visible,
      })
    });
    return ur;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
