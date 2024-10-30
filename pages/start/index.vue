<template>
    <section class="home">
        <div class="home_descript">
            <h1>Как начать играть?</h1>
            <b-row>
                <b-col lg="4" md="12">
                    <b-card title="Регистрация">
                        <b-card-text>
                            Создай учетную запись на нашем сайте<br>
                            Регистрация занимает не более пяти минут
                        </b-card-text>
                        <hr>
                        <b-button to="/regist/" v-if="!this.$auth.loggedIn">РЕГИСТРАЦИЯ</b-button>
                        <p v-else>Ты в системе!</p>
                    </b-card>
                </b-col>
                <b-col lg="4" md="12">
                    <b-card title="Лаунчер">
                        <b-card-text>
                            Скачай и запусти лаунчер для освей ОС<br>
                            На Windows лаунчер сам скачает себе необходимое ПО,<br>
                            на Mac и Linux вам нужна Java с поддержкой JavaFX.
                        </b-card-text>
                        <hr>
                        <b-button squared :href="$store.state.core.server.address + 'storage/static/GMC-EXE.zip'">EXE (Windows)</b-button>
                        <b-button squared :href="$store.state.core.server.address + 'storage/static/GMC-JAR.zip'">JAR</b-button>
                    </b-card>
                </b-col>
                <b-col lg="4" md="12">
                    <b-card title="Сервер">
                        <b-card-text>
                            Выберите понравившийся сервер и загрузите клиент через лаунчер.
                        </b-card-text>
                        <hr>
                        <b-button to="/servers/">ВЫБРАТЬ СЕРВЕР</b-button>
                    </b-card>
                </b-col>
            </b-row>
            <p>Если у вас возникли ошибки при запуске игры, вы можете найти их решения на странице техраздела</p>
            <b-button href="https://wiki.goodminecraft.com/ru/problems" target="_blank">Техраздел</b-button>
            <p>Если ничего не помогло, то вы можете создать тикет<br> в нашем дискорде в разделе "Техподдержка" в канале "Создать-тикет"</p>
            <div class="navigate_soc" style="justify-content: center;">
                <a href="https://discord.com/invite/h5VuaW5" class="discord" target="_blank">
                    <img src="@/static/icons/discord.svg">
                </a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    async fetch({store}) {
        await store.commit('core/setPageName', 'Старт');
    },
    head() {
        return {
            title: "Как начать играть на серверах? | GoodMinecraft",
            meta: [
            {
                hid: 'og:title',
                name: 'og:title',
                content: 'Как начать играть на серверах GMC?'
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content: 'Краткая инструкция о том, как скачать клиент игры и получить доступ к серверу.'
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
                hid: 'og:type',
                name: 'og:type',
                content: 'article'
            },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'https://goodminecraft.com/start/'
            },
            ],
        };
    }
};
</script>

<style lang="sass">
    @import '@/assets/sass/home.sass'
</style>
  
