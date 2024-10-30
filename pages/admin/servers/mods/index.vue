<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="6">
          <h1>Модификации <b-badge>{{$store.state.mods.page.count}}</b-badge></h1>
          <b-form-group
            id="filter-group"
            label="Поиск по имени"
            label-for="filter"
            label-cols="4"
            label-cols-lg="2"
            class="py-2"
          >
            <b-form-input id="filter" v-model="filter" trim @input="updateFilter()"></b-form-input>
          </b-form-group>
          <b-list-group v-show="$store.state.mods.page.list" class="py-2">
            <b-list-group-item class="mods_list d-flex justify-content-between align-items-center p-1" v-for="item in $store.getters['mods/getLinkedMods']" :key="item.id">
              <b-col md="10" class="pl-0">
                <h2>
                  {{ item.name }}
                </h2>
                <p v-show="$store.state.mods.page.serverId === 0">{{item.description}}</p>
                <p class="srv" v-show="$store.state.mods.page.serverId === 0">
                  <span v-for="server in item.servers" :key="item.id + '_' + server.id">{{ server.name }}<b>{{ server.postfix }}</b></span>
                </p>
              </b-col>
              <b-col md="1" class="px-1">
                <b-row>
                  <b-col lg="6" class="p-0">
                    <b-img class="icon" src="@/static/icons/gear.svg" v-on:click="updateModShow(item)"></b-img>
                  </b-col>
                  <b-col lg="6" class="p-0">
                    <b-img class="icon" src="@/static/icons/close.svg" v-on:click="$store.dispatch('mods/delete', item.id)"></b-img>
                  </b-col>
                </b-row>
              </b-col>
              <b-col md="1" class="text-right px-1 pb-2 toggle" v-show="$store.state.mods.page.serverId !== 0">
                <b-form-checkbox switch size="lg" v-model="item.linked" @change="$store.dispatch('mods/toggleServer', {modId: item.id,serverId: $store.state.mods.page.serverId})"></b-form-checkbox>
              </b-col>
            </b-list-group-item>
          </b-list-group>
          <pagenav-main
            :pages="$store.state.mods.page.count >= $store.state.mods.page.limit ? (Math.ceil($store.state.mods.page.count/$store.state.mods.page.limit)).toString() : '1'"
            setPageCommit="mods/setPage"
            getDataAction="mods/get"
          ></pagenav-main>
        </b-col>
        <b-col lg="6">
          <b-form @submit="createMod">
            <h3>Добавить мод</h3>
            <b-form-group label="Название:" label-cols="4">
                <b-form-input
                v-model="create.name"
                type="text"
                placeholder="GregTech 4"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Описание:" label-cols="4">
              <b-form-textarea
                  size="sm"
                  v-model="create.description"
                  placeholder="Аддон к IC2. Добавляет множество механик, усложений и технических блоков"
                  rows="2"
              ></b-form-textarea>
            </b-form-group>
            <b-button type="submit" block>Добавить</b-button>
          </b-form>
          <hr>
          <b-form-group
              lg="6"
              label="Выбрать сервер для привязки"
          >
              <b-form-select 
                :options="$store.getters['servers/getSelectOptions'](false)"
                size="sm"
                v-model="$store.state.mods.page.serverId"
                @change="changeServer($store.state.mods.page.serverId)"
              ></b-form-select>
          </b-form-group>
          <b-list-group v-show="$store.state.mods.page.raw">
            <b-list-group-item class="mods_list d-flex justify-content-between align-items-center p-1" v-for="item in $store.state.mods.page.raw" :key="'rm_' + item.id">
              <b-col md="8" class="pl-0">
                <h2>
                  {{item.modid}}
                </h2>
              </b-col>
              <b-col md="4" class="text-right px-1">
                <h2>
                  {{item.version}}
                </h2>
              </b-col>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="mods_update" centered title="Изменить мод">
      <b-form-group label="Название:">
          <b-form-input
          v-model="update.name"
          type="text"
          placeholder="GregTech 4"
          ></b-form-input>
      </b-form-group>
      <b-form-group label="Описание:">
        <b-form-textarea
            size="sm"
            v-model="update.description"
            placeholder="Аддон к IC2. Добавляет множество механик, усложений и технических блоков"
            rows="2"
        ></b-form-textarea>
      </b-form-group>
      
      <template #modal-footer>
        <b-button squared @click="$bvModal.hide('mods_update')">Отменить</b-button>
        <b-button squared @click="updateMod()">Изменить</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Сервера', to: '/admin/servers/'},
          {text: 'Модификации', to: '/admin/servers/mods/'},
        ],
        create: {
          name: '',
          description: ''
        },
        update: {
          name: '',
          description: ''
        },
        filter: ''
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Модификации');
      this.$store.dispatch('servers/getAll')
      this.$store.dispatch('mods/get', {
        serverId: 0,
        goodsRequere: false
      })
    },
    methods: {
      changeServer (serverId) {
        this.$store.dispatch('mods/get')
        if (serverId > 0) {
          this.$store.dispatch('mods/getRawMods', serverId)
        } else {
          this.$store.state.mods.page.raw = [];
        }
      },
      createMod (event) {
        event.preventDefault()
        this.$store.dispatch('mods/create', {
          name: this.create.name,
          description: this.create.description
        })
      },
      updateModShow (mod) {
        this.update.modId = mod.id;
        this.update.name = mod.name;
        this.update.description = mod.description;
        this.$bvModal.show('mods_update')
      },
      updateMod () {
        this.$store.dispatch('mods/update', {
          modId: this.update.modId,
          name: this.update.name,
          description: this.update.description
        })
        this.$bvModal.hide('mods_update')
      },
      updateFilter () {
        this.$store.commit('mods/setFilter', this.filter);
        this.$store.dispatch('mods/get');
      }
    },
    head() {
      return {
        title: "Модификации"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>

<style lang="sass">
.mods_list
  h2
    font-size: 14px
  p
    font-size: 12px
  .srv
    display: flex
    flex-wrap: wrap
    span
      padding: 2px
      margin: 2px
      background: #33404d
  .toggle
    background: #33404d
</style>