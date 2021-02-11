<template>

	<mdb-row class="justify-content-center align-items-center">
		<mdb-col md="8" lg="6">

			<mdb-card class="m-0 mt-5">

				<mdb-card-header class="pt-4 text-center primary-color white-text">
					<mdb-card-title><strong>{{ $t('login') }}</strong></mdb-card-title>
				</mdb-card-header>

				<mdb-card-body class="mx-4">
					<!-- Material form login -->
					<form @submit.prevent="handleLogin" >
						<div class="grey-text">
							<mdb-input :label="$t('email')" type="email" v-model="username" />
							<mdb-input :label="$t('password')" type="password" v-model="password" />
							<p v-if="this.error" style='color: red;'>{{this.error.message}}</p>
						</div>
						<div class="text-center mt-5">
							<mdb-btn type="submit" color="primary">{{ $t('login') }}</mdb-btn>
						</div>
					</form>
					<!-- Material form login -->
				</mdb-card-body>

			</mdb-card>
		</mdb-col>
	</mdb-row>

</template>


<script>
import PageOptions from '../config/PageOptions.vue'

import { mapState, mapActions } from 'vuex'

export default {
	created() {
		PageOptions.showNavbar = false;
	},
	beforeRouteLeave (to, from, next) {
		PageOptions.showNavbar = true;
		next();
	},
	data: () => ({
    username: '',
		password: '',
  }),
  computed: {
    ...mapState('auth', ['status', 'error'])
  },
  methods: {
    ...mapActions('auth', ['login', 'setError']),
    handleLogin() {
      const { username, password } = this
      if (username && password) {
				this.login({ username, password })
				this.username = ''
				this.password = ''
      }
		},
  }
}
</script>
