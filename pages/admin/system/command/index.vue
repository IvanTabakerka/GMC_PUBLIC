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
          {text: 'Система', to: '/admin/system/'},
          {text: 'Команды', to: '/admin/system/command/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Команды');
    },
    head() {
      return {
        title: "Команды"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
