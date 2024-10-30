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
          {text: 'Продажи', to: '/admin/sell/'},
        ],
        pageNav: [
          {
            name: 'Привилегии',
            descript: 'Настройка продажи команд',
            url: '/admin/sell/privileges/'
          },
          {
            name: 'Магазин',
            descript: 'Настройка продажи блоков',
            url: '/admin/sell/shop/'
          },
          {
            name: 'Арендные блоки',
            descript: 'Настройка лизинга блоков',
            url: '/admin/sell/rent/'
          },
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Продажи');
    },
    head() {
      return {
        title: "Продажи"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
