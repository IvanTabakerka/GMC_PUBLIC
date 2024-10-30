<template>
  <div>
    <b-modal id="shop_buy" @hidden="resetModal" centered title="Покупка предмета">
      <b-card :title="$store.state.shop.page.element.name">
        <b-card-text v-show="$store.state.shop.page.element.descript">
          {{$store.state.shop.page.element.descript}}
        </b-card-text>
      </b-card>
      <br>
      <div v-for="item in $store.state.shop.page.element.shops_items" :key="`buy_item_${item.id}`" v-if="item.serverId === $store.state.shop.page.serverId">
        <h4>{{item.server.name}}{{item.server.postfix}}</h4>
        <b-form-radio v-for="entity in item.shops_entities" size="lg" :key="'trigger_' + entity.id" name="modal_buy_cost" @change="selectedEntity = entity">
          {{entity.real_money ? 'За рубли' : 'За игровую валюту'}}
        </b-form-radio>
      </div>
      <b-list-group class="py-4" v-show="selectedEntity.id > 0">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <b-col md="5" class="pl-0 gray_text">
            За всё:
          </b-col>
          <b-col md="7" align="right" class="px-0">
            {{getCost(selectedEntity.cost, selectedEntity.real_money, count)}}
          </b-col>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <b-col md="5" class="pl-0 gray_text">
            Твой счет:
          </b-col>
          <b-col md="7" align="right" class="px-0" v-show="selectedEntity.real_money">
            {{($auth.user.balance/100).toFixed(2)}}₽
          </b-col>
          <b-col md="7" align="right" class="px-0" v-show="!selectedEntity.real_money">
            {{$store.state.economy.balance}}УЕ
          </b-col>
        </b-list-group-item>
      </b-list-group>
      <br>
      <b-form-spinbutton id="demo-sb" v-model="count" min="1" max="128" :formatter-fn="countFormatter"></b-form-spinbutton>

      <template #modal-footer>
        <b-button squared @click="$bvModal.hide('shop_buy')">Отменить</b-button>
        <b-button squared @click="buy()">Купить</b-button>
      </template>
    </b-modal>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        count: 1,
        selectedEntity: {
          id: 0
        }
      }
    },
    methods: {
      countFormatter(value) {
        return value + ' ' + this.$store.getters['core/declOfNum']({number: value, words: ['штука', 'штуки', 'штук']})
      },
      getCost (cost, real, count) {
          return `${real ? (cost/100*count).toFixed(2) : cost*count}${real ? '₽' : 'УЕ'}`;
      },
      buy () {
        this.$store.dispatch('shop/buy', {
          entityId: this.selectedEntity.id,
          count: this.count
        });
        // this.$bvModal.hide('shop_buy')
      },
      resetModal () {
        this.selectedEntity = {
          id: 0,
          once: true
        }
      }
    }
  }
</script>
