<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.state.users.list"
      :fields="fields"
      :responsive="true"
      small
      head-variant="dark"
      :busy="$store.state.users.allPage.loading"
      @sort-changed="updateSort"
    >
      <template #cell(userimage)="data">
        <router-link :to="`/admin/users/all/${data.item.id}/`">
          <b-avatar v-if="$store.getters['core/getPath'](data.item.file)"
            size="2rem"
            :src="$store.getters['core/getPath'](data.item.file)"
          ></b-avatar>
          <b-avatar v-else
            size="2rem"
          ></b-avatar>
        </router-link>
      </template>

      <template #cell(username)="data">
        <router-link :to="`/admin/users/all/${data.item.id}/`">{{data.item.username}}</router-link>
      </template>
      <template #cell(balance)="data">
        {{`${data.item.balance/100}₽`}}
      </template>
      <template #cell(createdAt)="data">
        {{`${Math.round((new Date() - new Date(data.item.createdAt))/86400000)} дн`}}
      </template>
      <template #cell(play_time)="data">
        {{`${Math.round(data.item.uptime/60)} ч`}}
      </template>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>
    </b-table>
    <pagenav-main
      :pages="$store.state.users.count >= $store.state.users.allPage.limit ? (Math.ceil($store.state.users.count/$store.state.users.allPage.limit)).toString() : '1'"
      setPageCommit="users/setPage"
      getDataAction="users/getAll"
    ></pagenav-main>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        fields: [
          { key: 'userimage', label: '', tdClass: 'align-middle' },
          { key: 'username', label: 'Имя', tdClass: 'align-middle', sortable: true },
          { key: 'email', label: 'Почта', tdClass: 'align-middle' },
          { key: 'balance', label: 'Баланс', tdClass: 'align-middle', sortable: true },
          { key: 'createdAt', label: 'Стаж', tdClass: 'align-middle', sortable: true }
        ],
        sort: {
          sortBy: 'createdAt',
          sortDesc: true
        }
      }
    },
    methods: {
      updateSort (ctx) {
        this.$store.commit('users/setSort', ctx);
        this.$store.dispatch('users/getAll');
      }
    }
  }
</script>
