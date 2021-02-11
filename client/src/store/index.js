import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import auth from './modules/auth.store'
import user from './modules/user.store'
import event from './modules/event.store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const dataState = new createPersistedState({
  paths: ['auth', 'user']
})

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  modules: {
    auth,
    user,
    event,
  },
  plugins: [dataState],
  strict: debug,
})
