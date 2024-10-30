<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid class="pb-2">
      <b-row>
          <b-col lg="2" md="12">
            <section>
              <h1>У кого больше?</h1>
              <br>
              <p>
                Бесконечно можно смотреть на три вещи: огонь, воду и как игроки меряются размером своего онлайна.
              </p>
              <p>
                Трем победителям, в конце месяца полагается приз в виде дополнительной миски риса и кошкожителя. 
              </p>
            </section>
          </b-col>
          <b-col lg="5" md="12" class="pr-0">
            <b-list-group v-if="$store.state.online.rating[0]">
              <b-list-group-item>
                <h2>Рейтинг этого месяца</h2>
                <small>Всего отыграно: {{ $store.getters['core/getTimeString']($store.state.online.rating[0].summary) }}</small>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(item, index) in $store.state.online.rating[0].list" :key="item.userId">
                <b-col md="7" class="pl-0" v-bind:class="{gray_text:(index > 9)}">
                  {{index+1}}. {{ item.username }}
                </b-col>
                <b-col md="5" class="text-right">
                  {{$store.getters['core/getTimeString'](item.count)}}
                </b-col>
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col lg="5" md="12" class="pl-1">
            <b-list-group v-if="$store.state.online.rating[1]">
              <b-list-group-item>
                <h2>Победители прошлого месяца</h2>
                <small>Всего отыграно: {{ $store.getters['core/getTimeString']($store.state.online.rating[1].summary) }}</small>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(item, index) in $store.state.online.rating[1].list" :key="item.userId">
                <b-col md="7" class="pl-0">
                  <span v-bind:class="{gray_text:(index > 9)}">{{index+1}}. {{ item.username }}</span>
                  <small v-show="revardValue(index)">
                    <b>+{{revardValue(index)}}₽</b>
                  </small>
                </b-col>
                <b-col md="5" class="text-right">
                  {{$store.getters['core/getTimeString'](item.count)}}
                </b-col>
              </b-list-group-item>
            </b-list-group>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
          breadcrumb: [
              {text: 'Главная', to: '/'},
              {text: 'Сервера', to: '/servers/'},
              {text: 'Рейтинг онлайна', to: '/servers/rating/'}
          ]
      }
    },
    async fetch({store}) {
      await store.commit('core/setPageName', 'Рейтинг онлайна');
      await store.dispatch('online/getTop', 0);
      await store.dispatch('online/getTop', 1);
    },
    methods: {
      revardValue (idx) {
        const revard = [500, 300, 200, 70, 60, 50, 40, 30, 20, 10];
        if (revard[idx]) {
          return revard[idx];
        } else {
          return false;
        }
      }
    },
    head() {
      return {
        title: "Рейтинг онлайна | GoodMinecraft",
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Бесконечно можно смотреть на три вещи: огонь, воду и как игроки меряются размером своего онлайна.',
        }]
      };
    },
  };
</script>