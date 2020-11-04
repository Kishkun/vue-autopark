<template>
  <div class="buttons">
    <button class="button is-primary is-medium full-width" @click="handler">Сбросить фильтр</button>
  </div>
</template>
<script>
  export default {
    name: 'ResetFilterButton',
    inheritAttrs: false,
    methods: {
      handler() {
        this.$emit('onResetFilter')
      }
    }
  }
</script>
