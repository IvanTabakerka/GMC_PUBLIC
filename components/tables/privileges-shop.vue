<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.state.privileges.list"
      :fields="$store.getters['privileges/getListBSTableShop'].fields"
      :responsive="true"
      small
      head-variant="dark"
      :busy="$store.state.privileges.dataLoading"
    >
      <template #cell(name)="data">
        <b>{{ data.item.name }}</b>
      </template>
      <template #cell(description)="data">
        <p v-html="data.item.description"></p>
      </template>
      <template #cell(real_cost)="data">
        <span class="whitespace_nowrap" v-html="getCost(data.item.privileges_entities, true)"></span>
      </template>
      <template #cell(game_cost)="data">
        <span class="whitespace_nowrap" v-html="getCost(data.item.privileges_entities, false)"></span>
      </template>
      <template #cell(show_details)="data">
        <b-button size="sm" v-if="data.item.privileges_users.length == 0" @click="showBuyModal(data.item.id)">
          Купить
        </b-button>
        <div v-if="data.item.privileges_users.length > 0" class="whitespace_nowrap">
          <span v-if="!data.item.privileges_users[0].endAt">
            Активно
          </span>
          <span v-else>
            Активно<br> {{ $store.getters['core/getDateString'](data.item.privileges_users[0].endAt) }}
          </span>
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
      showBuyModal (id) {
        this.$store.dispatch('privileges/getOne', id);
        this.$store.state.privileges.allPage.selectedCostId = 0;
        this.$store.dispatch('economy/getBalance', {
          serverId: this.$store.state.privileges.allPage.server,
          username: this.$auth.user.username
        });
        this.$bvModal.show('privileges_buy');
      },
      getCost (costs, real, once) {
        const idx = costs.findIndex(value => value.real_money === real);
        if (idx > -1) {
          const count = costs[idx].cost;
          return `${real ? (count/100).toFixed(2) : count}${real ? ' <span class="small_text">₽' : ' <span class="small_text">УЕ'}${costs[idx].once ? '</span>' : '/Д</span>'}`;
        } else {
          return '';
        }
      }
    },
  };
</script>
  