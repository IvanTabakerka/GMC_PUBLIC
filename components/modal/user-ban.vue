<template>
    <div>
      <b-modal id="user_ban" centered title="ВЧК ОГПУ">
        <p>Для малых банов до суток можно использовать функционал сервера. Для серьезных проступков, можно использовать бан по железу.<br> Следует комбинировать бан по железу и бан на сервере, т.к бан начинает действие после перезагрузки сервера.</p>
        <br>
        <b-form-group v-show="user.hwid && !user.hwid.banned">
          <b-form-radio-group
            id="change_type"
            v-model="ban.type"
            :options="ban.changeTypes"
            name="radios-btn-default"
            buttons
          ></b-form-radio-group>
        </b-form-group>
        <p v-show="ban.type==='perm' && user.hwid && !user.hwid.banned">Не освящается в прессе.<br> У игрока в лаунчере выводятся "Техработы".<br> Выдавать только в крайнем случае, если поведение игрока деструктивно.</p>
        <b-form-group
          v-show="user.hwid && !user.hwid.banned && ban.type!=='perm'"
          id="change_value_label"
          label="Время"
          label-for="change_value"
          label-cols="12"
          label-cols-lg="4"
        >
          <b-form-datepicker id="change_value" v-model="ban.dateEnd" trim></b-form-datepicker>
        </b-form-group>
        <b-form-group
          id="change_reason_label"
          label="Причина"
          label-for="change_reason"
          label-cols="12"
          label-cols-lg="4"
        >
          <b-form-input id="change_reason" v-model="ban.reason" trim></b-form-input>
        </b-form-group>
        <p>Игрок: <b>{{ user.username }}</b></p>
        <p>Текущий статус: <b>{{ user.hwid && !user.hwid.banned ? 'Не забанен' : 'Забанен' }} {{ !!user.hwid && !!user.hwid.dateEnd ? ' до ' + $store.getters['core/getDateString'](user.hwid.dateEnd) : '' }}</b></p>
        <template #modal-footer>
          <b-button squared @click="$bvModal.hide('user_ban')">Отменить</b-button>
          <b-button squared @click="toggleBan()">{{ user.hwid && !user.hwid.banned ? 'Репрессировать' : 'Помиловать' }}</b-button>
        </template>
      </b-modal>
    </div>
  </template>
  
  
  <script>
    export default {
      data () {
        return {
          ban: {
            dateEnd: null,
            type: "temp",
            reason: "",
            changeTypes: [
              {text: "Временный", value: "temp"},
              {text: "Перманентный", value: "perm"}
            ]
          }
        }
      },
      methods: {
        toggleBan () {
          if (this.ban.type === "temp" && !this.ban.dateEnd && !this.user.hwid.banned)  {
            this.$toast.show('Выбери дату окончания бана');
            return null;
          }
          if (!this.ban.reason) {
            this.$toast.show('Укажи причину');
            return null;
          }
          this.$store.dispatch('users/ban', {
            userId: this.$route.params.id,
            dateEnd: this.ban.type === "perm" ? false : this.ban.dateEnd,
            reason: this.ban.reason
          })
          this.$bvModal.hide("user_ban")
          this.ban.dateEnd = null;
          this.ban.reason = '';
        },
      },
      props: ['user']
    }
  </script>
  