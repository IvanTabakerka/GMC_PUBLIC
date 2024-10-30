<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.getters['servers/getListBSTable'].items"
      :fields="$store.getters['servers/getListBSTable'].fields"
      :responsive="true"
      small
      head-variant="dark"
      :busy="$store.state.servers.dataLoading"
    >
      <template #cell(name)="data">
        <router-link :to="`/admin/servers/all/${data.item.id}/`">
          {{data.item.name}}<b>{{data.item.postfix}}</b>
        </router-link>
      </template>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>
