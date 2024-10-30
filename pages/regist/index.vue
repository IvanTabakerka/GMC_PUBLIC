<template>
    <div class="auth">
      <router-link to="/" class="back">
        На главную
      </router-link>
      <div class="auth_info">
        <h1>Регистрация</h1>
        <p>
          Для регистрации необходима действующая почта<br><br>
          Действующая!<br><br>
          На эту почту придёт письмо с ссылкой-подтверждением<br>
        </p>
      </div>
      <form class="auth_form">
        <div class="input_container">
          <div class="input_row">
            <label for="username">Логин</label>
            <input type="text" id="username" v-model="data.username" name="login">
          </div>
          <div class="input_row">
            <label for="email">EMail</label>
            <input type="text" id="email" v-model="data.email" name="email">
          </div>
          <div class="input_row">
            <label for="pass">Пароль</label>
            <input type="password" id="pass" v-model="data.password" name="pass">
          </div>
          <div class="input_row">
            <label for="pass_repeat">Проверим пароль</label>
            <input type="password" id="pass_repeat" v-model="data.repeatPassword" name="pass_repeat">
          </div>
          <p class="text-center">Регистрируясь на нашем сайте, вы автоматически соглашаетесь с нашими <a href="https://wiki.goodminecraft.com/ru/rules" target="_blank">правилами</a></p>
          <a class="type_standart" @click="$store.dispatch('account/regist', data)">Зарегистрировать</a>
          <router-link to="/auth/" class="type_standart">Войти на сайт</router-link>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.$store.commit('core/setPageName', 'Авторизация')
    if (this.$auth.loggedIn) this.$router.push('/');
  },
  head() {
    return {
      title: "Регистрация | GoodMinecraft",
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Создай учетную запись на нашем сайте. Регистрация занимает не более пяти минут',
      }]
    };
  },
  layout: 'clear',
}
</script>

<style lang="sass">
  @import '@/assets/sass/user.sass'
</style>
