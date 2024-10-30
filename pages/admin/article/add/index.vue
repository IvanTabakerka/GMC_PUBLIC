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
          {text: 'Создать новость', to: '/admin/news/add/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Создать новость');
    },
    head() {
      return {
        title: "Создать новость"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
