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
          {text: 'Пользователи', to: '/admin/users/'},
          {text: 'Карта администрации', to: '/admin/users/admins/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Карта администрации');
    },
    head() {
      return {
        title: "Карта администрации"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
