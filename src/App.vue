<template>
    <div id="app">
        <div class="container is-fluid">
            <!-- Header -->
            <div class="columns">
                <div class="column is-full">
                    <AppHeader
                        :title="title"
                        :carName="todayCar.title"
                        :date="currentDate"
                        @changeDate="onChangeDay"
                    />
                </div>
            </div>
            <!-- Main section -->
            <div class="columns">
                <div class="column is-8 has-border-right">
                    <CarList
                        :cars="carItems"
                        :bookedDays="bookedDays"
                        :firstAllowedDay="firstAllowedDay"
                        @addCarBooking="onAddBooking"
                        @cancelCarBooking="onCancelBooking"
                    />
                    <Preloader v-if="isLoading" />
                </div>
                <div class="column is-4">
                    <CarsFilter
                        :speedRange="speedRange"
                        :runRange="runRange"
                        :speed="speedValue"
                        :run="runValue"
                        @changeSpeed="onChangeSpeed"
                        @changeRun="onChangeRun"
                        @resetFilter="reset"
                    />
                  
                    <BookedCarsTable
                        :bookedCars="bookedCars"
                        @cancelCarBooking="onCancelBooking"
                    />
                </div>
            </div>
        </div>
        <portal-target name="modals"></portal-target>
    </div>
</template>
<script>
  import AppHeader from './components/AppHeader/AppHeader'
  import CarList from './components/Car/CarList';
  import CarsFilter from './components/CarsFilter/CarsFilter';
  import BookedCarsTable from './components/BookedCarsTable/BookedCarsTable';
  import Preloader from './components/Preloader/Preloader';
  
  import { mapActions, mapState, mapGetters } from  'vuex';

  export default {
    name: 'App',
    components: { AppHeader, CarList, CarsFilter, BookedCarsTable, Preloader },
    data: () => ({
      title: 'Мой автопарк',
    }),
    computed: {
      ...mapState({
        runItems: state => state.cars.runItems,
        isLoading: state => state.cars.isLoading,
        currentDate: state => state.cars.currentDate,
        speedValue: state => state.cars.speedValue,
        runValue: state => state.cars.runValue,
      }),
      ...mapGetters({
        todayCar: 'cars/todayCar',
        speedRange: 'cars/speedRange',
        runRange: 'cars/runRange',
        carItems: 'cars/carItems',
        bookedDays: 'cars/bookedDays',
        bookedCars: 'cars/bookedCars',
        firstAllowedDay: 'cars/firstAllowedDay',
      })
    },
    mounted() {
      this.loadData()
    },
    methods: {
      ...mapActions({
        loadData: 'cars/GET_STATE_INFO',
        filter: 'cars/CHANGE_FILTER_VALUE',
        reset: 'cars/RESET_FILTER',
        onAddBooking: 'cars/ADD_CAR_BOOKING',
        onCancelBooking: 'cars/CANCEL_CAR_BOOKING',
        onChangeDay: 'cars/CHANGE_CURRENT_DAY',
      }),
      onChangeSpeed(value) {
        this.filter({ name: 'speedValue', value })
      },
      onChangeRun(value) {
        this.filter({ name: 'runValue', value })
      },
    }
  }
</script>
<style scoped>
    #app {
        margin: 40px auto;
    }
    .has-border-right {
        border-right: 1px solid hsl(0, 0%, 71%);
    }
</style>
