<template>
    <b-modal id="vote_convert" @show="show" centered title="Конвертация голосов">
      <b-form-group>
        <b-form-radio-group
          v-model="type"
          :options="convertTypes"
          buttons
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group
          label="К обмену"
          label-cols="12"
          label-cols-lg="4"
        >
        <b-form-input v-model="amount" :formatter="amountFormatter" trim></b-form-input>
      </b-form-group>
      <b-form-group
          label="Сервер"
          label-cols="12"
          label-cols-lg="4"
          v-show="type == 'game'"
        >
          <b-form-select 
            :options="$store.getters['servers/getSelectOptions'](false)"
            size="sm"
            v-model="serverId"
            @change="getServerData"
          ></b-form-select>
      </b-form-group>

      <p v-show="type == 'game'">
        <span v-show="serverId == 0">Выберете сервер</span>
        <span v-show="serverId > 0 && !serverData.economyType">
          Недоступно на этом сервере
        </span>
        <span v-show="serverId > 0 && !!serverData.economyType">
          Будет начислено: <b>+{{ serverData.voteAward*amount }} У.Е.</b>
        </span>
      </p>

      <p v-show="type == 'real'">
        Будет начислено: <b>+{{amount*realCost}} ₽</b>
      </p>

      <template #modal-footer>
          <b-button squared @click="$bvModal.hide('vote_convert')">Отменить</b-button>
          <b-button squared @click="convert()">Ок</b-button>
      </template>
    </b-modal>
</template>

<script>
  export default {
    data () {
      return {
        amount: this.$auth.user.vote,
        serverId: 0,
        serverData: {},
        type: "game",
        convertTypes: [
          {text: "Игровая валюта", value: "game"},
          {text: "Бонусы", value: "real"}
        ],
        realCost: 2
      }
    },
    methods: {
      convert () {
        this.$store.dispatch('monitoring/convert', {
          serverId: this.serverId,
          amount: this.amount,
          type: this.type
        })
        this.$bvModal.hide('vote_convert');
        this.$auth.fetchUser();
      },
      amountFormatter(value) {
        value = parseInt(value);
        if (Number.isInteger(value)) {
          if (value < 1) {
            return 1;
          } else if (value > this.$auth.user.vote) {
            return this.$auth.user.vote;
          } else {
            return value;
          }
        } else {
          return this.$auth.user.vote;
        }
      },
      getServerData () {
        if (this.serverId > 0) {
          this.serverData = this.$store.state.servers.list.find(server => server.id === this.serverId);
        }
      },
      show () {
        if (this.$store.state.servers.list.length == 0) {
          this.$store.dispatch('servers/getAll');
        }
      }
    }
  }
</script>