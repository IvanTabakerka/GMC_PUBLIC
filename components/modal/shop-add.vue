<template>
  <div>
    <b-modal id="shop_add" @show="resetModal" centered title="Добавить новый товар">
      <b-form-group
        lg="6"
        label="Модификация"
      >
        <b-form-select
          :options="$store.state.shop.mods.list"
          size="sm"
          v-model="$store.state.shop.mods.selectId"
          value="0"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Картинка">
        <b-form-file
          v-model="file_input"
          ref="file"
          browse-text="Файл"
          placeholder="Перетащите файл сюда..."
          drop-placeholder="Сюда..."
          size="sm"
        ></b-form-file>
      </b-form-group>
      <b-form-group label="Название:">
        <b-form-input
          v-model="element.name"
          type="text"
          placeholder="Нано-шлем"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Описание:">
        <b-form-textarea
          size="sm"
          v-model="element.descript"
          placeholder="Обсепечивает защиту головы. Заряжется от 128е.у"
          rows="2"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group label="Продаваемое количество:">
        <b-form-input
          v-model="element.count"
          type="text"
          placeholder="1"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Скрыть предмет:"
      >
        <b-form-checkbox switch v-model="element.hide" size="lg"></b-form-checkbox>
      </b-form-group>

      <template #modal-footer>
        <b-button squared @click="$bvModal.hide('shop_add')">Отменить</b-button>
        <b-button squared @click="add()">Добавить</b-button>
      </template>
    </b-modal>
  </div>
</template>


<script>
export default {
  data() {
    return {
      element: {
        stack: false,
        hide: false
      },
      file_input: {}
    }
  },
  methods: {
    add() {
      if (this.$refs['file'].files[0]) this.element.file = this.$refs['file'].files[0];
      this.$store.dispatch('shop/create', this.element);
      this.$store.dispatch('shop/getModsNavigate', this.$store.state.shop.page.serverId);
      this.$store.dispatch('shop/get', this.$store.state.shop.page.serverId);
      this.$bvModal.hide("shop_add")
    },
    resetModal() {
      this.element = {
        serversModId: 0,
        stack: false,
        rent: false
      }
      this.$store.dispatch('shop/getAllMods');
    }
  }
}
</script>
