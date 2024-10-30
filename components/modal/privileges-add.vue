<template>
    <div>
      <b-modal id="privileges_add" centered title="Добавить новую привилегию">
        <p>Если привилегия с таким же именем и правом существует, то новую не добавлять!</p>
        <hr>
        <b-form-group label="Название:">
            <b-form-input
            v-model="element.name"
            type="text"
            placeholder="Полет"
            ></b-form-input>
        </b-form-group>
        <b-form-group label="Описание:">
          <b-form-textarea
              size="sm"
              v-model="element.description"
              placeholder="Позволяет использовать команду /fly. Очень полезна при строительстве и путешествиях."
              rows="4"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Право на сервере (каждое с новой строки):">
          <b-form-textarea
              size="sm"
              v-model="element.base"
              placeholder="test.command.fly"
              rows="4"
          ></b-form-textarea>
        </b-form-group>
        
        <template #modal-footer>
          <b-button squared @click="$bvModal.hide('privileges_add')">Отменить</b-button>
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
          this.$store.dispatch('privileges/create', this.element);
          this.$bvModal.hide("privileges_add")
          this.element = {}
        },
      }
    }
  </script>
  