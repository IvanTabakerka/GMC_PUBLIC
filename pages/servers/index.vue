<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="servers_page content_padding">
      <section>
        <h1>Сервера Minecraft</h1>
        <p>Тут собраны большие сборки для длительной игры. Присутствуют такие моды, как ThaumCraft, GregTech, Industrial Craft, RailCraft и многие другие.</p>
        <p>Некоторые сборки мы создавали сами, некоторые стащили у известных создателей.</p>
        <div class="servers_el_online_wrapper">
          Общий онлайн
          <div class="servers_el_online">
            <div class="online">
              {{$store.getters['servers/getAllOnlineString']}}
            </div>
          </div>
        </div>
      </section>
      <div class="standart_graf_wrapper">
        <chart-server-online :servers="0"></chart-server-online>
        <div class="standart_graf_loader" v-show="$store.state.online.graf.dataLoading">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </div>
    </div>

    <div class="servers content_padding">
      <div class="servers_el bs" v-for="item in $store.getters['servers/getActive']" :key="item.id">
        <div class="servers_el_info">
          <div class="servers_el_info_bg" v-show="item.file" v-bind:style="`background: url('${$store.getters['core/getPath'](item.file)}') center/cover no-repeat;`"></div>
          <div class="servers_el_info_content">
            <div class="servers_el_tit bs">
              <router-link :to="'/servers/' + item.id + '/'">
                <h3>{{item.name}} <span>{{item.postfix}}</span></h3>
              </router-link>
              <div class="control">
                <a v-if="item.whitelist">
                  <img src="@/static/icons/shield.svg">
                  <span class="bs">Whitelist!<br>{{item.whitelistReason}}</span>
                </a>
                <a :href="item.dynMapUrl" v-if="item.dynMapUrl" target="_blank">
                  <img src="@/static/icons/map.svg">
                </a>
              </div>
            </div>
            <div class="servers_el_info_col descr_1">
              <article>
                <p>
                  {{item.shortDescription}}<br>
                  <span>
                    <b>Версия:</b> {{item.version}}<br>
                  </span>
                  <span>
                    <b>Тип сервера:</b> {{item.type}}<br>
                  </span>
                  <span v-show="item.vipeLast">
                    <b>Прошлый вайп:</b> {{$store.getters['core/getDateString'](item.vipeLast)}}<br>
                  </span>
                  <span v-show="item.vipeNext">
                    <b>Следующий вайп:</b> {{$store.getters['core/getDateString'](item.vipeNext)}}<br>
                  </span>
                </p>
              </article>
            </div>
            <div class="servers_el_info_col descr_2">
              <p>
                <span v-show="item.difficulty">
                   <b>Сложность:</b> {{item.difficulty}}<br>
                </span>
                <span v-show="item.pvp">
                   <b>PvP:</b> {{item.pvp ? 'Включено' : 'Выключено'}}<br>
                </span>
                <span v-show="item.worldSize">
                   <b>Размер карты:</b> {{item.worldSize}}x{{item.worldSize}}<br>
                </span>
                <span>
                   <b>Точки дома:</b> {{unvalible(item.housePoints)}}<br>
                </span>
                <span>
                   <b>Приват:</b> <span v-show="item.privatLimit > 0">от 0 до </span>{{unvalible(item.privatLimit)}}<br>
                </span>
                <span v-show="item.privatPlus">
                   <b>Прирост привата:</b> +{{item.privatPlus}} в час<br>
                </span>
              </p>
            </div>
            <div class="servers_el_online" v-if="item.servers_stats_hours[0]">
              <div class="online bs" v-if="item.servers_stats_hours[0].players_max == 0">
                Off
              </div>
              <div class="online bs" v-else>
                {{item.servers_stats_hours[0].players}}/{{item.servers_stats_hours[0].players_max}}
              </div>
            </div>
            <router-link class="type_standart" :to="`/servers/${item.id}/`">Подробнее</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch({store}) {
    await store.commit('core/setPageName', 'Сервера Minecraft');
    await store.dispatch('servers/getAll');
  },
  data() {
    return {
      breadcrumb: [
          {text: 'Главная', to: '/'},
          {text: 'Сервера', to: '/servers/'}
      ],
      stat: 1
    }
  },
  methods: {
    unvalible (value) {
      if (value === 0 || value === '' || value === null) {
        return 'Недоступно для игрока';
      } else {
        return value;
      }
    }
  },
  head() {
    return {
      title: "Сервера Minecraft | GoodMinecraft",
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Сервера майнкрафт с большими сборками для длительной игры. Присутствуют такие моды, как ThaumCraft, GregTech, Industrial Craft, RailCraft и многие другие.',
      }]
    };
  }
}
</script>

<style lang="sass">
  @use '@/assets/sass/servers.sass'
</style>
