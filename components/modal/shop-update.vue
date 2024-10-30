<template>
  <div>
    <b-modal id="shop_update" @show="resetModal" centered title="Изменить товар">
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
      <b-img class="pb-3 shop_image_update" fluid v-if="$store.state.shop.page.element.file" :src="$store.getters['core/getPath']($store.state.shop.page.element.file)"></b-img>
      <b-form-group label="Название:">
          <b-form-input
          v-model="$store.state.shop.page.element.name"
          type="text"
          placeholder="Нано-шлем"
          ></b-form-input>
      </b-form-group>
      <b-form-group label="Описание:">
        <b-form-textarea
            size="sm"
            v-model="$store.state.shop.page.element.descript"
            placeholder="Обсепечивает защиту головы. Заряжется от 128е.у"
            rows="2"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group label="Продаваемое количество:">
        <b-form-input
          v-model="$store.state.shop.page.element.count"
          type="text"
          placeholder="1"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Скрыть предмет:"
      >
        <b-form-checkbox switch v-model="$store.state.shop.page.element.hide" size="lg"></b-form-checkbox>
      </b-form-group>

      <template #modal-footer>
        <b-button squared @click="$bvModal.hide('shop_update')">Отменить</b-button>
        <b-button squared @click="update()">Изменить</b-button>
      </template>
    </b-modal>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        file_input: {}
      }
    },
    methods: {
      update () {
        if (this.$refs['file'].files[0]) this.$store.state.shop.page.element.newFile = this.$refs['file'].files[0];
        this.$store.dispatch('shop/update', this.$store.state.shop.page.element);
        this.$bvModal.hide("shop_update")
      },
      resetModal () {
        this.$store.dispatch('mods/get', {
          serverId: this.$store.state.shop.page.serverId
        });
      }
    }
  }
</script>
