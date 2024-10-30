<template>
    <div>
      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
      <b-container fluid>
        <h2>{{ $store.state.servers.element.name }}<b>{{ $store.state.servers.element.postfix }}</b></h2>
        <hr>
        <b-form @submit="onSubmit">
            <b-row>
                <b-col lg="5" md="12">
                    <b-img fluid v-if="$store.state.servers.element.file" :src="$store.getters['core/getPath']($store.state.servers.element.file)"></b-img>
                    <b-form-group label="Обложка">
                      <b-form-file
                          v-model="file_input"
                          ref="file"
                          browse-text="Файл"
                          placeholder="Перетащите файл сюда..."
                          drop-placeholder="Сюда..."
                          size="sm"
                          ></b-form-file>
                    </b-form-group>
                    <b-form-group label="Первая часть названия:">
                        <b-form-input
                        v-model="$store.state.servers.element.name"
                        type="text"
                        placeholder="TechWorld"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Вторая часть названия:">
                        <b-form-input
                        v-model="$store.state.servers.element.postfix"
                        type="text"
                        placeholder="Test"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Версия:">
                        <b-form-input
                        v-model="$store.state.servers.element.version"
                        type="text"
                        placeholder="1.7.10"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Сложность:">
                        <b-form-select 
                          :options="formOptions.difficulty"
                          size="sm"
                          v-model="$store.state.servers.element.difficulty"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group
                        label="Тип:"
                    >
                        <b-form-input
                        v-model="$store.state.servers.element.type"
                        type="text"
                        placeholder="HiTech"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Дата последнего вайпа"
                    >
                      <b-form-datepicker v-model="$store.state.servers.element.vipeLast" trim></b-form-datepicker>
                    </b-form-group>
                    <b-form-group
                      label="Дата следующего вайпа"
                    >
                      <b-form-datepicker v-model="$store.state.servers.element.vipeNext" trim></b-form-datepicker>
                    </b-form-group>
                    <b-form-group
                        label="Краткое описание:"
                    >
                        <b-form-textarea
                            size="sm"
                            v-model="$store.state.servers.element.shortDescription"
                            placeholder="Текст 100 символов"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-group
                        label="Полное описание:"
                    >
                        <b-form-textarea
                            size="sm"
                            v-model="$store.state.servers.element.fullDescription"
                            placeholder="Большой текст"
                            rows="12"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-group
                        label="SEO описание (200-350):"
                    >
                        <b-form-textarea
                            size="sm"
                            v-model="$store.state.servers.element.seoDescription"
                            placeholder="Текст для поисковых запросов"
                            rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
                <b-col lg="7" md="12">
                    <b-row>
                        <b-col lg="6" md="12">
                          <b-row>
                            <b-col lg="4" md="12">
                              <b-form-group
                                label="PVP:"
                              >
                                <b-form-checkbox switch v-model="$store.state.servers.element.pvp" size="lg"></b-form-checkbox>
                              </b-form-group>
                            </b-col>
                            <b-col lg="4" md="12">
                              <b-form-group
                                label="Вайтлист:"
                              >
                                <b-form-checkbox switch v-model="$store.state.servers.element.whitelist" size="lg"></b-form-checkbox>
                              </b-form-group>
                            </b-col>
                            <b-col lg="4" md="12">
                              <b-form-group
                                label="Скрыт:"
                              >
                                <b-form-checkbox switch v-model="$store.state.servers.element.hide" size="lg"></b-form-checkbox>
                              </b-form-group>
                            </b-col>
                          </b-row>
                          <b-form-group
                              label="Награда за голос:"
                          >
                              <b-form-input
                              v-model="$store.state.servers.element.voteAward"
                              type="number"
                              placeholder="1000"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Цена за день префикса (копейки):"
                          >
                              <b-form-input
                              v-model="$store.state.servers.element.prefixCost"
                              type="number"
                              placeholder="1000"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Лимит привата на человека"
                          >
                              <b-form-input
                              v-model="$store.state.servers.element.privatLimit"
                              type="number"
                              placeholder="10000"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Прирост привата GriefPrevention"
                          >
                              <b-form-input
                              v-model="$store.state.servers.element.privatPlus"
                              type="number"
                              placeholder="60"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Обработчик магазина:"
                          >
                              <b-form-select 
                                :options="formOptions.shopType"
                                size="sm"
                                v-model="$store.state.servers.element.shopType"
                              ></b-form-select>
                          </b-form-group>
                          <b-form-group
                              label="Обработчик привилегий:"
                          >
                              <b-form-select 
                                :options="formOptions.privilegeType"
                                size="sm"
                                v-model="$store.state.servers.element.privilegeType"
                              ></b-form-select>
                          </b-form-group>
                          <b-form-group
                              label="Обработчик экономики:"
                          >
                              <b-form-select 
                                :options="formOptions.economyType"
                                size="sm"
                                v-model="$store.state.servers.element.economyType"
                              ></b-form-select>
                          </b-form-group>
                          <b-form-group
                              label="Адрес сервера:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.address"
                                type="text"
                                placeholder="s2.divinity.tech"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Порт сервера:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.port"
                                type="text"
                                placeholder="25565"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="SM порт:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.smPort"
                                type="text"
                                placeholder="25665"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="SM пароль:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.smKey"
                                type="text"
                                placeholder="Ввести значение для изменения"
                              ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col lg="6" md="12">
                          <b-form-group
                              label="Комментарий к вайтлисту:"
                          >
                              <b-form-textarea
                                  size="sm"
                                  v-model="$store.state.servers.element.whitelistReason"
                                  placeholder="Описать причину почему на сервере вайтлист и как в него попасть"
                                  rows="4"
                              ></b-form-textarea>
                          </b-form-group>
                          <b-form-group
                              label="Ссылка на DynMap:"
                          >
                              <b-form-input
                              v-model="$store.state.servers.element.dynMapUrl"
                              type="text"
                              placeholder="https://s2.goodminecraft.com:8882/"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Размер мира:"
                          >
                              <b-form-input
                              v-model="$store.state.servers.element.worldSize"
                              type="number"
                              placeholder="8000"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Доступные точки дома для игрока:"
                          >
                              <b-form-input
                              v-model="$store.state.servers.element.housePoints"
                              type="number"
                              placeholder="8000"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Адрес БД:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.dbAddress"
                                type="text"
                                placeholder="Обычно совпадает с адресом сервера"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Порт БД:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.dbPort"
                                type="text"
                                placeholder="3306"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Имя БД:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.dbName"
                                type="text"
                                placeholder="gmc_htht4"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Пользователь БД:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.dbUser"
                                type="text"
                                placeholder="gmc_htht4"
                              ></b-form-input>
                          </b-form-group>
                          <b-form-group
                              label="Пароль БД:"
                          >
                              <b-form-input
                                v-model="$store.state.servers.element.dbPassword"
                                type="text"
                                placeholder="Ввести значение для изменения"
                              ></b-form-input>
                          </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-button type="submit" variant="dark">Сохранить</b-button>
        </b-form>
      </b-container>
    </div>
  </template>
  
  <script>
    export default {
      data () {
        return {
          breadcrumb: [
            {text: 'Админпанель', to: '/admin/'},
            {text: 'Сервера', to: '/admin/servers/'},
            {text: 'Список серверов', to: '/admin/servers/all/'},
            {text: 'Редактирование сервера'},
          ],
          form: {},
          formOptions: {
            difficulty: [
              { value: null, text: 'Не выбрано' },
              { value: 'Легко', text: 'Легко' },
              { value: 'Нормально', text: 'Нормально' },
              { value: 'Сложно', text: 'Сложно' },
              { value: 'Невыносимо', text: 'Невыносимо' },
              { value: 'Пиздец', text: 'Пиздец', disabled: true }
            ],
            shopType: [
              { value: null, text: 'Не выбрано' },
              { value: 'sm', text: 'Server Manager' }
            ],
            privilegeType: [
              { value: null, text: 'Не выбрано' },
              { value: 'sm', text: 'Server Manager' },
              { value: 'lp', text: 'LuckPerms' },
              { value: 'pex', text: 'PermissionsEx' }
            ],
            economyType: [
              { value: null, text: 'Не выбрано' },
              { value: 'ic', text: 'IConomy' }
            ],
          },
          file_input: []
        }
      },
      methods: {
        onSubmit (event) {
          event.preventDefault()
          if (this.$refs['file'].files[0]) this.$store.state.servers.element.newFile = this.$refs['file'].files[0];
          this.$store.dispatch('servers/update', this.$store.state.servers.element)
        }
      },
      created () {
        this.$store.dispatch('servers/getOne', this.$route.params.id);
        this.$store.commit('core/setPageName', 'Редактирование сервера');
      },
      head() {
        return {
          title: "Редактирование сервера"
        };
      },
      layout: 'admin',
      middleware: ['adminPanel'],
    }
  </script>
  