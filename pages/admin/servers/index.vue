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
          {text: 'Сервера', to: '/admin/servers/'},
        ],
        pageNav: [
          {
            name: 'Список серверов',
            descript: 'Просмотр и управление серверами',
            url: '/admin/servers/all/'
          },
          {
            name: 'Модификации',
            descript: 'Управление модификациями и их привязка к серверам',
            url: '/admin/servers/mods/'
          }
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Сервера');
    },
    head() {
      return {
        title: "Сервера"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
