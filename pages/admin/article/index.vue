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
          {text: 'Новости', to: '/admin/news/'},
        ],
        pageNav: [
          {
            name: 'Список новостей',
            descript: 'Просмотр и управление новостями',
            url: '/admin/news/all/'
          },
          {
            name: 'Список разделов',
            descript: 'Просмотр и управление разделами',
            url: '/admin/news/all/'
          },
          {
            name: 'Создать новость',
            descript: 'Новая новость на сайте, Discord и VK',
            url: '/admin/news/add/'
          }
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Новости');
    },
    head() {
      return {
        title: "Новости"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
