<template>
    <div class="auth regist">
      <router-link to="/" class="back">
        На главную
      </router-link>
      <div class="regist_bg">
        <img src="@/static/regist_bg.png">
      </div>
      <div class="auth_info clear">
        <h3>Регистрация прошла успешно</h3>
<!--        <p>Тебе на почту выслано письмо с ссылкой-подтверждением</p><br>-->
<!--        <p>Если подтверждение не будет выполнено, ты не сможешь у нас играть</p><br>-->
        <router-link to="/auth/" class="type_standart">Войти на сайт</router-link>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        username: '',
        pass: ''
      }
    }
  },
  created () {
    this.$store.commit('core/setPageName', 'Авторизация')
    if (this.$auth.loggedIn) this.$router.push('/');
  },
  head() {
    return {
      title: "Регистрация успешна | GoodMinecraft"
    };
  },
  layout: 'clear',
}
</script>

<style lang="sass">
  @import '@/assets/sass/user.sass'
</style>
