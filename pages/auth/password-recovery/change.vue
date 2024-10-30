<template>
  <div class="auth">
    <router-link to="/" class="back">
      На главную
    </router-link>
    <div class="auth_info">
      <h3>Новый пароль</h3>
      <p>
        Введи новый пароль<br><br>
      </p>
    </div>
    <form class="auth_form">
      <div class="input_container">
        <div class="input_row">
          <label for="pass">Новый пароль</label>
          <input type="password" id="pass" v-model="userData.password" name="pass">
        </div>
        <div class="input_row">
          <label for="pass_repeat">Проверим новый пароль</label>
          <input type="password" id="pass_repeat" v-model="userData.repeatPassword" name="pass_repeat">
        </div>
        <a class="type_standart" @click="changePassword()">Сохранить</a>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userData: {
          pass: '',
          repeatPassword: ''
        }
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Новый пароль')
      if (this.$auth.loggedIn) this.$router.push('/');
      if (!this.$route.query.id && this.$route.query.code) this.$router.push('/');
    },
    methods: {
      changePassword () {
        this.userData.id = this.$route.query.id;
        this.userData.code = this.$route.query.code;
        this.$store.dispatch('account/passwordRecoverChange', this.userData);
      }
    },
    head() {
      return {
        title: "Новый пароль"
      };
    },
    layout: 'clear',
  }
</script>

<style lang="sass">
  @import '@/assets/sass/user.sass'
</style>
