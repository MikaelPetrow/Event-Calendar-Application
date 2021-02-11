<template>

		<mdb-modal :show="show" @close="show = false">
			<mdb-modal-header>
        <mdb-modal-title>{{ isEdit ? $t('editUser') : $t('createUser') }}</mdb-modal-title>
      </mdb-modal-header>
			<mdb-modal-body>
				<form class="margin-bottom-0">
					<div class="grey-text">
						<mdb-input v-model="editableUser.username" :label="$t('username')" type="email" :placeholder="$t('username')" required />
						<mdb-input v-model="editableUser.password" :label="$t('password')" type="password" :placeholder="$t('password')" required />
						<mdb-input v-model="editableUser.firstname" :label="$t('firstname')" type="text" :placeholder="$t('firstname')" required />
						<mdb-input v-model="editableUser.lastname" :label="$t('lastname')" type="text" :placeholder="$t('lastname')" required />
						<mdb-select v-model="roles" :label="$t('role')" :placeholder="$t('selectOption')" @getValue="handleRoleChange" required />
						<mdb-select v-model="visible" :label="$t('isVisible?')" :placeholder="$t('selectOption')" @getValue="handleVisibilityChange" required/>
						<mdb-select v-model="active" :label="$t('isActive?')" :placeholder="$t('selectOption')" @getValue="handleActivityChange" required/>
					</div>
					<div class="text-center">
						<mdb-row class="justify-content-md-center">
							<mdb-btn color="primary" type="submit" @click.native.prevent="isEdit ? handleUpdate() : handleCreate()">
								{{ isEdit ? $t('save') : $t('create') }}
							</mdb-btn>
							<mdb-btn color="primary" @click.native="show = false">{{ $t('cancel') }}</mdb-btn>
						</mdb-row>
					</div>
				</form>
			</mdb-modal-body>
		</mdb-modal>

</template>

<script>
import i18n from '../i18n'
import { mapActions } from 'vuex'

export default {
	name: "UserModal",
	components: {
	},
	props: {
		user: Object,
		userRoles: Array,
		isEdit: {
      type: Boolean,
      default: false,
    },
	},
  data: function () {
    return {
			show: false,
			roles: [],
			visible: [],
			active: [],
			editableUser: {},
			modalId: 'user-modal'
    }
	},
	computed: {

	},
  methods: {
    ...mapActions('user', ['getUsers', 'updateUser', 'createUser', 'deleteUser']),
		handleRoleChange(value, text){
			this.editableUser.roleId = value
		},
		handleVisibilityChange(value, text){
			this.editableUser.visible = value
		},
		handleActivityChange(value, text){
			this.editableUser.active = value
		},
    handleUpdate() {
      if ( this.editableUser.username
				&& this.editableUser.firstname
				&& this.editableUser.lastname
				&& this.editableUser.roleId ) {

				this.updateUser(this.editableUser)
					.then(
						() => {
							this.getUsers();
							this.show = false
						}, error => {
							console.log(error);
						}
					);
      }
    },
		handleCreate() {
			if ( this.editableUser.username
				&& this.editableUser.password
				&& this.editableUser.firstname
				&& this.editableUser.lastname
				&& this.editableUser.roleId ) {

				this.createUser(this.editableUser)
					.then(
						() => {
							this.getUsers();
							this.show = false
						}, error => {
							console.log(error);
						}
					);
			}
		},
  },
	watch: {
    user: {
      immediate: true,
      handler (userObj) {
				this.editableUser = {...userObj}
				// user visible options
				this.visible = [
					{text: i18n.tc('yes'), value: 1, selected: userObj.visible},
					{text: i18n.tc('no'), value: 0, selected: !userObj.visible}
				]
				// user active options
				this.active = [
					{text: i18n.tc('yes'), value: 1, selected: userObj.active},
					{text: i18n.tc('no'), value: 0, selected: !userObj.active}
				]
      }
		},
		userRoles: {
			immediate: true,
      handler (userRoles) {
				let opts = []
				this.userRoles.forEach((role, i) => {
					let selected = this.user.role && role.id == this.user.role.id
					opts.push({text: role.name, value:role.id, selected: selected})
				});
				this.roles = opts
      }
		},
  },
	mounted() {
		// user modal:show listener
		this.$aModal.$on('modal:show', modalId => {
			if(this.modalId == modalId){
				this.show = true;
			}
		});
		// user modal:hide listener
		this.$aModal.$on('modal:hide', modalId => {
			if(this.modalId == modalId){
				this.show = false;
			}
		});
	},
};
</script>

<style>
.select-list {
	border:0px;
	outline:0px;
	border-bottom: 1px solid #ced4da;
	margin: .5rem 0 0 0;
	padding: 0;
	color: #666666;
	box-shadow: none;
}
</style>
