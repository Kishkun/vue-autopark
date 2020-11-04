<template>
  <button
      id="cancelBooking"
      class="button is-danger is-medium full-width"
      :disabled="selected"
      @click="handler"
  >
    Отменить бронь
  </button>
</template>

<script>
  export default {
    name: 'CancelReserveButton',
    inheritAttrs: false,
    props: {
      selected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handler() {
        this.$emit('onCancelBooking')
      }
    }
  }
</script>
