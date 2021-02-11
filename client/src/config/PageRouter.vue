<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from "../store";

/** Pages **/
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Account from '../pages/Account.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/calendar', name: 'calendar', component: Home },
    { path: '/account', name: 'account', component: Account },
    { path: '/', redirect: '/calendar' },
    { path: '*', redirect: '/' },
  ]
})

// check login state
router.beforeEach((to, from, next) => {
  // if not logged in
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

export default router;
</script>
