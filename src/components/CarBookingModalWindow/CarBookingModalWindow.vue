<template>
  <b-modal
          :active="true"
          :canCancel="false"
  >
    <div class="modal-card">
      <header class="modal-card-head">
        Бронирование машины:
        <span class="has-text-weight-bold">&nbsp;{{ title }}</span>
      </header>
      <section class="modal-card-body">
        <form>
          <b-field label="Дата бронирования">
            <DatePicker
                    v-model="selectDate"
                    :unselectable-dates="unSelectableDates"
                    :min-date="today"
            />
          </b-field>
        </form>
      </section>
      <footer class="modal-card-foot">
        <div class="booking-buttons">
          <button class="button is-primary" @click="onConfirm">Выбрать</button>
          <button class="button is-normal" @click="onClose">Отмена</button>
        </div>
      </footer>
    </div>
  </b-modal>
</template>
<script>
  import moment from 'moment'

  import DatePicker from '../DatePicker/DatePicker';
  import { getDate } from '@/helpers/utils'
  import { DATE_FORMAT } from '@/app.constants'

  export default {
    name: 'CarBookingModalWindow',
    components: {
      DatePicker
    },
    data() {
      return {
        today: new Date(),
        selectDate: this.firstAllowedDay
      }
    },
    props: {
      carId: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      bookedDays: {
        type: Array,
        default: () => []
      },
      firstAllowedDay: {
        type: Date,
        default: new Date()
      }
    },
    computed: {
      unSelectableDates() {
        return this.bookedDays.map(date => getDate(date))
      }
    },
    methods: {
      onConfirm() {
        this.$emit('confirm', moment(this.selectDate).format(DATE_FORMAT))
      },
      onClose() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .booking-buttons {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  
  .modal-card {
    width: 400px;
    height: 250px;
  }
</style>
