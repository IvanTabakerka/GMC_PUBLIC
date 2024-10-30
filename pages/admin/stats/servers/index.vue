<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="2" md="12">
          <h3>Общее</h3>
          <b-list-group class="py-4">
            <b-list-group-item class="d-flex justify-content-between align-items-center" id="popover-index-m1r">
              <b-col md="4" class="pl-0 gray_text">
                M1R
              </b-col>
              <b-col md="8" class="text-right">
                {{$store.getters['online/getIndexM1R'](0).index}} <b-badge size="sm" :variant="$store.getters['online/getIndexM1R'](0).index < 1 ? 'danger' : 'success'">{{$store.getters['online/getIndexM1R'](0).delta}}%</b-badge>
              </b-col>
            </b-list-group-item>
            <b-popover target="popover-index-m1r" triggers="hover" placement="top">
              <template #title>Индекс М1R</template>
              Относительный показатель того, на сколько текущий показатель, хуже или лучше среднего показателя трёх предидущих периодов. Лучший результат по среднему онлайну.
            </b-popover>
            <b-list-group-item class="d-flex justify-content-between align-items-center" id="popover-index-m1a">
              <b-col md="4" class="pl-0 gray_text">
                M1A
              </b-col>
              <b-col md="8" class="text-right">
                {{$store.getters['online/getIndexM1A'](0).index}} <b-badge size="sm" :variant="$store.getters['online/getIndexM1A'](0).index < 1 ? 'danger' : 'success'">{{$store.getters['online/getIndexM1A'](0).delta}}%</b-badge>
              </b-col>
            </b-list-group-item>
            <b-popover target="popover-index-m1a" triggers="hover" placement="top">
              <template #title>Индекс М1A</template>
              Абсолютный показатель того, на сколько текущий показатель, хуже или лучше среднего показателя предидущих периодов. Лучший результат по среднему онлайну.
            </b-popover>
          </b-list-group>
        </b-col>
        <b-col lg="10" md="12">
          <div class="standart_graf_wrapper">
            <chart-server-online :servers="0"></chart-server-online>
            <div class="standart_graf_loader" v-show="$store.state.online.graf.dataLoading">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Загрузка...</strong>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row v-for="server in $store.state.servers.list" :key="'server_stat_' + server.id">
        <b-col lg="2" md="12">
          <h3>{{server.name}} {{server.postfix}}</h3>
          <b-list-group class="py-4">
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <b-col md="4" class="pl-0 gray_text">
                M1R
              </b-col>
              <b-col md="8" class="text-right">
                {{$store.getters['online/getIndexM1R'](server.id).index}} <b-badge size="sm" :variant="$store.getters['online/getIndexM1R'](server.id).index < 1 ? 'danger' : 'success'">{{$store.getters['online/getIndexM1R'](server.id).delta}}%</b-badge>
              </b-col>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <b-col md="4" class="pl-0 gray_text">
                M1A
              </b-col>
              <b-col md="8" class="text-right">
                {{$store.getters['online/getIndexM1A'](server.id).index}} <b-badge size="sm" :variant="$store.getters['online/getIndexM1A'](server.id).index < 1 ? 'danger' : 'success'">{{$store.getters['online/getIndexM1A'](server.id).delta}}%</b-badge>
              </b-col>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col lg="10" md="12">
          <div class="standart_graf_wrapper">
            <chart-server-online :servers="server.id" :hideControl="true"></chart-server-online>
            <div class="standart_graf_loader" v-show="$store.state.online.graf.dataLoading">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Загрузка...</strong>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Статистика', to: '/admin/stats/'},
          {text: 'Сервера', to: '/admin/stats/servers/'},
        ]
      }
    },
    async fetch({store}) {
      await store.dispatch('servers/getAll');
      await store.commit('online/setParams', {
        period: 'day',
        limit: 30,
        offset: 0,
      })
    },
    created () {
      this.$store.commit('core/setPageName', 'Статистика серверов');
    },
    head() {
      return {
        title: "Статистика серверов"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
