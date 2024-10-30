<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.getters['privileges/getListBSTable'].items"
      :fields="$store.getters['privileges/getListBSTable'].fields"
      :responsive="true"
      small
      head-variant="dark"
      :busy="$store.state.privileges.dataLoading"
    >
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Свернуть' : 'Подробнее'}}
        </b-button>
      </template>
      <template #row-details="row">
        <div>
          <tables-privileges-servers :perm="row.item"></tables-privileges-servers>
          <div>
              <b-button @click="showUpdateModal(row.item.id)" v-if="$store.getters['perm/checkPerm']('sell.privileges', $auth.user)">Изменить основу</b-button>
              <b-button @click="$store.dispatch('privileges/delete', {id: row.item.id, name: row.item.name})" v-if="$store.getters['perm/checkPerm']('sell.privileges', $auth.user)">Удалить</b-button>
              <b-button @click="row.toggleDetails">Свернуть</b-button>
          </div>
        </div>

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
  
<script>
  export default {
    methods: {
      showUpdateModal (id) {
        this.$store.dispatch('privileges/getOne', id);
        this.$bvModal.show('privileges_update');
      }
    },
  };
</script>
  