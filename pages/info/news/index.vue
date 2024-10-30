<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="news content_padding">
      <h1>Новости проекта</h1>
      <div id="vk_groups"></div>
    </div>
  </div>
</template>

<script>
  import { injectVKOpenApi, initVK } from "@/assets/js/vkInit.js";
  export default {
    data() {
      return {
        breadcrumb: [
          {text: 'Главная', to: '/'},
          {text: 'Информация', to: '/info/'},
          {text: 'Новости', to: '/info/news/'}
        ],
      }
    },
    async fetch({store}) {
      await store.commit('core/setPageName', 'Новости');
    },
    mounted() {
      injectVKOpenApi()
        .then(initVK(true))
        .then(() => {
          VK.Widgets.Group("vk_groups", {mode: 4, wide: 1, width: "auto", no_cover: 1, height: "600", color1: '181F27', color2: 'FFFFFF', color3: 'FFFFFF'}, 77786202);
        });
    },
    head() {
      return {
        title: "Новости | GoodMinecraft",
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'На этой странице находится виджет VK с новостями из нашего сообщества.',
        }]
      };
    }
  };
</script>

<style lang="sass">
  @import '@/assets/sass/news.sass'
</style>
