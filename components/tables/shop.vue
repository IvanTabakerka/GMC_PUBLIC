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
        <a>
          <b-img v-if="$store.getters['core/getPath'](data.item.file)"
                 class="shop_image"
                 @click="showBuyModal(data.item.id)"
                 :src="$store.getters['core/getPath'](data.item.file)"
          ></b-img>
          <b-img v-else
                 @click="showBuyModal(data.item.id)"
                 src="@/static/icons/money.svg"
          ></b-img>
        </a>
      </template>
      <template #cell(name)="data">
        <a v-if="getItem(data.item, $store.state.shop.page.serverId)" @click="showBuyModal(data.item.id)">
          {{data.item.name}} ({{getItem(data.item, $store.state.shop.page.serverId).item_id}}:{{getItem(data.item, $store.state.shop.page.serverId).item_meta}}) x {{data.item.count}}
        </a>
      </template>
      <template #cell(cost_real)="data">
        <span v-show="getEntity(getItem(data.item, $store.state.shop.page.serverId), true)">
          {{getEntity(getItem(data.item, $store.state.shop.page.serverId), true)}}<span class="small_text">₽</span>
        </span>
      </template>
      <template #cell(cost_game)="data">
        <span v-show="getEntity(getItem(data.item, $store.state.shop.page.serverId), false)">
          {{getEntity(getItem(data.item, $store.state.shop.page.serverId), false)}}<span class="small_text">У.Е</span>
        </span>
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
          {key: 'cost_real', label: 'Цена Р', tdClass: 'align-middle'},
          {key: 'cost_game', label: 'Цена У.Е', tdClass: 'align-middle'},
          {key: 'control', label: '', tdClass: 'text-right align-middle'},
        ]
      }
    },
    methods: {
      getItem (element, serverId, real_money) {
        return element.shops_items.find(item => item.serverId === serverId);
      },
      getEntity (item, real_money) {
        if (item) {
          const entitle = item.shops_entities.find(item => item.real_money === real_money);
          let cost = entitle ? entitle.cost : false;
          cost = real_money ? (cost/100).toFixed(2) : cost;
          return cost;
        } else {
          return false;
        }
      },
      showBuyModal (id) {
        this.$store.dispatch('shop/getOne', id);
        this.$store.state.shop.page.entityId = 0;
        this.$store.dispatch('economy/getBalance', {
          serverId: this.$store.state.shop.page.serverId,
          username: this.$auth.user.username
        });
        this.$bvModal.show('shop_buy');
      },
    },
  };
</script>
