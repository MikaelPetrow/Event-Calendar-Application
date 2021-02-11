import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import Vue from 'vue'

import store from './store'
import router from './config/PageRouter'

import VueI18n from 'vue-i18n'
import i18n from './i18n'
Vue.use(VueI18n)

Vue.use(require('vue-moment'));

import VueAuthHref from 'vue-auth-href'
const options = {
  token: () => JSON.parse(localStorage.getItem('token')),
}
Vue.use(VueAuthHref, options)

import * as mdbvue from 'mdbvue'
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}

// modal event bus
Vue.prototype.$aModal = new Vue();

import App from './App.vue'

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
