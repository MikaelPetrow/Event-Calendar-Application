<template>
  <div class="h-100">
    <navbar v-if="pageOptions.showNavbar">
    </navbar>
    <mdb-container fluid class="h-100">
      <router-view></router-view>
    </mdb-container>
  </div>
</template>

<script>
import './assets/css/custom.css'
import PageOptions from './config/PageOptions.vue'
import Navbar from './components/Navbar.vue'
import store from './store'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
		return {
			pageOptions: PageOptions
		}
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

html {
  height: 100%;
}
body {
  height: 100%;
  background: #f5f5f5;
}
</style>
