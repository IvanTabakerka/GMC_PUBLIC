<template>
  <div>
    <b-list-group class="py-4">
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-col md="5" class="pl-0 gray_text">
          Почта
        </b-col>
        <b-col md="7">
          <b-row align-v="center">
            <b-col md="10" align="right" class="px-0">{{info.email}}</b-col>
            <b-col md="2" align="right" class="pr-0">
            </b-col>
          </b-row>
        </b-col>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-col md="5" class="pl-0 gray_text">
          Дата регистрации
        </b-col>
        <b-col md="7">
          <b-row align-v="center">
            <b-col md="10" align="right" class="px-0">{{info.createdAt}}</b-col>
            <b-col md="2" align="right" class="pr-0">
            </b-col>
          </b-row>
        </b-col>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-col md="5" class="pl-0 gray_text">Основной счёт</b-col>
        <b-col md="7">
          <b-row align-v="center">
            <b-col md="10" align="right" class="px-0">{{`${info.balance/100}₽`}}</b-col>
            <b-col md="2" align="right" class="pr-0" v-b-modal.changeUserBalance v-if="$store.getters['perm/checkPerm']('users.balance_change', $auth.user)">
              <b-img src="@/static/icons/plus.svg" class="type_standart_icon"></b-img>
            </b-col>
          </b-row>
        </b-col>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-col md="5" class="pl-0 gray_text">Голоса</b-col>
        <b-col md="7">
          <b-row align-v="center">
            <b-col md="10" align="right" class="px-0">{{info.vote}}</b-col>
            <b-col md="2" align="right" class="pr-0">
            </b-col>
          </b-row>
        </b-col>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-col md="5" class="pl-0 gray_text">Часов в игре</b-col>
        <b-col md="7">
          <b-row align-v="center">
            <b-col md="10" align="right" class="px-0">{{`${Math.round(info.uptime/60)}`}}</b-col>
            <b-col md="2" align="right" class="pr-0">
            </b-col>
          </b-row>
        </b-col>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-col md="5" class="pl-0 gray_text">Статус бана</b-col>
        <b-col md="7">
          <b-row align-v="center">
            <b-col md="10" align="right" class="px-0">
              {{ info.hwid && !info.hwid.banned ? 'Не забанен' : 'Забанен' }} {{ info.hwid && info.hwid.dateEnd ? ' до ' + $store.getters['core/getDateString'](info.hwid.dateEnd) : '' }}
            </b-col>
            <b-col md="2" align="right" class="pr-0">
            </b-col>
          </b-row>
        </b-col>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>


<script>
  export default {
    props: ['info', 'type']
  }
</script>
