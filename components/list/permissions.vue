<template>
    <b-container fliid class="px-0">
        <h2>Права пользователя в админпанели</h2>
        <br>
        <b-row>
            <b-col lg="12" md="12" v-for="item in $store.getters['perm/getPermList']({user: $store.state.users.element.permissions_connections, servers: $store.state.servers.list})" :key="item.id">
              <b-popover :target="`chb_target_${item.id}`" triggers="hover" placement="top">
                  {{item.description}}
              </b-popover>
              <b-container fluid :id="`chb_target_${item.id}`">
                  <b-form-checkbox switch size="lg" v-if="!item.hasServerConn" name="`chb_${item.id}`" v-model="item.canThis" @change="updateUserRule($store.state.users.element.id, item.id, null)">
                    {{item.name}}
                  </b-form-checkbox>
                  <h4 v-if="item.hasServerConn">
                    {{item.name}}
                  </h4>
                  <p>
                    {{item.base}}
                  </p>
                  <b-container fluid>
                    <b-form-checkbox v-if="item.hasServerConn" switch v-for="server in item.servers" v-model="server.canThis" :name="`chb_${item.id}_${server.id}`" @change="updateUserRule($store.state.users.element.id, item.id, server.id)" :key="item.id + '_' + server.id">
                        {{server.name}}<b>{{server.postfix}}</b>
                    </b-form-checkbox>
                  </b-container>
                  <hr>
              </b-container>
            </b-col>
        </b-row>
    </b-container>
  </template>
  
  
  <script>
    export default {
      methods: {
        updateUserRule (user, rule, server) {
            this.$store.dispatch('perm/updateUserPerm', {
            user: user,
            rule: rule,
            server: server
            });
        }
      }
    }
  </script>
  