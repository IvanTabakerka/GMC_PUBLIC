<template>
    <div class="auth">
      <router-link to="/auth/" class="back">
        Назад
      </router-link>
      <div class="auth_info">
        <h1>Восстановление пароля</h1>
        <p>
          Тебе будет выслано письмо на почту с ссылкой на форму восстановления пароля
        </p>
      </div>
      <form class="auth_form">
        <div class="input_container">
          <div class="input_row">
            <label for="email">EMail</label>
            <input type="text" id="email" v-model="userData.email" name="email">
          </div>
          <a class="type_standart" @click="$store.dispatch('account/passwordRecovery', userData)">Восстановить пароль</a>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        email: ''
      }
    }
  },
  created () {
    this.$store.commit('core/setPageName', 'Восстановление пароля');
    if (this.$auth.loggedIn) this.$router.push('/');
  },
  head() {
    return {
      title: "Восстановление пароля"
    };
  },
  layout: 'clear',
}
</script>

<style lang="sass">
  @use '@/assets/sass/user.sass'
</style>
