<template>
    <div class="gmc_descript_wrapper">
        <img src="@/static/gymmc.jpg">
        <div class="gmc_descript">
            <h1>GYM<b>MC</b></h1>
            <p>Команда разработки сайтов на битрикс</p>
            <p>Цена: <b>300$</b></p>
            <a href="mailto: IvanTabakerka@yandex.ru">IvanTabakerka@yandex.ru</a>
        </div>
    </div>
</template>

<script>
export default {
    async fetch({store}) {
        await store.commit('core/setPageName', 'Разработчик');
    },
    head() {
        return {
            title: "Разработчик | GoodMinecraft"
        };
    }
};
</script>

<style lang="sass">
    @import '@/assets/sass/home.sass'
</style>
  
