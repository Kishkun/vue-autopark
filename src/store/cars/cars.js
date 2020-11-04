import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

import {
  today,
  getDate,
  getFirstAllowedDay,
  makeActionList,
  carIsBooked
} from '../../helpers/utils';
import {loadData} from '../../api';
import {showInfo, showError} from '../../helpers/messages'
import {DATE_FORMAT} from '@/app.constants'

const state = () => ({
  cars: [],
  bookedCars: [],
  maxSpeedItems: [],
  runItems: [],
  speedValue: null,
  runValue: null,
  isLoading: false,
  currentDate: today()
});

const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
  SET_CARS(state, cars) {
    state.cars = cars
  },
  SET_SPEED_ITEMS(state, speedItems) {
    state.maxSpeedItems = speedItems
  },
  SET_RUN_ITEMS(state, runItems) {
    state.runItems = runItems
  },
  SET_CAR_BOOKING(state, payload) {
    state.bookedCars.push(payload)
  },
  SET_CANCEL_CAR_BOOKING(state, {id, date}) {
    const item = state.bookedCars.find(item => item.id === id && item.date === date);
    state.bookedCars = state.bookedCars.filter(car => car !== item)
    localStorage.setItem('bookedCars', JSON.stringify(state.bookedCars))
  },
  SET_CURRENT_DAY(state, day) {
    state.currentDate = day
  },
  SET_FILTER_VALUE(state, {name, value}) {
    state[name] = value
  },
  SET_RESET(state) {
    state.speedValue = null;
    state.runValue = null;
  },
};

const actions = {
  GET_LOADING({commit}, payload) {
    commit('SET_LOADING', payload);
  },
  async GET_STATE_INFO({commit, dispatch}) {
    dispatch('GET_LOADING', true);
    try {
      let {cars, speedItems, runItems} = await loadData(1000);
      commit('SET_CARS', cars);
      commit('SET_SPEED_ITEMS', speedItems);
      commit('SET_RUN_ITEMS', runItems);
      showInfo('Машины успешно добавлены!')
      if (localStorage.getItem('bookedCars')) {
        let payload = JSON.parse(localStorage.getItem('bookedCars'));
        commit('SET_CAR_BOOKING', payload);
      }
    } catch (e) {
      showError(e)
    }
    dispatch('GET_LOADING', false);
  },
  CHANGE_CURRENT_DAY({commit, dispatch}, day) {
    dispatch('GET_LOADING', true);
    try {
      commit('SET_CURRENT_DAY', day);
      //showInfo('Дата изменилась')
    } catch (e) {
      showError(e)
    }
    dispatch('GET_LOADING', false);
  },
  ADD_CAR_BOOKING({commit, dispatch, getters}, payload) {
    dispatch('GET_LOADING', true);
    try {
      commit('SET_CAR_BOOKING', payload);
      localStorage.setItem('bookedCars', JSON.stringify(payload));
      showInfo(`Машина успешно забронирована на ${payload.date}`)
    } catch (e) {
      showError(e)
    }
    dispatch('GET_LOADING', false);
  },
  CANCEL_CAR_BOOKING({commit, dispatch, getters}, {id, date}) {
    dispatch('GET_LOADING', true);
    try {
      const cancelDate = date || getters.currentDate;
      commit('SET_CANCEL_CAR_BOOKING', {id, date: cancelDate});
      showInfo(`Бронирование машины успешно отменено`);
      if (getters.bookedCars.length === 0) {
        localStorage.removeItem('bookedCars');
      }
    } catch (e) {
      showError(e)
    }
    dispatch('GET_LOADING', false);
  },
  CHANGE_FILTER_VALUE({commit, dispatch}, {name, value}) {
    dispatch('GET_LOADING', true);
    try {
      commit('SET_FILTER_VALUE', {name, value});
    } catch (e) {
      showError(e)
    }
    dispatch('GET_LOADING', false);
  },
  RESET_FILTER({commit, dispatch}) {
    dispatch('GET_LOADING', true);
    try {
      commit('SET_RESET');
      showInfo('Фильтр машин сброшен')
    } catch (e) {
      showError(e)
    }
    dispatch('GET_LOADING', false);
  },
};

const getters = {
  currentDate: (state) => {
    return state.currentDate
  },
  todayCar: (state) => {
    const now = state.currentDate;
    const bookedCar = state.bookedCars.find(item => item.date === now);
    return bookedCar ? state.cars.find(item => item.id === bookedCar.id) : {}
  },
  speedRange: (state) => {
    return makeActionList(state.maxSpeedItems)
  },
  runRange: (state) => {
    return makeActionList(state.runItems)
  },
  carItems: (state) => {
    const {cars, bookedCars, speedValue, runValue, currentDate} = state;
    let items = cars;

    // Apply filters
    if (speedValue || runValue) {
      if (speedValue) {
        const {max = 1000, min} = state.maxSpeedItems.find(item => item.id === speedValue);
        items = state.cars.filter(item => item.maxSpeed >= min && item.maxSpeed <= max)
      }
      if (runValue) {
        const {max = 1000, min} = state.runItems.find(item => item.id === runValue);
        items = items.filter(item => item.currentRun >= min && item.currentRun <= max)
      }
    }

    // Apply booking
    const showedDay = moment(currentDate).format(DATE_FORMAT);
    items = items.map(car => ({
      ...car,
      isBooked: carIsBooked(car, showedDay, bookedCars)
    }));

    return items
  },
  bookedDays: (state) => {
    return uniqBy(state.bookedCars, 'date').map(({date}) => date)
  },
  bookedCars: (state) => {
    const sortedBooking = sortBy(state.bookedCars, [function (book) {
      return moment(book.date)
    }]);
    return sortedBooking.map(({id, date}) => {
      const car = state.cars.find(obj => obj.id === id);
      return {
        id,
        carName: car.title,
        bookedDate: date
      }
    })
  },
  firstAllowedDay: (state) => {
    let startDate = getDate(state.currentDate);
    if (state.bookedCars.length > 0) {
      const bookedDays = state.bookedCars.map(item => item.date);
      startDate = getDate(getFirstAllowedDay(bookedDays, state.currentDate))
    }
    return startDate
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
