<template>
  <div class="payment">
    <div class="payment_descript">
      <p class="payment_descript_info">Ошибка 404 - страница не найдена</p>
      <p>Либо это ошибка, либо ты слишком любопытный</p>
      <br>
      <router-link to="/" class="type_standart">На главную</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: 'Ошибка 404',
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Либо это ошибка, либо ты слишком любопытный',
        }]
      };
    },
    props: ['error'],
    layout: 'clear'
  }
</script>

<style lang="sass">
  @import '@/assets/sass/cabinet.sass'
</style>

