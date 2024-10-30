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
            <b-col lg="4" md="12">
              <h1>Магазин <b-badge>{{$store.state.shop.page.count}}</b-badge></h1>
            </b-col>
            <b-col lg="2" md="12" v-show="$store.state.shop.page.serverId > 0">
              <b-button block squared v-on:click="$bvModal.show('shop_add')">Добавить</b-button>
            </b-col>
            <b-col lg="6" md="12" v-show="$store.state.shop.page.serverId > 0">
              <b-form-group
                id="filter-group"
                label="Поиск по имени"
                label-for="filter"
                label-cols="4"
                label-cols-lg="4"
              >
                <b-form-input id="filter" v-model="filter" trim @input="updateFilter()"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <tables-shop-admin></tables-shop-admin>
          <pagenav-main
            :pages="$store.state.shop.page.count >= $store.state.shop.page.limit ? (Math.ceil($store.state.shop.page.count/$store.state.shop.page.limit)).toString() : '1'"
            setPageCommit="shop/setPage"
            getDataAction="shop/get"
          ></pagenav-main>
        </b-col>
      </b-row>
    </b-container>
    <modal-shop-add/>
    <modal-shop-update/>
    <modal-shop-item-add/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Продажи', to: '/admin/sell/'},
          {text: 'Магазин', to: '/admin/sell/shop/'},
        ],
        filter: ''
      }
    },
    beforeCreate() {
      this.$store.state.shop.page.public = false;
    },
    created () {
      this.$store.commit('core/setPageName', 'Магазин');
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
        title: "Магазин"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
