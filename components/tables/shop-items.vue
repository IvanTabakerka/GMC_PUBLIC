<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.getters['servers/getServerShops']($store.state.shop.page.modId)"
      :fields="fields"
      :responsive="true"
      small
      head-variant="dark"
    >
      <template #cell(server)="data">
        {{data.item.name}}-{{data.item.postfix}}
      </template>
      <template #cell(item_id)="data">
        <span v-if="getItem(data.item.id)">
          {{ getItem(data.item.id).item_id }}
        </span>
      </template>
      <template #cell(item_meta)="data">
        <span v-if="getItem(data.item.id)">
          {{ getItem(data.item.id).item_meta }}
        </span>
      </template>
      <template #cell(limit)="data">
        <span v-if="getItem(data.item.id)">
          {{ getItem(data.item.id).limit }}
        </span>
      </template>
      <template #cell(item_cost_real)="data">
        <b-input-group size="sm" v-show="getItem(data.item.id)" :prepend="`${getEntities(data.item.id, true)}Р`">
          <b-form-input placeholder="Новая цена" v-model="tempCosts.real[data.item.id]"></b-form-input>
          <b-input-group-append>
            <b-button size="sm" @click="setCost(data.item.id, true)">Ок</b-button>
          </b-input-group-append>
        </b-input-group>
      </template>
      <template #cell(item_cost_game)="data">
        <b-input-group size="sm" v-show="getItem(data.item.id)" :prepend="`${getEntities(data.item.id, false)}УЕ`">
          <b-form-input placeholder="Новая цена" v-model="tempCosts.game[data.item.id]"></b-form-input>
          <b-input-group-append>
            <b-button @click="setCost(data.item.id, false)">Ок</b-button>
          </b-input-group-append>
        </b-input-group>
      </template>
      <template #cell(control)="data">
        <div v-show="getItem(data.item.id)">
          <b-button size="sm" class="mr-2" @click="itemDelete(shop.id, data.item.id)">
            Удалить
          </b-button>
        </div>
        <div v-show="!getItem(data.item.id)">
          <b-button size="sm" class="mr-2" @click="itemAdd(shop.id, data.item.id)">
            Создать ID:META
          </b-button>
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
        { key: 'server', label: 'Сервер', tdClass: 'align-middle' },
        { key: 'item_id', label: 'ID', tdClass: 'align-middle'},
        { key: 'item_meta', label: 'Meta ID', tdClass: 'align-middle'},
        { key: 'item_cost_real', label: 'Цена Р', tdClass: 'align-middle'},
        { key: 'item_cost_game', label: 'Цена УЕ', tdClass: 'align-middle'},
        { key: 'control', label: '', tdClass: 'text-right align-middle' }
      ],
      tempCosts: {
        real: [],
        game: []
      }
    }
  },
  methods: {
    getItem (serverId) {
      const idx = this.shop.shops_items.findIndex(item => item.serverId === serverId);
      if (idx === -1) {
        return false;
      } else {
        return this.shop.shops_items[idx];
      }
    },
    itemAdd (shopId, serverId) {
      this.$store.state.shop.item.shopId = shopId;
      this.$store.state.shop.item.serverId = serverId;
      this.$bvModal.show('shop_item_add');
    },
    itemDelete (shopId, serverId) {
      this.$store.state.shop.item.shopId = shopId;
      this.$store.state.shop.item.serverId = serverId;
      const item = this.getItem(serverId);
      if (item) {
        this.$store.dispatch('shop/deleteItem', item.id);
      }
    },
    getEntities (serverId, real_money) {
      const item = this.shop.shops_items.find(item => item.serverId === serverId);
      if (item) {
        const entitle = item.shops_entities.find(item => item.real_money === real_money);
        let cost = entitle ? entitle.cost : 0;
        cost = real_money ? (cost/100).toFixed(2) : cost;
        return cost;
      } else {
        return null;
      }
    },
    setCost (serverId, real_money) {
      const item = this.getItem(serverId);
      const cost = this.tempCosts[real_money ? 'real' : 'game'][serverId];
      if (cost === undefined) {
        this.$toast.show('Введите новую цену')
      } else {
        this.$store.state.shop.item.shopId = this.shop.id;
        this.$store.dispatch('shop/setCost', {
          cost: cost,
          real_money: real_money,
          shopsItemId: item.id
        })
      }

    }
  },
  props: [
    'shop'
  ]
};
</script>
