<template>
  <div class="full-width">
    <a
            v-if="isAllowedBooking"
            href="#"
            class="car-booking-toggle-button card-footer-item has-text-success"
            @click.prevent="isVisible = true"
    >
      {{ linkText }}
      <portal to="modals">
        <template v-if="isVisible">
          <CarBookingModalWindow
                  v-bind="modalProps"
                  @confirm="addCarBooking"
                  @close="hideBookingWindow"
          />
        </template>
      </portal>
    </a>
    <a
            href="#"
            class="car-booking-toggle-button card-footer-item has-text-danger"
            v-else
            @click.prevent="cancelCarBooking"
    >
      {{ linkText }}
    </a>
  </div>
</template>

<script>

  import CarBookingModalWindow from '../CarBookingModalWindow/CarBookingModalWindow';

  export default {
    name: 'ToggleCarBookingButton',
    components: {
      CarBookingModalWindow
    },
    data: () => ({
      isVisible: false
    }),
    props: {
      carId: {
        type: Number,
        required: true
      },
      isAllowedBooking: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      modalProps() {
        return {
          carId: this.carId,
          ...this.$attrs
        }
      },
      linkText() {
        return this.isAllowedBooking ? 'Забронировать' : 'Отказаться'
      }
    },
    methods: {
      hideBookingWindow() {
        this.isVisible = false
      },
      addCarBooking(date) {
        this.hideBookingWindow()
        this.$emit('addCarBooking', { id: this.carId, date })
      },
      cancelCarBooking() {
        this.$emit('cancelCarBooking', { id: this.carId })
      }
    }
  }
</script>
<style scoped>
  .full-width {
    width: 100%;
  }
</style>
