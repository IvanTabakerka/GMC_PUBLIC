<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="4" md="12">
          <section>
            <h1>Голосование на мониторингах</h1>
            <br>
            <p>Голосуя за проект вы повышаете наш рейтинг на мониторингах и как следствие к нам приходит больше новичков. За каждый голос, начисляются баллы голосования.</p>
            <p>Их вы можете обменять на игровую валюту любого сервера в личном кабинете. Также ежемесячно самым голосующим игрокам полагаются подарки.</p>
            <p>На мониторинге hotmc период голосования составляет 2 часа, на всех остальных 24 часа.</p>
          </section>
          <section class="my-2">
            <b-list-group>
              <b-list-group-item>
                <h2>Список мониторингов</h2>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(item, index) in $store.state.monitoring.page.list" :key="'monitor_' + index">
                <b-col md="8" class="pl-0 up_text">
                  {{index+1}}. {{ item.name }}
                </b-col>
                <b-col md="1" class="text-right ">
                  <img v-show="item.boost" src="@/static/icons/fire.svg" class="icon" v-b-tooltip.hover title="Двойная награда за голосование">
                </b-col>
                <b-col md="3" class="text-center ">
                  <b-button squared :href="item.link" target="_blank">Перейти</b-button>
                </b-col>
              </b-list-group-item>
            </b-list-group>
          </section>
          <section class="my-2">
            <b-card title="Автоматизация">
              <hr>
              <b-card-text>
                  Вы можете поставить расширение на браузер, позволяющее автоматически проголосовать при открытии браузера (нужно будет лишь пройти капчу).<br>
                  Довольно сильно надоедает после пары месяцев, но легко выключается.
              </b-card-text>
              <hr>
              <b-row align-h="center">
                <b-col lg="2">
                  <a href="https://chrome.google.com/webstore/detail/auto-vote-rating/mdfmiljoheedihbcfiifopgmlcincadd" target="_blank">
                    <img src="@/static/icons/chrome.svg">
                  </a>
                </b-col>
                <b-col lg="2">
                  <a href="https://addons.mozilla.org/ru/firefox/addon/auto-vote-rating/" target="_blank">
                    <img src="@/static/icons/firefox.svg">
                  </a>
                </b-col>
              </b-row>
            </b-card>
          </section>
        </b-col>
        <b-col lg="4" md="12" class="py-0">
          <b-list-group v-if="$store.state.monitoring.rating[0]">
            <b-list-group-item>
              <h2>Рейтинг этого месяца</h2>
              <small>Всего голосов: {{ $store.state.monitoring.rating[0].summary }}</small>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(item, index) in $store.state.monitoring.rating[0].list" :key="'rate_' + item.userId[0]">
              <b-col md="7" class="pl-0" v-bind:class="{gray_text:(index > 2)}">
                {{index+1}}. {{ item.username }}
              </b-col>
              <b-col md="5" class="text-right">
                {{item.count}}
              </b-col>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col lg="4" md="12" class="pl-1">
          <b-list-group v-if="$store.state.monitoring.rating[1]">
            <b-list-group-item>
              <h2>Победители прошлого месяца</h2>
              <small>Всего голосов: {{ $store.state.monitoring.rating[1].summary }}</small>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(item, index) in $store.state.monitoring.rating[1].list" :key="'rate_old_' + item.userId[0]">
              <b-col md="7" class="pl-0" v-bind:class="{gray_text:(index > 2)}">
                {{index+1}}. {{ item.username }}
                <small v-show="revardValue(index)">
                  <b>+{{revardValue(index)}}₽</b>
                </small>
              </b-col>
              <b-col md="5" class="text-right">
                {{item.count}}
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
        hitrojopost: false,
        breadcrumb: [
          {text: 'Главная', to: '/'},
          {text: 'Голосование', to: '/vote/'}
        ],
      }
    },
    async fetch({store}) {
      await store.commit('core/setPageName', 'Голосование');
      await store.dispatch('monitoring/get');
      await store.dispatch('monitoring/getTop', 0);
      await store.dispatch('monitoring/getTop', 1);
    },
    methods: {
      revardValue (idx) {
        const revard = [300, 200, 100];
        if (revard[idx]) {
          return revard[idx];
        } else {
          return false;
        }
      }
    },
    head() {
      return {
        title: "Голосование | GoodMinecraft",
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Голосуя за проект вы повышаете наш рейтинг на мониторингах и как следствие к нам приходит больше новичков. За каждый голос, начисляются баллы голосования.',
        }]
      };
    },
  };
</script>
