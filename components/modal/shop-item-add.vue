<template>
    <div>
      <b-modal id="shop_item_add" centered title="Добавить новый товар">
        <b-form-group label="ID:">
          <b-form-input
            v-model="element.item_id"
            type="text"
            placeholder="Число до двоеточия"
            ></b-form-input>
        </b-form-group>
        <b-form-group label="META:">
          <b-form-input
            v-model="element.item_meta"
            type="text"
            placeholder="Число после двоеточия"
            ></b-form-input>
        </b-form-group>

        <template #modal-footer>
          <b-button squared @click="$bvModal.hide('shop_item_add')">Отменить</b-button>
          <b-button squared @click="add()">Добавить</b-button>
        </template>
      </b-modal>
    </div>
  </template>


  <script>
    export default {
      data () {
        return {
          element: {}
        }
      },
      methods: {
        add () {
          this.$store.dispatch('shop/createItem', this.element);
          this.$bvModal.hide("shop_item_add")
          this.element = {}
        }
      }
    }
  </script>
