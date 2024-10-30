<template>
  <div>
    <h2>История операций ({{$store.state.history.count}})</h2>
    <hr>
    <b-table
      striped
      hover
      :items="$store.getters['history/getHistoryList'].items"
      :fields="$store.getters['history/getHistoryList'].fields"
      :responsive="true"
      small
      head-variant="dark"
      :busy="$store.state.history.tableBusy"
    >
      <template #cell(createdAt)="data">
        {{computedTime(data.item.createdAt)}}
      </template>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>
    </b-table>
    <pagenav-main
      :pages="Math.ceil($store.state.history.count/$store.state.history.limit)"
      setPageCommit="history/historySetPage"
      getDataAction="history/getHistory"
      :arguments="this.$route.params.id"
    ></pagenav-main>
  </div>
</template>

<script>
  export default {
    methods: {
      computedTime (date) {
        if (date) {
          const raw_date = new Date(date);
          return new Intl.DateTimeFormat('ru', {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).format(raw_date);
        }
      },
    },
  };
</script>
