<template>
  <mdb-navbar expand="large" dark color="blue">

    <mdb-navbar-brand>
      <strong>{{ $t('calendar') }}</strong>
    </mdb-navbar-brand>

    <mdb-navbar-toggler>
      <mdb-navbar-nav v-if="user.role.id == 1" class="ml-5">
        <mdb-nav-item href="/calendar" :class="getNavItemClass('calendar')">{{ $t('calendar') }}</mdb-nav-item>
        <mdb-nav-item href="/account" :class="getNavItemClass('account')">{{ $t('user_plural') }}</mdb-nav-item>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <mdb-nav-item @click="handleLogout">{{ $t('logout') }}</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'navbar',
  components: {
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    getNavItemClass(routeName) {
      let classes = 'mr-3';
      classes += this.$router.currentRoute.name == routeName ? ' active' : ''
      return classes;
    },
    handleLogout() {
      this.logout()
    },
  }
}
</script>

<style>
</style>
