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
          {text: 'Система', to: '/admin/system/'},
        ],
        pageNav: [
          {
            name: 'Команды',
            descript: 'Выполнение особых команд',
            url: '/admin/system/command/'
          }
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Система');
    },
    head() {
      return {
        title: "Система"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
