<template>
  <div>
    <b-container fluid="xl">
      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    </b-container>
    <noindex>
      <b-container fluid="xl">
        <section class="servers_el_info">
          <div class="servers_el_info_bg" v-show="$store.state.servers.element.file" v-bind:style="`background: url('${$store.getters['core/getPath']($store.state.servers.element.file)}') center/cover no-repeat;`"></div>
          <div class="servers_el_info_content">
            <div class="servers_el_tit bs">
              <span class="tilte">{{$store.state.servers.element.name}}-<span>{{$store.state.servers.element.postfix}}</span></span>
              <div class="control">
                <a v-if="$store.state.servers.element.whitelist">
                  <img src="@/static/icons/shield.svg">
                  <span class="bs">Whitelist!<br>{{$store.state.servers.element.whitelistReason}}</span>
                </a>
                <a :href="$store.state.servers.element.dynMapUrl" v-if="$store.state.servers.element.dynMapUrl" target="_blank">
                  <img src="@/static/icons/map.svg">
                </a>
              </div>
            </div>
            <div class="servers_el_info_col descr_1">
              <p>
                {{$store.state.servers.element.shortDescription}}<br>
                <span>
                  <b>Версия:</b> {{$store.state.servers.element.version}}<br>
                </span>
                <span>
                  <b>Тип сервера:</b> {{$store.state.servers.element.type}}<br>
                </span>
                <span v-show="$store.state.servers.element.vipeLast">
                  <b>Прошлый вайп:</b> {{$store.getters['core/getDateString']($store.state.servers.element.vipeLast)}}<br>
                </span>
                <span v-show="$store.state.servers.element.vipeNext">
                  <b>Следующий вайп:</b> {{$store.getters['core/getDateString']($store.state.servers.element.vipeNext)}}<br>
                </span>
              </p>
            </div>
            <div class="servers_el_info_col descr_2">
              <p>
                <span v-show="$store.state.servers.element.dif">
                  <b>Сложность:</b> {{$store.state.servers.element.difficulty}}<br>
                </span>
                <span v-show="$store.state.servers.element.pvp">
                  <b>PvP:</b> {{$store.state.servers.element.pvp ? 'Включено' : 'Выключено'}}<br>
                </span>
                <span v-show="$store.state.servers.element.worldSize">
                  <b>Размер карты:</b> {{$store.state.servers.element.worldSize}}x{{$store.state.servers.element.worldSize}}<br>
                </span>
                <span>
                  <b>Точки дома:</b> {{unvalible($store.state.servers.element.housePoints)}}<br>
                </span>
                <span>
                  <b>Приват:</b> <span v-show="$store.state.servers.element.privatLimit > 0">от 0 до </span>{{unvalible($store.state.servers.element.privatLimit)}}<br>
                </span>
                <span v-show="$store.state.servers.element.privatPlus">
                  <b>Прирост привата:</b> +{{$store.state.servers.element.privatPlus}} в час<br>
                </span>
              </p>
            </div>
            <div class="servers_el_online" v-if="$store.state.servers.element.servers_stats_hours[0]">
              <div class="online bs" v-if="$store.state.servers.element.servers_stats_hours[0].players_max == 0">
                Off
              </div>
              <div class="online bs" v-else>
                {{$store.state.servers.element.servers_stats_hours[0].players}}/{{$store.state.servers.element.servers_stats_hours[0].players_max}}
              </div>
            </div>
          </div>
        </section>
      </b-container>
    </noindex>
    <b-container fluid="lg">
      <b-row>
        <b-col lg="6" md="12">
          <article class="server_text_wrapper" v-if="$store.state.servers.element.fullDescription">
            <h1>{{$store.state.servers.element.name}}-{{$store.state.servers.element.postfix}}</h1>
            <div class="server_text" v-show="$store.state.servers.element.fullDescription" v-html="$store.getters['core/newLineNTag']($store.state.servers.element.fullDescription)"></div>
          </article>
        </b-col>
        <b-col class="server_tab_content_wrapper" lg="6" md="12">
          <b-tabs class="server_tab_content_nav" v-model="tabIndex">
            <b-tab title="Ссылки и модификации" active></b-tab>
            <b-tab title="Активность игроков"></b-tab>
            <b-tab title="Топ богачей" v-if="!!$store.state.servers.element.economyType"></b-tab>
            <b-tab title="Администрация" v-if="$store.state.servers.admins.length > 0"></b-tab>
          </b-tabs>
          <!-- Mods -->
          <section class="server_tab_content" v-show="tabIndex == 0">
            <div class="server_mods_wrapper">
              <div v-if="$store.state.servers.element.servers_links.length > 0">
                <h2>Полезные ссылки</h2>
                <div class="server_link">
                  <a class="server_mods_link" v-for="item in $store.state.servers.element.servers_links" :key="`link_${item.id}`" :href="item.url" target="_blank">
                    {{item.name}}<span>{{ item.url }}</span>
                  </a>
                </div>
              </div>
              <div v-if="$store.state.servers.element.servers_mods.length > 0">
                <h2>Установленные моды</h2>
                <div class="server_mods">
                  <div class="server_mods_el" v-for="item in $store.state.servers.element.servers_mods" :key="`mods_${item.id}`">
                    <h3>{{item.name}}</h3>
                    <!-- <p v-show="item.description">
                      {{item.description}}
                    </p> -->
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- Activity -->
          <section class="server_tab_content" v-show="tabIndex == 1">
            <div class="standart_graf_wrapper">
              <chart-server-online :servers="$route.params.id"></chart-server-online>
              <div class="standart_graf_loader" v-show="$store.state.stats.servers.dataLoading">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Загрузка...</strong>
              </div>
            </div>
            <div class="activity_banner">
              <div class="activity_banner_title">
                <h3>Активность</h3>
                <p v-if="tabActiveIndex == 1 && $store.state.servers.element.servers_stats_days[0]">
                  Пик онлайна: <b>{{ $store.state.servers.element.servers_stats_days[0].maximum }}</b><br>
                  В среднем: <b>{{ $store.state.servers.element.servers_stats_days[0].medium }}</b>
                </p>
                <p v-if="tabActiveIndex == 0 && $store.state.servers.element.servers_stats_months[0]">
                  Пик онлайна: <b>{{ $store.state.servers.element.servers_stats_months[0].maximum }}</b><br>
                  В среднем: <b>{{ $store.state.servers.element.servers_stats_months[0].medium }}</b>
                </p>
                <b-tabs small v-model="tabActiveIndex">
                  <b-tab title="За месяц"></b-tab>
                  <b-tab title="Сегодня" active></b-tab>
                </b-tabs>
              </div>
              <div class="players" v-if="tabActiveIndex == 1 && $store.state.servers.element.servers_stats_days[0]">
                <span v-for="player in $store.state.servers.element.servers_stats_days[0].servers_stats_days_connections" :key="`player_days_${player.id}`">
                  {{player.user.username}} ({{$store.getters['core/getTimeString'](player.count)}})
                </span>
                <span v-show="$store.state.servers.element.servers_stats_days[0].servers_stats_days_connections.length == 0">Пока никто не заходил</span>
              </div>
              <div class="players" v-if="tabActiveIndex == 0 && $store.state.servers.element.servers_stats_months[0]">
                <span v-for="player in $store.state.servers.element.servers_stats_months[0].servers_stats_months_connections" :key="`player_month_${player.id}`">
                  {{player.user.username}} ({{$store.getters['core/getTimeString'](player.count)}})
                </span>
                <span v-show="$store.state.servers.element.servers_stats_months[0].servers_stats_months_connections.length == 0">Пока никто не заходил</span>
              </div>
            </div>
          </section>
          <!-- Economy -->
          <section class="server_tab_content" v-show="tabIndex == 2 && !!$store.state.servers.element.economyType">
            <div class="activity_banner economic">
              <div class="activity_banner_title">
                <h3>Экономика</h3>
                <p class="text-right">
                  Всего: <b>{{ Number($store.state.economy.sum).toFixed(2) }}</b><br>
                  В среднем: <b>{{ Number($store.state.economy.medium).toFixed(2) }}</b>
                </p>
              </div>
              <div class="players">
                <span v-for="player in $store.getters['economy/getLimitedList']" :key="`player_eco_${player.id}`">
                  <span>{{player.username}}</span><span><b>{{player.balance}}</b>УЕ</span>
                </span>
              </div>
            </div>
          </section>
          <!-- Admins -->
          <section class="server_tab_content" v-show="tabIndex == 3 && $store.state.servers.admins.length > 0">
            <div class="server_admins_wrapper" v-for="group in $store.state.servers.admins" :key="`admins_group_${group.id}`">
              <h3>{{group.name}}</h3>
              <div class="server_admins">
                <div class="server_admins_el" v-for="user in group.permissions_connections" :key="`admins_${user.id}`">
                  <b-avatar v-if="$store.getters['core/getPath'](user.user.file)"
                    size="2rem"
                    :src="$store.getters['core/getPath'](user.user.file)"
                  ></b-avatar>
                  <b-avatar v-else
                    size="2rem"
                  ></b-avatar>
                  <h4>{{ user.user.username }}</h4>
                </div>
              </div>
            </div>
          </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breadcrumb: [],
        tabIndex: 0,
        tabActiveIndex: 1
      }
    },
    created() {
      this.breadcrumb = [
        {text: 'Главная', to: '/'},
        {text: 'Сервера', to: '/servers/'},
        {text: this.$store.state.servers.element.name + '-' + this.$store.state.servers.element.postfix, to: '/servers/' + this.$store.state.servers.element.id + '/'}
      ];
      this.$store.dispatch('servers/getAdmins', this.$route.params.id);
    },
    async fetch({store,route,error}) {
      await store.dispatch('servers/getOne', route.params.id);
      if (!store.state.servers.element || store.state.servers.element.hide) {
        error({ statusCode: 404, message: 'Страница не найдена' })
      }
      if (store.state.servers.element.economyType) {
        await store.dispatch('economy/getTop', route.params.id);
      }
      await store.commit('core/setPageName', 'Информация о сервере');
    },
    methods: {
      unvalible (value) {
        if (value === 0 || value === '' || value === null) {
          return 'Недоступно';
        } else {
          return value;
        }
      }
    },
    head() {
      return {
        title: this.$store.state.servers.element.name + '-' + this.$store.state.servers.element.postfix + ' | GoodMinecraft',
        meta: [{
          hid: 'description',
          name: 'description',
          content: this.$store.state.servers.element.seoDescription
        }]
      };
    }
  }
</script>

<style lang="sass">
  @use '@/assets/sass/servers.sass'
</style>
