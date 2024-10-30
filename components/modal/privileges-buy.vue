<template>
  <div>
    <b-modal id="privileges_buy" @hidden="resetModal" centered title="Покупка привилегии">
      <b-card :title="$store.state.privileges.element.name">
        <b-card-text v-show="$store.state.privileges.element.description">
          {{$store.state.privileges.element.description}}
          <b v-if="$store.state.privileges.element.once"><br>Покупка навсегда</b>
        </b-card-text>
      </b-card>
      <br>
      <b-form-radio v-for="cost in $store.state.privileges.element.privileges_entities" size="lg" :key="'trigger_' + cost.id" name="modal_buy_cost" @change="selectedCost = cost">
        {{cost.real_money ? 'За рубли' : 'За игровую валюту'}} <b>({{ cost.once ? 'Навсегда' : 'Посуточно' }})</b>
      </b-form-radio>
      <b-list-group class="py-4" v-show="selectedCost.id > 0">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <b-col md="5" class="pl-0 gray_text">
            Стоимость:
          </b-col>
          <b-col md="7" align="right" class="px-0">
            {{getCost(selectedCost.cost, selectedCost.real_money, selectedCost.once, 1)}}
          </b-col>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="!selectedCost.once">
          <b-col md="5" class="pl-0 gray_text">
            За всё:
          </b-col>
          <b-col md="7" align="right" class="px-0">
            {{getCost(selectedCost.cost, selectedCost.real_money, selectedCost.once, count)}}
          </b-col>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <b-col md="5" class="pl-0 gray_text">
            Твой счет:
          </b-col>
          <b-col md="7" align="right" class="px-0" v-show="selectedCost.real_money">
            {{($auth.user.balance/100).toFixed(2)}}₽
          </b-col>
          <b-col md="7" align="right" class="px-0" v-show="!selectedCost.real_money">
            {{$store.state.economy.balance}}УЕ
          </b-col>
        </b-list-group-item>
      </b-list-group>

      <b-form-spinbutton v-if="!selectedCost.once" id="demo-sb" v-model="count" min="5" max="60" :formatter-fn="dayFormatter"></b-form-spinbutton>

      <template #modal-footer>
        <b-button squared @click="$bvModal.hide('privileges_buy')">Отменить</b-button>
        <b-button squared @click="buy()">Купить</b-button>
      </template>
    </b-modal>
  </div>
</template>
  
  
<script>
  export default {
    data() {
      return {
        count: 5,
        selectedCost: {
          id: 0,
          once: true
        }
      }
    },
    methods: {
      dayFormatter(value) {
        return value + ' ' + this.$store.getters['core/declOfNum']({number: value, words: ['день', 'дня', 'дней']})
      },
      getCost (cost, real, once, count) {
          return `${real ? (cost/100*count).toFixed(2) : cost*count}${real ? '₽' : 'УЕ'}${once || count !== 1 ? '' : '/День'}`;
      },
      buy () {
        this.$store.dispatch('privileges/buy', {
          privilegesEntitieId: this.selectedCost.id,
          privilegeId: this.$store.state.privileges.element.id,
          serverId: this.$store.state.privileges.allPage.server,
          count: this.count
        });
        this.$bvModal.hide('privileges_buy')
      },
      resetModal () {
        this.selectedCostId = {
          id: 0,
          once: true
        }
      }
    }
  }
</script>
