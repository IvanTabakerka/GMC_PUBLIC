<template>
    <div>
      <b-modal id="changeUserBalance" centered title="Изменение баланса">
        <b-form-group>
          <b-form-radio-group
            id="change_type"
            v-model="type"
            :options="changeTypes"
            name="radios-btn-default"
            buttons
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group
          id="change_value_label"
          label="Значение (копейки)"
          label-for="change_value"
          label-cols="12"
          label-cols-lg="4"
        >
          <b-form-input id="change_value" v-model="amount" trim></b-form-input>
        </b-form-group>
        <b-form-group
          id="change_reason_label"
          label="Причина"
          label-for="change_reason"
          label-cols="12"
          label-cols-lg="4"
        >
          <b-form-input id="change_reason" v-model="reason" trim></b-form-input>
        </b-form-group>
        <p v-if="type == 'donation' || type == 'reward'"><b>Даёт публичный хук в дискорд</b></p>
        <p v-if="type == 'withdraw' && balance - Number(amount) < 0"><b>Недостаточно средств</b></p>
        <p>
          <span>{{ (balance/100).toFixed(2) }} ₽</span>
          <span v-if="type == 'withdraw'"> &minus; </span>
          <span v-else> + </span>
          <span>{{ Math.abs(Number(amount) / 100).toFixed(2) }} ₽</span>
          <span v-if="!isNaN(Number(amount))"> = </span>
          <span v-if="!isNaN(Number(amount))">
            {{ ((type === 'withdraw' ? (balance - Number(amount)) : (balance + Number(amount))) / 100).toFixed(2) }} ₽
          </span>
        </p>
        <template #modal-footer>
          <b-button squared @click="$bvModal.hide('changeUserBalance')">Отменить</b-button>
          <b-button squared @click="setUserBalance()">Ок</b-button>
        </template>
      </b-modal>
    </div>
  </template>
  
  
  <script>
    export default {
      data () {
        return {
          amount: 0,
          type: "silent",
          reason: "",
          changeTypes: [
            {text: "Пожертвование", value: "donation"},
            {text: "Награда", value: "reward"},
            {text: "Тайное", value: "silent"},
            {text: "Списать", value: "withdraw"},
          ]
        }
      },
      methods: {
        setUserBalance () {
          this.$store.dispatch('users/updateBalance', {
            id: this.$route.params.id,
            amount: Number(this.amount),
            type: this.type,
            reason: this.reason
          })
          this.$bvModal.hide("changeUserBalance")
          this.amount = 0;
          this.reason = '';
        },
      },
      props: ['balance']
    }
  </script>
  