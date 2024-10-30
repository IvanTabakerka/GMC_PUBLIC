<template>
  <div>
    <b-form-group
      label="Выбрать сервер"
    >
      <b-form-select
        :options="$store.getters['servers/getSelectOptions'](false)"
        size="sm"
        v-model="$store.state.mods.shop.serverId"
        @change="changeServer($store.state.mods.shop.serverId)"
      ></b-form-select>
    </b-form-group>
    <b-list-group v-show="$store.state.mods.shop.serverId > 0">
      <b-list-group-item class="shop_mods_list p-1" v-for="item in $store.state.shop.mods.navigate" :key="'shop_nav_' + item.id"
                         @click="changeMods(item.id)">
        <h2>{{ item.name }} <b>{{item.shops.length }}</b></h2>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  methods: {
    changeServer(serverId) {
      this.$store.state.shop.page.serverId = serverId;
      this.$store.state.shop.page.modId = 0;
      this.$store.dispatch('shop/getModsNavigate', serverId);
      this.$store.dispatch('shop/get', serverId);
    },
    changeMods (modId) {
      this.$store.state.shop.page.modId = modId;
      this.$store.dispatch('shop/get', this.$store.state.shop.page.serverId);
    }
  }
}
</script>

<style lang="sass">
.shop_mods_list
  cursor: pointer
  h2
    font-size: 14px
    b
      float: right
</style>
