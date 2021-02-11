<template>
  <div>
    <div>
      <span v-for="eventType in eventTypes" :key="eventType.id" class="mr-3">
        <i class="fas fa-circle" :style="{ color: eventType.color }"></i>
        {{ eventType.title }}
      </span>
    </div>
    <FullCalendar
      :options="configOptions" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import FullCalendar from '@fullcalendar/vue'
import fiLocale from '@fullcalendar/core/locales/fi';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import i18n from '../i18n'
import $ from 'jquery'

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters('user', ['userResources']),
    ...mapGetters('event', ['eventsWithResources', 'eventTypes']),
    configOptions() {
      return {
        plugins: [
          dayGridPlugin, interactionPlugin, resourceTimelinePlugin
        ],
        resourceAreaHeaderContent: i18n.tc('user'),
        resourceAreaWidth: '10%',
        locales: ['fiLocales', 'enLocales'],
        locale: 'fi',
        initialView: 'resourceTimelineMonth',
        buttonText: {
          today: i18n.tc('today')
        },
        slotLabelFormat: {
          weekday: 'short',
          day: 'numeric', 
        },
        displayEventTime: false,
        eventClick: this.handleEventClick,
        resources: this.visibleUsers(),
        events: this.eventsWithResources,
      }
    },
  },
  watch: {

  },
  methods: {
    ...mapActions('event', ['createEvent', 'getEvents', 'updateEvents', 'deleteEvent', 'getEventTypes']),
    ...mapActions('user', ['getUsers']),
    handleEventClick: function(arg) {
      let event = arg.event.extendedProps.fullEventObject
      this.$emit('updateEvent', event)
    },
    visibleUsers: function() {
      let userArr = []
      this.userResources.forEach((user, x) => {
        if (user.visible == true) {
          userArr.push(user)
        }
      })
      return userArr
    },
  },
  created(){
    this.getUsers();
    this.getEvents();
  }
}
</script>

<style>
  .box {
    height: 10px;
    width: 25px;
    border: 1px solid black;
    clear: both;
    display: inline-block;
  }

  .redBox {
    background-color: rgb(255, 0, 0);
  }

  .greenBox {
    background-color: rgb(0, 255, 0);
  }

  .blueBox {
    background-color: rgb(0, 0, 255);
  }

  .yellowBox {
    background-color: rgb(255, 255, 0);
  }

  .appendText {
    display: inline;
  }

  .fc-toolbar-chunk:nth-child(2){
    align-content: center;
    justify-content: center;
  }

  .fc-timeline-slot-cushion {
    font-size: 10px;
  }
</style>
