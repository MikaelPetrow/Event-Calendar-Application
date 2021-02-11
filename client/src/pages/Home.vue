<template>
	<div>

		<mdb-row>

			<mdb-col class="col-md-4 text-left">
				<h3 class="page-header mt-5 mb-3">
				{{ $t('calendar') }}
				</h3>
			</mdb-col>

			<mdb-col class="col-md-6 text-right">
				<div v-if="user.role.id == 1" class="custom-control custom-switch mt-5 mb-3">
					<input v-model="editMode" type="checkbox" class="custom-control-input" id="customSwitch">
					<label class="custom-control-label" for="customSwitch">{{ $t('editMode') }}</label>
				</div>
			</mdb-col>

			<mdb-col class="col-md-2 text-right">
				<mdb-btn v-if="user.role.id == 1 && editMode == true" class="mt-5 mb-3" color="primary" size="sm" @click="handleEventCreate">
					<mdb-icon icon="plus" class="mr-1"/>
					{{ $t('createEvent') }}
				</mdb-btn>
			</mdb-col>

		</mdb-row>

		<mdb-card>
			<mdb-card-body>
				<Calendar @updateEvent="handleEventUpdate" />
			</mdb-card-body>
		</mdb-card>

		<EventModal
			:event="selectedEvent"
			:eventUsers="users"
			:eventTypes="eventTypes"
			:fileInfo="fileInfo"
			:isEdit="eventModalIsEdit"
			:editMode="editMode" />

	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Calendar from '../components/Calendar.vue'
import EventModal from '../components/EventModal'

export default {
	components: {
		Calendar,
		EventModal
	},
	data() {
		return {
			selectedEvent: {
				eventType: {},
				user: {}
			},
			eventModalIsEdit: false,
			editMode: false
		}
	},
	computed: {
		...mapState('auth', ['user']),
		...mapState('user', ['users']),
		...mapState('event', ['eventTypes']),
		...mapState('event', ['fileInfo']),
  },
	methods: {
		...mapActions('event', ['getEventTypes']),
		...mapActions('event', ['getFileInfo']),
		handleEventCreate(){
			this.eventModalIsEdit = false
			this.selectedEvent = {}
			this.$aModal.$emit('modal:show', 'event-modal')
		},
		handleEventUpdate(event) {
			this.eventModalIsEdit = true
			this.selectedEvent = event
			this.getFileInfo(this.selectedEvent.id)
			this.$aModal.$emit('modal:show', 'event-modal')
		},
	},
	created(){
		this.getEventTypes()
	}
}

</script>
<style>
	.custom-control-label {
		font-size: 20px;
	}
</style>
