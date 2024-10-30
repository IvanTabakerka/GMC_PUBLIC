<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row align-v="center">
        <b-col lg="4" md="12"  class="text-center">
          <h5 class="mb-1">
            Администратор: <b>{{ $auth.user.username }}</b>
          </h5>
          <hr>
          <b-avatar v-if="$auth.user.file" v-bind:src="$store.getters['core/getPath']($auth.user.file)" size="6rem"></b-avatar>
          <b-avatar v-else size="6rem"></b-avatar>
        </b-col>
        <b-col lg="8" md="12">
          <b-list-group>
            <b-list-group-item>
              <h2 class="mb-1">Список прав</h2>
            </b-list-group-item>
            <b-list-group-item v-for="perm in $auth.user.permissions_connections" :key="1">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ perm.permission.name }} <b v-show="perm.serverId">{{getServerName(perm.serverId)}}</b></h5>
              </div>
              <small>{{ getPermDescription(perm.id) }}</small>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/'}
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Сводка');
      this.$store.dispatch('servers/getAll');
      this.$store.dispatch('perm/getAll');
    },
    methods: {
      getServerName(serverId) {
        const server = this.$store.getters['servers/getElement'](serverId);
        return server ? `${server.name} ${server.postfix}` : 'Загрузка...'
      },
      getPermDescription (permId) {
        const perm = this.$store.getters['perm/getElement'](permId)
        return perm ? perm.description : 'Загрузка...'
      }
    },
    head() {
      return {
        title: "Сводка"
      };
    },
    middleware: ['adminPanel'],
    layout: 'admin'
  }
</script>
