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
          {text: 'Новости', to: '/admin/news/'},
          {text: 'Список новостей', to: '/admin/news/all/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Список новостей');
    },
    head() {
      return {
        title: "Список новостей"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
