<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="2" md="12">
          <b-card no-body>
            <b-tabs small vertical v-model="tabIndex" nav-wrapper-class="w-100">
              <b-tab 
                title="Выбрать сервер"
                v-on:click="setServer(0)"
                :value="0"
              ></b-tab>
              <b-tab 
                v-for="server in $store.getters['servers/getActive']"
                :key="server.id"
                :title="`${server.name}-${server.postfix}`"
                v-on:click="setServer(server.id)"
                :value="server.id"
                :disabled="!server.privilegeType"
              ></b-tab>
            </b-tabs>
          </b-card>
        </b-col>
        <b-col lg="10" md="12">
          <b-row>
            <b-col lg="7" md="12" align-self="center">
              <h1>Привилегии <b-badge>{{$store.state.privileges.count}}</b-badge></h1>
            </b-col>
            <b-col lg="5" md="12" align-self="center">
              <b-form-group
                id="filter-group"
                label="Поиск"
                label-for="filter"
                label-cols="4"
                label-cols-lg="3"
              >
                <b-form-input id="filter" v-model="filter" @input="updateFilter()" trim></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-card v-show="$store.state.privileges.allPage.server < 1">
            <b-card-text>
              Выбери сервер на котором хочешь получить привилегии
            </b-card-text>
          </b-card>
          <b-card v-show="$store.state.privileges.count == 0 && $store.state.privileges.allPage.server > 0">
            <b-card-text>
              Не найдено
            </b-card-text>
          </b-card>
          <div v-show="$store.state.privileges.count > 0">
            <tables-privileges-shop></tables-privileges-shop>
          </div>
        </b-col>
      </b-row>
      <modal-privileges-buy></modal-privileges-buy>
    </b-container>
  </div>
</template>

<script>
  export default {
    async fetch ({store}) {
      await store.commit('core/setPageName', 'Привилегии');
      store.state.privileges.allPage = {
        limit: 40,
        page: 1,
        loading: true,
        filter: '',
        server: 0
      }
      await store.dispatch('servers/getAll');
      await store.dispatch('privileges/getAll');
    },
    middleware: 'checkAuth',
    data() {
      return {
        breadcrumb: [
          {text: 'Главная', to: '/'},
          {text: 'Личный кабинет', to: '/cabinet/'},
          {text: 'Привилегии', to: '/cabinet/privileges/'},
        ],
        filter: '',
        tabIndex: 0
      }
    },
    methods: {
      setServer (id) {
        this.$store.commit('privileges/setServer', id);
        this.$store.dispatch('privileges/getAll');
      },
      updateFilter () {
        this.$store.commit('privileges/setFilter', this.filter);
        this.$store.dispatch('privileges/getAll');
      }
    },
    head() {
      return {
        title: "Привилегии | GoodMinecraft",
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Желание повыпендриваться ярким светом горит на всём нашем жизненном пути. Ни в чём себе не отказывай!',
        }]
      };
    }
  };
</script>

<style lang="sass">
  @import '@/assets/sass/cabinet.sass'
</style>
