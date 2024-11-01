<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
        <h1>Информация</h1>
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
          {text: 'Главная', to: '/'},
          {text: 'Информация', to: '/info/'},
        ],
        pageNav: [
          {
            name: 'Новости',
            descript: 'Просто виджет с новостями из ВК',
            url: '/info/news/'
          },
          {
            name: 'Wiki',
            descript: 'Раздел с гайдами, описанием плагинов и статьями',
            url: 'https://wiki.goodminecraft.com/',
            targetBlank: true
          },
        ]
      }
    },
    async fetch({store}) {
        await store.commit('core/setPageName', 'Информация');
    },
    head() {
        return {
            title: "Как начать играть на серверах? | GoodMinecraft",
        }
    }
};
</script>

<style lang="sass">
    @use '@/assets/sass/home.sass'
</style>

