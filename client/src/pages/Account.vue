<template>
	<div>

		<h3 class="page-header mt-5 mb-3">
			{{ $t('accountManagement') }}
			<mdb-btn color="primary" size="sm" class="float-right" @click="handleUserCreate">
				<mdb-icon icon="plus" class="mr-1"/>
				{{ $t('createUser') }}
			</mdb-btn>
		</h3>

		<mdb-row>
			<mdb-col>

				<mdb-card>
					<mdb-card-body>

						<UserTable
							:users="users"
							@userEdit="handleUserEdit" />

					</mdb-card-body>
				</mdb-card>

			</mdb-col>
    </mdb-row>

		<UserModal :user="selectedUser" :userRoles="roles" :isEdit="userModalIsEdit" />

	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'

export default {
	components: {
		UserTable,
		UserModal
	},
	data() {
		return {
			selectedUser: {},
			userModalIsEdit: false
		}
	},
	computed: {
		...mapState('user', ['users', 'roles']),
  },
	methods: {
		...mapActions('user', ['getUsers', 'getRoles']),
		handleUserCreate(){
			this.userModalIsEdit = false
			this.selectedUser = {}
			this.$aModal.$emit('modal:show', 'user-modal')
		},
		handleUserEdit(user) {
			this.userModalIsEdit = true
			this.selectedUser = user
			this.$aModal.$emit('modal:show', 'user-modal')
		}
	},
	created() {
		this.getUsers()
		this.getRoles()
	}
}
</script>

<style>
</style>
