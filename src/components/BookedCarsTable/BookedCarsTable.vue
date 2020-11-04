<template>
  <div class="booked-cars-table">
    <div class="columns">
      <div class="column">
        <h2 class="subtitle has-text-weight-bold">{{ title }}</h2>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <b-table
                style="margin-bottom: 1rem"
                :data="bookedCars"
                :columns="columns"
                :selected.sync="selected"
        >
          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon
                          icon="emoticon-sad"
                          size="is-large">
                  </b-icon>
                </p>
                <p>{{ emptyText }}</p>
              </div>
            </section>
          </template>
        </b-table>
        <CancelReserveButton
            @onCancelBooking="onCancelBooking"
            :selected="!selected"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import CancelReserveButton from '../Button/CancelReserveButton';
  
  export default {
    name: 'BookedCarsTable',
    components: {CancelReserveButton},
    data: () => ({
      columns: [
        {
          field: 'id',
          label: 'Ид',
          width: '40',
        },
        {
          field: 'carName',
          label: 'Машина',
          width: '250',
        },
        {
          field: 'bookedDate',
          label: 'Дата',
        }
      ],
      selected: null,
      title: 'Список забронированных машин',
      emptyText: 'У вас пока нет забронированных машин...',
    }),
    props: {
      bookedCars: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      onCancelBooking() {
        const me = this;
        if (me.selected) {
          const { id, bookedDate: date } = me.selected;
          me.$emit('cancelCarBooking', { id, date })
        }
      },
    },
    watch: {
      bookedCars(newProps) {
        const me = this;
        if (me.selected) {
          const isExists = newProps.find(item => item === me.selected);
          if (!isExists) {
            me.selected = null
          }
        }
      }
    }
  }
</script>
<style scoped>
  .booked-cars-table {
    margin-top: 2rem;
  }
</style>
