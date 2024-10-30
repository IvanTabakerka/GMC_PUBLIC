<template>
  <div>
    <b-modal id="privileges_update" centered title="Изменить привилегию">
      <p>Права уже купленных привилегий не поменяются</p>
      <hr>
      <b-form-group label="Название:">
          <b-form-input
          v-model="$store.state.privileges.element.name"
          type="text"
          placeholder="Полет"
          ></b-form-input>
      </b-form-group>
      <b-form-group label="Описание:">
        <b-form-textarea
            size="sm"
            v-model="$store.state.privileges.element.description"
            placeholder="Позволяет использовать команду /fly. Очень полезна при строительстве и путешествиях."
            rows="4"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group label="Право на сервере (каждое с новой строки):">
        <b-form-textarea
            size="sm"
            v-model="$store.state.privileges.element.base"
            placeholder="test.command.fly"
            rows="4"
        ></b-form-textarea>
      </b-form-group>
      
      <template #modal-footer>
        <b-button squared @click="$bvModal.hide('privileges_update')">Отменить</b-button>
        <b-button squared @click="update()">Изменить</b-button>
      </template>
    </b-modal>
  </div>
</template>
  
  
<script>
  export default {
    methods: {
      update () {
        this.$store.dispatch('privileges/update', this.$store.state.privileges.element);
        this.$bvModal.hide("privileges_update")
      },
    }
  }
</script>
