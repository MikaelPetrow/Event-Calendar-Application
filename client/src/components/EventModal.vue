<template>
	<div>

		<mdb-modal v-if="editMode == true" :show="show" @close="show = false">
			<mdb-modal-header>
        <mdb-modal-title>{{ isEdit ? $t('editEvent') : $t('createEvent') }}</mdb-modal-title>
      </mdb-modal-header>
			<mdb-modal-body>
				<form class="margin-bottom-0">
						<mdb-input v-model="editableEvent.title" :label="$t('title')" type="text" :placeholder="$t('eventTitle')" required />

						<div class="md-form">
						<label class="active">{{ $t('dateRange') }}</label>
						<mdb-row>
							<mdb-col>
								<mdb-date-picker-2 inline v-model="editableEvent.start" value="editableEvent.start" :label="$t('startDate')" required />
							</mdb-col>
							<mdb-col>
								<mdb-date-picker-2 inline v-model="editableEvent.end" :label="$t('endDate')" required />
							</mdb-col>
						</mdb-row>
						</div>

						<mdb-select v-model="types" :label="$t('type')" :placeholder="$t('selectType')" @getValue="handleEventTypeChange" required />
						<mdb-select v-model="users" :label="$t('user')" :placeholder="$t('selectUser')" @getValue="handleUserChange" required />

						<mdb-row style="padding-left: 15px">
							<mdb-col>
								<mdb-row>
									<mdb-col>
										<mdb-row>
											<label class="active">{{ $t('file_plural') }}</label>
										</mdb-row>
										<mdb-row>
											<input type="file" name="files" @change="fileChange" multiple>
										</mdb-row>
										<div v-if="isEdit">
											<mdb-row v-for="(file, index) in fileInfo" :key="file.id" class="text-center">
												<mdb-col class="col-8">
													<mdb-row class="justify-content-start">
														<a style="margin-top: 10px" v-auth-href :href="fileInfo[index].url">{{fileInfo[index].name}}</a>
													</mdb-row>
												</mdb-col>
												<mdb-col class="col-4">
													<mdb-row class="justify-content-end" style="margin-right: 10px">
														<mdb-btn color="red" size="sm" @click.native="showConfirmation('file', fileInfo[index].id)">{{ $t('delete') }}</mdb-btn>
													</mdb-row>
												</mdb-col>
											</mdb-row>
										</div>
									</mdb-col>
								</mdb-row>
							</mdb-col>
						</mdb-row>


					<div class="text-center">
						<mdb-row class="justify-content-md-center">
							<mdb-btn color="primary" type="submit" @click.native.prevent="isEdit ? handleUpdate() : handleCreate()">
								{{ isEdit ? $t('save') : $t('create') }}
							</mdb-btn>
							<mdb-btn v-if="isEdit" color="red" @click.native="showConfirmation('event', '')">{{ $t('delete') }}</mdb-btn>
							<mdb-btn color="primary" @click.native="show = false">{{ $t('cancel') }}</mdb-btn>
						</mdb-row>
					</div>

				</form>
			</mdb-modal-body>
		</mdb-modal>

		<mdb-modal v-if="editMode == false" :show="show" @close="show = false">
			<mdb-modal-header>
        <mdb-modal-title>{{ $t('eventInfo') }}</mdb-modal-title>
      </mdb-modal-header>
			<mdb-modal-body>
				<mdb-row>
					<mdb-col>{{ $t('title') }}</mdb-col>
					<mdb-col><p>{{ editableEvent.title }}</p></mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col>{{ $t('startDate') }}</mdb-col>
					<mdb-col><p>{{ editableEvent.start | moment("DD.MM.YYYY") }}</p></mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col>{{ $t('endDate') }}</mdb-col>
					<mdb-col><p>{{ editableEvent.end | moment("DD.MM.YYYY")  }}</p></mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col>{{ $t('type') }}</mdb-col>
					<mdb-col><p>{{ editableEvent.eventType.title }}</p></mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col>{{ $t('user') }}</mdb-col>
					<mdb-col><p>{{ users[editableEvent.userId].text }} {{ users[editableEvent.userId].text }}</p></mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col>{{ $t('file_plural') }}</mdb-col>
					<mdb-col>
						<div>
							<div v-for="file in fileInfo" :key="file.id">
								<a v-auth-href :href="file.url">{{file.name}}</a>
								<!-- <mdb-btn size="sm" @click.native="openFile(fileInfo[index].name)">{{fileInfo[index].name}}</mdb-btn> -->
							</div>
						</div>
					</mdb-col>
				</mdb-row>
			</mdb-modal-body>
		</mdb-modal>

		<mdb-modal :show="showConfirm" @close="showConfirm = false">
			<mdb-modal-header>
        <mdb-modal-title>{{ $t('confirmation') }}</mdb-modal-title>
      </mdb-modal-header>
			<mdb-modal-body>
				<mdb-row class="text-center">
					<mdb-col v-if="eventOrFile == 'event'">
						<mdb-btn color="red" @click.native.prevent="handleDelete">{{ $t('delete') }}</mdb-btn>
					</mdb-col>
					<mdb-col v-if="eventOrFile == 'file'" >
						<mdb-btn color="red" @click.native="handleDeleteFile(fileToDelete)">{{ $t('delete') }}</mdb-btn>
					</mdb-col>
					<mdb-col>
						<mdb-btn color="primary" @click.native="showConfirm = false">{{ $t('cancel') }}</mdb-btn>
					</mdb-col>
				</mdb-row>
			</mdb-modal-body>
		</mdb-modal>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: "EventModal",
	components: {
	},
	props: {
		event: Object,
		eventTypes: {
			type: Array,
			default: () => []
		},
		eventUsers: {
			type: Array,
			default: () => []
		},
		isEdit: {
      type: Boolean,
      default: false,
		},
		editMode: {
      type: Boolean,
      default: false,
		},
	},
  data: function () {
    return {
			show: false,
			showConfirm: false,
			eventOrFile: '',
			fileToDelete: '',
			types: [],
			users: [],
			editableEvent: {},
			modalId: 'event-modal',
    }
	},
	computed: {
		...mapState('event', ['fileInfo']),
  },
  methods: {
    ...mapActions('event', ['getEvents', 'updateEvent', 'createEvent', 'deleteEvent', 'getFile', 'getFileInfo', 'deleteFileInfo']),
		handleEventTypeChange(value, text) {
			this.editableEvent.eventTypeId = value
		},
		handleUserChange(value, text) {
			this.editableEvent.userId = value
		},
		fileChange(event) {
      this.editableEvent.files = event.target.files
		},
		showConfirmation(value, fileUrl){
			this.showConfirm = true
			this.eventOrFile = value
			this.fileToDelete = fileUrl
		},
    handleUpdate() {
      if ( this.editableEvent.title
				&& this.editableEvent.start
				&& this.editableEvent.end
				&& this.editableEvent.eventTypeId
				&& this.editableEvent.userId ) {

				this.updateEvent(this.editableEvent)
					.then(
						() => {
							this.getEvents();
							this.show = false
							this.showConfirm = false
						}, error => {
							console.log(error);
						}
					);
      }
    },
		handleCreate() {
			if ( this.editableEvent.title
				&& this.editableEvent.start
				&& this.editableEvent.end
				&& this.editableEvent.eventTypeId
				&& this.editableEvent.userId  ) {

				this.createEvent(this.editableEvent)
					.then(
						() => {
							this.getEvents();
							this.show = false
							this.showConfirm = false
						}, error => {
							console.log(error);
						}
					);
			}
		},
		handleDelete() {
			if ( this.editableEvent.title
				&& this.editableEvent.start
				&& this.editableEvent.end
				&& this.editableEvent.eventTypeId
				&& this.editableEvent.userId  ) {

				this.deleteEvent(this.editableEvent)
					.then(
						() => {
							this.getEvents();
							this.show = false
							this.showConfirm = false
						}, error => {
							console.log(error);
						}
					);
			}
		},
		openFile(fileName) {
			this.getFile(fileName);
		},
		handleDeleteFile(id) {
			this.deleteFileInfo(id)
				.then(
					() => {
						this.getFileInfo(this.editableEvent.id);
						this.showConfirm = false
					}, error => {
						console.log(error);
					}
				);
		},
		reloadEventUsers(){
			let opts = []
			this.eventUsers.forEach((user, i) => {
				let selected = this.event.userId && user.id == this.event.userId
				opts.push({text: user.firstname+' '+user.lastname, value: user.id, selected: selected})
			});
			this.users = opts
		},
		reloadEventTypes(){
			let opts = []
			this.eventTypes.forEach((type, i) => {
				let selected = this.event.eventTypeId && type.id == this.event.eventTypeId
				opts.push({text: type.title, value: type.id, selected: selected})
			});
			this.types = opts
		},
  },
	watch: {
    event: {
      immediate: true,
      handler (eventObj) {
        this.editableEvent = {...eventObj}
				this.reloadEventUsers()
				this.reloadEventTypes()
      }
		},
		fileInfo: {
			immediate: true,
			handler () {
      }
		}
	},
	created() {
		this.getFileInfo(this.editableEvent.id)
	},
	mounted() {
		// event modal:show listener
		this.$aModal.$on('modal:show', modalId => {
			if(this.modalId == modalId){
				this.show = true;
			}
		});
		// event modal:hide listener
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
