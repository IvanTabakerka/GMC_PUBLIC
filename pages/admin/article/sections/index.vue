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
          {text: 'Список разделов', to: '/admin/news/sections/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Список разделов');
    },
    head() {
      return {
        title: "Список разделов"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
