<template>
    <div>
        <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
        <b-container fluid>
            <b-row>
                <b-col lg="7" md="12">
                    <section>
                        <h1>Пожертвования</h1>
                        <br>
                        <p>С тебя пиво!</p>
                        <p>
                            Любая посильная сумма которую вы пожертвуете на этой странице поможет стать проекту не закрыться.
                        </p>
                        <p>
                            Ниже показано, на что в основном уходят ваши пожертвования.
                        </p>
                        <br>
                        <b-list-group>
                            <b-list-group-item><b>Оплата хостинга</b> - сбор денег на хостинг стоит всегда на первом месте. Без этого сбора, проект не может сущестовать. Средний чек выходит примерно 7,500 рублей ежемесячно (завист от курса евро).</b-list-group-item>
                            <b-list-group-item><b>Покупка EБаллов</b> - многие мониторинги на которых мы есть, предоставляют платные услуги по повышению серверов в топе. Обычно, достаточно вложить в них около 2,000 рублей, чтобы поток новых игроков заметно увеличился.</b-list-group-item>
                            <b-list-group-item><b>Пиво</b> - сбор пивной дани Табакерке. Чем больше вы дадите пивной дани, тем больше у него желания работать над проектом.</b-list-group-item>
                        </b-list-group>
                        <br>
                        <hr>
                        <b-col lg="12" md="12" v-if="this.$auth.loggedIn">
                          <b-form-group label="Сколько вы готовы пожертвовать?">
                              <b-form-input
                                  type="text"
                                  v-model="payment.count"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group label="Публичный комментарий или отзыв (до 400 символов)">
                            <b-form-textarea
                              v-model="payment.comment"
                              placeholder="Напишите прикол, похватлите (поругайте) админа, сделайте предложение по серверу."
                              rows="3"
                              max-rows="6"
                            ></b-form-textarea>
                          </b-form-group>
                          <p>
                            Данная форма пожертвований доступна игрокам из России<br>
                            Из других стран можно поддержать нас, скинув пожертвование на <a href="PayPal.me/lipotato" class="url" target="_blank">PayPal</a> и написав в дискорд @IvanTabakerka
                          </p>
                          <b-button squared @click="$store.dispatch('donate/sign', payment)">Пожертвовать</b-button>
                        </b-col>
                        <b-col lg="12" md="12" v-else>
                          <p>Для совершения пожертвования надо быть в системе</p><br>
                          <p>
                            <router-link to="/auth/" class="type_standart">Войти на сайт</router-link>
                            <router-link to="/regist/" class="type_standart">Регистрация</router-link>
                          </p>
                        </b-col>
                    </section>
                </b-col>
                <b-col lg="5" md="12">
                  <b-list-group>
                    <b-list-group-item>
                      <h2>Всего собрано в этом месяце: {{ $store.state.donate.summary }}<b></b></h2>
                    </b-list-group-item>
                    <b-list-group-item>
                      <p>Собираем на хостинг, рекламу и пиво</p>
                      <br>
                      <b-progress :max="20000" height="2rem">
                        <b-progress-bar :value="$store.state.donate.summary">
                          <span><strong>{{$store.state.donate.summary}}/20000</strong></span>
                        </b-progress-bar>
                      </b-progress>
                    </b-list-group-item>
                  </b-list-group>
                  <b-list-group class="py-4">
                    <b-list-group-item>
                      <h2>Пивные амбассадоры</h2>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="$store.state.donate.list.length < 1">
                      <b-col md="12" class="pl-0 gray_text">
                        Никто ещё не поддержал проект в этом месяце
                      </b-col>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="item in $store.state.donate.list" :key="item.userId">
                      <b-col md="5" class="pl-0 gray_text">
                        {{ item.username }}
                      </b-col>
                      <b-col md="7" class="text-right">
                        {{ item.amount }}₽
                      </b-col>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  export default {
    data() {
      return {
          breadcrumb: [
              {text: 'Главная', to: '/'},
              {text: 'Пожертвования', to: '/donate/'}
          ],
          payment: {
            count: 10,
            comment: '',
            cash: 'capusta'
          }
      }
    },
    async fetch({store}) {
      await store.commit('core/setPageName', 'Поддержка проекта');
      await store.dispatch('donate/getTop');
    },
    methods: {
      fundraisingValue (value, min, max) {
        if (value < min) {
          return 0;
        } else if (value > min && value < max) {
          return value;
        } else if (value > min && value > max) {
          return max;
        }
      }
    },
    head() {
      return {
        title: "Пожертвования | GoodMinecraft",
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Помоги оплатить хостинг и напоить пивом администрацию.',
        }]
      };
    },
  };
</script>
