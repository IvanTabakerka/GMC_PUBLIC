<template>
  <div>
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col lg="8" md="12">
          <h1>Привилегии <b-badge>{{$store.state.privileges.count}}</b-badge></h1>
        </b-col>
        <b-col lg="4" md="12" >
          <b-button block squared v-on:click="$bvModal.show('privileges_add')" v-if="$store.getters['perm/checkPerm']('sell.privileges', $auth.user)">Добавить новую привилегию</b-button>
        </b-col>
      </b-row>
      <br>
      <tables-privileges/>
    </b-container>
    <modal-privileges-add/>
    <modal-privileges-update/>
  </div>
</template>

<script>
  export default {
    async fetch ({store}) {
      store.state.privileges.allPage = {
        limit: false,
        page: false,
        loading: true,
        filter: '',
        server: -1
      }
    },
    data () {
      return {
        breadcrumb: [
          {text: 'Админпанель', to: '/admin/'},
          {text: 'Продажи', to: '/admin/sell/'},
          {text: 'Привилегии', to: '/admin/sell/privileges/'},
        ]
      }
    },
    created () {
      this.$store.commit('core/setPageName', 'Привилегии');
      this.$store.dispatch('privileges/getAll');
      this.$store.dispatch('servers/getAll');
    },
    head() {
      return {
        title: "Привилегии"
      };
    },
    layout: 'admin',
    middleware: ['adminPanel'],
  }
</script>
