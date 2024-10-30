<template>
  <b-col lg="6" md="12" class="mt-4">
    <b-card-group deck>
      <b-card :title="data.name">
        <b-card-text>
          {{data.descript}}
        </b-card-text>
        <hr>
        <b-button :to="data.url" variant="primary" v-if="!data.targetBlank">Перейти</b-button>
        <b-button :href="data.url" target="_blank" variant="primary" v-if="data.targetBlank">Перейти</b-button>
      </b-card>
    </b-card-group>
  </b-col>
</template>

<script>
  export default {
    props: ['data'],
  };
</script>
