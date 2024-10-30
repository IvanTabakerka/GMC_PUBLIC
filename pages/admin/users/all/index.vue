<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <h1>Все пользователи <b-badge>{{$store.state.users.count}}</b-badge></h1>
      <b-form-group
        id="filter-group"
        label="Поиск по имени"
        label-for="filter"
        label-cols="4"
        label-cols-lg="2"
      >
        <b-form-input id="filter" v-model="filter" trim @input="updateFilter()"></b-form-input>
      </b-form-group>
      <tables-users/>
    </b-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Пользователи', to: '/admin/users/'},
          {text: 'Все пользователи', to: '/admin/users/all/'},
        ],
        filter: ''
      }
    },
    methods: {
      updateFilter () {
        this.$store.commit('users/setFilter', this.filter);
        this.$store.dispatch('users/getAll');
      },
    },
    created () {
      this.filter = this.$store.state.users.allPage.filter;
      this.$store.commit('core/setPageName', 'Все пользователи');
    },
    head() {
      return {
        title: "Все пользователи"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
