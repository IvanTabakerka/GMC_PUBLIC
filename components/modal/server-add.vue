<template>
    <div>
      <b-modal id="server_add" centered title="Добавить новый сервер">
        <b-form-group label="Первая часть названия:">
            <b-form-input
            v-model="element.name"
            type="text"
            placeholder="TechWorld"
            ></b-form-input>
        </b-form-group>
        <b-form-group label="Вторая часть названия:">
            <b-form-input
            v-model="element.postfix"
            type="text"
            placeholder="HiTech4"
            ></b-form-input>
        </b-form-group>
        <template #modal-footer>
          <b-button squared @click="$bvModal.hide('server_add')">Отменить</b-button>
          <b-button squared @click="add()">Добавить</b-button>
        </template>
      </b-modal>
    </div>
  </template>
  
  
  <script>
    export default {
      data () {
        return {
          element: {
            hide: true
          }
        }
      },
      methods: {
        add () {
          this.$store.dispatch('servers/create', this.element);
          this.$bvModal.hide("server_add");
          this.element = {
            hide: true
          };
        }
      }
    }
  </script>
  