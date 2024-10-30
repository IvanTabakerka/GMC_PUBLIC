<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="5" md="12">
          <b-row align-v="center">
            <b-col lg="3" md="12">
              <b-avatar v-if="$store.getters['core/getPath']($store.state.users.element.file)"
                size="4rem"
                :src="$store.getters['core/getPath']($store.state.users.element.file)"
              ></b-avatar>
              <b-avatar v-else
                size="4rem"
              ></b-avatar>
            </b-col>
            <b-col lg="5" md="12">
              <h1>{{$store.state.users.element.username}}</h1>
            </b-col>
            <b-col lg="4" md="12">
              <b-button block squared v-on:click="$bvModal.show('changeUser_users')" v-show="$store.getters['perm/checkPerm']('users.change', $auth.user)">Изменить данные</b-button>
              <b-button block squared v-on:click="$bvModal.show('user_ban')" v-if="$store.getters['perm/checkPerm']('users.ban', $auth.user)">Блокировка</b-button>
            </b-col>
          </b-row>
          <list-userinfo :info="$store.state.users.element" type="adminpanel"></list-userinfo>
          <list-permissions v-show="$store.getters['perm/checkPerm']('admins.change', $auth.user)"></list-permissions>
        </b-col>
        <b-col lg="7" md="12">
          <!--tables-history></tables-history-->
        </b-col>
      </b-row>
      <modal-user-change :userId="$store.state.users.element.id" page="users"/>
      <modal-user-ban :user="$store.state.users.element"/>
      <modal-balance-change :balance="$store.state.users.element.balance"/>
    </b-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Пользователи', to: '/admin/users/'},
          {text: 'Все пользователи', to: '/admin/users/all/'},
          {text: 'Редактирование пользователя'},
        ]
      }
    },
    created () {
      this.$store.dispatch('users/getOne', this.$route.params.id);
      if (this.$store.getters['perm/checkPerm']('admins.change', this.$auth.user)) {
        this.$store.dispatch('servers/getAll')
        this.$store.dispatch('perm/getAll');
      }
      this.$store.commit('core/setPageName', 'Редактирование пользователя');
    },
    head() {
      return {
        title: "Редактирование пользователя"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
