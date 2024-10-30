<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="10" md="12">
          <h1>Сервера <b-badge>{{$store.state.servers.list.length}}</b-badge></h1>
        </b-col>
        <b-col lg="2" md="12" >
          <b-button block squared v-on:click="$bvModal.show('server_add')" v-if="$store.getters['perm/checkPerm']('servers.add', $auth.user)">Добавить сервер</b-button>
        </b-col>
      </b-row>
      <br>
      <tables-servers/>
    </b-container>
    <modal-server-add/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Сервера', to: '/admin/servers/'},
          {text: 'Список серверов', to: '/admin/servers/all/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Список серверов');
      this.$store.dispatch('servers/getAll');
    },
    head() {
      return {
        title: "Список серверов"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
