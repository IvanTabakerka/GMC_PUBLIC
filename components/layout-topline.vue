<template>
  <div class="header_wrapper">
    <header>
      <div class="menu_trigger" @click="menuTrigger()" :class="{active:$store.state.nav.navigateOpen}">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span class="main_title">{{ $store.state.core.pageName }}</span>
      <div class="hdr_control" v-if="!this.$auth.loggedIn">
        <router-link to="/auth/" class="type_standart">Войти</router-link>
      </div>
      <div class="hdr_control" v-else>
        <div class="hdr_control_profile" @click="profileOpen = true">
          <b-avatar v-if="$auth.user.file" v-bind:src="$store.getters['core/getPath']($auth.user.file)"></b-avatar>
          <b-avatar v-else></b-avatar>
        </div>
        <transition name="slide_up">
          <div class="hdr_modal_profile bs" v-show="profileOpen">
            <div class="universal_close absolute" @click="profileOpen = false"></div>
            <b-avatar v-if="$auth.user.file" v-bind:src="$store.getters['core/getPath']($auth.user.file)" size="6rem"></b-avatar>
            <b-avatar v-else size="6rem"></b-avatar>
            <h2>{{$auth.user.username}}</h2>
            <p class="info">
              <span>Баланс</span>
              <span @click="profileOpen = false">
                {{$auth.user.balance/100}} ₽
                <router-link class="icon_medium" to="/donate/">
                  <img src="@/static/icons/plus.svg">
                </router-link>
              </span>
              <span>Голосов</span>
              <span @click="profileOpen = false">
                {{$auth.user.vote}} шт.
                <router-link to="/vote/">
                  <span class="icon_medium">
                    <img src="@/static/icons/plus.svg">
                  </span>
                </router-link>
              </span>
            </p>
            <router-link to="/cabinet/" class="type_standart stretch">Личный кабинет</router-link>
            <a class="type_standart stretch" @click="$auth.logout()">Выход</a>
          </div>
        </transition>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profileOpen: false
    }
  },
  methods: {
    menuTrigger () {
      if (!this.$store.state.nav.navigateCloseAnimation) {
        if (this.$store.state.nav.navigateOpen) {
          this.$store.commit('nav/navigateMobileAniamteTrigger');
          setTimeout(()=>{
            this.$store.commit('nav/navigateMobileAniamteTrigger');
            this.$store.commit('nav/navigateMobileTrigger');
          }, 400)
        } else {
          this.$store.commit('nav/navigateMobileTrigger');
        }
      }
    }
  }
};
</script>
