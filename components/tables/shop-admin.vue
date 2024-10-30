<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.state.shop.page.list"
      :fields="fields"
      :responsive="true"
      small
      head-variant="dark"
      :busy="$store.state.shop.page.loading && $store.state.shop.modId > 0"
    >
      <template #cell(fileId)="data">
        <a @click="data.toggleDetails">
          <b-img v-if="$store.getters['core/getPath'](data.item.file)"
                 class="shop_image"
                 :src="$store.getters['core/getPath'](data.item.file)"
          ></b-img>
          <b-img v-else
                 class="shop_image" @click="data.toggleDetails"
                 src="@/static/icons/money.svg"
          ></b-img>
        </a>
      </template>
      <template #cell(name)="data">
        <a @click="data.toggleDetails">
          {{data.item.name}}
        </a>
      </template>
      <template #cell(control)="row">
        <b-button v-if="$store.getters['perm/checkPerm']('sell.shop', $auth.user)" @click="showUpdateModal(row.item.id)">Изменить</b-button>
        <b-button v-if="$store.getters['perm/checkPerm']('sell.shop', $auth.user)" @click="$store.dispatch('shop/delete', row.item.id)">Удалить</b-button>
      </template>
      <template #row-details="row">
        <tables-shop-items :shop="row.item"></tables-shop-items>
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
    data () {
      return {
        fields: [
          {key: 'fileId', label: '', tdClass: 'align-middle'},
          {key: 'name', label: 'Название', tdClass: 'align-middle'},
          {key: 'descript', label: 'Описание', tdClass: 'align-middle'},
          {key: 'count', label: 'Количество', tdClass: 'align-middle'},
          {key: 'control', label: '', tdClass: 'text-right align-middle'},
        ]
      }
    },
    methods: {
      showUpdateModal (id) {
        this.$store.dispatch('shop/getOne', id);
        this.$bvModal.show('shop_update');
      }
    },
  };
</script>
