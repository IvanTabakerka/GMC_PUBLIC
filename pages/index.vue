<template>
  <section class="home">
    <div class="home_descript">
      <section>
        <h1>GOOD<b>MINECRAFT</b></h1>
        <p>
          Мы старый и хардкорный проект с несколькими известными и самооборонными сборками.<br>
          У нас есть сервера Minecraft с модами GregTech, ThaumCraft, Forestry, IC2, MineFactory и прочие.<br>
          Для вашего удобства и безопасности имеется лаунчер.
        </p>
        <b-button squared to="/start/">Начать игру</b-button>
      </section>
      <section>
        <h2>Лучшие игроки этого месяца</h2>
        <br>
        <b-row>
          <b-col lg="4" md="12">
            <h4>Пивной амбассадор</h4>
            <p>Игроки, которые больше всех поддержали нас пивом</p>
            <ol class="home_top">
              <li class="home_top_el" v-for="item in $store.getters['donate/getThreeEls']" :key="'dn_' + item.userId">
                <p>{{ item.username }}</p>
                <span>{{ item.amount }}Р</span>
              </li>
            </ol>
          </b-col>
          <b-col lg="4" md="12">
            <h4>Алло, не могу говорить, я на заводе</h4>
            <p>Безвылазно поддерживают онлайн серверов</p>
            <ol class="home_top">
              <li class="home_top_el" v-for="item in $store.getters['online/getThreeEls']" :key="'zd_' + item.userId">
                <p>{{ item.username }}</p>
                <span>{{$store.getters['core/getTimeString'](item.count)}}</span>
              </li>
            </ol>
          </b-col>
          <b-col lg="4" md="12">
            <h4>Чисто на мониторингах</h4>
            <p>Поднимают проект в рейтинге на внешних ресурсах</p>
            <ol class="home_top">
              <li class="home_top_el" v-for="item in $store.getters['monitoring/getThreeEls']" :key="'zd_' + item.userId">
                <p>{{ item.username }}</p>
                <span>{{ item.count }}</span>
              </li>
            </ol>
          </b-col>
        </b-row>
      </section>
    </div>
  </section>
</template>

<script>
  export default {
    async fetch({store}) {
      await store.commit('core/setPageName', 'Главная страница');
      await store.dispatch('donate/getTop');
      await store.dispatch('online/getTop', 0);
      await store.dispatch('monitoring/getTop', 0);
    },
    head() {
      return {
        title: "GoodMinecraft - GregTech, ThaumCraft, Forestry и другие моды",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Мы старый и хардкорный проект с несколькими известными и самооборонными сборками. У нас есть сервера Minecraft с модами GregTech, ThaumCraft, Forestry, IC2, MineFactory и прочие. Для вашего удобства и безопасности имеется лаунчер.',
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: 'GoodMinecraft - проект с кучей серверов GregTech разных версий'
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: 'Мы старый и хардкорный проект с несколькими известными и самооборонными сборками. У нас есть сервера Minecraft с модами GregTech, ThaumCraft, Forestry, IC2, MineFactory и прочие. Для вашего удобства и безопасности имеется лаунчер.'
          },
          {
            hid: 'og:type',
            name: 'og:type',
            content: 'article'
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: 'https://goodminecraft.com/api/store/static/seo.jpg'
          },
          {
            hid: 'og:image:alt',
            name: 'og:image:alt',
            content: 'GoodMinecraft - проект с кучей серверов GregTech разных версий'
          },
          {
            hid: 'og:image:width',
            name: 'og:image:width',
            content: '1000'
          },
          {
            hid: 'og:image:height',
            name: 'og:image:height',
            content: '380'
          },
          {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://goodminecraft.com/'
          },
        ],
      };
    }
  };
</script>

<style lang="sass">
  @use '@/assets/sass/home.sass'
</style>
