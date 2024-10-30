<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-card-group deck>
        <card-navigate v-for="item in pageNav" :key="item.name" :data="item"/>
      </b-card-group>
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
        ],
        pageNav: [
          {
            name: 'Пользователи',
            descript: 'Статистика новых пользователей на сайте',
            url: '/admin/stats/users/'
          },
          {
            name: 'Сервера',
            descript: 'Стастистика онлайна на серверах',
            url: '/admin/stats/servers/'
          },
          {
            name: 'Деньги',
            descript: 'Приход капитала',
            url: '/admin/stats/money/'
          },
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Статистика');
    },
    head() {
      return {
        title: "Статистика"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
