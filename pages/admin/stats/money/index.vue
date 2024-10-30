<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      Разработочка
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
          {text: 'Капитал', to: '/admin/stats/users/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Статистика капитала');
    },
    head() {
      return {
        title: "Статистика капитала"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
