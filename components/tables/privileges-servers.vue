<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.state.servers.list"
      :fields="fields"
      :responsive="true"
      small
      head-variant="dark"
      :busy="$store.state.servers.dataLoading"
    >
      <template #cell(name)="data">
        {{data.item.name}}-{{data.item.postfix}}
      </template>
      <template #cell(real_cost)="data">
        {{(getPermEntity(perm.privileges_entities, data.item.id, true, false)/100).toFixed(2)}}
      </template>
      <template #cell(real_cost_change)="data">
        <b-button @click="changeCostModal(perm, data.item, true, false, getPermEntity(perm.privileges_entities, data.item.id, true, false))">Изменить</b-button>
      </template>
      <template #cell(real_cost_inf)="data">
        {{(getPermEntity(perm.privileges_entities, data.item.id, true, true)/100).toFixed(2)}}
      </template>
      <template #cell(real_cost_inf_change)="data">
        <b-button @click="changeCostModal(perm, data.item, true, true, getPermEntity(perm.privileges_entities, data.item.id, true, true))">Изменить</b-button>
      </template>
      <template #cell(game_cost)="data">
        {{getPermEntity(perm.privileges_entities, data.item.id, false, false)}}
      </template>
      <template #cell(game_cost_change)="data">
        <b-button @click="changeCostModal(perm, data.item, false, false, getPermEntity(perm.privileges_entities, data.item.id, false, false))">Изменить</b-button>
      </template>
      <template #cell(game_cost_inf)="data">
        {{getPermEntity(perm.privileges_entities, data.item.id, false, true)}}
      </template>
      <template #cell(game_cost_inf_change)="data">
        <b-button @click="changeCostModal(perm, data.item, false, true, getPermEntity(perm.privileges_entities, data.item.id, false, true))">Изменить</b-button>
      </template>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>
    </b-table>
    <!-- Изменение цены в рублях -->
    <b-modal :id="'change_cost_' + perm.id" centered title="Настройка цены">
      <p>
        <b>Привлегия:</b> {{element.perm.name}}<br>
        <b>Сервер:</b> {{element.server.name}}-{{element.server.postfix}}<br>
        <b>Тип цены:</b> {{ element.real_money ? 'Рубли':'УЕ'}}<br>
        <b>Срок:</b> {{ element.once ? 'Навсегда':'По дням'}}<br>
        <small v-if="element.real_money">Цена указываются в копейках</small>
      </p>
      <hr>
      <b-form-group label="Цена:">
          <b-form-input
            type="number"
            v-model="element.cost"
          ></b-form-input>
      </b-form-group>

      <template #modal-footer>
        <b-button squared @click="$bvModal.hide('real_cost_modal_' + perm.id)">Отменить</b-button>
        <b-button squared @click="changeCost(element)">Сохранить</b-button>
      </template>
    </b-modal>
  </div>
</template>
  
<script>
export default {
  data () {
    return {
      fields: [
        { key: 'name', label: 'Сервер', tdClass: 'align-middle' },
        { key: 'real_cost', label: 'Рубли', tdClass: 'align-middle'},
        { key: 'real_cost_change', label: '', tdClass: 'align-middle'},
        { key: 'real_cost_inf', label: 'Рубли (ONCE)', tdClass: 'align-middle'},
        { key: 'real_cost_inf_change', label: '', tdClass: 'align-middle'},
        { key: 'game_cost', label: 'УЕ', tdClass: 'align-middle'},
        { key: 'game_cost_change', label: '', tdClass: 'align-middle'},
        { key: 'game_cost_inf', label: 'УЕ (Once)', tdClass: 'align-middle'},
        { key: 'game_cost_inf_change', label: '', tdClass: 'align-middle'}
      ],
      element: {
        server: {},
        perm: {},
        cost: 0,
        real_money: false,
        once: false
      }
    }
  },
  methods: {
    getPermEntity (entities, serverId, real_money, once) {
      let idx = entities.findIndex(ent => ent.serverId == serverId && ent.real_money == real_money && ent.once == once);
      if (idx == -1) {
        return 0;
      } else {
        return entities[idx].cost;
      }
    },
    changeCostModal (perm, server, real_money, once, cost) {
      this.element.perm = perm;
      this.element.server = server;
      this.element.cost = cost;
      this.element.real_money = real_money;
      this.element.once = once;
      this.$bvModal.show('change_cost_' + this.perm.id)
    },
    changeCost (element) {
      const entities = {
        permId: this.element.perm.id,
        permName: this.element.perm.name,
        serverId: this.element.server.id,
        serverName: `${this.element.server.name}-${this.element.server.postfix}`,
        cost: this.element.cost,
        real_money: this.element.real_money,
        once: this.element.once,
      }
      this.$store.dispatch('privileges/updateCosts', entities)
    }
  },
  props: [
    'perm'
  ]
};
</script>
