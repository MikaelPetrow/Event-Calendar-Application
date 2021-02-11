<template>

  <table id="user-table" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <thead>
      <tr>
        <th class="th-sm">{{ $t('username') }}</th>
        <th class="th-sm">{{ $t('firstname') }}</th>
        <th class="th-sm">{{ $t('lastname') }}</th>
        <th class="th-sm">{{ $t('role') }}</th>
        <th class="th-sm">{{ $t('isVisible?') }}</th>
        <th class="th-sm">{{ $t('isActive?') }}</th>
        <th class="th-sm">{{ $t('actions') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.username}}</td>
        <td>{{user.firstname}}</td>
        <td>{{user.lastname}}</td>
        <td>{{user.role.name}}</td>
        <td>{{user.visible ? $t('yes') : $t('no')}}</td>
        <td>{{user.active  ? $t('yes') : $t('no')}}</td>
        <td>
          <mdb-btn color="primary" size="sm" class="m-0" @click="handleUserEdit(user)">
            <mdb-icon icon="edit" class="mr-1"/>
            {{ $t('editUser') }}
          </mdb-btn>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
//import { mapState, mapActions } from 'vuex'
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;
import dTableLocaleFi from '../locales/datatables.fi.json'

import 'datatables.net-bs4'
import 'datatables.net-bs4/css/dataTables.bootstrap4.css'

export default {
  name: 'UserTable',
  props: {
    users: Array
  },
  data() {
    return {
      visible: '',
      active: ''
    }
  },
  computed: {
  },
  methods: {
    handleUserEdit(user) {
      this.$emit('userEdit', user)
    }
  },
  created(){
    $(document).ready( function () {
      $('#user-table').DataTable({
        language: dTableLocaleFi
      });
    })
  }
}
</script>
