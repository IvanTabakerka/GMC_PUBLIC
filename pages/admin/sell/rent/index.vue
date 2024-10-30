<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
    </b-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Продажи', to: '/admin/sell/'},
          {text: 'Аренда', to: '/admin/sell/privileges/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Аренда');
    },
    head() {
      return {
        title: "Аренда"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
