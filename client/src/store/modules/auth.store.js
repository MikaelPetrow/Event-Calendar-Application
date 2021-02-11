import { authService } from '../../services'
import router from '../../config/PageRouter'

// initial state
const state = () => ({
  user: {},
  status: {},
  error: {},
})

// actions
const actions = {
  login({ commit }, { username, password }) {
    commit('loginRequest', { username });
    authService.login(username, password)
      .then(
        user => {
          commit('loginSuccess', user)
          router.push('/')
        },
        error => {
          commit('loginFailure', error)
        }
      );
  },
  logout({ commit }) {
    // logout
    authService.logout()
    router.push('/login')
    commit('logout')
  },
  setError({ commit }, { message }) {
    commit('error', { message });
  }
}

// mutations
const mutations = {
  loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
  },
  loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
  },
  loginFailure(state) {
      state.status = {};
      state.user = {};
  },
  logout(state) {
      state.status = {};
      state.user = {};
  },
  error(state, message) {
    state.error = message
  }
}

// getters
const getters = {
  user: state => state.user
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
