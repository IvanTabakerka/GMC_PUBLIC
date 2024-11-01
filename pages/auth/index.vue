<template>
    <div class="auth">
      <router-link to="/" class="back">
        На главную
      </router-link>
      <div class="auth_info">
        <h1>Авторизация</h1>
        <p>
          Войдя на сайт, ты сможешь поменять скин, прикупить барахлишка на серверах и стать полноценным гражданином.<br><br>
          Если же у тебя ещё нет учётной записи, нужно нажать на кнопку "Регистрация".<br>
        </p>
      </div>
      <form class="auth_form">
        <div class="input_container">
          <div class="input_row">
            <label for="username">Логин</label>
            <input type="text" id="username" v-model="data.username" name="login">
          </div>
          <div class="input_row">
            <label for="pass">Пароль</label>
            <input type="password" id="pass" v-model="data.password" name="password">
          </div>
          <a class="type_standart" @click="$store.dispatch('account/auth', data)">Вход</a>
          <router-link to="/regist/" class="type_standart">Регистрация</router-link>
          <router-link to="/auth/password-recovery/" class="recovery">Восстановить пароль</router-link>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    this.$store.commit('core/setPageName', 'Авторизация');
    if (this.$auth.loggedIn) this.$router.push('/');
  },
  head() {
    return {
      title: "Войти на сайт Good-Minecraft",
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Страница авторизации. Точка входа в то самое место откуда не выходят.',
      }]
    };
  },
  layout: 'clear',
}
</script>

<style lang="sass">
  @use '@/assets/sass/user.sass'
</style>
