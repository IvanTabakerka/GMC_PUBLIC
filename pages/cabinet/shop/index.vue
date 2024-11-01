<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="2" md="12">
          <list-shop-navigate></list-shop-navigate>
        </b-col>
        <b-col lg="10" md="12">
          <b-row>
            <b-col lg="7" md="12" align-self="center">
              <h1>Магазин <b-badge>{{$store.state.shop.page.count}}</b-badge></h1>
            </b-col>
            <b-col lg="5" md="12" align-self="center">
              <b-form-group
                id="filter-group"
                label="Поиск"
                label-for="filter"
                label-cols="4"
                label-cols-lg="3"
              >
                <b-form-input id="filter" v-model="filter" trim @input="updateFilter()"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-card v-show="$store.state.shop.page.serverId < 1">
            <b-card-text>
              Выбери сервер на котором хочешь купить предметы
            </b-card-text>
          </b-card>
          <b-card v-show="$store.state.shop.page.count === 0 && $store.state.shop.page.serverId > 0 && $store.state.shop.page.modId === 0 && $store.state.shop.mods.navigate.length > 0">
            <b-card-text>
              Выбери интересующий мод
            </b-card-text>
          </b-card>
          <b-card v-show="$store.state.shop.page.count === 0 && $store.state.shop.page.serverId > 0 && $store.state.shop.page.modId > 0">
            <b-card-text>
              Не найдено
            </b-card-text>
          </b-card>
          <b-card v-show="$store.state.shop.mods.navigate.length === 0 && $store.state.shop.page.serverId > 0">
            <b-card-text>
              Предметы пока не добавлены
            </b-card-text>
          </b-card>
          <div v-show="$store.state.shop.page.count > 0">
            <tables-shop></tables-shop>
          </div>
        </b-col>
      </b-row>
      <pagenav-main
        v-if="$store.state.shop.page.count > 0"
        :pages="$store.state.shop.page.count >= $store.state.shop.page.limit ? (Math.ceil($store.state.shop.page.count/$store.state.shop.page.limit)).toString() : '1'"
        setPageCommit="shop/setPage"
        getDataAction="shop/get"
      ></pagenav-main>
      <modal-shop-buy></modal-shop-buy>
    </b-container>
  </div>
</template>
<script>
  export default {
    async fetch ({store}) {
      await store.commit('core/setPageName', 'Магазин');
    },
    middleware: 'checkAuth',
    data() {
      return {
        breadcrumb: [
          {text: 'Главная', to: '/'},
          {text: 'Личный кабинет', to: '/cabinet/'},
          {text: 'Магазин', to: '/cabinet/shop/'},
        ],
        filter: ''
      }
    },
    beforeCreate() {
      this.$store.state.shop.page.public = true;
    },
    created () {
      this.$store.dispatch('servers/getAll');
    },
    methods: {
      updateFilter () {
        this.$store.commit('shop/setFilter', this.filter);
        this.$store.dispatch('shop/get');
      }
    },
    head() {
      return {
        title: "Магазин | GoodMinecraft",
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Покупка игровых предметов на проекте.',
        }]
      };
    }
  };
</script>

<style lang="sass">
  @use '@/assets/sass/cabinet.sass'
</style>
