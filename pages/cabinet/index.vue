<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div class="cabinet content_padding">
      <div class="cabinet_skin_wrapper">
        <div class="cabinet_skin_image">
          <canvas id="skin_container"></canvas>
        </div>
      </div>
      <div class="cabinet_nav">
        <router-link to="/cabinet/privileges/" class="type_standart">Привилегии</router-link>
        <router-link to="/cabinet/shop/" class="type_standart">Магазин</router-link>
        <div class="cabinet_download" v-show="!$store.state.cabinet.skin">
          <label class="type_standart" for="skin">Загрузить скин</label>
          <input type="file" name="skin" id="skin" ref="skin" v-on:change="handleSkinUpload()">
        </div>
        <a class="type_standart" v-show="$store.state.cabinet.skin" v-on:click="$store.dispatch('cabinet/deleteSkin')">Удалить скин</a>
        <div class="cabinet_download" v-show="!$store.state.cabinet.cloak">
          <label class="type_standart" for="cloak">Загрузить плащ</label>
          <input type="file" name="cloak" id="cloak" ref="cloak" v-on:change="handleCloackUpload()">
        </div>
        <a class="type_standart" v-show="$store.state.cabinet.cloak" v-on:click="$store.dispatch('cabinet/deleteCloak')">Удалить плащ</a>
        <!-- <router-link to="/cabinet/history/" class="type_standart">История операций</router-link> -->
        <a class="type_standart" v-b-modal.changeUser_cabinet>Настроить профиль</a>
      </div>
      <div class="cabinet_balance">
        <div class="standart_list cabinet_status">
          <div class="header shadow">
            <h3>{{ $auth.user.username }}</h3>
          </div>
          <div class="el shadow">
            <div class="el_string">
              <h4 class="name">
                Почта
              </h4>
              <p class="control">
                <span>{{$auth.user.email}}</span>
              </p>
            </div>
            <div class="el_string">
              <h4 class="name">
                Дата регистрации
              </h4>
              <p class="control">
                <span>{{$store.getters['core/getDateString']($auth.user.createdAt)}}</span>
              </p>
            </div>
            <div class="el_string">
              <h4 class="name">
                Баланс
              </h4>
              <p class="control">
                <span>{{$auth.user.balance/100}}₽</span>
                <router-link class="icon" to="/donate/">
                  <img src="@/static/icons/plus.svg">
                </router-link>
              </p>
            </div>
            <div class="el_string" v-if="$auth.user.servers_stats_months_connections.length > 0">
              <h4 class="name">
                Время онлайн
              </h4>
              <p class="control">
                <span>{{ $store.getters['core/getTimeString']($auth.user.servers_stats_months_connections[0].count) }}</span>
              </p>
            </div>
          </div>
          <div class="el shadow">
            <div class="el_string">
              <h4 class="name">
                Голоса на мониторингах
              </h4>
              <p class="control">
                <span>{{$auth.user.vote}} шт</span>
                <router-link to="/vote/" class="icon">
                  <img src="@/static/icons/plus.svg">
                </router-link>
              </p>
              <p class="cost" v-b-modal.vote_convert>
                Обменять
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-vote-convert></modal-vote-convert>
    <modal-user-change :userId="$auth.user.id" page="cabinet"></modal-user-change>
  </div>
</template>

<script>
  export default {
    async fetch({store}) {
      await store.commit('core/setPageName', 'Личный кабинет');
    },
    middleware: 'checkAuth',
    async created() {
      await this.$store.dispatch('cabinet/skinCheck');
    },
    data() {
      return {
        breadcrumb: [
          {text: 'Главная', to: '/'},
          {text: 'Личный кабинет', to: '/cabinet/'}
        ],
      }
    },
    methods: {
      handleSkinUpload (){
        this.$store.dispatch('cabinet/skinsUploadImage', this.$refs.skin.files[0]);
      },
      handleCloackUpload (){
        this.$store.dispatch('cabinet/cloaksUploadImage', this.$refs.cloak.files[0]);
      }
    },
    head() {
      return {
        title: 'Личный кабинет | GoodMinecraft',
        script: [
          { hid: 'stripe', src: this.$store.getters['core/getAddress'] + 'storage/static/js/skinview3d.bundle.js', defer: true }
        ],
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Место для того, что бы потратить свои деньги!',
        }]
      }
    }
  };
</script>

<style lang="sass">
  @use '@/assets/sass/cabinet.sass'
</style>
