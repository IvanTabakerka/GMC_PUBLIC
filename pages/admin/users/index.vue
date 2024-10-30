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
          {text: 'Пользователи', to: '/admin/users/'},
        ],
        pageNav: [
          {
            name: 'Все пользователи',
            descript: 'Просмотр и управление игроками.',
            url: '/admin/users/all/'
          },
          {
            name: 'Карта администрации',
            descript: 'Просмотр и управление администраторами.',
            url: '/admin/users/admins/'
          }
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Пользователи');
    },
    head() {
      return {
        title: "Пользователи"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
